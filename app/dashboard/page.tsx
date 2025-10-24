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
                            <ProductsChart />
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
                </div>
            </main>
        </div>
    );
}

export default Dashboard;