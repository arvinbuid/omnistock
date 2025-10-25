"use server";

import {getCurrentUser} from "../auth";
import {prisma} from "../client";

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
