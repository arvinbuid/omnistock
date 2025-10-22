import {PrismaClient} from "../app/generated/prisma/index.js";
const prisma = new PrismaClient();
async function main() {
  const demoUserId = "42851b20-6692-4bd6-862e-fda91192eb08";

  // create 25 sample products
  await prisma.product.createMany({
    data: Array.from({length: 30}).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i}`,
      price: (Math.random() * 90 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)), // random date
    })),
  });

  console.log("Seed data successfully created.");
  console.log("Created 30 products for user ID: " + demoUserId);
}
main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
