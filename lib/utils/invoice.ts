"use client";

import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateInvoice = (order: any, settings: any) => {
    const doc = new jsPDF();
    const isAr = false; // Simplified for now, Arabic requires font embedding

    // 1. Branding
    doc.setFillColor(24, 24, 24);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.text("LOCAL BAZAR", 20, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("LUXURY & HERITAGE PORTAL", 20, 32);

    // 2. Invoice Info
    doc.setTextColor(24, 24, 24);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 140, 60);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`Invoice #:`, 140, 70);
    doc.setFont("helvetica", "normal");
    doc.text(`${order.id.slice(-8).toUpperCase()}`, 170, 70);
    
    doc.setFont("helvetica", "bold");
    doc.text(`Date:`, 140, 75);
    doc.setFont("helvetica", "normal");
    doc.text(`${new Date(order.createdAt).toLocaleDateString()}`, 170, 75);

    // 3. Billing Details
    doc.setFont("helvetica", "bold");
    doc.text("BILL TO:", 20, 60);
    doc.setFont("helvetica", "normal");
    doc.text(`${order.user?.name || "Guest Customer"}`, 20, 67);
    doc.text(`${order.user?.email || ""}`, 20, 72);
    
    if (order.user?.addresses?.[0]) {
        const addr = order.user.addresses[0];
        doc.text(`${addr.street}`, 20, 77);
        doc.text(`${addr.city}, ${addr.zip}`, 20, 82);
        doc.text(`${addr.country}`, 20, 87);
    }

    // 4. Items Table
    const tableData = order.items.map((item: any) => [
        item.product.name,
        item.quantity,
        `QAR ${Number(item.price).toFixed(2)}`,
        `QAR ${(item.quantity * Number(item.price)).toFixed(2)}`
    ]);

    (doc as any).autoTable({
        startY: 100,
        head: [['Product', 'Qty', 'Unit Price', 'Total']],
        body: tableData,
        headStyles: { fillColor: [89, 44, 47], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [249, 249, 249] },
        margin: { left: 20, right: 20 },
    });

    // 5. Totals
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    
    doc.setFont("helvetica", "bold");
    doc.text("Total Amount:", 140, finalY);
    doc.setFontSize(14);
    doc.text(`QAR ${Number(order.total).toFixed(2)}`, 140, finalY + 7);

    // 6. Footer Information
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for choosing Local Bazar. We appreciate your business.", 20, 280);
    doc.text(`${settings?.contactPhone || "+974 5055 8884"} | ${settings?.contactEmail || "localbazar.qtr@gmail.com"}`, 20, 285);

    doc.save(`invoice-${order.id.slice(-8)}.pdf`);
};
