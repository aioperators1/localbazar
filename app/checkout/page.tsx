"use client";

import { useCart } from "@/hooks/use-cart";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { placeOrder } from "@/lib/actions/checkout";
import { ShoppingCart, Banknote, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/components/providers/currency-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { EmptyState } from "@/components/store/EmptyState";
import { Branding } from "@/components/store/Branding";

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const { formatPrice: formatCurrency, currency } = useCurrency();
    const { t, language } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("COD");

    // Form State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: ""
    });

    useEffect(() => { setMounted(true); }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const orderData = {
            ...formData,
            items: items.map(item => ({
                id: item.id,
                quantity: item.quantity,
                price: item.price,
                size: item.size,
                color: item.color
            })),
            total: totalPrice(),
            paymentMethod
        };

        const res = await placeOrder(orderData) as any;

        if (res.success) {
            sessionStorage.setItem('localbazar_last_order', JSON.stringify({
                ...orderData,
                items: items, 
                orderId: res.orderId
            }));
            clearCart();
            toast.success(t('checkout.success'));
            router.push(`/success?orderId=${res.orderId}`);
        } else {
            toast.error(res.error || t('checkout.error'));
        }

        setIsLoading(false);
    };

    if (!mounted) return <div className="p-20 text-center font-bold text-[#111111] animate-pulse uppercase tracking-[0.2em] text-[12px]">{t('checkout.preparing')}</div>;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-6 py-32 flex flex-col items-center">
                <EmptyState 
                    title={t('checkout.empty')} 
                    description={t('checkout.emptyDesc')}
                    icon="search"
                />
            </div>
        )
    }

    const shippingCost = 35;

    return (
        <div className="min-h-screen bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {/* Minimal Header */}
            <header className="border-b border-zinc-100 py-6 bg-white sticky top-0 z-50">
                <div className="container mx-auto px-4 max-w-[1200px] flex items-center justify-between">
                    <Branding size="md" variant="luxury" />
                    <Link href="/cart" className="text-[12px] font-bold uppercase tracking-widest text-zinc-400 hover:text-[#111111] transition-colors">
                       <ShoppingCart className="w-5 h-5" />
                    </Link>
                </div>
            </header>

            <div className="container mx-auto px-4 max-w-[1200px]">
                <div className="grid lg:grid-cols-[1fr_420px] gap-0">

                    {/* LEFT COLUMN: Shipping & Payment */}
                    <div className={cn("py-12", language === 'ar' ? "lg:pl-16" : "lg:pr-16")}>
                        <form onSubmit={handleCheckout} className="space-y-12">
                            {/* 1. Contact */}
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-[18px] font-bold text-[#111111] uppercase tracking-tight">{t('checkout.contact')}</h2>
                                </div>
                                <div className="space-y-4">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={t('checkout.email')}
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full h-[52px] px-4 rounded-[4px] border border-zinc-300 focus:border-[#111111] focus:ring-0 outline-none transition-all placeholder:text-zinc-400 text-[14px]"
                                    />
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" className="peer w-4 h-4 border-zinc-300 rounded-[3px] accent-[#111111]" defaultChecked />
                                        <span className="text-[13px] text-zinc-600">{t('checkout.news')}</span>
                                    </label>
                                </div>
                            </section>

                            {/* 2. Shipping */}
                            <section>
                                <h2 className="text-[18px] font-bold text-[#111111] uppercase tracking-tight mb-6">{t('checkout.delivery')}</h2>
                                
                                <div className="space-y-4">
                                    <div className="relative">
                                        <select className="w-full h-[52px] px-4 rounded-[4px] border border-zinc-300 bg-[#f9f9f9] text-[14px] appearance-none outline-none focus:border-[#111111] font-medium">
                                            <option>{language === 'ar' ? "قطر" : "Qatar"}</option>
                                        </select>
                                        <div className={cn("absolute top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-[10px]", language === 'ar' ? "left-4" : "right-4")}>▼</div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            placeholder={t('checkout.firstName')}
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="h-[52px] px-4 rounded-[4px] border border-zinc-300 focus:border-[#111111] outline-none text-[14px] placeholder:text-zinc-400"
                                        />
                                        <input
                                            placeholder={t('checkout.lastName')}
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="h-[52px] px-4 rounded-[4px] border border-zinc-300 focus:border-[#111111] outline-none text-[14px] placeholder:text-zinc-400"
                                        />
                                    </div>

                                    <input
                                        placeholder={t('checkout.address')}
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full h-[52px] px-4 rounded-[4px] border border-zinc-300 focus:border-[#111111] outline-none text-[14px] placeholder:text-zinc-400"
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            placeholder={t('checkout.postalCode')}
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleInputChange}
                                            className="h-[52px] px-4 rounded-[4px] border border-zinc-300 focus:border-[#111111] outline-none text-[14px] placeholder:text-zinc-400"
                                        />
                                        <input
                                            placeholder={t('checkout.city')}
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="h-[52px] px-4 rounded-[4px] border border-zinc-300 focus:border-[#111111] outline-none text-[14px] placeholder:text-zinc-400"
                                        />
                                    </div>

                                    <div className="relative">
                                        <input
                                            placeholder={t('checkout.phone')}
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full h-[52px] px-4 rounded-[4px] border border-zinc-300 focus:border-[#111111] outline-none text-[14px] placeholder:text-zinc-400"
                                        />
                                        <div className={cn("absolute top-1/2 -translate-y-1/2 text-zinc-400 text-lg cursor-help", language === 'ar' ? "left-4" : "right-4")}>?</div>
                                    </div>

                                    <label className="flex items-center gap-3 cursor-pointer pt-2">
                                        <input type="checkbox" className="w-4 h-4 border-zinc-300 rounded-[3px] accent-[#111111]" />
                                        <span className="text-[13px] text-zinc-600">{t('checkout.saveInfo')}</span>
                                    </label>
                                </div>
                            </section>

                            {/* 3. Shipping Method */}
                            <section>
                                <h2 className="text-[18px] font-bold text-[#111111] uppercase tracking-tight mb-6">{t('checkout.shippingMethod')}</h2>
                                <div className="bg-[#f9f9f9] border border-zinc-200 rounded-[4px] p-4 flex items-center justify-between">
                                    <div className="flex flex-col">
                                       <span className="text-[13px] font-bold text-[#111111] tracking-tight uppercase">{t('checkout.express')}</span>
                                       <span className="text-[11px] text-zinc-500 font-medium">{t('checkout.deliveryTime')}</span>
                                    </div>
                                    <span className="text-[14px] font-bold text-[#111111]">{formatCurrency(shippingCost)}</span>
                                </div>
                            </section>

                            {/* 4. Payment */}
                            <section>
                                <h2 className="text-[18px] font-bold text-[#111111] uppercase tracking-tight mb-2">{t('checkout.payment')}</h2>
                                <p className="text-[12px] text-zinc-500 mb-6 font-medium uppercase tracking-wider">{t('checkout.secureTransactions')}</p>

                                <div className="border border-zinc-300 rounded-[4px] overflow-hidden">
                                    <div
                                        onClick={() => setPaymentMethod("COD")}
                                        className={cn(
                                            "p-5 flex items-center justify-between cursor-pointer transition-colors",
                                            paymentMethod === "COD" ? "bg-[#f9f9f9]" : "hover:bg-zinc-50"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", paymentMethod === "COD" ? "border-[#111111]" : "border-zinc-400")}>
                                                {paymentMethod === "COD" && <div className="w-2.5 h-2.5 bg-[#111111] rounded-full" />}
                                            </div>
                                            <span className="text-[14px] font-bold text-[#111111] uppercase tracking-tight">{t('checkout.cod')}</span>
                                        </div>
                                        <Banknote className="w-5 h-5 text-zinc-400" />
                                    </div>
                                    <div
                                        onClick={() => setPaymentMethod("CARD")}
                                        className={cn(
                                            "p-5 border-t border-zinc-200 flex items-center justify-between cursor-pointer transition-colors",
                                            paymentMethod === "CARD" ? "bg-[#f9f9f9]" : "hover:bg-zinc-50"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", paymentMethod === "CARD" ? "border-[#111111]" : "border-zinc-400")}>
                                                {paymentMethod === "CARD" && <div className="w-2.5 h-2.5 bg-[#111111] rounded-full" />}
                                            </div>
                                            <span className="text-[14px] font-bold text-[#111111] uppercase tracking-tight">{t('checkout.card')}</span>
                                        </div>
                                        <ShieldCheck className="w-5 h-5 text-zinc-400" />
                                    </div>
                                    <div
                                        onClick={() => setPaymentMethod("FAWRY")}
                                        className={cn(
                                            "p-5 border-t border-zinc-200 flex items-center justify-between cursor-pointer transition-colors",
                                            paymentMethod === "FAWRY" ? "bg-[#f9f9f9]" : "hover:bg-zinc-50"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", paymentMethod === "FAWRY" ? "border-[#111111]" : "border-zinc-400")}>
                                                {paymentMethod === "FAWRY" && <div className="w-2.5 h-2.5 bg-[#111111] rounded-full" />}
                                            </div>
                                            <span className="text-[14px] font-bold text-[#111111] uppercase tracking-tight">{t('checkout.fawry')}</span>
                                        </div>
                                        <div className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-black rounded uppercase">Fast</div>
                                    </div>
                                    <div
                                        onClick={() => setPaymentMethod("SADAD")}
                                        className={cn(
                                            "p-5 border-t border-zinc-200 flex items-center justify-between cursor-pointer transition-colors",
                                            paymentMethod === "SADAD" ? "bg-[#f9f9f9]" : "hover:bg-zinc-50"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", paymentMethod === "SADAD" ? "border-[#111111]" : "border-zinc-400")}>
                                                {paymentMethod === "SADAD" && <div className="w-2.5 h-2.5 bg-[#111111] rounded-full" />}
                                            </div>
                                            <span className="text-[14px] font-bold text-[#111111] uppercase tracking-tight">{t('checkout.sadad')}</span>
                                        </div>
                                        <div className="p-1 border border-zinc-200 rounded text-[9px] font-bold text-zinc-400 uppercase">Local</div>
                                    </div>
                                </div>
                            </section>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-[64px] bg-[#111111] hover:bg-brand-burgundy text-white font-black text-[14px] rounded-[2px] shadow-sm transition-all uppercase tracking-[0.2em] mt-8"
                            >
                                {isLoading ? t('checkout.processing') : t('checkout.completeOrder')}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: Summary (Grey background) */}
                    <div className={cn("bg-[#FAFAFA] py-12 px-8 lg:px-12 min-h-screen border-t lg:border-t-0 border-zinc-200", language === 'ar' ? "lg:border-r" : "lg:border-l")}>
                        <div className="sticky top-32 space-y-8">
                            {/* Product List */}
                            <div className="space-y-6">
                                {items.map((item: any, index: number) => (
                                    <div key={`${item.id}-${item.size || 'default'}-${item.color || 'default'}-${index}`} className="flex items-center gap-4">
                                        <div className="relative w-[64px] h-[64px] bg-white border border-zinc-200 rounded-[8px] flex items-center justify-center shrink-0 shadow-sm">
                                            <div className={cn("absolute -top-2 w-[22px] h-[22px] bg-[#111111] text-white text-[11px] font-bold rounded-full flex items-center justify-center z-10 shadow-sm leading-none", language === 'ar' ? "-left-2" : "-right-2")}>
                                                {item.quantity}
                                            </div>
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-[12px] font-bold text-[#111111] leading-tight line-clamp-2 uppercase tracking-tight">{item.name}</h4>
                                            {(item.size || item.color) && (
                                                <div className="flex gap-2 mt-1 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                                                    {item.size && <span>{t('product.size')}: {item.size}</span>}
                                                    {item.size && item.color && <span>/</span>}
                                                    {item.color && <span>{t('product.color')}: {item.color}</span>}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-[13px] font-bold text-[#111111] whitespace-nowrap">
                                            {formatCurrency(item.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Discount Code */}
                            <div className="flex gap-3 pt-6 border-t border-zinc-200">
                                <input
                                    placeholder={t('cart.voucher')}
                                    className="flex-1 h-[48px] px-4 rounded-[4px] border border-zinc-300 outline-none text-[13px] bg-white placeholder:uppercase placeholder:tracking-widest"
                                />
                                <button type="button" className="px-6 bg-[#eeeeee] hover:bg-zinc-200 text-zinc-600 font-bold rounded-[4px] text-[12px] transition-colors uppercase tracking-widest">
                                    {t('cart.apply')}
                                </button>
                            </div>

                            {/* Totals */}
                            <div className="space-y-4 pt-6 text-[14px]">
                                <div className="flex justify-between items-center text-zinc-500 uppercase tracking-widest font-bold text-[11px]">
                                    <span>{t('cart.subtotal')}</span>
                                    <span>{formatCurrency(totalPrice())}</span>
                                </div>
                                <div className="flex justify-between items-center text-zinc-500 uppercase tracking-widest font-bold text-[11px]">
                                    <span>{t('cart.shipping')}</span>
                                    <span>{formatCurrency(shippingCost)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 text-[#111111] font-black text-[22px] uppercase">
                                    <span>{t('cart.total')}</span>
                                    <span className="flex items-baseline gap-2">
                                        <span className="text-[12px] text-zinc-400 font-medium">{currency}</span>
                                        {formatCurrency(totalPrice() + shippingCost).replace(/[A-Z]+/, '').trim()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
