"use client";

import Link from "next/link";
import { SearchX, ShoppingBag, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    actionLink?: string;
    icon?: "search" | "cart";
    showReset?: boolean;
    onReset?: () => void;
}

export function EmptyState({
    title,
    description,
    actionLabel,
    actionLink = "/shop",
    icon = "search",
    showReset = false,
    onReset
}: EmptyStateProps) {
    const { t } = useLanguage();
    const finalActionLabel = actionLabel || t('home.viewCatalogue');
    return (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="mb-8 p-6 bg-zinc-50 rounded-full relative">
                {icon === "search" ? (
                    <SearchX className="w-12 h-12 text-zinc-300 stroke-[1]" />
                ) : (
                    <ShoppingBag className="w-12 h-12 text-zinc-300 stroke-[1]" />
                )}
                <div className="absolute inset-0 bg-brand-burgundy/5 rounded-full blur-xl -z-10" />
            </div>

            <h2 className="text-[20px] font-black uppercase tracking-tight text-[#111111] mb-2">
                {title}
            </h2>
            <p className="text-[14px] text-zinc-500 font-medium mb-10 max-w-[320px] leading-relaxed">
                {description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button asChild className="h-14 px-10 bg-[#111111] hover:bg-brand-burgundy text-white font-bold rounded-[2px] transition-all uppercase tracking-[0.2em] text-[11px]">
                    <Link href={actionLink}>
                        {finalActionLabel}
                    </Link>
                </Button>

                {showReset && onReset && (
                    <Button 
                        variant="outline" 
                        onClick={onReset}
                        className="h-14 px-10 border-zinc-200 hover:border-[#111111] hover:bg-transparent text-[#111111] font-bold rounded-[2px] transition-all uppercase tracking-[0.2em] text-[11px]"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        {t('shop.empty.reset')}
                    </Button>
                )}
            </div>
        </div>
    );
}
