/**
 * Authentication Validation Schemas
 * ----------------------------------
 * This module defines Zod validation schemas for authentication-related forms
 * in the food ordering app. It provides reusable, strongly-typed validation logic
 * for login and sign-up forms, supporting internationalized error messages.
 *
 * - All validation messages are dynamically injected from the `translations` object,
 *   enabling full i18n support for form errors.
 * - Uses Zod for declarative, composable schema definitions.
 *
 * Exports:
 *   - loginSchema: Returns a Zod schema for login form validation.
 *   - signUpSchema: Returns a Zod schema for sign-up form validation, including
 *     password confirmation and cross-field validation.
 *   - ValidationErrors: Type alias for possible validation error objects.
 */

import * as z from "zod";
import { Translations } from "@/types/translations";

/**
 * Returns a Zod schema for validating login form fields.
 *
 * @param translations - The translations object containing localized validation messages.
 * @returns Zod schema for login form validation.
 *
 * Fields:
 *   - email: Required, must be a valid email address.
 *   - password: Required, 6-40 characters.
 */
export const loginSchema = (translations: Translations) => {
  return z.object({
    email: z.string().trim().email({
      message: translations.validation.validEmail,
    }),
    password: z
      .string()
      .min(6, { message: translations.validation.passwordMinLength })
      .max(40, { message: translations.validation.passwordMaxLength }),
  });
};

/**
 * Returns a Zod schema for validating sign-up form fields.
 *
 * @param translations - The translations object containing localized validation messages.
 * @returns Zod schema for sign-up form validation.
 *
 * Fields:
 *   - name: Required, non-empty string.
 *   - email: Required, must be a valid email address.
 *   - password: Required, 6-40 characters.
 *   - confirmPassword: Required, must match password.
 *
 * Includes a cross-field refinement to ensure password and confirmPassword match.
 */
export const signUpSchema = (translations: Translations) => {
  return z
    .object({
      name: z
        .string()
        .trim()
        .min(1, { message: translations.validation.nameRequired }),
      email: z.string().trim().email({
        message: translations.validation.validEmail,
      }),
      password: z
        .string()
        .min(6, { message: translations.validation.passwordMinLength })
        .max(40, { message: translations.validation.passwordMaxLength }),
      confirmPassword: z
        .string()
        .min(6, { message: translations.validation.confirmPasswordRequired }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translations.validation.passwordMismatch,
      path: ["confirmPassword"],
    });
};

/**
 * Type alias for validation error objects returned by Zod.
 *
 * Each key corresponds to a field name, and the value is an array of error messages.
 * If no errors, the value is undefined.
 */
export type ValidationErrors =
  | {
      [key: string]: string[];
    }
  | undefined;
