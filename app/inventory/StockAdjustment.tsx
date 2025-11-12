'use client'

import { adjustStock } from "@/lib/actions/products";
import { StockAdjustmentSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { startTransition, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

interface StockAdjustmentProps {
    productId: string
    name: string
    quantity: number
}

type StockAdjustmentInput = z.input<typeof StockAdjustmentSchema>
type StockAdjustmentOutput = z.output<typeof StockAdjustmentSchema>

const StockAdjustment = ({ productId, name, quantity }: StockAdjustmentProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<StockAdjustmentInput, any, StockAdjustmentOutput>({
        resolver: zodResolver(StockAdjustmentSchema),
        defaultValues: {
            productId,
            quantity: 0,
            adjustmentType: "RECEIVE",
            reason: ""
        }
    });

    const handleSubmitForm: SubmitHandler<StockAdjustmentOutput> = async (data) => {
        const res = await adjustStock(data);

        if (res.success) {
            toast.success(res.message);
            setIsModalOpen(false);
        } else {
            toast.error(res.message);
        }
    }

    return (
        <>
            <div>
                <button
                    type='submit'
                    className="p-2 rounded-md bg-blue-600 text-white cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusCircle className="w-3.5 h-3.5 font-bold" />
                </button>
            </div>

            {isModalOpen && (
                <div className="min-h-screen bg-gray-800/50 absolute top-0 left-0 bottom-0 w-full flex justify-center items-center">
                    <div className="max-w-lg w-full bg-gray-50 rounded-lg p-10 relative z-10 mx-4">
                        <div className="flex justify-between mb-8">
                            <h1 className="text-2xl font-semibold text-gray-900">Stock Adjustment</h1>
                            <button
                                className="text-black px-3 py-1.5 cursor-pointer absolute top-2 right-5"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <span className="inline-block rotate-45 text-3xl">+</span>
                            </button>
                        </div>
                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit(handleSubmitForm)}
                        >
                            <input type="hidden" {...register("productId")} value={productId} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Product Name */}
                                <div>
                                    <label
                                        htmlFor="productName"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        id="productName"
                                        name="productName"
                                        defaultValue={name}
                                        disabled
                                        className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 disabled:bg-gray-200 cursor-not-allowed"
                                    />
                                </div>
                                {/* Current Stock */}
                                <div>
                                    <label
                                        htmlFor="currentStock"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Current Stock
                                    </label>
                                    <input
                                        type="number"
                                        id="currentStock"
                                        name="currentStock"
                                        defaultValue={quantity}
                                        disabled
                                        className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 disabled:bg-gray-200 cursor-not-allowed"
                                    />
                                </div>
                                {/* New Quantity */}
                                <div>
                                    <label
                                        htmlFor="newQuantity"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        New Quantity
                                    </label>
                                    <input
                                        type="number"
                                        step='1'
                                        {...register("quantity")}
                                        className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 mb-1"
                                    />
                                    {errors.quantity && <span className="ml-1 text-sm text-red-500">{errors.quantity.message}</span>}
                                </div>
                                {/* Adjustment Type */}
                                <div>
                                    <label
                                        htmlFor="adjustmentType"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Adjustment Type
                                    </label>
                                    <select
                                        id="adjustmentType"
                                        {...register("adjustmentType")}
                                        className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 cursor-pointer mb-1"
                                    >
                                        <option value="RECEIVE">Receive</option>
                                        <option value="ISSUE">Issue</option>
                                        <option value="COUNT">Count</option>
                                    </select>
                                    {errors.adjustmentType && <span className="ml-1 text-sm text-red-500">{errors.adjustmentType.message}</span>}
                                </div>
                            </div>
                            {/* Reason */}
                            <div className="">
                                <label
                                    htmlFor="reason"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Reason
                                </label>
                                <textarea
                                    id="reason"
                                    {...register("reason")}
                                    className="text-sm px-4 py-2 text-gray-700 placeholder-gray-400 w-full border border-gray-300 rounded-md focus:outline-none focus:border-gray-400 mb-1"
                                    rows={7}
                                />
                                {errors.reason && <span className="ml-1 text-sm text-red-500">{errors.reason.message}</span>}
                            </div>
                            {/* Submit and Cancel Buttons */}
                            <div className="flex flex-col md:flex-row items-center gap-3 mt-4">
                                <button
                                    type="submit"
                                    className="px-4 py-3 text-white rounded-md bg-violet-500 text-sm cursor-pointer w-full md:w-auto disabled:cursor-not-allowed disabled:bg-gray-400 focus:outline-violet-800"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Committing...' : 'Commit Adjustment'}
                                </button>
                                <button
                                    type='button'
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-3 text-gray-900 rounded-md bg-gray-400/30 text-sm text-center cursor-pointer w-full md:w-auto focus:outline-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default StockAdjustment;