// -----------------------------------------------------------------------------
// src/i18n.config.ts
//
// i18n Configuration
// ------------------
// Purpose:
// - Centralizes internationalization (i18n) settings for the app.
//
// Features:
// - Defines supported languages and the default locale.
// - Exports types for use throughout the app (LanguageType, Locale).
//
// Usage:
//   import { i18n, Locale } from '@/i18n.config';
//
// Best Practices:
// - Update this file to add/remove supported languages.
// - Use exported types for type safety in translation utilities and middleware.
// -----------------------------------------------------------------------------

import { Languages } from "@/constants/enums";

export type LanguageType = Languages.ARABIC | Languages.ENGLISH;

type i18nType = {
  defaultLocale: LanguageType;
  locales: LanguageType[];
};

export const i18n: i18nType = {
  defaultLocale: Languages.ARABIC,
  locales: [Languages.ARABIC, Languages.ENGLISH],
};

export type Locale = (typeof i18n)["locales"][number];
