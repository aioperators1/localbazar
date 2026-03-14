"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";

interface BrandingProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "luxury";
    light?: boolean;
    align?: "left" | "center" | "right";
}

export function Branding({ className, size = "md", variant = "default", light = false, align = "center" }: BrandingProps) {
    const { t, language } = useLanguage();
    const isAr = language === 'ar';

    const sizes = {
        sm: {
            text: "text-[16px]",
            luxuryText: "text-[20px]",
            letterSize: "text-[6px]",
            divider: "h-4",
            gap: "gap-2"
        },
        md: {
            text: "text-[18px] lg:text-[26px]",
            luxuryText: "text-[28px] lg:text-[34px]",
            letterSize: "text-[8px]",
            divider: "h-5 lg:h-7",
            gap: "gap-2 lg:gap-4"
        },
        lg: {
            text: "text-[24px] lg:text-[36px]",
            luxuryText: "text-[32px] lg:text-[42px]",
            letterSize: "text-[10px]",
            divider: "h-6 lg:h-9",
            gap: "gap-3 lg:gap-5"
        }
    };

    const s = sizes[size];

    if (variant === "luxury") {
        return (
            <div className={cn(
                "flex flex-col",
                align === "center" && "items-center text-center",
                align === "left" && (isAr ? "items-end text-right" : "items-start text-left"),
                align === "right" && (isAr ? "items-start text-left" : "items-end text-right"),
                className
            )}>
                <Link href="/" className={cn(
                    "flex flex-col gap-2 group transition-all duration-700",
                    align === "center" && "items-center",
                    align === "left" && (isAr ? "items-end" : "items-start"),
                    align === "right" && (isAr ? "items-start" : "items-end")
                )}>
                    <div className={cn("flex items-center gap-2 group", isAr && "flex-row-reverse")}>
                        <span className={cn(
                            "font-serif font-light tracking-[0.2em] transition-all duration-700",
                            s.luxuryText,
                            light ? "text-white" : "text-black"
                        )}>
                            {isAr ? "لوكال" : "LOCAL"}
                        </span>
                        <div className={cn(
                            "flex flex-col gap-0.5 font-bold leading-[1.1] transition-all duration-700",
                            s.letterSize,
                            light ? "text-white/80 border-white/20" : "text-black/80 border-black/20",
                            isAr ? "border-r pr-2 mr-1" : "border-l pl-2 ml-1"
                        )}>
                            <span className="tracking-widest">{t('header.logo.letter1')}</span>
                            <span className="tracking-widest">{t('header.logo.letter2')}</span>
                            <span className="tracking-widest">{t('header.logo.letter3')}</span>
                            <span className="tracking-widest">{t('header.logo.letter4')}</span>
                            <span className="tracking-widest">{t('header.logo.letter5')}</span>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <div className={cn("flex flex-col items-center flex-shrink-0", className)} dir="ltr">
            <Link href="/" className="group relative">
                <div className={cn("flex items-center", s.gap)}>
                    <span className={cn(
                        "font-serif font-light tracking-[-0.02em] transition-all group-hover:tracking-[0.15em] duration-700",
                        s.text,
                        light ? "text-white" : "text-black"
                    )}>
                        LOCAL
                    </span>
                    <div className={cn(
                        "w-[1px] rotate-[20deg] transition-transform duration-700 group-hover:rotate-[45deg]",
                        s.divider,
                        light ? "bg-white/20" : "bg-zinc-200"
                    )} />
                    <span className={cn(
                        "font-serif font-bold tracking-[-0.02em] text-brand-burgundy transition-all group-hover:tracking-[0.15em] duration-700",
                        s.text
                    )}>
                        BAZAR
                    </span>
                </div>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-brand-burgundy group-hover:w-full transition-all duration-700" />
            </Link>
        </div>
    );
}
