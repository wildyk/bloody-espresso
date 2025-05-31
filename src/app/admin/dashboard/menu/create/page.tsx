import Form from "@/app/ui/menu/createform";
import Breadcrumbs from "@/app/ui/menu/breadcrumbs";
import { fetchProduk } from "@/app/lib/data";

export default async function CreateInvoicePage() {
    const menu = await fetchProduk("");

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Menu", href: "/admin/dashboard/menu" },
                    { label: "Create Menu", href: "/admin/dashboard/menu/create", active: true },
                ]}
            />
            <Form menu={menu} />
        </main>
    );
}
