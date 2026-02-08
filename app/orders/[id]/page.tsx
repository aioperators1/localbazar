import { notFound } from "next/navigation";
import OrderTrackingClient from "./OrderTrackingClient";
import { getOrderById } from "@/lib/actions/orders";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Handle potential URL decoding and stripping of hash if somehow still passed
    const cleanId = decodeURIComponent(id).replace('#', '').trim();

    const { order, error } = await getOrderById(cleanId);

    if (error || !order) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-20">
            <OrderTrackingClient order={order} />
        </div>
    );
}
