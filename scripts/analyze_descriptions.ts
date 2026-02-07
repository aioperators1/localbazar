
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const products = await prisma.product.findMany({
        where: {
            OR: [
                { description: { contains: 'SetupGame' } },
                { description: { contains: 'Setup Game' } },
                { description: { contains: 'Prix Maroc' } }
            ]
        },
        take: 10
    });

    console.log(`Found ${products.length} products with target phrases.`);
    products.forEach(p => {
        console.log(`--- [${p.name}] ---`);
        console.log(p.description);
        console.log('------------------');
    });
}

main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
