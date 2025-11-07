import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Omnistock | Product Details'
}

const ProductDetails = async (props: {
    params: Promise<{
        productId: string
    }>
}) => {
    const { productId } = await props.params;
    return (
        <div>
            <h1>Product {productId} Details: </h1>
        </div>
    );
}

export default ProductDetails;