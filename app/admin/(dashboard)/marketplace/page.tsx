import { Store, ShieldCheck, Clock, Users, Globe, BarChart3, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function MarketplacePage() {
    return (
        <div className="space-y-12 pb-20">
            {/* Hero Header */}
            <div className="relative h-[300px] w-full rounded-[24px] overflow-hidden bg-[#111] group">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900 to-transparent z-10" />
                <div className="absolute inset-0 opacity-20 pointer-events-none grain z-20" />
                
                <div className="relative z-30 h-full flex flex-col justify-center px-12 max-w-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                            <Sparkles className="w-5 h-5 text-brand-burgundy" />
                        </div>
                        <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">Global Extension</span>
                    </div>
                    <h1 className="text-4xl font-serif font-black text-white italic tracking-tight mb-4 leading-tight">
                        Conciergerie <br />
                        <span className="text-[#E2D8C5] not-italic">Marketplace Portal</span>
                    </h1>
                    <p className="text-zinc-400 text-[13px] leading-relaxed font-medium">
                        Elevating connectivity. The next evolution of Local Bazar allows curated international vendors to showcase prestige collections under our signature seal.
                    </p>
                </div>

                <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden opacity-30 grayscale hover:grayscale-0 transition-all duration-1000">
                    <img 
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070" 
                        alt="Marketplace Preview" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Feature Teasers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        title: "Vendor Ecosystem",
                        desc: "Automated onboarding for luxury houses with signature validation protocols.",
                        icon: Users,
                        color: "bg-blue-50/5 text-blue-500"
                    },
                    {
                        title: "Global Distribution",
                        desc: "Seamless cross-border management with real-time currency conversion and VAT handling.",
                        icon: Globe,
                        color: "bg-emerald-50/5 text-emerald-500"
                    },
                    {
                        title: "Commission Logic",
                        desc: "Advanced multi-tier commission engine with automated designer payouts.",
                        icon: BarChart3,
                        color: "bg-brand-burgundy/10 text-brand-burgundy"
                    }
                ].map((feature, i) => (
                    <Card key={i} className="bg-white border-[#E3E3E3] rounded-[20px] shadow-sm hover:shadow-xl hover:border-brand-burgundy/20 transition-all duration-500 overflow-hidden group">
                        <CardContent className="p-8">
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-zinc-100 group-hover:scale-110 transition-transform duration-500", feature.color)}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-[#111] mb-3">{feature.title}</h3>
                            <p className="text-[13px] text-zinc-500 leading-relaxed font-medium">{feature.desc}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Status Callout */}
            <Card className="bg-[#111] border-white/5 rounded-[24px] overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 right-0 p-8">
                    <Clock className="w-12 h-12 text-white/5" />
                </div>
                <CardContent className="p-12 flex flex-col items-center text-center">
                    <h2 className="text-white font-serif text-2xl mb-4 italic">Deployment Phase: <span className="text-brand-burgundy not-italic font-black uppercase tracking-widest ml-2">Alpha 2.0</span></h2>
                    <p className="text-zinc-500 text-[14px] max-w-lg mb-8 leading-relaxed">
                        Our engineering team is currently finalizing the multi-tenant architecture and secure payment escrow system. Access will be granted to signature partners in Q3 2026.
                    </p>
                    <div className="flex gap-4">
                        <Button asChild className="bg-white text-black hover:bg-zinc-200 h-12 px-8 rounded-xl font-bold text-[12px] uppercase tracking-widest">
                            <Link href="/admin">Return to Command Center</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
