"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/store/ProductCard";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/providers/language-provider";

interface NewArrivalsTabsProps {
    products: any[];
    categories?: any[];
}

export function NewArrivalsTabs({ products, categories = [] }: NewArrivalsTabsProps) {
    const { t, language } = useLanguage();
    
    const dynamicTabs = categories.length > 0 ? categories.slice(0, 6).map(c => ({
        label: c.name,
        slug: c.slug
    })) : [
        { label: t('cat.abayas'), slug: "abayas" },
        { label: t('cat.dresses'), slug: "dresses-jalabiyas" },
        { label: t('cat.men'), slug: "men" },
        { label: t('cat.perfumes'), slug: "perfumes-oud" },
        { label: t('cat.accessories'), slug: "accessories" }
    ];

    const [activeTab, setActiveTab] = useState(dynamicTabs[0].slug);
    
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        containScroll: "trimSnaps",
        dragFree: true,
        direction: language === 'ar' ? 'rtl' : 'ltr'
    });

    const filteredProducts = useMemo(() => {
        return products.filter((p: any) => {
            const catSlug = p.category?.slug || p.categoryId;
            return catSlug === activeTab;
        }).slice(0, 10);
    }, [products, activeTab]);

    const scrollNext = () => emblaApi && emblaApi.scrollNext();
    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();

    return (
        <section className={`py-32 bg-white overflow-hidden font-sans ${language === 'ar' ? 'rtl' : 'ltr'}`}>
            <div className="container mx-auto px-4 lg:px-24 mb-16">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-zinc-100 pb-12">
                    <div className="space-y-8 max-w-2xl">
                        <div className="flex items-center gap-4 mb-2">
                            <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: 40 }}
                                className="h-px bg-brand-burgundy"
                            />
                            <span className="text-[10px] font-black tracking-[0.5em] text-zinc-400 uppercase">{t('home.curateSelection')}</span>
                        </div>
                        <h2 className="font-serif text-[48px] lg:text-[64px] text-[#111] leading-[0.9] font-medium tracking-tighter">
                            {t('nav.newArrivals').split(' ')[0]} <span className="italic font-extralight text-zinc-400">{t('nav.newArrivals').split(' ').slice(1).join(' ')}</span>
                        </h2>
                        
                        {/* Categories Tabs */}
                        <div className="flex items-center gap-10 overflow-x-auto no-scrollbar pt-4">
                            {dynamicTabs.map((tab) => (
                                <button
                                    key={tab.slug}
                                    onClick={() => setActiveTab(tab.slug)}
                                    className={cn(
                                        "pb-4 text-[12px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all relative group",
                                        activeTab === tab.slug 
                                            ? "text-[#111]" 
                                            : "text-zinc-300 hover:text-zinc-500"
                                    )}
                                >
                                    {tab.label}
                                    {activeTab === tab.slug && (
                                        <motion.div 
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-burgundy"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <Link href={`/shop?category=${activeTab}`} className="relative group overflow-hidden bg-black text-white px-10 py-5 rounded-[1px] text-[11px] font-bold uppercase tracking-[0.3em] inline-flex items-center gap-3 self-start lg:self-auto">
                        <span className="relative z-10">{t('home.viewCatalogue')}</span>
                        <ChevronRight className={cn("w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1", language === 'ar' && "rotate-180 group-hover:-translate-x-1")} />
                        <div className="absolute inset-0 bg-brand-burgundy translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-24">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative group/carousel"
                    >
                        <div className="overflow-visible" ref={emblaRef}>
                            <div className="flex -ml-8">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="pl-8 min-w-[280px] md:min-w-[340px] lg:min-w-[400px] flex-[0_0_auto]"
                                        >
                                            <ProductCard product={product} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="pl-8 w-full py-32 text-center rounded-[2px] border border-dashed border-zinc-100 flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-6">
                                            <ShoppingBag className="w-6 h-6 text-zinc-200" />
                                        </div>
                                        <p className="text-zinc-400 font-serif italic text-[20px] tracking-tight">{t('common.loading')}</p>
                                        <p className="text-[10px] text-zinc-300 uppercase tracking-widest mt-2">{activeTab.replace(/-/g, ' ').toUpperCase()} {t('flash.active')}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {filteredProducts.length > 0 && (
                            <div className="flex justify-end gap-3 mt-12">
                                <button
                                    onClick={scrollPrev}
                                    className="w-14 h-14 rounded-full border border-zinc-100 flex items-center justify-center transition-all hover:bg-black hover:text-white group/btn"
                                >
                                    <ChevronLeft className={cn("w-5 h-5 transition-transform group-active/btn:scale-90", language === 'ar' && "rotate-180")} />
                                </button>
                                <button
                                    onClick={scrollNext}
                                    className="w-14 h-14 rounded-full border border-zinc-100 flex items-center justify-center transition-all hover:bg-black hover:text-white group/btn"
                                >
                                    <ChevronRight className={cn("w-5 h-5 transition-transform group-active/btn:scale-90", language === 'ar' && "rotate-180")} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
