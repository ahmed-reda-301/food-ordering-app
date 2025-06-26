// -----------------------------------------------------------------------------
// product.ts
//
// This file defines a TypeScript type for a Product entity with its related data
// using Prisma's type inference. The type `ProductWithRelations` includes the
// product's sizes and extras, making it easier to type API responses or props
// that require a product and its relations.
//
// - ProductWithRelations: Represents a product with its associated sizes and extras.
// - Useful for type safety in components, API routes, and data fetching logic.
//
// -----------------------------------------------------------------------------
import { Prisma } from "@prisma/client";

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    sizes: true;
    extras: true;
  };
}>;
