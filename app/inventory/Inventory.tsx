'use client'

import { formatCurrency } from "@/lib/utils";
import { Decimal } from "@prisma/client/runtime/client";
import { useSidebar } from "../context/SidebarContext";
import Sidebar from "../components/sidebar";
import Pagination from "../components/pagination";
import ProductActions from "./ProductActions";
import StockAdjustment from "./StockAdjustment";
import Link from "next/link";

interface InventoryPageProps {
    items: {
        name: string;
        id: string;
        userId: string;
        sku: string | null;
        price: Decimal;
        quantity: number;
        lowStockAt: number | null;
        createdAt: Date;
        updatedAt: Date;
        status: string
    }[],
    totalPages: number,
    page: number,
    q: string,
    pageSize: number
}

const STATUS_STYLES = {
    'In Stock': 'bg-green-300 text-green-800',
    'Low Stock': 'bg-yellow-300 text-yellow-800',
    'Out of Stock': 'bg-red-300 text-red-800',
}

const BASE_STYLES = 'px-2 inline-flex text-xs leading-6 rounded-full uppercase font-semibold whitespace-nowrap'

const InventoryPage = ({ items, totalPages, page, q, pageSize }: InventoryPageProps) => {
    const { isOpen } = useSidebar();
    return (
        <div className="min-h-screen bg-gray-50 relative">
            <Sidebar currentPath="/inventory" />
            <main className={`p-6 transition-all ease-in-out duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
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
                            className="flex flex-col md:flex-row items-center gap-3 justify-between"
                            action='/inventory'
                        >
                            <input
                                type="text"
                                name="q"
                                placeholder="Search products..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-gray-400 text-gray-800 flex-1 text-sm"
                            />
                            <button type="submit" className='w-full md:w-auto px-4 py-3.5 text-white bg-violet-700 rounded-md uppercase text-xs cursor-pointer hover:bg-violet-800 transition-colors focus:outline-violet-800'>Search</button>
                        </form>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
                        {items.length > 0 ? (
                            <table className="w-full">
                                <thead className="border-b border-gray-200">
                                    <tr className="font-mono">
                                        <th className="px-6 py-3 text-left uppercase font-medium text-gray-500 text-xs">Name</th>
                                        <th className="px-6 py-3 text-left uppercase font-medium text-gray-500 text-xs">Status</th>
                                        <th className="px-6 py-3 text-left uppercase font-medium text-gray-500 text-xs">Sku</th>
                                        <th className="px-6 py-3 text-left uppercase font-medium text-gray-500 text-xs">Price</th>
                                        <th className="px-6 py-3 text-left uppercase font-medium text-gray-500 text-xs">Quantity</th>
                                        <th className="px-6 py-3 text-left uppercase font-medium text-gray-500 text-xs whitespace-nowrap">Low Stock At</th>
                                        <th className="px-6 py-3 text-left uppercase font-medium text-gray-500 text-xs">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200'>
                                    {items.map((product, index) => (
                                        <tr key={index} className="even:bg-gray-100 odd:bg-white">
                                            <td className="px-6 py-3 text-sm text-gray-800 whitespace-nowrap">
                                                <Link href={`/inventory/${product.id}`}>
                                                    {product.name}
                                                </Link>
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-center">
                                                    <span className={`${BASE_STYLES} ${STATUS_STYLES[product.status as keyof typeof STATUS_STYLES]}`}>
                                                        {product.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-sm text-gray-800">{product.sku || '-'}</td>
                                            <td className="px-6 py-3 text-sm text-gray-800">{formatCurrency(Number(product.price))}</td>
                                            <td className="px-6 py-3 text-sm text-gray-800">{product.quantity}</td>
                                            <td className="px-6 py-3 text-sm text-gray-800">{product.lowStockAt || '-'}</td>
                                            <td className="px-6 py-3 text-sm text-gray-800">
                                                <div className="flex items-center gap-2">
                                                    <ProductActions productId={product.id} />
                                                    <StockAdjustment productId={product.id} name={product.name} quantity={product.quantity} />
                                                </div>
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

export default InventoryPage;