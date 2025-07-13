/**
 * Categories Database Utilities
 * ----------------------------
 * Provides functions to interact with the categories table in the database.
 * - getCategories: Fetches all categories ordered by 'order' field (ascending).
 *   - Uses caching for performance (revalidates every 3600 seconds).
 *   - Returns an array of category objects.
 *
 * Usage:
 *   import { getCategories } from "@/server/db/categories";
 *   const categories = await getCategories();
 *
 * Best Practices:
 *   - Use this function for all category fetch operations to ensure consistent caching.
 *   - Update revalidation time as needed for your app's freshness/performance needs.
 */

import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getCategories = cache(
  () => {
    const categories = db.category.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return categories;
  },
  ["categories"],
  { revalidate: 3600 }
);