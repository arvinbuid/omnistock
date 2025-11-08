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
        <UpdateProduct product={product} />
    );
}

export default EditProduct;