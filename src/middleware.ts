// -----------------------------------------------------------------------------
// src/middleware.ts
//
// Next.js Middleware for i18n
// ---------------------------
// Purpose:
// - Handles locale detection and redirection for internationalized routes.
//
// Features:
// - Detects the user's preferred language using Accept-Language headers.
// - Redirects to the correct locale-prefixed route if missing.
// - Sets the x-url header for use in server components (for locale extraction).
// - Ignores API/static/image/robots/sitemap routes for performance.
//
// Usage:
//   Automatically used by Next.js when placed in the root or src directory.
//
// Best Practices:
// - Keep locale logic here for centralized i18n routing.
// - Update matcher if you add new static or API routes to ignore.
// -----------------------------------------------------------------------------

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n, LanguageType } from "./i18n.config";


function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: LanguageType[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  let locale = "";

  try {
    locale = matchLocale(languages, locales, i18n.defaultLocale);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (error: any) {
    locale = i18n.defaultLocale;
  }
  return locale;
}

export default async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

//   const response = NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });

  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
//   const currentLocale = request.url.split("/")[3] as Locale;

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
export const config = {
  // Matcher ignoring `/_next/`, `/api/`, ..etc
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
