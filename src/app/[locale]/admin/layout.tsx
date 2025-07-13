/**
 * AdminLayout Component
 * ---------------------
 * Provides the layout for all admin dashboard pages, including the navigation tabs and page content.
 * - Loads translations for the current locale asynchronously.
 * - Renders AdminTabs for navigation and wraps child admin content.
 * - Ensures all admin pages are i18n-ready and consistently structured.
 *
 * Props:
 *   - params: Promise resolving to an object containing the current locale.
 *   - children: React nodes representing the admin page content.
 *
 * Usage:
 *   Used as the layout for admin routes in Next.js app directory structure.
 *
 * Best Practices:
 *   - Place all admin pages as children of this layout for consistent navigation and translation loading.
 *   - Ensure getTrans and AdminTabs are kept up-to-date with available locales and admin sections.
 */

import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import AdminTabs from "./_components/AdminTabs";

async function AdminLayout({
  params,
  children,
}: {
  params: Promise<{ locale: Locale }>;
  children: React.ReactNode;
}) {
  const locale = (await params).locale;
  const translations = await getTrans(locale);
  return (
    <>
      <AdminTabs translations={translations} />
      {children}
    </>
  );
}

export default AdminLayout;
