import Sidebar from "@/app/components/sidebar";
import { getProductById } from "@/lib/actions/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import UpdateProduct from "./UpdateProduct";

export const metadata: Metadata = {
    title: 'Omnistock | Update Product'
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
                        <UpdateProduct product={product} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default EditProduct;