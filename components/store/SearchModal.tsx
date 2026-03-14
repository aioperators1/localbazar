"use client";

import { useEffect, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2, ArrowRight, Target } from "lucide-react";
import { searchProducts } from "@/lib/actions/search";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SearchResult {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { t, language } = useLanguage();
    const isAr = language === 'ar';

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim().length > 1) {
                startTransition(async () => {
                    const data = await searchProducts(query);
                    setResults(data);
                });
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && query.trim()) {
            onClose();
            router.push(`/shop?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent 
                className="sm:max-w-4xl p-0 overflow-hidden bg-white border-zinc-200 rounded-none sm:rounded-2xl flex flex-col gap-0 h-[85vh] sm:h-[80vh] shadow-2xl" 
                dir={isAr ? "rtl" : "ltr"}
            >
                <VisuallyHidden>
                    <DialogTitle>{t("nav.search")}</DialogTitle>
                </VisuallyHidden>

                {/* --- HEADER / INPUT --- */}
                <div className="relative z-20 flex flex-col pt-10 px-8 sm:px-12 border-b border-zinc-100 bg-zinc-50/50">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#111111]/10 flex items-center justify-center">
                                <Search className="w-4 h-4 text-[#111111]" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t('nav.search')}</span>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="relative group mb-8">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={t('search.placeholder')}
                            className={cn(
                                "w-full h-16 bg-transparent border-none text-2xl sm:text-4xl font-black tracking-tighter text-zinc-900 placeholder:text-zinc-200 focus-visible:ring-0 uppercase p-0",
                                isAr && "text-right"
                            )}
                            autoFocus
                        />
                        <div className={cn(
                            "absolute bottom-0 left-0 right-0 h-[2px] bg-[#111111] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500",
                            isAr ? "origin-right" : "origin-left"
                        )} />
                    </div>
                </div>

                {/* --- RESULTS AREA --- */}
                <div className="relative flex-1 overflow-y-auto px-8 sm:px-12 py-10 no-scrollbar">
                    <AnimatePresence mode="wait">
                        {!query ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col items-center justify-center text-center py-20"
                            >
                                <div className="space-y-4">
                                    <Target className="w-12 h-12 text-zinc-100 mx-auto" />
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">{t('common.loading')}</p>
                                        <h3 className="text-xl font-bold text-zinc-400 uppercase tracking-tight">{t('nav.search')}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ) : isPending ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center py-20"
                            >
                                <Loader2 className="w-12 h-12 text-[#111111] animate-spin" />
                                <p className="mt-6 text-[10px] font-black text-[#111111]/40 uppercase tracking-widest">{t('common.loading')}</p>
                            </motion.div>
                        ) : results.length > 0 ? (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                {results.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/product/${product.slug}`}
                                        onClick={onClose}
                                        className="group flex items-center gap-6 p-4 bg-white border border-zinc-100 rounded-xl hover:border-[#111111]/30 transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0 border border-zinc-50 group-hover:border-[#111111]/20 transition-colors">
                                            <Image
                                                src={product.image || "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000"}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                                unoptimized
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0 space-y-1">
                                            <h4 className="text-sm font-black text-zinc-900 group-hover:text-[#111111] transition-colors uppercase leading-tight truncate tracking-tight">
                                                {product.name}
                                            </h4>
                                            <p className="text-xs font-black text-brand-burgundy">
                                                {product.price.toLocaleString()}.00 QAR
                                            </p>
                                        </div>

                                        <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-300 group-hover:bg-[#111111] group-hover:text-white transition-all">
                                            <ArrowRight className={cn("w-4 h-4", isAr && "rotate-180")} />
                                        </div>
                                    </Link>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="space-y-4">
                                    <X className="w-12 h-12 text-zinc-100 mx-auto" />
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">{t('cart.empty')}</p>
                                        <h3 className="text-xl font-bold text-zinc-400 uppercase tracking-tight">{t('nav.search')}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- FOOTER --- */}
                {results.length > 0 && (
                    <div className="p-8 border-t border-zinc-100 bg-zinc-50/50">
                        <Link
                            href={`/shop?search=${encodeURIComponent(query)}`}
                            onClick={onClose}
                            className="flex items-center justify-center gap-4 w-full py-4 text-[10px] font-black text-white uppercase tracking-widest transition-all bg-[#111111] hover:bg-zinc-800 rounded-full shadow-lg"
                        >
                            {t('home.exploreFull')}
                            <ArrowRight className={cn("w-4 h-4", isAr && "rotate-180")} />
                        </Link>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
