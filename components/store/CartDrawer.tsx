"use client";

import { useCart } from "@/hooks/use-cart";
import { useState, useEffect } from "react";
import { X, ShoppingBag, Trash2, Minus, Plus, ArrowRight, ShieldCheck, Ticket } from "lucide-react";
import { validateVoucher } from "@/lib/actions/voucher";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/components/providers/currency-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, removeItem, addItem, decreaseItem, totalPrice, totalItems, voucher, setVoucher, discountAmount } = useCart();
    const { formatPrice: formatCurrency } = useCurrency();
    const { t, language } = useLanguage();
    const [voucherCode, setVoucherCode] = useState("");
    const [isApplying, setIsApplying] = useState(false);

    // Lock body scroll when drawer is open
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

    const itemCount = totalItems();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
                    />

                    <motion.div
                        initial={{ x: language === 'ar' ? "-100%" : "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: language === 'ar' ? "-100%" : "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 150 }}
                        className={cn(
                            "fixed top-0 h-full w-full sm:w-[500px] bg-white z-[201] shadow-2xl flex flex-col",
                            language === 'ar' ? "left-0" : "right-0"
                        )}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100 bg-white sticky top-0 z-30">
                            <div className="flex items-center gap-3">
                                <h2 className="text-[16px] font-black uppercase tracking-[0.3em] text-[#111111]">
                                    {t('cart.title')}
                                </h2>
                                <div className="w-5 h-5 bg-[#111111] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                                    {itemCount}
                                </div>
                            </div>
                            <button 
                                onClick={onClose}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-all duration-500 hover:rotate-90 group"
                            >
                                <X className="w-5 h-5 stroke-[1.5] text-zinc-400 group-hover:text-black transition-colors" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                            {items.length > 0 ? (
                                <div className="space-y-8">
                                    {items.map((item, idx) => (
                                        <div key={`${item.id}-${idx}`} className="flex gap-6 group">
                                            <div className="w-24 h-32 relative bg-[#F9F9F9] overflow-hidden shrink-0">
                                                <Image 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    fill 
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                                    unoptimized
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-[13px] font-bold text-[#111111] uppercase tracking-wider line-clamp-2 leading-tight flex-1">
                                                        {item.name}
                                                    </h3>
                                                    <button 
                                                        onClick={() => removeItem(item.id, item.size, item.color)}
                                                        className="text-zinc-300 hover:text-rose-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {(item.size || item.color) && (
                                                    <div className="flex gap-3 mb-4">
                                                        {item.size && (
                                                            <span className="text-[9px] text-zinc-400 font-black uppercase tracking-widest border border-zinc-100 px-2 py-1 bg-zinc-50/50">
                                                                {t("product.size")}: {item.size}
                                                            </span>
                                                        )}
                                                        {item.color && (
                                                            <span className="text-[9px] text-zinc-400 font-black uppercase tracking-widest border border-zinc-100 px-2 py-1 bg-zinc-50/50">
                                                                {t("product.color")}: {item.color}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                <div className="mt-auto flex items-center justify-between">
                                                    <div className="flex items-center border border-zinc-100 rounded-[2px] h-8 w-24">
                                                        <button 
                                                            onClick={() => decreaseItem(item.id, item.size, item.color)}
                                                            className="flex-1 h-full flex items-center justify-center hover:bg-zinc-50 transition-colors"
                                                        >
                                                            <Minus className="w-3 h-3 text-zinc-400" />
                                                        </button>
                                                        <span className="flex-1 text-[11px] font-black text-[#111111] text-center">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => addItem(item)}
                                                            className="flex-1 h-full flex items-center justify-center hover:bg-zinc-50 transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3 text-zinc-400" />
                                                        </button>
                                                    </div>
                                                    <span className="text-[13px] font-black text-[#111111]">
                                                        {formatCurrency(item.price * item.quantity)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <ShoppingBag className="w-12 h-12 stroke-[1] mb-6 text-zinc-200" />
                                    <p className="text-[11px] font-bold uppercase tracking-[0.3em]">{t('cart.empty')}</p>
                                    <button 
                                        onClick={onClose}
                                        className="mt-6 text-[10px] font-black border-b border-[#111111] pb-1 uppercase tracking-widest hover:text-brand-burgundy hover:border-brand-burgundy transition-all"
                                    >
                                        {t('cart.continueShopping')}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-8 bg-zinc-50 border-t border-zinc-100 space-y-6">
                                {/* Voucher Input */}
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Ticket className={cn("absolute top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400", language === 'ar' ? "right-3" : "left-3")} />
                                            <input 
                                                type="text"
                                                value={voucherCode}
                                                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                                                disabled={!!voucher}
                                                placeholder={voucher ? voucher.code : t('cart.voucher')}
                                                className={cn(
                                                    "w-full pr-4 py-3 bg-white border border-zinc-200 text-[11px] font-black tracking-widest uppercase focus:outline-none focus:border-[#111111] disabled:bg-zinc-100 disabled:text-zinc-500",
                                                    language === 'ar' ? "pr-10 pl-4" : "pl-10 pr-4"
                                                )}
                                            />
                                        </div>
                                        {voucher ? (
                                            <button 
                                                onClick={() => setVoucher(null)}
                                                className="px-4 bg-zinc-200 text-[#111111] text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all"
                                            >
                                                {t('cart.remove')}
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={async () => {
                                                    if (!voucherCode) return;
                                                    setIsApplying(true);
                                                    const res = await validateVoucher(voucherCode);
                                                    if (res.success) {
                                                        setVoucher(res.voucher as any);
                                                        toast.success("Voucher applied!");
                                                        setVoucherCode("");
                                                    } else {
                                                        toast.error(res.error || "Invalid voucher");
                                                    }
                                                    setIsApplying(false);
                                                }}
                                                disabled={isApplying}
                                                className="px-6 bg-[#111111] text-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:opacity-50"
                                            >
                                                {isApplying ? t('cart.applying') : t('cart.apply')}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                                        <span>{t('cart.subtotal')}</span>
                                        <span>{formatCurrency(items.reduce((acc, item) => acc + (item.price * item.quantity), 0))}</span>
                                    </div>
                                    {voucher && (
                                        <div className="flex justify-between items-center text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">
                                            <span>{t('cart.discount')} ({voucher.code})</span>
                                            <span>-{formatCurrency(discountAmount())}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                                        <span>{t('cart.shipping')}</span>
                                        <span className="text-emerald-600">{t('cart.shippingCalculated')}</span>
                                    </div>
                                    <div className="pt-4 flex justify-between items-center border-t border-zinc-100">
                                        <span className="text-[14px] font-black uppercase tracking-widest text-[#111111]">{t('cart.estimatedTotal')}</span>
                                        <span className="text-[20px] font-black text-[#111111]">{formatCurrency(totalPrice())}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Link 
                                        href="/checkout" 
                                        onClick={onClose}
                                        className="w-full bg-[#111111] text-white text-center py-5 font-black text-[12px] uppercase tracking-[0.3em] hover:bg-brand-burgundy transition-all shadow-xl flex items-center justify-center gap-3 group"
                                    >
                                        {t('cart.checkout')}
                                        <ArrowRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-2", language === 'ar' && "rotate-180 group-hover:-translate-x-2")} />
                                    </Link>
                                    <Link 
                                        href="/cart" 
                                        onClick={onClose}
                                        className="w-full border border-[#111111] text-[#111111] text-center py-5 font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#111111] hover:text-white transition-all"
                                    >
                                        {t('cart.viewCart')}
                                    </Link>
                                </div>

                                <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest pt-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    {t('cart.securePayment')}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
