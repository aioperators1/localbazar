
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Finding products with spammy descriptions...');

    const products = await prisma.product.findMany({
        where: {
            OR: [
                { description: { contains: 'SetupGame' } },
                { description: { contains: 'Setup Game' } },
                { description: { contains: 'Prix Maroc' } },
                { description: { contains: 'N°1 du Gaming' } },
                { description: { contains: 'Achetez en ligne' } }
            ]
        }
    });

    console.log(`Found ${products.length} products to clean.`);

    for (const product of products) {
        let newDesc = product.description;

        // Regex patterns to remove
        const patterns = [
            /Achetez en ligne.*?(SetupGame|Setup Game).*?(\.|$)/gi,
            /.*?SetupGame\.ma.*?(\.|$)/gi,
            /.*?N°1 du Gaming.*?(\.|$)/gi,
            /.*?Prix Maroc.*?(\.|$)/gi,
            /SetupGame/gi,
            /Setup Game/gi
        ];

        patterns.forEach(pattern => {
            newDesc = newDesc.replace(pattern, '');
        });

        // Clean up extra whitespace
        newDesc = newDesc.replace(/\s+/g, ' ').trim();

        // If description becomes empty or too short, set a default
        if (newDesc.length < 10) {
            newDesc = `Premium ${product.name} available now at ElectroSilam.`;
        }

        if (newDesc !== product.description) {
            console.log(`[Before]: ${product.description.substring(0, 100)}...`);
            console.log(`[After ]: ${newDesc}`);

            await prisma.product.update({
                where: { id: product.id },
                data: { description: newDesc }
            });
        }
    }

    console.log('Description cleanup complete.');
}

main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
