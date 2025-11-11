'use client'

import { createProduct } from "@/lib/actions/products";
import { useRouter } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import Sidebar from "../components/sidebar";
import Link from "next/link";
import toast from "react-hot-toast";
import z from "zod";

type ProductInput = z.input<typeof ProductSchema>;
type FormOutput = z.output<typeof ProductSchema>;

const AddProductForm = () => {
    const router = useRouter();
    const { isOpen } = useSidebar();

    // 
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ProductInput, any, FormOutput>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "",
            price: 0,
            quantity: 0,
            sku: "",
            lowStockAt: 0,
        },
    });

    const handleFormSubmit: SubmitHandler<FormOutput> = async (data) => {
        const res = await createProduct(data);
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
            <Sidebar currentPath="/add-product" />

            <main className={`p-6 transition-all ease-in-out duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
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
                                className="space-y-4"
                                onSubmit={handleSubmit(handleFormSubmit)}
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
                                        {...register('name')}
                                        placeholder="Add a new product"
                                        className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 mb-1"
                                    />
                                    {errors.name && <span className="ml-1 text-sm text-red-500">{errors.name.message}</span>}
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
                                            {...register('price')}
                                            className="text-sm px-4 py-2 text-gray-700 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 mb-1"
                                        />
                                        {errors.price && <span className="ml-1 text-sm text-red-500">{errors.price.message}</span>}
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
                                            {...register('quantity')}
                                            className="text-sm px-4 py-2 text-gray-700 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 mb-1"
                                        />
                                        {errors.quantity && <span className="ml-1 text-sm text-red-500">{errors.quantity.message}</span>}
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
                                        {...register('sku')}
                                        placeholder="Enter SKU"
                                        className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 mb-1"
                                    />
                                    {errors.sku && <span className="ml-1 text-sm text-red-500">{errors.sku.message}</span>}
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
                                        placeholder="Enter low stock threshold"
                                        className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 mb-1"
                                    />
                                    {errors.lowStockAt && <span className="ml-1 text-sm text-red-500">{errors.lowStockAt.message}</span>}
                                </div>
                                {/* Submit and Cancel Buttons */}
                                <div className="flex flex-col md:flex-row items-center gap-3 mt-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-3 text-white rounded-md bg-violet-500 text-sm cursor-pointer w-full md:w-auto disabled:cursor-not-allowed disabled:bg-gray-400 focus:outline-violet-800"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Adding Product...' : 'Add Product'}
                                    </button>
                                    <Link
                                        href='/add-product'
                                        className="px-4 py-3 text-gray-900 rounded-md bg-gray-400/30 text-sm text-center cursor-pointer w-full md:w-auto focus:outline-gray-400"
                                        onClick={() => reset()}
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

export default AddProductForm;