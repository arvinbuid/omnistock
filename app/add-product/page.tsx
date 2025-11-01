'use client'

import Sidebar from "../components/sidebar";
import Link from "next/link";
import toast from "react-hot-toast";
import { startTransition, useRef } from "react";
import { createProduct } from "@/lib/actions/products";
import { useRouter } from "next/navigation";

const AddProductPage = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const res = await createProduct(formData);

            if (res.success) {
                toast.success(res.message);
                formRef.current?.reset();
                router.push("/inventory");
            } else {
                toast.error(res.message);
            }
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/add-product" />

            <main className="ml-64 p-6">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Add Product</h1>
                            <p className="text-sm text-gray-500 mt-1">Add a new product into your inventory.</p>
                        </div>
                    </div>
                    <div className="max-w-xl">
                        <div className="bg-white p-6 border border-gray-200 rounded-lg shadow">
                            <form
                                ref={formRef}
                                className="space-y-6"
                                action={handleSubmit}
                            >
                                {/* Product Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Add a new product"
                                        className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                                        required
                                    />
                                </div>
                                {/* Price and Quantity */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="price"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            className="text-sm px-4 py-2 text-gray-700 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="quantity"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            className="text-sm px-4 py-2 text-gray-700 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Sku */}
                                <div>
                                    <label
                                        htmlFor="sku"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        SKU (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        id="sku"
                                        name="sku"
                                        placeholder="Enter SKU"
                                        className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                {/* Low Stock Threshold*/}
                                <div>
                                    <label
                                        htmlFor="lowStockAt"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Low Stock At (Optional)
                                    </label>
                                    <input
                                        type="number"
                                        id="lowStockAt"
                                        name="lowStockAt"
                                        placeholder="Enter low stock threshold"
                                        className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                                    />
                                </div>
                                {/* Submit and Cancel Buttons */}
                                <div className="flex items-center gap-3 mt-4">
                                    <button type="submit" className="px-4 py-3 text-white rounded-md bg-violet-500 text-sm cursor-pointer">
                                        Add Product
                                    </button>
                                    <Link
                                        href='/add-product'
                                        className="px-4 py-3 text-gray-900 rounded-md bg-gray-400/30 text-sm cursor-pointer"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AddProductPage;