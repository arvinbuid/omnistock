import { Metadata } from "next";
import AddProductForm from "./AddProductForm";

export const metadata: Metadata = {
    title: 'Omnistock | Add New Product'
}

const AddProductPage = () => {
    return (
        <AddProductForm />
    );
}

export default AddProductPage;