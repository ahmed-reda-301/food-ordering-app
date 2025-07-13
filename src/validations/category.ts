/**
 * Category Validation Schemas
 * --------------------------
 * Provides Zod schemas for validating category forms (add, update).
 * - addCategorySchema: Validates new category data (name required).
 * - updateCategorySchema: Validates category update data (categoryName required).
 * - All validation messages are i18n-ready and use the provided translations object.
 *
 * Usage:
 *   const schema = addCategorySchema(translations);
 *   schema.parse(formData);
 *
 * Best Practices:
 *   - Always pass the correct translations object for i18n error messages.
 *   - Keep validation logic in sync with form fields and backend requirements.
 */

import { Translations } from "@/types/translations";
import * as z from "zod";

export const addCategorySchema = (translations: Translations) => {
  return z.object({
    name: z.string().trim().min(1, {
      message: translations.admin.categories.form.name.validation.required,
    }),
  });
};

export const updateCategorySchema = (translations: Translations) => {
  return z.object({
    categoryName: z.string().trim().min(1, {
      message: translations.admin.categories.form.name.validation.required,
    }),
  });
};