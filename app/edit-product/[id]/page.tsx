import Sidebar from "@/app/components/sidebar";
import Link from "next/link";
import { getProductById, updateProduct } from "@/lib/actions/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Update Product'
}

const EditProduct = async (props: {
    params: Promise<{
        id: string
    }>
}) => {
    const { id } = await props.params;
    const product = await getProductById(id);
    if (!product) notFound();
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/inventory" />
            <main className="ml-64 p-6">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Update Product</h1>
                            <p className="text-sm text-gray-500 mt-1">Edit the product information below.</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-xl">
                    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow" >
                        <form className="space-y-6" action={updateProduct}>
                            {/* Product Id */}
                            <input type="hidden" name="id" value={product.id} />
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
                                    defaultValue={product.name}
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
                                        defaultValue={Number(product.price)}
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
                                        defaultValue={product.quantity}
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
                                    defaultValue={product.sku || ''}
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
                                    defaultValue={product.lowStockAt || 0}
                                    className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                                />
                            </div>
                            {/* Submit and Cancel Buttons */}
                            <div className="flex items-center gap-3 mt-4">
                                <button type="submit" className="px-4 py-3 text-white rounded-md bg-violet-500 text-sm cursor-pointer">
                                    Update Product
                                </button>
                                <Link
                                    href={`/edit-product/${id}`}
                                    className="px-4 py-3 text-gray-900 rounded-md bg-gray-400/30 text-sm cursor-pointer"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default EditProduct;