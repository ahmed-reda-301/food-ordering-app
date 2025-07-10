// -----------------------------------------------------------------------------
// src/components/header/index.tsx
//
// Header Component (App Shell)
// -----------------------------------------------------------------------------
// Purpose:
// - Renders the main header/navigation bar for the app.
//
// Features:
// - Displays the logo, navigation links, and authentication buttons.
// - Responsive design for desktop and mobile.
// - Integrates with i18n and theme providers.
//
// Usage:
//   Used at the top of every page via the root layout.
//
// Best Practices:
// - Keep header logic and UI consistent across all pages.
// - Use subcomponents (Navbar, AuthButtons) for maintainability.
// -----------------------------------------------------------------------------

import Link from "../link";
import Navbar from "./Navbar";
import CartButton from "./cart-button";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./language-switcher";
import AuthButtons from "./auth-buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

async function Header() {
  const locale = await getCurrentLocale();
  const initialSession = await getServerSession(authOptions);
  const translations = await getTrans(locale);
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between gap-6 lg:gap-10">
        <Link
          href={`/${locale}`}
          className="text-primary font-semibold text-2xl"
        >
          🍕 {translations.logo}
        </Link>
        <Navbar translations={translations} initialSession={initialSession} />
        <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="hidden lg:flex lg:items-center lg:gap-6 ">
            <AuthButtons
              translations={translations}
              initialSession={initialSession}
            />
            <LanguageSwitcher />
          </div>

          <CartButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
