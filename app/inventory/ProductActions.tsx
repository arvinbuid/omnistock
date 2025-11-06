'use client';

import { deleteProduct } from "@/lib/actions/products";
import { SquarePen, TrashIcon } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface ProductActionsProps {
    productId: string
}

const handleFormSubmit = async (formData: FormData) => {
    const res = await deleteProduct(formData);
    if (res.success) {
        toast.success(res.message);
    } else {
        toast.error(res.message);
    }
}

const ProductActions = ({ productId }: ProductActionsProps) => {
    return (
        <form action={handleFormSubmit}>
            <input type="hidden" name="id" value={productId}></input>
            <div className="flex items-center gap-2">
                <button type='submit' className="p-2 rounded-md bg-red-600 text-white cursor-pointer">
                    <TrashIcon className="w-3.5 h-3.5 font-bold" />
                </button>
                <Link
                    href={`/edit-product/${productId}`}
                    className="p-2 rounded-md bg-yellow-600 text-white cursor-pointer"
                >
                    <SquarePen className="w-3.5 h-3.5 font-bold" />
                </Link>
            </div>
        </form>
    );
}

export default ProductActions;