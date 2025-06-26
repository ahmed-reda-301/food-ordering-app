// -----------------------------------------------------------------------------
// src/server/db/products.ts
//
// This module provides database access functions related to products.
//
// - getBestSellers: Asynchronously fetches all products from the database,
//   including their related sizes and extras, using Prisma ORM.
//   This is useful for displaying best-selling or featured products in the UI.
//
// Usage:
//   Import and call getBestSellers() in your API routes or server components
//   to retrieve a list of products with their associated data.
//
// Example:
//   const products = await getBestSellers();
//
// Best practices:
// - Use this function for server-side data fetching to ensure up-to-date data.
// - Extend this module with more product-related queries as needed.
// -----------------------------------------------------------------------------
import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

// export const getBestSellers = async () => {
//   // This function fetches the best-selling products from the database
//   const bestSellers = await db.product.findMany({
//     include: { sizes: true, extras: true },
//   });
//   return bestSellers;
// };

// This function fetches the best-selling products from the database
// It uses caching to improve performance and reduce database load
export const getBestSellers = cache(
  (limit?: number | undefined) => {
    const bestSellers = db.product.findMany({
      where: {
        orders: {
          some: {}, 
        }, 
      },// Filter products that have been ordered at least once
      orderBy: {
        orders: {
          _count: "desc",
        },
      }, // Order by the count of orders in descending order
      include: {
        sizes: true,
        extras: true,
      }, // Include related sizes and extras for each product
      take: limit, // Optional limit to control the number of products returned
    });
    return bestSellers;
  },
  ["best-sellers"], // Cache key for the best sellers
  { revalidate: 3600 } // Revalidate every hour (3600 seconds) to keep the data fresh
);
