import z from "zod";

export const ProductSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters long"),
  price: z.coerce.number().nonnegative("Price must be a positive number"),
  quantity: z.coerce.number().int().min(0, "Quantity must be a positive number"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
});
