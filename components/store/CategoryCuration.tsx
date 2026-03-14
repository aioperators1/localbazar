"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

export function CategoryCuration({ categories }: { categories?: any[] }) {
    const { t, language } = useLanguage();

    const CURATED_COLLECTIONS = [
        {
            title: t('cat.abayas'),
            subtitle: t('slide1.subtitle'),
            image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000",
            link: "/shop?category=abayas",
            size: "large"
        },
        {
            title: t('cat.dresses'),
            subtitle: t('slide2.subtitle'),
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000",
            link: "/shop?category=dresses-jalabiyas",
            size: "small"
        },
        {
            title: t('cat.perfumes'),
            subtitle: t('slide3.subtitle'),
            image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=1000",
            link: "/shop?category=perfumes-oud",
            size: "small"
        }
    ];
    const collections = categories && categories.length >= 3 ? categories.slice(0, 3).map(c => ({
        title: c.name,
        subtitle: c.description || "COLLECTION",
        image: c.image || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000",
        link: `/shop?category=${c.slug}`,
        size: "large"
    })) : CURATED_COLLECTIONS;

    return (
        <section className={`py-32 bg-white overflow-hidden ${language === 'ar' ? 'rtl' : 'ltr'}`}>
            <div className="container mx-auto px-4 lg:px-24">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Primary Cinematic Tile */}
                    <div className="flex-[1.4] relative group">
                        <Link href={collections[0].link} className="block aspect-[4/5] lg:aspect-[3/4] relative overflow-hidden bg-zinc-100 rounded-[2px] shadow-sm">
                            <Image
                                src={collections[0].image}
                                alt={collections[0].title}
                                fill
                                className="object-cover transition-transform duration-2000 ease-out group-hover:scale-105"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-700" />
                            
                            {/* Architectural Frame Overlay */}
                            <div className="absolute inset-10 border border-white/20 pointer-events-none transition-all duration-700 group-hover:inset-12 group-hover:border-white/40" />
                            
                            <div className={cn(
                                "absolute bottom-16 text-white transform transition-transform duration-700 px-16",
                                language === 'ar' ? "right-0 text-right" : "left-0"
                            )}>
                                <span className="text-[10px] font-black tracking-[0.6em] uppercase mb-6 block opacity-80">{collections[0].subtitle}</span>
                                <h2 className="font-serif text-[42px] lg:text-[56px] leading-[0.9] mb-8 tracking-tighter">
                                    {collections[0].title.split(' ').map((word: string, i: number) => (
                                        <span key={i} className={i % 2 !== 0 ? "italic block lg:pl-12 font-extralight text-white/70" : "block font-bold"}>{word}</span>
                                    ))}
                                </h2>
                                <div className={cn("h-px w-20 bg-white/40 mb-10 group-hover:w-32 transition-all duration-700", language === 'ar' && "mr-auto ml-0")} />
                                <span className="text-[11px] font-bold uppercase tracking-[0.4em] inline-flex items-center gap-4 group-hover:gap-8 transition-all duration-700">
                                    {t('home.viewCatalogue')} <ChevronRight className={cn("w-4 h-4", language === 'ar' && "rotate-180")} />
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Secondary Curated Rails */}
                    <div className="flex-1 flex flex-col gap-12 lg:gap-16">
                        {collections.slice(1).map((item, idx) => (
                            <div key={item.title} className="flex-1 relative group">
                                <Link href={item.link} className="block h-full relative overflow-hidden bg-zinc-100 aspect-[16/9] lg:aspect-auto rounded-[2px] shadow-sm">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-2000 ease-out group-hover:scale-105"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-700" />
                                    
                                    <div className="absolute inset-0 flex items-center justify-center text-center px-12 text-white">
                                        <div className="space-y-4">
                                            <span className="text-[9px] font-black tracking-[0.4em] uppercase block opacity-70 mb-2">{item.subtitle}</span>
                                            <h2 className="font-serif text-[28px] lg:text-[34px] leading-tight font-black tracking-tight">{item.title}</h2>
                                            <div className="w-8 h-[2px] bg-brand-burgundy mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                        </div>
                                    </div>
                                    
                                    {/* Glassmorphism Badge */}
                                    <div className={cn(
                                        "absolute top-8 w-12 h-12 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                                        language === 'ar' ? "left-8" : "right-8"
                                    )}>
                                        <ChevronRight className={cn("w-4 h-4 text-black", language === 'ar' && "rotate-180")} />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
