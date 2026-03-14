"use client";

import { ScrollReveal } from "./ScrollReveal";
import { useLanguage } from "@/components/providers/language-provider";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProductCarousel } from "./ProductCarousel";

export function HomeContent({ selectionProducts, selectionCategory }: { selectionProducts: any[], selectionCategory: any }) {
    const { t, language } = useLanguage();
    const isAr = language === 'ar';

    return (
        <section className={isAr ? 'rtl' : 'ltr'}>
            {/* Brand Values - Minimalism Section */}
            <section className="py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-6 lg:px-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-32">
                        <ScrollReveal delay={0.1} className="space-y-8 group">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-px bg-zinc-200 group-hover:w-16 transition-all duration-700" />
                                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-400 uppercase">{t('home.purity')}</span>
                            </div>
                            <h3 className="text-[24px] font-serif tracking-tight text-[#111] leading-tight group-hover:text-brand-burgundy transition-colors duration-500">
                                {t('home.purityText')} <br />
                                <span className="italic font-extralight text-zinc-400">{t('home.purityItalic')}</span>
                            </h3>
                            <p className="text-[13px] text-zinc-500 leading-relaxed font-light max-w-xs">{t('home.qualityDesc')}</p>
                        </ScrollReveal>
                        
                        <ScrollReveal delay={0.3} className="space-y-8 group">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-px bg-zinc-200 group-hover:w-16 transition-all duration-700" />
                                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-400 uppercase">{t('home.authenticity')}</span>
                            </div>
                            <h3 className="text-[24px] font-serif tracking-tight text-[#111] leading-tight group-hover:text-brand-burgundy transition-colors duration-500">
                                {t('home.heritageText')} <br />
                                <span className="italic font-extralight text-zinc-400">{t('home.heritageItalic')}</span>
                            </h3>
                            <p className="text-[13px] text-zinc-500 leading-relaxed font-light max-w-xs">{t('home.heritageDesc')}</p>
                        </ScrollReveal>
                        
                        <ScrollReveal delay={0.5} className="space-y-8 group">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-px bg-zinc-200 group-hover:w-16 transition-all duration-700" />
                                <span className="text-[10px] font-black tracking-[0.5em] text-zinc-400 uppercase">{t('home.exclusivity')}</span>
                            </div>
                            <h3 className="text-[24px] font-serif tracking-tight text-[#111] leading-tight group-hover:text-brand-burgundy transition-colors duration-500">
                                {t('home.signaturesText')} <br />
                                <span className="italic font-extralight text-zinc-400">{t('home.signaturesItalic')}</span>
                            </h3>
                            <p className="text-[13px] text-zinc-500 leading-relaxed font-light max-w-xs">{t('home.signaturesDesc')}</p>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Curated Selection Rail */}
            <section className="py-32 bg-[#FBFBFB] relative overflow-hidden">
                {/* Subtle Watermark BG */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] w-full text-center">
                    <span className="text-[15vw] font-serif font-black tracking-tighter text-[#111] uppercase whitespace-nowrap">
                        {selectionCategory.name}
                    </span>
                </div>

                <div className="container mx-auto px-4 lg:px-24 mb-16 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-12 h-[1px] bg-brand-burgundy mb-2" />
                        <span className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.4em] block">{t('home.curateSelection')}</span>
                        <h2 className="font-serif text-[48px] lg:text-[64px] text-black leading-[0.9] tracking-tighter">
                            {selectionCategory.name.split(' ').map((word: string, i: number) => (
                                <span key={i} className={cn(
                                    i % 2 !== 0 ? "italic font-extralight text-zinc-400 block lg:inline" : "font-medium",
                                    i % 2 !== 0 && (isAr ? "lg:mr-4" : "lg:ml-4")
                                )}>{word} </span>
                            ))}
                        </h2>
                    </div>
                </div>

                <div className="relative z-10">
                    <ProductCarousel products={selectionProducts as any} />
                </div>

                <div className="text-center mt-20 relative z-10">
                    <Link href={`/shop?category=${selectionCategory.slug}`} className="group relative inline-flex items-center gap-8 overflow-hidden bg-black text-white px-12 py-6 rounded-[1px] text-[12px] font-bold uppercase tracking-[0.3em] transition-all">
                        <span className="relative z-10">{t('home.exploreFull')}</span>
                        <div className="absolute inset-0 bg-brand-burgundy translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-500">{isAr ? "←" : "→"}</span>
                    </Link>
                </div>
            </section>
        </section>
    );
}
