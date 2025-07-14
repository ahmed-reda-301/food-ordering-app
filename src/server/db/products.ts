/**
 * Products Database Utilities
 * --------------------------
 * Provides functions to interact with the products table in the database.
 * - getProductsByCategory: Fetches products grouped by category, including sizes and extras. Uses caching for performance.
 * - getBestSellers: Fetches best-selling products, ordered by order count, with optional limit. Uses caching for performance.
 *
 * Usage:
 *   import { getProductsByCategory, getBestSellers } from "@/server/db/products";
 *   const products = await getProductsByCategory();
 *
 * Best Practices:
 *   - Use these functions for all product fetch operations to ensure consistent caching and data structure.
 *   - Update revalidation time as needed for your app's freshness/performance needs.
 */

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
export const getBestSellers = cache(
  (limit?: number | undefined) => {
    const bestSellers = db.product.findMany({
      where: {
        orders: {
          some: {},
        },
      },
      orderBy: {
        orders: {
          _count: "desc",
        },
      },
      include: {
        sizes: true,
        extras: true,
      },
      take: limit,
    });
    return bestSellers;
  },
  ["best-sellers"],
  { revalidate: 3600 }
);

export const getProducts = cache(
  () => {
    const products = db.product.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return products;
  },
  ["products"],
  { revalidate: 3600 }
);

export const getProduct = cache(
  (id: string) => {
    const product = db.product.findUnique({
      where: {
        id,
      },
      include: {
        sizes: true,
        extras: true,
      },
    });
    return product;
  },
  [`product-${crypto.randomUUID()}`],
  { revalidate: 3600 }
);
