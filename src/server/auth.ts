// -----------------------------------------------------------------------------
// src/server/auth.ts
//
// NextAuth Configuration & Credentials Provider Example
// -----------------------------------------------------------------------------
// Purpose:
// - Centralizes authentication logic and configuration for NextAuth.js in the app.
//
// Features:
// - Uses PrismaAdapter to connect NextAuth to the database (Prisma ORM).
// - Implements CredentialsProvider for custom email/password authentication.
// - Configures JWT session strategy for stateless authentication.
// - Sets up custom sign-in page route.
//
// Usage:
//   Imported and used in the Next.js API route for authentication (see [...nextauth]/route.ts).
//   All authentication, session, and user logic is managed here for maintainability.
//
// Best Practices:
// - Keep all authentication logic in one place for clarity and security.
// - Use strong typing for user/session objects in a real-world app.
// - Always validate credentials and handle errors securely (this example is for demonstration only).
// -----------------------------------------------------------------------------

import { Environments, Pages, Routes } from "@/constants/enums";
import { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === Environments.DEV,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      // The authorize function is called when a user attempts to sign in.
      // In a real app, you should validate the credentials against your database.
      // This example simply returns the credentials as a user object with a random id.
      authorize: async (credentials) => {
        const user = credentials;
        return {
          id: crypto.randomUUID(),
          ...user,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: `/${Routes.AUTH}/${Pages.LOGIN}`,
  },
};
// -----------------------------------------------------------------------------
// Note:
// - This is a minimal example for demonstration. In production, always validate
//   credentials securely and never return raw credentials as user objects.
// - For advanced usage, add callbacks for JWT/session customization and error handling.
// -----------------------------------------------------------------------------
