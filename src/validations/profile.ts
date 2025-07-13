// -----------------------------------------------------------------------------
// src/validations/profile.ts
//
// Profile Update Validation Schema
// -----------------------------------------------------------------------------
// Purpose:
//   Defines the Zod validation schema for user profile update forms, supporting i18n error messages.
//
// Features:
//   - Validates all profile fields: name, email, phone, address, postal code, city, country, image.
//   - Uses dynamic translations for all error messages (i18n-ready).
//   - Enforces required fields, email format, phone and postal code patterns.
//   - Supports optional fields and custom file validation for image uploads.
//
// Usage:
//   Call updateProfileSchema(translations) to get a Zod schema for validating profile form data.
//   Used in server actions and form logic for profile editing.
//
// Best Practices:
//   - Always use this schema for validating user input on both client and server.
//   - Pass the correct translations object for localized error messages.
// -----------------------------------------------------------------------------

import { Translations } from "@/types/translations";
import { z } from "zod";

export const updateProfileSchema = (translations: Translations) => {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: translations.validation.nameRequired }),
    email: z.string().trim().email({
      message: translations.validation.validEmail,
    }),
    phone: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          return /^\+?[1-9]\d{1,14}$/.test(value);
        },
        {
          message: translations.profile.form.phone.validation?.invalid,
        }
      ),
    streetAddress: z.string().optional(),
    postalCode: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          return /^\d{5,10}$/.test(value);
        },
        {
          message: translations.profile.form.postalCode.validation?.invalid,
        }
      ),
    city: z.string().optional(),
    country: z.string().optional(),
    image: z.custom((val) => val instanceof File).optional(),
  });
};
