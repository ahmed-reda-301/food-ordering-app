// -----------------------------------------------------------------------------
// src/server/auth.ts
//
// NextAuth Configuration & Credentials Provider (with Prisma Adapter)
// -----------------------------------------------------------------------------
// Purpose:
//   Centralizes and manages all authentication logic and configuration for NextAuth.js in the app.
//
// Features (Current State):
//   - Uses PrismaAdapter to connect NextAuth to the Prisma ORM database.
//   - Implements CredentialsProvider for custom email/password authentication (with locale-aware error handling).
//   - Strongly types user and session objects via module augmentation for NextAuth and JWT.
//   - Configures JWT session strategy for stateless authentication, with custom session and JWT callbacks to enrich session data from the database.
//   - Sets up a custom sign-in page route and session expiration/update intervals.
//   - Handles user roles and extended user profile fields (city, country, phone, etc.) in the session and JWT.
//   - Uses environment variables for secrets and debug mode.
//
// Usage:
//   Imported and used in the Next.js API route for authentication (see [...nextauth]/route.ts).
//   All authentication, session, and user logic is managed here for maintainability and security.
//
// Best Practices:
//   - Keep all authentication logic in one place for clarity and security.
//   - Use strong typing for user/session objects for type safety and maintainability.
//   - Always validate credentials and handle errors securely (locale-aware error messages).
//   - Extend session and JWT objects to include all required user fields for the app.
// -----------------------------------------------------------------------------
import { Environments, Pages, Routes } from "@/constants/enums";
import { DefaultSession, type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { login } from "./_actions/auth";
import { Locale } from "@/i18n.config";
import { User, UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Partial<User> {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.image as string;
        session.user.country = token.country as string;
        session.user.city = token.city as string;
        session.user.postalCode = token.postalCode as string;
        session.user.streetAddress = token.streetAddress as string;
        session.user.phone = token.phone as string;
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          image: token.image,
        },
      };
    },
    jwt: async ({ token }): Promise<JWT> => {
      const dbUser = await db.user.findUnique({
        where: {
          email: token?.email,
        },
      });
      if (!dbUser) {
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        image: dbUser.image,
        city: dbUser.city,
        country: dbUser.country,
        phone: dbUser.phone,
        postalCode: dbUser.postalCode,
        streetAddress: dbUser.streetAddress,
      };
    },
  },
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
      authorize: async (credentials, req) => {
        const currentUrl = req?.headers?.referer;
        const locale = currentUrl?.split("/")[3] as Locale;
        const res = await login(credentials, locale);
        if (res.status === 200 && res.user) {
          return res.user;
        } else {
          throw new Error(
            JSON.stringify({
              validationError: res.error,
              responseError: res.message,
            })
          );
        }
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: `/${Routes.AUTH}/${Pages.LOGIN}`,
  },
};
