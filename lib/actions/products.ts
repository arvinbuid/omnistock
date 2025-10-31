"use server";

import {redirect} from "next/navigation";
import {getCurrentUser} from "../auth";
import {prisma} from "../client";
import {convertToPlainObject} from "../utils";
import {ProductSchema, ProductUpdateSchema} from "../validators";

export const getProductById = async (productId: string) => {
  const product = await prisma.product.findFirst({where: {id: productId}});
  return convertToPlainObject(product);
};

export const createProduct = async (formData: FormData) => {
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

  try {
    await prisma.product.create({
      data: {...parsed.data, userId},
    });
  } catch (e) {
    console.error("Prisma error: ", e);
    throw new Error("Failed to create product");
  }
  redirect("/inventory");
};

export const updateProduct = async (formData: FormData) => {
  const parsedProduct = ProductUpdateSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
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

  try {
    await prisma.product.update({
      where: {id: productData.id},
      data: {...productData},
    });
  } catch (e) {
    console.error("Prisma error: ", e);
    throw new Error("Failed to update product");
  }
  redirect("/inventory");
};

export const deleteProduct = async (formData: FormData) => {
  const user = await getCurrentUser();
  const userId = user.id;
  const id = formData.get("id") as string;

  await prisma.product.deleteMany({
    where: {
      id,
      userId,
    },
  });
};
