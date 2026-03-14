import { getAllProducts, getCategories } from "@/lib/actions/product";
import { ShopContent } from "@/components/store/ShopContent";

export const metadata = {
    title: "Collections | Local Bazar Hub",
    description: "Discover our exclusive collections of high fashion, abayas, and luxury scents in Qatar.",
};

export default async function ShopPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; sort?: string; filter?: string; minPrice?: string; maxPrice?: string; search?: string; }>;
}) {
    const params = await searchParams;

    const minPrice = params.minPrice ? parseInt(params.minPrice) : undefined;
    const maxPrice = params.maxPrice ? parseInt(params.maxPrice) : undefined;

    // Parallelize fetches for better performance
    const [products, categories] = await Promise.all([
        getAllProducts(params.category, params.search, params.filter, minPrice, maxPrice, params.sort),
        getCategories()
    ]);

    const currentCategoryName = params.category
        ? (categories as any[]).find(c => c.slug === params.category)?.name || "Full Catalogue"
        : "Full Catalogue";

    return (
        <ShopContent 
            products={products} 
            categories={categories} 
            params={params} 
            currentCategoryName={currentCategoryName}
        />
    );
}
