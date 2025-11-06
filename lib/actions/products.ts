"use server";

import {getCurrentUser} from "../auth";
import {prisma} from "../client";
import {convertToPlainObject} from "../utils";
import {ProductSchema, ProductUpdateSchema, StockAdjustmentSchema} from "../validators";
import {revalidatePath} from "next/cache";

export const getProductById = async (productId: string) => {
  const product = await prisma.product.findFirst({where: {id: productId}});
  return convertToPlainObject(product);
};

export const createProduct = async (formData: FormData) => {
  try {
    const user = await getCurrentUser();
    const userId = user.id;

    const parsed = ProductSchema.safeParse({
      name: formData.get("name"),
      price: formData.get("price"),
      quantity: formData.get("quantity"),
      sku: formData.get("sku") || undefined,
      lowStockAt: formData.get("lowStockAt") || undefined,
    });

    if (!parsed.success) throw new Error("Validation failed!");

    await prisma.product.create({
      data: {...parsed.data, userId},
    });

    return {
      success: true,
      message: "Product created successfully.",
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      success: false,
      message: `Failed to create product: ${errorMessage}`,
    };
  }
};

export const updateProduct = async (formData: FormData) => {
  try {
    const parsedProduct = ProductUpdateSchema.safeParse({
      id: formData.get("id"),
      name: formData.get("name"),
      price: formData.get("price"),
      sku: formData.get("sku") || undefined,
      lowStockAt: formData.get("lowStockAt") || undefined,
    });

    if (!parsedProduct.success) {
      console.error("Zod Validation Error: ", parsedProduct.error.message);
      throw new Error("Validation failed!");
    }

    const productData = parsedProduct.data;

    // Check the product in the database
    const productExists = await prisma.product.findFirst({
      where: {id: productData.id},
    });

    if (!productExists) throw new Error("Product not found.");

    await prisma.product.update({
      where: {id: productData.id},
      data: {...productData},
    });

    revalidatePath("/inventory");

    return {
      success: true,
      message: "Product updated successfully.",
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      success: false,
      message: `Failed to update product ${errorMessage}`,
    };
  }
};

export const deleteProduct = async (formData: FormData) => {
  try {
    const user = await getCurrentUser();
    const userId = user.id;
    const id = formData.get("id") as string;

    await prisma.product.deleteMany({
      where: {
        id,
        userId,
      },
    });

    revalidatePath("/inventory");

    return {
      success: true,
      message: "Product deleted successfully.",
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      success: false,
      message: `Failed to delete product: ${errorMessage}`,
    };
  }
};

export const adjustStock = async (formData: FormData) => {
  try {
    const user = await getCurrentUser();
    const userId = user.id;

    const parsed = StockAdjustmentSchema.safeParse({
      productId: formData.get("productId"),
      adjustmentType: formData.get("adjustmentType"),
      quantity: formData.get("quantity"),
      reason: formData.get("reason"),
    });

    if (!parsed.success) {
      console.error("Zod Validation Error: ", parsed.error.message);
      throw new Error("Validation failed!");
    }

    const {productId, adjustmentType, quantity, reason} = parsed.data;
    let stockAfter = 0;

    // Transaction
    await prisma.$transaction(async (tx) => {
      // Fetch current product
      const product = await tx.product.findUniqueOrThrow({
        where: {id: productId},
      });

      const stockBefore = product.quantity;
      let quantityChange = 0;

      if (adjustmentType === "RECEIVE") {
        quantityChange = quantity;
        stockAfter = stockBefore + quantity;
      } else if (adjustmentType === "ISSUE") {
        quantityChange = -quantity;
        stockAfter = stockBefore - quantity;

        // Prevent negative stock
        if (stockAfter < 0) {
          throw new Error(`Cannot issue ${quantity} units. Only ${stockBefore} units available.`);
        }
      } else if (adjustmentType === "COUNT") {
        quantityChange = quantity - stockBefore;
        stockAfter = quantity;
      }

      // Update the products quantity
      await tx.product.update({
        where: {id: productId},
        data: {quantity: stockAfter},
      });

      // Create the Stock Movement (Audit Log) record
      await tx.stockMovement.create({
        data: {
          productId,
          userId,
          type: adjustmentType,
          quantityChange,
          reason,
          stockBefore,
          stockAfter,
        },
      });
    });

    return {
      success: true,
      message: `Stock successfully adjusted to ${stockAfter} units.`,
    };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      success: false,
      message: `Failed to adjust product stock: ${errorMessage}`,
    };
  }
};
