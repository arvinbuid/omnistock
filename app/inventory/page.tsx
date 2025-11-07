import { prisma } from "@/lib/client";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";
import { convertToPlainObject } from "@/lib/utils";
import InventoryPage from "./Inventory";

export const metadata: Metadata = {
    title: 'Omnistock | Inventory'
}

const InventoryWrapper = async ({ searchParams }: {
    searchParams: Promise<{
        q?: string,
        page?: string
    }>
}) => {
    const params = await searchParams;
    const q = (params.q || '').trim();
    const user = await getCurrentUser();
    const userId = user.id;

    // pagination
    const page = Math.max(1, Number(params.page ?? 1)) // default to page 1
    const pageSize = 5;

    // db queries
    const [totalCount, items] = await Promise.all([
        prisma.product.count({ where: { userId, name: { contains: q, mode: 'insensitive' } } }),
        prisma.product.findMany({
            where: { userId, name: { contains: q, mode: 'insensitive' } },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        }),
    ])

    // product status
    type Status = 'Low Stock' | 'In Stock' | 'Out of Stock';

    const getProductStatus = (quantity: number, lowStockAt: number | null): Status => {
        if (quantity <= 0) return 'Out of Stock'
        const threshold = lowStockAt ?? 0;
        if (quantity <= threshold) return 'Low Stock'
        return 'In Stock'
    }

    const itemsWithStatus = items.map((item) => ({
        ...item,
        status: getProductStatus(item.quantity, item.lowStockAt)
    }))

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    return (
        <InventoryPage items={convertToPlainObject(itemsWithStatus)} totalPages={totalPages} page={page} q={q} pageSize={pageSize} />
    );
}

export default InventoryWrapper;