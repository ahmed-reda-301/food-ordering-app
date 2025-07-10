// -----------------------------------------------------------------------------
// src/providers/NextAuthSessionProvider.tsx
//
// NextAuthSessionProvider Component
// -----------------------------------------------------------------------------
// Purpose:
// - Provides the NextAuth.js session context to all child components in the app.
//
// Features:
// - Wraps the app (or any subtree) with <SessionProvider> from next-auth/react.
// - Enables access to authentication/session state via useSession and related hooks.
// - Ensures session data is available for client-side components and hooks.
//
// Usage:
//   Place <NextAuthSessionProvider> at the root of your app (e.g., in layout.tsx)
//   or around any subtree that needs access to authentication/session state.
//
// Best Practices:
// - Use this provider to enable authentication-aware UI and logic throughout the app.
// - Only wrap once at the highest level needed to avoid duplicate providers.
// -----------------------------------------------------------------------------

"use client";

import { SessionProvider } from "next-auth/react";

function NextAuthSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default NextAuthSessionProvider;
