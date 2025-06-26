// src/lib/prisma.ts
//
// Prisma Client Singleton Setup for Next.js
// -----------------------------------------
// Purpose:
// - Provides a single, shared instance of PrismaClient for database access throughout the app.
// - Prevents exhausting the database connection limit by reusing the same PrismaClient instance in development.
//
// How it works:
// - In development, attaches the PrismaClient instance to the global object (globalForPrisma.prisma).
//   This avoids creating a new client on every hot reload.
// - In production, always creates a new PrismaClient instance (no global pollution).
// - The log level is set to be more verbose in development (logs queries, errors, and warnings),
//   and only logs errors in production for performance and security.
//
// Usage:
//   import { db } from '@/lib/prisma';
//   const users = await db.user.findMany();
//
// References:
// - Next.js + Prisma best practices: https://pris.ly/d/help/next-js-best-practices
//
// This pattern is recommended for serverless and hot-reloading environments like Next.js.

import { Environments } from "@/constants/enums";
import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === Environments.DEV
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== Environments.PROD) globalForPrisma.prisma = db;
