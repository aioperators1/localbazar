"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Twitter, Truck, ShieldCheck, CreditCard, Headphones, MapPin, Phone, Mail } from "lucide-react";
import { Branding } from "@/components/store/Branding";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

export function Footer({ settings }: { settings?: any }) {
    const pathname = usePathname();
    const { t, language } = useLanguage();
    const isAr = language === 'ar';

    if (pathname.startsWith("/admin")) return null;

    return (
        <footer className="bg-[#111111] text-white pt-24 pb-12" dir={isAr ? "rtl" : "ltr"}>
            <div className="container mx-auto px-4 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
                    {/* Brand & Concept */}
                    <div className="space-y-10 lg:col-span-1">
                        <div className="bg-white/5 p-8 rounded-[1px] border-l border-brand-burgundy/30">
                            <Branding variant="luxury" light align="left" />
                        </div>
                        <span className="text-white/30 font-black text-[9px] tracking-[0.5em] uppercase mt-4">
                            {t('nav.est')}
                        </span>
                        <p className={cn(
                            "text-[12px] text-white/50 leading-[2] font-medium max-w-xs uppercase tracking-widest bg-white/5 p-6",
                            isAr ? "border-r-2 border-brand-burgundy text-right" : "border-l-2 border-brand-burgundy text-left"
                        )}>
                            {settings?.aboutText || t('footer.about')}
                        </p>
                        <div className="flex gap-8 pt-4">
                            <SocialIcon icon={Instagram} href="#" />
                            <SocialIcon icon={Twitter} href="#" />
                            <SocialIcon icon={Phone} href="#" />
                        </div>
                    </div>

                    {/* Collections */}
                    <div>
                        <h4 className="text-white font-bold text-[11px] uppercase mb-8 tracking-[0.2em]">{t('nav.collections')}</h4>
                        <ul className="space-y-4">
                            <FooterLink href="/shop?category=abayas">{t('cat.abayas')}</FooterLink>
                            <FooterLink href="/shop?category=jalabiyas">{t('cat.dresses')}</FooterLink>
                            <FooterLink href="/shop?category=men">{t('cat.men')}</FooterLink>
                            <FooterLink href="/shop?category=perfumes">{t('cat.perfumes')}</FooterLink>
                            <FooterLink href="/shop?category=new-arrivals">{t('nav.newArrivals')}</FooterLink>
                        </ul>
                    </div>

                    {/* Boutique */}
                    <div>
                        <h4 className="text-white font-bold text-[11px] uppercase mb-8 tracking-[0.2em]">{t('footer.company')}</h4>
                        <ul className="space-y-4">
                            <FooterLink href="/about">{t('nav.ourStory')}</FooterLink>
                            <FooterLink href="/contact">{t('footer.contact')}</FooterLink>
                            <FooterLink href="/shipping">{t('nav.shippingPolicy')}</FooterLink>
                            <FooterLink href="/terms">{t('footer.terms')}</FooterLink>
                            <FooterLink href="/privacy">{t('footer.privacy')}</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-8">
                        <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em]">{t('footer.newsletter')}</h4>
                        <p className="text-[11px] text-white/50 leading-relaxed font-medium uppercase tracking-widest">
                            {t('footer.newsletterDesc')}
                        </p>
                        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder={t('footer.emailPlaceholder')}
                                className="bg-transparent border-b border-white/20 text-[10px] py-3 outline-none focus:border-white transition-colors font-medium tracking-widest text-white placeholder:text-white/30"
                            />
                            <button className="text-white text-[10px] font-bold uppercase py-4 border border-white/20 hover:bg-white hover:text-black transition-all tracking-[0.3em]">
                                {t('footer.subscribeButton')}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] text-white/30 font-medium uppercase tracking-[0.3em]">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <p>&copy; {new Date().getFullYear()} {settings?.siteName || "LOCAL BAZAR"}. {t('footer.rights')}</p>
                        <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            <span>{settings?.contactPhone || "+974 5055 8884"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            <span className="uppercase">{settings?.contactEmail || "LOCALBAZAR.QTR@GMAIL.COM"}</span>
                        </div>
                    </div>
                    <div className="flex gap-8 items-center text-white/20">
                        <CreditCard className="w-4 h-4" />
                        <Truck className="w-4 h-4" />
                        <ShieldCheck className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </footer>
    );
}

const TRUST_ITEMS = [
    { icon: Truck, title: "FAST DELIVERY", desc: "Across Qatar" },
    { icon: ShieldCheck, title: "OFFICIAL WARRANTY", desc: "100% Authentic Products" },
    { icon: CreditCard, title: "SECURE PAYMENT", desc: "Card or Cash on Delivery" },
    { icon: Headphones, title: "24/7 SUPPORT", desc: "Expert Customer Assistance" },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="text-white/50 hover:text-white text-[11px] font-medium uppercase tracking-widest transition-colors">
                {children}
            </Link>
        </li>
    );
}

function SocialIcon({ icon: Icon, href }: { icon: any; href: string }) {
    return (
        <a href={href} className="text-white/40 hover:text-white transition-colors">
            <Icon className="w-5 h-5" />
        </a>
    );
}
