import { Metadata } from "next";
import { getProductById } from "@/lib/actions/products";
import { notFound } from "next/navigation";
import ProductDetailsPage from "./ProductDetails";

export const metadata: Metadata = {
    title: 'Omnistock | Product Details'
}

const ProductDetails = async (props: {
    params: Promise<{
        productId: string
    }>
}) => {
    const { productId } = await props.params;
    const product = await getProductById(productId);
    if (!product) notFound();
    return (
        <ProductDetailsPage product={product} />
    );
}

export default ProductDetails;