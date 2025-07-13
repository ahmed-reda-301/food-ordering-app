/**
 * Category Actions (Server)
 * ------------------------
 * Provides server actions for category CRUD operations in the admin dashboard.
 * - addCategory: Validates and adds a new category, revalidates paths, returns status/message.
 * - updateCategory: Validates and updates an existing category, revalidates paths, returns status/message.
 * - deleteCategory: Deletes a category, revalidates paths, returns status/message.
 * - All actions use i18n for messages and validation errors.
 *
 * Usage:
 *   import { addCategory, updateCategory, deleteCategory } from "./_actions/category";
 *
 * Best Practices:
 *   - Always validate form data using the appropriate schema before database operations.
 *   - Revalidate relevant paths after any CRUD operation to keep UI in sync.
 *   - Use i18n for all user-facing messages and errors.
 */

"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import {
  addCategorySchema,
  updateCategorySchema,
} from "@/validations/category";
import { revalidatePath } from "next/cache";

export const addCategory = async (prevState: unknown, formData: FormData) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  const result = addCategorySchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
    };
  }
  const data = result.data;

  try {
    await db.category.create({
      data,
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      status: 201,
      message: translations.messages.categoryAdded,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};
export const updateCategory = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  const result = updateCategorySchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return {
      error: result.error.flatten().fieldErrors,
      status: 400,
    };
  }
  const data = result.data;

  try {
    await db.category.update({
      where: {
        id,
      },
      data: {
        name: data.categoryName,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      status: 200,
      message: translations.messages.updatecategorySucess,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};

export const deleteCategory = async (id: string) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);

  try {
    await db.category.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);
    return {
      status: 200,
      message: translations.messages.deleteCategorySucess,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};