'use client'

import { Product } from "@/lib/types";
import { updateProduct } from "@/lib/actions/products";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/app/context/SidebarContext";
import { ProductUpdateSchema } from "@/lib/validators";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import toast from "react-hot-toast";
import Sidebar from "@/app/components/sidebar";
import z from "zod";

interface UpdateProductProps {
    product: Product
}

type ProductInput = z.input<typeof ProductUpdateSchema>
type ProductOutput = z.output<typeof ProductUpdateSchema>

const UpdateProduct = ({ product }: UpdateProductProps) => {
    console.log(product)
    const router = useRouter();
    const { isOpen } = useSidebar();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProductInput, any, ProductOutput>({
        resolver: zodResolver(ProductUpdateSchema),
        defaultValues: {
            name: product.name,
            price: Number(product.price),
            sku: product.sku || '',
            lowStockAt: product.lowStockAt,
        },
    });

    const handleSubmitForm: SubmitHandler<ProductOutput> = async (data) => {
        const res = await updateProduct(data);
        if (res.success) {
            toast.success(res.message);
            router.push("/inventory");
            reset();
        } else {
            toast.error(res.message);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/inventory" />
            <main className={`p-6 transition-all ease-in-out duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
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
                            <h1 className="text-2xl font-semibold text-gray-900">Update Product</h1>
                            <p className="text-sm text-gray-500 mt-1">Edit the product information below.</p>
                        </div>
                    </div>
                </div>
                <div className="max-w-xl">
                    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow" >
                        <form
                            className="space-y-6"
                            onSubmit={handleSubmit(handleSubmitForm)}
                        >
                            {/* Product Id */}
                            <input type="hidden" {...register('id')} value={product.id} />
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
                                    {...register('name')}
                                    className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 mb-1"
                                />
                                {errors.name && <span className="ml-1 text-sm text-red-500">{errors.name.message}</span>}
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
                                        step="0.01"
                                        {...register('price')}
                                        className="text-sm px-4 py-2 text-gray-700 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 mb-1"
                                    />
                                    {errors.price && <span className="ml-1 text-sm text-red-500">{errors.price.message}</span>}
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
                                        {...register('sku')}
                                        className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 mb-1"
                                    />
                                    {errors.sku && <span className="ml-1 text-sm text-red-500">{errors.sku.message}</span>}
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
                                    {...register('lowStockAt')}
                                    className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 mb-1"
                                />
                                {errors.lowStockAt && <span className="ml-1 text-sm text-red-500">{errors.lowStockAt.message}</span>}
                            </div>
                            {/* Submit and Cancel Buttons */}
                            <div className="flex flex-col md:flex-row items-center gap-3 mt-4">
                                <button
                                    type="submit"
                                    className="px-4 py-3 text-white rounded-md bg-violet-500 text-sm cursor-pointer w-full md:w-auto
                                    disabled:cursor-not-allowed disabled:bg-gray-400 focus:outline-violet-800"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Updating Product...' : 'Update Product'}
                                </button>
                                <Link
                                    href={`/inventory`}
                                    className="px-4 py-3 text-gray-900 rounded-md bg-gray-400/30 text-sm text-center cursor-pointer w-full md:w-auto focus:outline-gray-400"
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

export default UpdateProduct;