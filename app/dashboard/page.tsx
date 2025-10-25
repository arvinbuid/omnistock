import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { TrendingUp } from "lucide-react";
import Sidebar from "../components/sidebar";
import ProductsChart from "../components/products-chart";

const Dashboard = async () => {
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
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/dashboard" />

            <main className="ml-64 p-6">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                            <p className="text-sm text-gray-500 mt-1">Welcome back! Here is an overview of your inventory.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Key Metrics */}
                    <div className="p-6 border border-gray-200 bg-white shadow rounded-lg font-mono">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Metrics</h2>
                        <div className="grid grid-cols-3 gap-6">
                            {/* Total Products */}
                            <div className="text-center">
                                <h1 className="text-2xl font-bold">{totalProducts}</h1>
                                <p className="text-sm">Total Products</p>
                                <div className="flex items-center justify-center gap-1 text-sm text-green-600">
                                    <span>+{totalProducts}</span>
                                    <TrendingUp className="w-3 h-3" />
                                </div>
                            </div>
                            {/* Total Value */}
                            <div className="text-center">
                                <h1 className="text-2xl font-bold"><span className="text-lg">₱</span>{Number(totalValue).toFixed(0)}</h1>
                                <p className="text-sm">Total Value</p>
                                <div className="flex items-center justify-center gap-1 text-sm text-green-600">
                                    <span>+{Number(totalValue).toFixed(0)}</span>
                                    <TrendingUp className="w-3 h-3" />
                                </div>
                            </div>
                            {/* Low Stock */}
                            <div className="text-center">
                                <h1 className="text-2xl font-bold">{lowStock}</h1>
                                <p className="text-sm">Low Stock</p>
                                <div className="flex items-center justify-center gap-1 text-sm text-green-600">
                                    <span>+{lowStock}</span>
                                    <TrendingUp className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* New Products per Week */}
                    <div className="p-6 border border-gray-200 shadow bg-white rounded-lg font-mono">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">New Products per week</h2>
                        <div className="h-48">
                            <ProductsChart data={weeklyProductsData} />
                        </div>
                    </div>
                </div>

                {/* Stock Value */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="p-6 border border-gray-200 bg-white shadow rounded-lg font-mono">
                        <h2 className="text-xl font-semibold mb-6">Stock Levels</h2>
                        <div className="space-y-4">
                            {recent.map((product, index) => {
                                // Stock level is 0, 1, 2 
                                const stockLevel = product.quantity === 0 ? 0 : product.quantity <= (product.lowStockAt || 5) ? 1 : 2;
                                const bgColors = ['bg-red-600', 'bg-yellow-600', 'bg-green-600'];
                                const textColors = ['text-red-600', 'text-yellow-600', 'text-green-600'];
                                return (
                                    <div key={index}
                                        className="flex items-center justify-between p-5 bg-gray-200/50 rounded-lg text-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`} />
                                            <span>{product.name}</span>
                                        </div>
                                        <p className={`${textColors[stockLevel]}`}>{product.quantity} units</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Efficiency */}
                    <div className="p-6 border border-gray-200 bg-white shadow rounded-lg font-mono">
                        <h2 className="text-xl font-semibold mb-6">Efficiency</h2>
                        <div className="flex items-center justify-center">
                            <div className="relative w-48 h-48">
                                <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                                <div
                                    className="absolute inset-0 rounded-full border-8 border-purple-600"
                                    style={{ clipPath: "polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 50%)" }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <p className=" text-2xl text-gray-900 font-bold">{inStockPercentage}%</p>
                                        <p className="text-md text-gray-600">In Stock</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Labels */}
                        <div className="flex flex-col mt-8">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-purple-300" />
                                    <span className="text-sm text-gray-900">In Stock ({inStockPercentage})%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-purple-600" />
                                    <span className="text-sm text-gray-900">Low Stock ({lowStockPercentage})%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-gray-300" />
                                    <span className="text-sm text-gray-900">Out of Stock ({outOfStockPercentage})%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;