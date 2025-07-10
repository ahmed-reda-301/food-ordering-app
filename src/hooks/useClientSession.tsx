// -----------------------------------------------------------------------------
// src/hooks/useClientSession.tsx
//
// Custom React Hook: useClientSession
// -----------------------------------------------------------------------------
// Purpose:
//   Provides a unified way to access and manage the NextAuth session on the client side.
//   Ensures the session state is always up-to-date, even after navigation or authentication changes.
//
// Features:
//   - Accepts an initial session (from server or SSR) and keeps it in sync with the client session.
//   - Uses NextAuth's useSession() to listen for session changes.
//   - Returns the current session data and status, updating reactively as needed.
//
// Usage:
//   const { data: session, status } = useClientSession(initialSession);
//   Use in client components that need to access the authenticated user session.
//
// Best Practices:
//   - Use this hook instead of useSession directly when you have an initial session from SSR.
//   - Helps avoid hydration mismatches and ensures consistent session state.
// -----------------------------------------------------------------------------

"use client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useClientSession = (initialSession: Session | null) => {
  // Get the current session and status from NextAuth
  const { data: session, status } = useSession();
  // State to hold the current session, initialized with the initialSession
  const [currentSession, setCurrentSession] = useState(initialSession);

  // Update currentSession when the NextAuth session changes
  useEffect(() => {
    if (session) {
      setCurrentSession(session);
    }
  }, [session]);

  // Update currentSession if the initialSession prop changes (e.g., after SSR)
  useEffect(() => {
    if (initialSession) {
      setCurrentSession(initialSession);
    }
  }, [initialSession]);

  // Return the current session data and status
  return { data: currentSession, status };
};
