import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getProductsByCategory = cache(
  () => {
    const products = db.category.findMany({
      include: {
        products: {
          include: {
            sizes: true,
            extras: true,
          },
        },
      },
    });
    return products;
  },
  ["products-by-category"],
  { revalidate: 3600 }
);
export const getBestSellers = async () => {
  // This function fetches the best-selling products from the database
  const bestSellers = await db.product.findMany({
    include: { sizes: true, extras: true },
  });
  return bestSellers;
};
