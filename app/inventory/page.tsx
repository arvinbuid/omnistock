import { prisma } from "@/lib/client";
import { getCurrentUser } from "@/lib/auth";
import Sidebar from "../components/sidebar";
import Pagination from "../components/pagination";
import DeleteProduct from "./DeleteProduct";

const Inventory = async ({ searchParams }: {
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
        })
    ])

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/inventory" />
            <main className="ml-64 p-6">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage your products and track inventories.</p>
                        </div>
                    </div>
                </div>

                {/* Search Input and Product Table */}
                <div className="space-y-6">
                    {/* Search Input */}
                    <div className="bg-white w-full p-4 rounded-lg shadow border border-gray-200">
                        <form
                            className="flex items-center gap-3 justify-between"
                            action='/inventory'
                        >
                            <input
                                type="text"
                                name="q"
                                placeholder="Search products..."
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-gray-400 text-gray-400 flex-1 text-sm"
                            />
                            <button type="submit" className='px-4 py-3.5 text-white bg-violet-700 rounded-md uppercase text-xs cursor-pointer hover:bg-violet-800 transition-colors focus:outline-violet-800'>Search</button>
                        </form>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        {items.length > 0 ? (
                            <table className="w-full">
                                <thead className="border-b border-gray-200">
                                    <tr className="font-mono">
                                        <th className="px-6 py-3 text-left uppercase font-medium text-gray-500 text-xs">Name</th>
                                        <th className="px-6 py-3 text-left uppercase font-medium text-gray-500 text-xs">Sku</th>
                                        <th className="px-6 py-3 text-left uppercase font-medium text-gray-500 text-xs">Price</th>
                                        <th className="px-6 py-3 text-left uppercase font-medium text-gray-500 text-xs">Quantity</th>
                                        <th className="px-6 py-3 text-left uppercase font-medium text-gray-500 text-xs">Low Stock At</th>
                                        <th className="px-6 py-3 text-left uppercase font-medium text-gray-500 text-xs">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {items.map((product, index) => (
                                        <tr key={index} className="even:bg-gray-100 odd:bg-white">
                                            <td className="px-6 py-3 text-sm text-gray-800">{product.name}</td>
                                            <td className="px-6 py-3 text-sm text-gray-800">{product.sku || '-'}</td>
                                            <td className="px-6 py-3 text-sm text-gray-800">₱{Number(product.price).toFixed(2)}</td>
                                            <td className="px-6 py-3 text-sm text-gray-800">{product.quantity}</td>
                                            <td className="px-6 py-3 text-sm text-gray-800">{product.lowStockAt || '-'}</td>
                                            <td className="px-6 py-3 text-sm text-gray-800">
                                                <DeleteProduct productId={product.id} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-4">
                                <p className="text-gray-500 text-sm">No products found.</p>
                            </div>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="p-6 rounded-lg border border-gray-200">
                            <Pagination currentPage={page} totalPages={pageSize} baseUrl='/inventory' searchParams={{
                                q,
                                pageSize: String(pageSize)
                            }} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Inventory;