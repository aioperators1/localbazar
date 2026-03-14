"use client";

export default function GlobalLoading() {
    return (
        <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
            {/* Minimal Luxury Loader */}
            <div className="relative mb-8">
                <div className="flex items-center gap-4 animate-pulse">
                    <span className="text-[26px] font-serif font-light tracking-[-0.02em] text-black italic">LOCAL</span>
                    <div className="w-[1px] h-7 bg-zinc-200 rotate-[20deg]" />
                    <span className="text-[26px] font-serif font-bold tracking-[-0.02em] text-[#8b1d31]">BAZAR</span>
                </div>
                <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-zinc-100 overflow-hidden">
                    <div className="h-full bg-[#111111] animate-loading-bar" />
                </div>
            </div>
            
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 animate-pulse">
                Preparing Experience
            </p>

            <style jsx>{`
                @keyframes loading-bar {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-loading-bar {
                    animation: loading-bar 1.5s infinite ease-in-out;
                    width: 50%;
                }
            `}</style>
        </div>
    );
}
