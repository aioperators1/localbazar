import { getAdminVouchers } from "@/lib/actions/admin";
import VouchersClient from "./VouchersClient";

export default async function AdminVouchersPage() {
    const vouchers = await getAdminVouchers();

    return (
        <div className="p-8">
            <VouchersClient initialVouchers={vouchers} />
        </div>
    );
}
