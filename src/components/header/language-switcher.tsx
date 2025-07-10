// -----------------------------------------------------------------------------
// src/components/header/language-switcher.tsx
//
// LanguageSwitcher Component
// -------------------------
// Purpose:
// - Allows users to switch between supported languages (Arabic/English) in the app.
//
// Features:
// - Detects the current locale from the URL using Next.js navigation hooks.
// - Replaces the locale segment in the current path and navigates to the new locale route.
// - Renders a button to switch to the other language (shows 'English' if Arabic, 'العربية' if English).
//
// Usage:
//   <LanguageSwitcher />
//   Place in the header or navbar for easy access.
//
// Best Practices:
// - Keeps language switching logic simple and URL-based for SEO and SSR compatibility.
// - Extendable for more languages by adding more buttons/options.
// -----------------------------------------------------------------------------
"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Languages } from "@/constants/enums";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  const switchLanguage = (newLocale: string) => {
    const path =
      pathname?.replace(`/${locale}`, `/${newLocale}`) ?? `/${newLocale}`;
    router.push(path);
  };

  return (
    <div className="flex">
      {locale === Languages.ARABIC ? (
        <Button
          variant="outline"
          onClick={() => switchLanguage(Languages.ENGLISH)}
        >
          English
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => switchLanguage(Languages.ARABIC)}
        >
          العربية
        </Button>
      )}
    </div>
  );
};

export default LanguageSwitcher;
