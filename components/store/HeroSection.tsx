"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";

export function HeroSection({ banners, settings }: { banners?: any[]; settings?: Record<string, string> }) {
    const [current, setCurrent] = useState(0);
    const { t, language } = useLanguage();

    const SLIDES = [
        {
            id: "1",
            subtitle: t('slide1.subtitle'),
            title: t('slide1.title'),
            description: t('slide1.desc'),
            buttonText: t('hero.shopNow'),
            image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2000",
            link: "/shop?category=abayas"
        },
        {
            id: "2",
            subtitle: t('slide2.subtitle'),
            title: t('slide2.title'),
            description: t('slide2.desc'),
            buttonText: t('hero.shopNow'),
            image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=2000",
            link: "/shop?category=perfumes-oud"
        },
        {
            id: "3",
            subtitle: t('slide3.subtitle'),
            title: t('slide3.title'),
            description: t('slide3.desc'),
            buttonText: t('hero.shopNow'),
            image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2000",
            link: "/shop?category=dresses-jalabiyas"
        }
    ];

    const slides = banners && banners.length > 0 ? banners.map(b => ({
        id: b.id,
        subtitle: b.subtitle || settings?.homepageSubtitle || t('nav.premiumFashion'),
        title: b.title || settings?.homepageTitle || t('nav.boutique'),
        description: b.description || settings?.aboutText || t('footer.about'),
        buttonText: t('hero.shopNow'),
        image: b.image,
        link: b.link || "/shop"
    })) : SLIDES;

    const next = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    useEffect(() => {
        const timer = setInterval(next, 7000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="relative w-full h-[90vh] lg:h-[85vh] min-h-[600px] lg:min-h-[700px] overflow-hidden bg-black group font-sans">
            {/* ── THE EXHIBITION HERO (Original Design) ── */}
            <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                {/* Background Text (Watermark style) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02]">
                    <span className="text-[25vw] font-serif font-black tracking-tighter text-white whitespace-nowrap uppercase">
                        {settings?.heroWatermark || "AUTHENTIC"}
                    </span>
                </div>

                {/* Slides Container */}
                {slides.map((slide, idx) => {
                    const isActive = idx === current;
                    return (
                        <div 
                            key={slide.id}
                            className={cn(
                                "absolute inset-0 w-full h-full flex flex-col lg:flex-row items-center transition-all duration-1000",
                                isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-110 z-0 pointer-events-none"
                            )}
                        >
                            {/* LEFT: TEXTUAL ARCHITECTURE */}
                            <div className={cn(
                                "flex-1 w-full h-full flex flex-col justify-center px-4 md:px-12 lg:px-24 z-20 pt-10 lg:pt-0",
                                language === 'ar' ? "text-right" : "text-left"
                            )}>
                                <div className={cn(
                                    "transition-all duration-1000 delay-300 transform",
                                    isActive ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                                )}>
                                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
                                        <div className="w-8 md:w-12 h-[1px] bg-brand-burgundy" />
                                        <span className="text-[9px] md:text-[10px] font-black tracking-[0.4em] md:tracking-[0.5em] text-zinc-500 uppercase">{slide.subtitle}</span>
                                    </div>
                                    
                                    <h1 className="text-white font-serif text-[32px] sm:text-[48px] md:text-[80px] lg:text-[110px] leading-[0.95] tracking-tighter mb-4 lg:mb-10">
                                        {slide.title.split(' ').map((word: string, i: number) => {
                                            const isEven = i % 2 === 0;
                                            return (
                                                <span 
                                                    key={i} 
                                                    className={cn(
                                                        "inline lg:block", 
                                                        !isEven && (language === 'ar' ? "pr-2 sm:pr-4 lg:pr-28" : "pl-2 sm:pl-4 lg:pl-28"),
                                                        !isEven ? "italic font-extralight text-zinc-400" : "font-black"
                                                    )}
                                                >
                                                    {word}{' '}
                                                </span>
                                            );
                                        })}
                                    </h1>

                                    <div className="flex items-start gap-4 lg:gap-10">
                                        <div className="flex flex-col gap-1 py-1 hidden lg:flex">
                                            <div className="w-2 h-2 bg-brand-burgundy rounded-full animate-pulse" />
                                            <div className="w-[1px] h-20 bg-zinc-800 ml-[3.5px]" />
                                        </div>
                                        <div className="max-w-md">
                                            <p className="text-zinc-400 text-[12px] md:text-[14px] leading-relaxed mb-8 md:mb-10 tracking-wide font-light lowercase first-letter:uppercase max-w-[280px] sm:max-w-full">
                                                {slide.description}
                                            </p>
                                            <Link href={slide.link} className="group relative inline-flex items-center gap-4 md:gap-6">
                                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-brand-burgundy group-hover:border-brand-burgundy transition-all duration-500">
                                                    <ChevronRight className={cn("w-5 h-5 md:w-6 md:h-6 text-white transition-transform", language === 'ar' && "rotate-180")} />
                                                </div>
                                                <span className="text-[10px] md:text-[11px] font-black tracking-[0.3em] md:tracking-[0.4em] text-white uppercase group-hover:translate-x-2 transition-transform duration-500">
                                                    {t('hero.shopNow')}
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: FLOATING VISUALS */}
                            <div className="flex-1 w-full h-full relative p-6 lg:p-24 overflow-hidden flex items-center justify-center lg:block">
                                {/* Large Main Image with tilted frame */}
                                    <div className={cn(
                                        "relative w-full h-[40vh] lg:h-full bg-zinc-900 overflow-hidden transition-all duration-[2s] delay-500 shadow-2xl rounded-[1px]",
                                        isActive ? "translate-x-0 opacity-100" : (language === 'ar' ? "-translate-x-40 opacity-0" : "translate-x-40 opacity-0")
                                    )}>
                                        <Image 
                                            src={slide.image} 
                                            alt={slide.title} 
                                            fill 
                                            className={cn(
                                                "object-cover transition-all duration-7000 ease-linear",
                                                isActive ? "scale-110" : "scale-100"
                                            )}
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        
                                        {/* Grain/Noise Overlay for Luxury Texture */}
                                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                                    </div>

                                {/* Floating Detail Image (Small Overlay) */}
                                <div className={cn(
                                    "absolute bottom-20 w-48 h-64 border-8 border-[#0a0a0a] shadow-2xl z-30 hidden lg:block transition-all duration-[2s] delay-700",
                                    language === 'ar' ? "right-4" : "left-4",
                                    isActive ? "translate-y-0 opacity-100" : "translate-y-40 opacity-0"
                                )}>
                                    <Image 
                                        src={slide.image} 
                                        alt="Detail" 
                                        fill 
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute top-1/4 -right-10 w-40 h-px bg-zinc-800 rotate-45" />
                                <div className="absolute bottom-1/4 -left-10 w-40 h-px bg-zinc-800 rotate-45" />
                            </div>
                        </div>
                    );
                })}

                {/* Progress Indicators (Vertical Original Style) */}
                <div className={cn(
                    "absolute top-1/2 -translate-y-1/2 flex flex-col gap-4 lg:gap-6 z-40 hidden sm:flex",
                    language === 'ar' ? "left-6 lg:left-12" : "right-6 lg:right-12"
                )}>
                    {slides.map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className="group flex items-center gap-4 focus:outline-none"
                        >
                            <span className={cn(
                                "text-[10px] font-bold transition-all duration-500",
                                idx === current ? "text-brand-burgundy translate-x-0" : "text-zinc-700 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                            )}>
                                0{idx + 1}
                            </span>
                            <div className={cn(
                                "w-10 h-[1px] transition-all duration-500",
                                idx === current ? "bg-brand-burgundy w-16" : "bg-zinc-800"
                            )} />
                        </button>
                    ))}
                </div>

                {/* Bottom Bar Controls */}
                <div className="absolute bottom-0 left-0 w-full h-20 lg:h-24 border-t border-white/5 flex items-center justify-between px-6 lg:px-24 z-40 bg-black/40 backdrop-blur-md">
                    <div className="flex items-center gap-6 lg:gap-12">
                        <div className="flex flex-col gap-1 hidden xs:flex">
                            <span className="text-[9px] lg:text-[10px] text-zinc-500 font-bold tracking-widest uppercase">{t('flash.active')}</span>
                            <span className="text-[11px] lg:text-[12px] text-white font-medium whitespace-nowrap">Local Bazar 2025</span>
                        </div>
                        <div className="w-px h-8 bg-zinc-800 hidden xs:block" />
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] lg:text-[10px] text-zinc-500 font-bold tracking-widest uppercase">{t('home.matrix')}</span>
                            <span className="text-[11px] lg:text-[12px] text-white font-medium" dir="ltr">{language === 'ar' ? `${slides.length} / ${current + 1}` : `0${current + 1} / 0${slides.length}`}</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 lg:gap-8">
                        <button onClick={prev} className="p-3 lg:p-4 rounded-full border border-zinc-800 text-zinc-400 hover:border-white hover:text-white transition-all">
                            <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
                        </button>
                        <button onClick={next} className="p-3 lg:p-4 rounded-full border border-zinc-800 text-zinc-400 hover:border-white hover:text-white transition-all">
                            <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
