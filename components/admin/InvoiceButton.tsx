"use client";

import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateInvoice } from "@/lib/utils/invoice";

interface InvoiceButtonProps {
    order: any;
    settings: any;
}

export function InvoiceButton({ order, settings }: InvoiceButtonProps) {
    return (
        <Button 
            onClick={() => generateInvoice(order, settings)}
            variant="outline" 
            className="flex items-center gap-2 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl h-12 uppercase font-black text-[11px] tracking-widest px-6"
        >
            <FileDown className="w-4 h-4 text-[#592C2F]" />
            Download Invoice PDF
        </Button>
    );
}
