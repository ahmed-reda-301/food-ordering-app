// -----------------------------------------------------------------------------
// src/lib/getCurrentLocale.ts
//
// Get Current Locale Utility
// -------------------------
// Purpose:
// - Extracts the current locale from the request headers (x-url) in a server component.
// - Used to determine which language dictionary to load for SSR pages.
//
// Features:
// - Reads the 'x-url' header set by middleware.
// - Parses the locale from the URL path (e.g., /en, /ar).
//
// Usage:
//   import { getCurrentLocale } from '@/lib/getCurrentLocale';
//   const locale = await getCurrentLocale();
//
// Best Practices:
// - Keeps locale detection logic centralized and consistent.
// - Should be used only in server components or server actions.
// -----------------------------------------------------------------------------

import { Locale } from "@/i18n.config";
import { headers } from "next/headers";

export const getCurrentLocale = async () => {
  const url = (await headers()).get("x-url");
  const locale = url?.split("/")[3] as Locale;
  return locale;
};
