"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useCurrency } from "@/components/providers/currency-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { motion } from "framer-motion";

interface ProductProps {
    product: {
        id: string;
        name: string;
        slug: string;
        price: number;
        image?: string;
        images?: string;
        category: any;
        specs?: string | null;
        colors?: string | null;
    }
    className?: string;
}

export function ProductCard({ product, className }: ProductProps) {
    const { addItem } = useCart();
    const { formatPrice: formatCurrency } = useCurrency();
    const { t, language } = useLanguage();
    const [isAdded, setIsAdded] = useState(false);

    const categoryName = typeof product.category === 'object'
        ? product.category?.name
        : (product.category || "Fashion");

    // Parse images
    let imagesList: string[] = [];
    try {
        if (product.images && typeof product.images === 'string' && product.images.startsWith('[')) {
            imagesList = JSON.parse(product.images);
        } else if (product.image) {
            imagesList = [product.image];
        } else if (product.images) {
            imagesList = product.images.split(',').map(img => img.trim());
        }
    } catch {
        imagesList = product.image ? [product.image] : [];
    }

    if (imagesList.length === 0) {
        imagesList = ["https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000"];
    }

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: imagesList[0],
            quantity: 1,
            category: categoryName,
            size: null,
            color: null
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={cn("bg-white flex flex-col group relative overflow-hidden h-full border border-zinc-50 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 rounded-[2px]", className)}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-50">
                <Link href={`/product/${product.slug}`} className="block h-full w-full relative group/image">
                    {/* Primary Image with Ken Burns Hover */}
                    <div className={cn(
                        "absolute inset-0 transition-transform duration-[3s] ease-out z-10",
                        imagesList.length > 1 ? "group-hover:opacity-0 group-hover:scale-110" : "group-hover:scale-110"
                    )}>
                        <Image
                            src={imagesList[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>

                    {/* Secondary Image */}
                    {imagesList.length > 1 && (
                        <div className="absolute inset-0 transition-all duration-[1.5s] ease-out opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 z-0">
                            <Image
                                src={imagesList[1]}
                                alt={`${product.name} - alternate`}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    )}

                    {/* Luxury Floating Frame Overlay */}
                    <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 transition-all duration-700 z-20 pointer-events-none" />
                </Link>

                {/* Wishlist Icon */}
                <button className={cn(
                    "absolute top-4 z-30 w-10 h-10 glass rounded-full flex items-center justify-center text-black/60 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-700 hover:bg-white hover:text-brand-burgundy",
                    language === 'ar' ? "left-4" : "right-4"
                )}>
                    <Heart className="w-4 h-4 stroke-[1.5]" />
                </button>

                {/* Status Badge */}
                <div className={cn("absolute top-4 z-30", language === 'ar' ? "right-4" : "left-4")}>
                    <span className="bg-[#111] text-white text-[8px] font-black tracking-[0.4em] uppercase px-3 py-1 pb-1.5 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-700">
                        {t('product.signature')}
                    </span>
                </div>
            </div>

            {/* Content Container */}
            <div className={cn(
                "flex flex-col flex-1 px-6 py-6 space-y-4",
                language === 'ar' ? "text-right" : "text-left"
            )}>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black tracking-[0.3em] text-zinc-300 uppercase">
                        {categoryName}
                    </span>

                    {/* Minimal Color Swatches */}
                    <div className="flex gap-1.5">
                        {(() => {
                            let colorList: any[] = [];
                            try {
                                if (product.colors && typeof product.colors === 'string' && product.colors.startsWith('[')) {
                                    colorList = JSON.parse(product.colors);
                                }
                            } catch { }

                            return colorList.slice(0, 2).map((clr, i) => (
                                <div
                                    key={i}
                                    className="w-2.5 h-2.5 rounded-full border border-zinc-100 shadow-sm"
                                    style={{ backgroundColor: clr.hex || clr.color || clr.name }}
                                />
                            ));
                        })()}
                    </div>
                </div>

                {/* Title */}
                <Link href={`/product/${product.slug}`} className="block">
                    <h3 className="font-serif text-[18px] text-[#111] tracking-tight group-hover:text-brand-burgundy transition-colors line-clamp-2 min-h-[50px] leading-snug">
                        {product.name}
                    </h3>
                </Link>

                {/* Footer Section */}
                <div className="pt-2 flex flex-col gap-6">
                    <div className="flex items-end justify-between">
                        <span className="text-[#111] font-black text-[20px] tracking-tighter">
                            {formatCurrency(product.price)}
                        </span>
                        <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mb-1.5">
                            {t('product.exclVat')}
                        </span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={cn(
                            "w-full h-[58px] flex items-center justify-center gap-4 font-black text-[10px] tracking-[0.4em] uppercase transition-all duration-700 relative overflow-hidden border border-zinc-100 hover:border-[#111] group/btn",
                            isAdded ? "bg-black text-white" : "bg-white text-[#111]"
                        )}
                    >
                        <span className="relative z-10 flex items-center gap-3 transition-colors duration-700 group-hover/btn:text-white">
                            <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                            {isAdded ? t('product.addedShort') : t('product.acquirePiece')}
                        </span>

                        {!isAdded && (
                            <div className="absolute inset-0 bg-[#111] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-700" />
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
