'use client'

import { Product } from "@/lib/types";
import { updateProduct } from "@/lib/actions/products";
import { startTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

interface UpdateProductProps {
    product: Product
}

const UpdateProduct = ({ product }: UpdateProductProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const handleUpdateForm = (formData: FormData) => {
        startTransition(async () => {
            const res = await updateProduct(formData);

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
        <form ref={formRef} className="space-y-6" action={handleUpdateForm}>
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
            {/* Price ^ Sku */}
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
                        step="0.01"
                        defaultValue={Number(product.price)}
                        className="text-sm px-4 py-2 text-gray-700 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400"
                        required
                    />
                </div>
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
                    href={`/inventory`}
                    className="px-4 py-3 text-gray-900 rounded-md bg-gray-400/30 text-sm cursor-pointer"
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
}

export default UpdateProduct;