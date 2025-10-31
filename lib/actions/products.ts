"use server";

import {redirect} from "next/navigation";
import {getCurrentUser} from "../auth";
import {prisma} from "../client";
import {convertToPlainObject} from "../utils";
import {ProductSchema} from "../validators";

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
