"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingCart, ShoppingBag, Heart, Search, Menu, X, User, Phone, MapPin, ChevronDown, Minus, Plus, Trash2, ChevronRight, Instagram, Twitter } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { SearchOverlay } from "./SearchOverlay";
import { CartDrawer } from "./CartDrawer";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { useCurrency } from "@/components/providers/currency-provider";
import Image from "next/image";
import { Branding } from "./Branding";
import { getAllProducts } from "@/lib/actions/product";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ── Brand Palette ──────────────────────────────────────────────
const BRAND = "var(--color-brand-black)"; // Local Bazar Black
const ACCENT = "var(--color-brand-burgundy)"; // Local Bazar Burgundy
const DANGER = "#e83348";

const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span className="text-[14px] text-zinc-600 font-medium tracking-normal lowercase first-letter:uppercase">
            {parts.map((part, i) =>
                part.toLowerCase() === highlight.toLowerCase() ?
                    <strong key={i} className="text-brand-burgundy font-bold leading-tight inline-block">{part}</strong> :
                    part
            )}
        </span>
    );
};

export function Header({ settings }: { settings?: Record<string, string> }) {
    const { data: session } = useSession();
    const { totalItems, items, removeItem, addItem, decreaseItem, totalPrice } = useCart();
    const [mounted, setMounted] = useState(false);
    const { t, language, setLanguage } = useLanguage();
    const { currency, setCurrency, formatPrice: formatCurrency } = useCurrency();
    const isAr = language === "ar";
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const itemCount = mounted ? totalItems() : 0;

    if (pathname.startsWith("/admin")) return null;

    return (
        <header
            className={cn(
                "w-full z-[100] transition-all duration-500",
                scrolled ? "fixed top-0 left-0 bg-white/90 backdrop-blur-xl shadow-sm" : "relative bg-white"
            )}
            dir={isAr ? "rtl" : "ltr"}
        >
            {/* 1. Top Bar */}
            <div className="bg-[#181818] py-2 lg:block hidden">
                <div className="container mx-auto px-8 flex justify-between items-center text-[10px] text-white/80 tracking-[0.15em]">
                    <div className="flex items-center font-bold uppercase">
                        <span>{t('header.tagline')}</span>
                    </div>
                    <div className="flex items-center gap-8 font-black uppercase">
                        {/* Language Switcher */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors outline-none h-8">
                                <span>{language === 'en' ? 'English' : language === 'fr' ? 'Français' : 'العربية'}</span>
                                <ChevronDown className="w-3 h-3 text-white/40" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[#181818] border-white/5 min-w-[130px] rounded-none shadow-2xl z-[200] text-white">
                                <DropdownMenuItem onClick={() => setLanguage("en")} className="text-[9px] font-black tracking-widest cursor-pointer focus:bg-white/5 focus:text-white uppercase px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/5">English</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setLanguage("fr")} className="text-[9px] font-black tracking-widest cursor-pointer focus:bg-white/5 focus:text-white uppercase px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/5">Français</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setLanguage("ar")} className="text-[9px] font-black tracking-widest cursor-pointer focus:bg-white/5 focus:text-white uppercase px-5 py-3 font-sans text-right hover:bg-white/5">العربية</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Currency Switcher */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors outline-none h-8">
                                <span>{currency} - {currency === 'QAR' ? t('currency.qar') : currency === 'USD' ? t('currency.usd') : currency === 'EUR' ? t('currency.eur') : t('currency.gbp')}</span>
                                <ChevronDown className="w-3 h-3 text-white/40" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[#181818] border-white/5 min-w-[160px] rounded-none shadow-2xl z-[200] text-white">
                                <DropdownMenuItem onClick={() => setCurrency("QAR")} className="text-[9px] font-black tracking-widest cursor-pointer focus:bg-white/5 focus:text-white uppercase px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/5">QAR - Rial</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setCurrency("USD")} className="text-[9px] font-black tracking-widest cursor-pointer focus:bg-white/5 focus:text-white uppercase px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/5">USD - Dollar</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setCurrency("EUR")} className="text-[9px] font-black tracking-widest cursor-pointer focus:bg-white/5 focus:text-white uppercase px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/5">EUR - Euro</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setCurrency("GBP")} className="text-[9px] font-black tracking-widest cursor-pointer focus:bg-white/5 focus:text-white uppercase px-5 py-3 hover:bg-white/5">GBP - Pound</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Main Header Container */}
            <div className={cn(
                "relative transition-all duration-700 ease-in-out border-b border-zinc-100",
                scrolled ? "py-2 shadow-2xl bg-white/80 backdrop-blur-3xl" : "py-3 lg:py-6 bg-white"
            )}>
                <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">

                    {/* LEFT: MINIMAL NAV / SIDEBAR TOGGLE */}
                    <div className="flex items-center gap-8 flex-1">
                        <button
                            className="group flex flex-col gap-1.5 focus:outline-none"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <div className="w-8 h-[1px] bg-black group-hover:w-10 transition-all duration-500" />
                            <div className="w-5 h-[1px] bg-black group-hover:w-10 transition-all duration-500" />
                        </button>

                        <div className="hidden lg:flex items-center gap-6">
                            <Link href="/shop" className="text-[10px] font-black tracking-[0.3em] uppercase hover:text-brand-burgundy transition-all">{t('nav.archive')}</Link>
                            <div className="w-px h-3 bg-zinc-200" />
                            <Link href="/shop?category=new-arrivals" className="text-[10px] font-black tracking-[0.3em] uppercase hover:text-brand-burgundy transition-all">{t('nav.editions')}</Link>
                        </div>
                    </div>

                    {/* CENTER: SPLIT LOGO BRANDING */}
                    <Branding />

                    {/* RIGHT: SEARCH + ACTIONS */}
                    <div className="flex items-center justify-end gap-0 lg:gap-6 flex-1">
                        {/* Search Overlay Toggle */}
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-1.5 lg:p-2 group flex items-center justify-center hover:scale-110 transition-transform duration-500"
                        >
                            <Search className="w-[16px] h-[16px] lg:w-[19px] lg:h-[19px] stroke-[1.5] text-zinc-400 group-hover:text-black transition-colors" />
                        </button>

                        <Link href="/wishlist" className="relative p-1.5 lg:p-2 group flex items-center justify-center">
                            <Heart className="w-[16px] h-[16px] lg:w-[19px] lg:h-[19px] stroke-[1.5] text-zinc-400 group-hover:text-brand-burgundy transition-colors duration-500" />
                            <span className="absolute top-1 right-1 w-1 lg:w-1.5 h-1 lg:h-1.5 bg-brand-burgundy rounded-full scale-0 group-hover:scale-100 transition-transform" />
                        </Link>

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-1.5 lg:p-2 group flex items-center justify-center outline-none"
                        >
                            <ShoppingBag className="w-[16px] h-[16px] lg:w-[19px] lg:h-[19px] stroke-[1.5] text-zinc-400 group-hover:text-black transition-colors duration-500" />
                            <span className="absolute top-0 right-0 bg-black text-white text-[6px] lg:text-[7px] font-black w-[12px] h-[12px] lg:w-[14px] lg:h-[14px] rounded-full flex items-center justify-center leading-none">
                                {itemCount}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* SIDE NAVIGATION DRAWER (Perfect x100) */}
            <div className={cn(
                "fixed inset-0 z-[200] transition-all duration-700 pointer-events-none",
                isMenuOpen ? "opacity-100" : "opacity-0 invisible"
            )}>
                <div
                    className="absolute inset-0 bg-black/80 backdrop-blur-3xl pointer-events-auto"
                    onClick={() => setIsMenuOpen(false)}
                />

                <div className={cn(
                    "absolute top-0 w-full lg:w-[450px] h-full bg-[#111111] text-white shadow-2xl flex flex-col transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] pointer-events-auto",
                    language === 'ar' ? "right-0" : "left-0",
                    isMenuOpen 
                        ? "translate-x-0" 
                        : (language === 'ar' ? "translate-x-full" : "-translate-x-full")
                )}>
                    {/* Drawer Header with Logo & Close */}
                    <div className={cn("p-8 lg:p-12 flex justify-between items-start", language === 'ar' && "flex-row-reverse")}>
                        <div className={cn("flex flex-col gap-4", language === 'ar' ? "items-end" : "items-start")}>
                            <Branding variant="luxury" light align="left" />
                            <span className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase">{t('nav.est')}</span>
                        </div>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 hover:rotate-90 group"
                        >
                            <X className="w-5 h-5 transition-transform" />
                        </button>
                    </div>

                    {/* Immersive Brand Statement */}
                    <div className="px-8 lg:px-12 mb-12">
                        <p className="text-[14px] lg:text-[16px] text-white/60 leading-[1.8] font-medium uppercase tracking-[0.15em] max-w-sm">
                            {settings?.aboutText || t('footer.about')}
                        </p>
                    </div>

                    {/* Social Quick Links */}
                    <div className="px-8 lg:px-12 flex gap-8 mb-16">
                        <SocialIcon icon={Instagram} href="#" />
                        <SocialIcon icon={Twitter} href="#" />
                        <SocialIcon icon={Phone} href="#" />
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 px-8 lg:px-12 overflow-y-auto no-scrollbar space-y-10 pb-12">
                        {/* Mobile Language/Currency Switchers */}
                        <div className="grid grid-cols-2 gap-4 pt-4 lg:hidden">
                            <div className="space-y-4">
                                <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase block">{t('nav.searchHeader')}</span>
                                <div className="flex flex-col gap-3">
                                    <button onClick={() => setLanguage("en")} className={cn("text-[11px] font-bold tracking-widest uppercase", language === 'ar' ? "text-right" : "text-left", language === 'en' ? "text-brand-burgundy" : "text-white/40")}>EN</button>
                                    <button onClick={() => setLanguage("fr")} className={cn("text-[11px] font-bold tracking-widest uppercase", language === 'ar' ? "text-right" : "text-left", language === 'fr' ? "text-brand-burgundy" : "text-white/40")}>FR</button>
                                    <button onClick={() => setLanguage("ar")} className={cn("text-[11px] font-bold tracking-widest uppercase", language === 'ar' ? "text-right" : "text-left", language === 'ar' ? "text-brand-burgundy" : "text-white/40")}>AR</button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <span className="text-[10px] font-black tracking-[0.4em] text-white/20 uppercase block">{currency}</span>
                                <div className="flex flex-col gap-3">
                                    <button onClick={() => setCurrency("QAR")} className={cn("text-[11px] font-bold tracking-widest uppercase", language === 'ar' ? "text-right" : "text-left", currency === 'QAR' ? "text-brand-burgundy" : "text-white/40")}>QAR</button>
                                    <button onClick={() => setCurrency("USD")} className={cn("text-[11px] font-bold tracking-widest uppercase", language === 'ar' ? "text-right" : "text-left", currency === 'USD' ? "text-brand-burgundy" : "text-white/40")}>USD</button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 pt-6 lg:pt-0">
                            <span className="text-[11px] font-black tracking-[0.4em] text-white/20 uppercase block mb-6">{t('nav.collections')}</span>
                            <div className="flex flex-col gap-6">
                                <MobileLink href="/shop?category=abayas" onClick={() => setIsMenuOpen(false)}>{t('cat.abayas')}</MobileLink>
                                <MobileLink href="/shop?category=dresses-jalabiyas" onClick={() => setIsMenuOpen(false)}>{t('cat.dresses')}</MobileLink>
                                <MobileLink href="/shop?category=men" onClick={() => setIsMenuOpen(false)}>{t('cat.men')}</MobileLink>
                                <MobileLink href="/shop?category=perfumes-oud" onClick={() => setIsMenuOpen(false)}>{t('cat.perfumes')}</MobileLink>
                                <MobileLink href="/shop?category=new-arrivals" onClick={() => setIsMenuOpen(false)}>
                                    <div className="flex items-center gap-3">
                                        <span>{t('nav.newArrivals')}</span>
                                        <div className="w-2 h-2 rounded-full bg-brand-burgundy animate-pulse" />
                                    </div>
                                </MobileLink>
                            </div>
                        </div>

                        <div className="space-y-2 pt-10 border-t border-white/5">
                            <span className="text-[11px] font-black tracking-[0.4em] text-white/20 uppercase block mb-6">{t('nav.boutique')}</span>
                            <div className="flex flex-col gap-5">
                                <MobileLinkSecondary href="/about" onClick={() => setIsMenuOpen(false)}>{t('nav.ourStory')}</MobileLinkSecondary>
                                <MobileLinkSecondary href="/contact" onClick={() => setIsMenuOpen(false)}>{t('nav.contactConcierge')}</MobileLinkSecondary>
                                <MobileLinkSecondary href="/shipping" onClick={() => setIsMenuOpen(false)}>{t('nav.shippingPolicy')}</MobileLinkSecondary>
                                {session?.user?.role === "ADMIN" && (
                                    <MobileLinkSecondary href="/admin" onClick={() => setIsMenuOpen(false)} className="text-brand-burgundy">{t('nav.adminDashboard')}</MobileLinkSecondary>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Footer / Copyright */}
                    <div className="p-8 lg:p-12 border-t border-white/5 bg-white/5 backdrop-blur-sm">
                        <div className="flex flex-col gap-2">
                            <p className="text-[9px] font-black tracking-[0.4em] text-white/20 uppercase">Local Bazar &copy; {new Date().getFullYear()}</p>
                            <p className="text-[8px] font-bold tracking-[0.2em] text-white/10 uppercase">{t('footer.crafted')}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Navigation Bar (Hidden to match Bianca Nera style) */}

            {isSearchOpen && <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </header>
    );
}

function MobileLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="text-[24px] font-serif font-medium tracking-tight text-white/90 hover:text-white hover:pl-2 transition-all duration-500 block uppercase"
        >
            {children}
        </Link>
    );
}

function MobileLinkSecondary({ href, onClick, children, className }: { href: string; onClick: () => void; children: React.ReactNode; className?: string }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "text-[12px] font-bold tracking-[0.3em] text-white/40 hover:text-white transition-all uppercase block",
                className
            )}
        >
            {children}
        </Link>
    );
}

function SocialIcon({ icon: Icon, href }: { icon: any; href: string }) {
    return (
        <a href={href} className="text-white/30 hover:text-white hover:scale-110 transition-all">
            <Icon className="w-5 h-5" strokeWidth={1.5} />
        </a>
    );
}
