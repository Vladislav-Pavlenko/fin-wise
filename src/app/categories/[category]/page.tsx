import { notFound } from "next/navigation";

const allowedCategories = [
  "food",
  "transport",
  "clothes",
  "tech",
  "books",
  "games",
  "services",
] as const;

type Category = (typeof allowedCategories)[number];

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;

  if (!allowedCategories.includes(category as Category)) {
    notFound();
  }

  return (
    <main>
      <h1>Категорія: {category}</h1>
    </main>
  );
}
