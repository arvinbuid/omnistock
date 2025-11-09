'use client'

import { useSidebar } from "@/app/context/SidebarContext";
import { Product } from "@/lib/types";
import Sidebar from "@/app/components/sidebar";
import Link from "next/link";

type ProductWithStockMovement = Product & {
    stockMovement: Array<{
        id: string;
        productId: string;
        quantityChange: number;
        type: string;
        reason: string;
        stockBefore: number;
        stockAfter: number;
        userId: string;
        createdAt: Date;
    }>
}

interface ProductDetailsProps {
    product: ProductWithStockMovement
}

const ProductDetailsPage = ({ product }: ProductDetailsProps) => {
    const { isOpen } = useSidebar()
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/inventory" />

            <main className={`p-6 transition-all ease-in-out duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
                {/* Header */}
                <div className="mb-8">
                    {/* Back Button */}
                    <Link
                        href="/inventory"
                        className="text-sm text-blue-600 cursor-pointer"
                    >
                        &larr; Back
                    </Link>

                    <div className="flex items-center justify-between mt-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Audit Logs</h1>
                            <p className="text-sm text-gray-500 mt-1">Here are the audit logs for the product&apos;s stock movement.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr className="font-mono">
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Date & Time</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Stock Before</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Stock After</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Reason</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {product.stockMovement.map((movement) => (
                                <tr key={movement.id}>
                                    {/* Date & Time */}
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                        {new Date(movement.createdAt).toLocaleString()}
                                    </td>
                                    {/* Type (Badge) */}
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                        <span className={`px-2 inline-flex text-xs leading-6 font-semibold rounded-full 
                                                ${movement.type === 'RECEIVE' ? 'bg-green-100 text-green-800' :
                                                movement.type === 'ISSUE' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}
                                        >
                                            {movement.type}
                                        </span>
                                    </td>
                                    {/* Change */}
                                    <td className={`px-4 py-3 whitespace-nowrap text-sm ${movement.quantityChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {movement.quantityChange}
                                    </td>
                                    {/* Stock Before */}
                                    <td className={`px-4 py-3 whitespace-nowrap text-sm ${movement.quantityChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {movement.stockBefore}
                                    </td>
                                    {/* Stock After */}
                                    <td className={`px-4 py-3 whitespace-nowrap text-sm ${movement.quantityChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {movement.stockAfter}
                                    </td>
                                    {/* Reason */}
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                        {movement.reason}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {product.stockMovement.length <= 0 && (
                        <div className="px-6 py-4">
                            <p className="text-sm text-gray-700">No audit logs available.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default ProductDetailsPage
