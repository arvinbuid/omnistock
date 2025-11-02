import {Decimal} from "@prisma/client/runtime/client";

export type Product = {
  id: string;
  name: string;
  userId: string;
  sku: string | null;
  price: Decimal;
  quantity: number;
  lowStockAt: number | null;
  createdAt: Date;
  updatedAt: Date;
};
