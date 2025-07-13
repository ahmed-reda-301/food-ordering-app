/**
 * AdminTabs Component
 * -------------------
 * Renders a set of navigation tabs for the admin dashboard, allowing switching between different admin sections (Profile, Categories, Menu Items, Users, Orders).
 * - i18n-ready: Tab titles are translated using the provided translations prop.
 * - Highlights the active tab based on the current pathname and locale.
 * - Uses Next.js client-side navigation and custom button variants for styling.
 *
 * Props:
 *   - translations: Translations object for the current locale (see src/types/translations.ts)
 *
 * Usage:
 *   <AdminTabs translations={translations} />
 *
 * Best Practices:
 *   - Keep tab definitions in sync with available admin routes and translations.
 *   - Ensure translations.admin.tabs contains all required tab labels for each locale.
 *   - Use this component within admin layout/pages to provide consistent navigation.
 */

"use client";

import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { Translations } from "@/types/translations";
import { useParams, usePathname } from "next/navigation";

function AdminTabs({ translations }: { translations: Translations }) {
  const pathname = usePathname();
  const { locale } = useParams();

  const tabs = [
    {
      id: crypto.randomUUID(),
      title: translations.admin.tabs.profile,
      href: Routes.ADMIN,
    },
    {
      id: crypto.randomUUID(),
      title: translations.admin.tabs.categories,
      href: `${Routes.ADMIN}/${Pages.CATEGORIES}`,
    },
    {
      id: crypto.randomUUID(),
      title: translations.admin.tabs.menuItems,
      href: `${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
    },
    {
      id: crypto.randomUUID(),
      title: translations.admin.tabs.users,
      href: `${Routes.ADMIN}/${Pages.USERS}`,
    },
    {
      id: crypto.randomUUID(),
      title: translations.admin.tabs.orders,
      href: `${Routes.ADMIN}/${Pages.ORDERS}`,
    },
  ];
  const isActiveTab = (href: string) => {
    const hrefArray = href.split("/");
    return hrefArray.length > 1
      ? pathname.startsWith(`/${locale}/${href}`)
      : pathname === `/${locale}/${href}`;
  };
  return (
    <nav className="mt-20">
      <ul className="flex items-center flex-wrap gap-4 justify-center">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link
              href={`/${locale}/${tab.href}`}
              className={`hover:!text-white ${
                isActiveTab(tab.href)
                  ? buttonVariants({ variant: "default" })
                  : buttonVariants({ variant: "outline" })
              }`}
            >
              {tab.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default AdminTabs;
