import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { Metadata } from "next";
import DashboardPage from "./Dashboard";
import { convertToPlainObject } from "@/lib/utils";

export const metadata: Metadata = {
    title: 'Omnistock | Dashboard'
}

const DashboardWrapper = async () => {
    // Get the current user
    const user = await getCurrentUser();
    const userId = user.id;

    // Return a single promise of queries
    const [totalProducts, lowStock, allProducts] = await Promise.all([
        await prisma.product.count({ where: { userId } }),
        await prisma.product.count({
            where: {
                userId,
                lowStockAt: { not: null },
                quantity: { lte: 5 }
            },
        }),
        await prisma.product.findMany({
            where: { userId },
            select: { price: true, quantity: true, createdAt: true }
        })
    ])

    const totalValue = allProducts.reduce((sum, product) => sum + Number(product.price) * product.quantity, 0);
    const recent = await prisma.product.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5
    });

    // Display new products in the last 12 weeks
    const weeklyProductsData = [];
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - i * 7);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const weekLabels = `${String(weekStart.getMonth() + 1).padStart(2, '0')} / ${String(weekStart.getDate() + 1).padStart(2, '0')}`
        const weekProducts = allProducts.filter((product) => {
            const productDate = new Date(product.createdAt);
            return productDate >= weekStart && productDate <= weekEnd;
        })

        // labels to show in the graph on the x & y axis
        weeklyProductsData.push({
            week: weekLabels,
            products: weekProducts.length
        })
    }

    // Stock calculations
    const inStockCount = allProducts.filter((product) => Number(product.quantity) > 5).length;
    const lowStockCount = allProducts.filter((product) => Number(product.quantity) <= 5 && Number(product.quantity) >= 1).length;
    const outOfStockCount = allProducts.filter((product) => Number(product.quantity) === 0).length;

    // Percentages
    const inStockPercentage = totalProducts > 0 ? Math.floor((inStockCount / totalProducts) * 100) : 0;
    const lowStockPercentage = totalProducts > 0 ? Math.floor((lowStockCount / totalProducts) * 100) : 0;
    const outOfStockPercentage = totalProducts > 0 ? Math.floor((outOfStockCount / totalProducts) * 100) : 0;

    return (
        <DashboardPage
            totalProducts={totalProducts}
            totalValue={totalValue}
            lowStock={lowStock}
            weeklyProductsData={weeklyProductsData}
            recent={convertToPlainObject(recent)}
            inStockPercentage={inStockPercentage}
            lowStockPercentage={lowStockPercentage}
            outOfStockPercentage={outOfStockPercentage}
        />
    );
}

export default DashboardWrapper;