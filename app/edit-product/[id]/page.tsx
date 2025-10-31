import Sidebar from "@/app/components/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Update Product'
}

const EditProduct = async (props: {
    params: Promise<{
        id: string
    }>
}) => {
    const { id } = await props.params;
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/inventory" />
            <main className="ml-64 p-6">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Update Product</h1>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default EditProduct;