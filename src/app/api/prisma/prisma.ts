import { PrismaClient } from "@/app/api/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

async function ensureDefaultCategories() {
  const count = await prisma.category.count();

  if (count === 0) {
    const defaultCategories = [
      { name: "Food" },
      { name: "Transport" },
      { name: "Medicine" },
      { name: "Groceries" },
      { name: "Rent" },
      { name: "Gifts" },
      { name: "Savings" },
      { name: "Entertainment" },
    ];

    await prisma.category.createMany({
      data: defaultCategories,
      skipDuplicates: true,
    });

    console.log("Basic categories added successfully");
  }
}

ensureDefaultCategories().catch((e) => {
  console.error("Error. Could not add categories: ", e);
});

export default prisma;
