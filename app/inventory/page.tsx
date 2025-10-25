import { prisma } from "@/lib/client";
import { getCurrentUser } from "@/lib/auth";
import { TrashIcon } from "lucide-react";
import Sidebar from "../components/sidebar";

const Inventory = async () => {
    const user = await getCurrentUser();
    const userId = user.id;
    const allProducts = await prisma.product.findMany({ where: { userId } })
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

                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                                {allProducts.map((product, index) => (
                                    <tr key={index} className="even:bg-gray-100 odd:bg-white">
                                        <td className="px-6 py-3 text-sm text-gray-800">{product.name}</td>
                                        <td className="px-6 py-3 text-sm text-gray-800">{product.sku || '-'}</td>
                                        <td className="px-6 py-3 text-sm text-gray-800">₱{Number(product.price).toFixed(2)}</td>
                                        <td className="px-6 py-3 text-sm text-gray-800">{product.quantity}</td>
                                        <td className="px-6 py-3 text-sm text-gray-800">{product.lowStockAt || '-'}</td>
                                        <td className="px-6 py-3 text-sm text-gray-800">
                                            <form>
                                                <input type="hidden" name="id" value={product.id}></input>
                                                <button className="p-2 rounded-md bg-red-600 text-white cursor-pointer">
                                                    <TrashIcon className="w-3.5 h-3.5 font-bold" />
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Inventory;