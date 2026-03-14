"use server";

import { prisma } from "@/lib/prisma";

export async function validateVoucher(code: string) {
    try {
        const voucher = await prisma.voucher.findUnique({
            where: { 
                code: code.toUpperCase(),
                active: true
            }
        });

        if (!voucher) {
            return { success: false, error: "Invalid voucher code" };
        }

        // Check expiry
        if (voucher.expiryDate && new Date() > voucher.expiryDate) {
            return { success: false, error: "Voucher has expired" };
        }

        // Check usage limit
        if (voucher.usageLimit > 0 && voucher.usedCount >= voucher.usageLimit) {
            return { success: false, error: "Voucher limit reached" };
        }

        return { 
            success: true, 
            voucher: {
                id: voucher.id,
                code: voucher.code,
                type: voucher.type,
                value: Number(voucher.value)
            } 
        };
    } catch (error) {
        console.error("Validate Voucher Error:", error);
        return { success: false, error: "Something went wrong" };
    }
}
