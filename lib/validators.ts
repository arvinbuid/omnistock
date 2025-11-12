import z from "zod";

export const ProductSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters long"),
  price: z.coerce.number().nonnegative("Price must be a positive number"),
  quantity: z.coerce.number().int().min(0, "Quantity must be a positive number"),
  sku: z.string().optional(),
  lowStockAt: z.coerce
    .number()
    .int()
    .min(0, "Low Stock Threshold must be a positive number")
    .optional(),
});

export const ProductUpdateSchema = ProductSchema.omit({
  quantity: true,
}).extend({
  id: z.string().min(1, "Product id is required"),
  name: z.string().min(3, "Product name must be at least 3 characters long"),
  price: z.coerce.number().nonnegative("Price must be a positive number"),
  sku: z.string().optional(),
  lowStockAt: z.coerce
    .number()
    .int()
    .min(0, "Low Stock Threshold must be a positive number")
    .optional(),
});

export const AdjustmentType = z.enum(["RECEIVE", "ISSUE", "COUNT"]);

export const StockAdjustmentSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  adjustmentType: AdjustmentType,
  quantity: z.coerce.number().int().min(0, "Quantity must be a positive number"),
  reason: z.string().min(5, "A reason for the adjustment is required for auditing."),
});
