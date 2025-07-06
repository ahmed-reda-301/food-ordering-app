// -----------------------------------------------------------------------------
// src/app/api/auth/[...nextauth]/route.ts
//
// NextAuth API Route Handler
// -------------------------
// Purpose:
// - Exposes the NextAuth.js authentication API endpoint for the app.
//
// Features:
// - Imports the centralized NextAuth configuration from src/server/auth.ts.
// - Handles all authentication requests (sign in, sign out, callbacks, etc).
// - Ensures all custom logic (callbacks, providers, adapters) is respected.
//
// Usage:
//   This file is automatically used by Next.js for all /api/auth/* routes.
//   No need to manually import or use this route elsewhere.
//
// Best Practices:
// - Keep this file minimal; all logic should be in src/server/auth.ts.
// - Only import and pass the config to NextAuth().
// -----------------------------------------------------------------------------

import { authOptions } from "@/server/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
