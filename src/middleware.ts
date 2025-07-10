// -----------------------------------------------------------------------------
// src/middleware.ts
//
// Next.js Middleware for i18n, Authentication, and Route Protection
// -----------------------------------------------------------------------------
// Purpose:
// - Handles locale detection, redirection, and authentication/authorization logic
//   for all routes in the food ordering app.
//
// Features:
// - Detects the user's preferred language using Accept-Language headers and redirects
//   to the correct locale-prefixed route if missing.
// - Sets the x-url header for use in server components (for locale extraction).
// - Protects sensitive routes (profile, admin) by requiring authentication.
// - Redirects unauthenticated users to the login page if they access protected routes.
// - Prevents logged-in users from accessing auth pages (login/signup), redirects them
//   to their profile or admin dashboard based on their role.
// - Prevents non-admin users from accessing admin routes, redirects to profile.
// - Ignores API/static/image/robots/sitemap routes for performance.
//
// Usage:
//   Automatically used by Next.js when placed in the root or src directory.
//
// Best Practices:
// - Centralize all locale and auth logic here for maintainability and security.
// - Update matcher if you add new static or API routes to ignore.
// - Keep logic clear and comment any custom rules for future maintainers.
// -----------------------------------------------------------------------------
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n, LanguageType, Locale } from "./i18n.config";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { Pages, Routes } from "./constants/enums";
import { UserRole } from "@prisma/client";

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

export default withAuth(
  async function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !pathname.startsWith(`/${locale}`)
    );
    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      return NextResponse.redirect(
        new URL(`/${locale}${pathname}`, request.url)
      );
    }
    const currentLocale = request.url.split("/")[3] as Locale;
    const isAuth = await getToken({ req: request });
    const isAuthPage = pathname.startsWith(`/${currentLocale}/${Routes.AUTH}`);
    const protectedRoutes = [Routes.PROFILE, Routes.ADMIN];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(`/${currentLocale}/${route}`)
    );
    // if user not loggedin and try to acess protected route
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${Routes.AUTH}/${Pages.LOGIN}`, request.url)
      );
    }
    // if user loggedin and try to acess auth routes
    if (isAuthPage && isAuth) {
      const role = isAuth.role;
      if (role === UserRole.ADMIN) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}/${Routes.ADMIN}`, request.url)
        );
      }
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${Routes.PROFILE}`, request.url)
      );
    }
    // if user loggedin and he isn't admin and try to acess admin route
    if (isAuth && pathname.startsWith(`/${currentLocale}/${Routes.ADMIN}`)) {
      const role = isAuth.role;
      if (role !== UserRole.ADMIN) {
        return NextResponse.redirect(
          new URL(`/${currentLocale}/${Routes.PROFILE}`, request.url)
        );
      }
    }
    return response;
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, ..etc
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
