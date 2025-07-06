// -----------------------------------------------------------------------------
// src/lib/translation.ts
//
// Translation Utility
// ------------------
// Purpose:
// - Dynamically loads the appropriate translation dictionary (ar/en) based on the current locale.
// - Used for internationalization (i18n) in the app.
//
// Features:
// - Uses dynamic import to load only the required language JSON file.
// - Returns the translation object for the requested locale.
//
// Usage:
//   import getTrans from '@/lib/translation';
//   const dict = await getTrans(locale);
//
// Best Practices:
// - Keeps translation logic centralized and efficient.
// - Extendable for more languages by adding to the dictionaries object.
// -----------------------------------------------------------------------------

import "server-only";

import { Locale } from "@/i18n.config";
import { Languages } from "@/constants/enums";

const dictionaries = {
  ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
};

const getTrans = async (locale: Locale) => {
  return locale === Languages.ARABIC ? dictionaries.ar() : dictionaries.en();
};

export default getTrans;
