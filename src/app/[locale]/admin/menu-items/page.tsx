/**
 * MenuItemsPage Component
 * ----------------------
 * Renders the admin menu items management page.
 * - Loads products and translations asynchronously for the current locale.
 * - Displays a button to add new products and a list of existing products.
 * - Handles i18n for all UI text and messages.
 *
 * Props:
 *   - params: Promise resolving to an object containing the current locale.
 *
 * Usage:
 *   Used as the main page for managing menu items in the admin dashboard.
 *
 * Best Practices:
 *   - Keep product management logic and UI modular (MenuItems, Form, etc).
 *   - Ensure translations are up-to-date for all supported locales.
 */

import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Languages, Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { authOptions } from "@/server/auth";
import { getProducts } from "@/server/db/products";
import { UserRole } from "@prisma/client";
import { ArrowRightCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MenuItems from "./_components/MenuItems";

async function MenuItemsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = (await params).locale;
  const translations = await getTrans(locale);
  const session = await getServerSession(authOptions);
  const products = await getProducts();

  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }

  if (session && session.user.role !== UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.PROFILE}`);
  }

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <Link
            href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${Pages.NEW}`}
            className={`${buttonVariants({
              variant: "outline",
            })} !mx-auto !flex !w-80 !h-10 mb-8`}
          >
            {translations.admin["menu-items"].createNewMenuItem}
            <ArrowRightCircle
              className={`!w-5 !h-5 ${
                locale === Languages.ARABIC ? "rotate-180 " : ""
              }`}
            />
          </Link>
          <MenuItems products={products} />
        </div>
      </section>
    </main>
  );
}

export default MenuItemsPage;
