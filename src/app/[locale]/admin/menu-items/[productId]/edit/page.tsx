/**
 * EditProductPage Component
 * ------------------------
 * Renders the admin product edit page for a specific product.
 * - Loads product, categories, and translations asynchronously for the current locale.
 * - Displays the product form pre-filled with existing product data.
 * - Handles i18n for all UI text and messages.
 *
 * Props:
 *   - params: Promise resolving to an object containing the current locale and productId.
 *
 * Usage:
 *   Used as the edit page for products in the admin dashboard.
 *
 * Best Practices:
 *   - Ensure product and category data are loaded before rendering the form.
 *   - Keep form logic modular and maintainable.
 */

import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { getProduct, getProducts } from "@/server/db/products";
import { redirect } from "next/navigation";
import Form from "../../_components/Form";
import { getCategories } from "@/server/db/categories";
import getTrans from "@/lib/translation";

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({ productId: product.id }));
}
async function EditProductPage({
  params,
}: {
  params: Promise<{ locale: Locale; productId: string }>;
}) {
  const { productId, locale } = await params;
  const translations = await getTrans(locale);
  const product = await getProduct(productId);
  const categories = await getCategories();

  if (!product) {
    redirect(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
  }

  return (
    <main>
      <section>
        <div className="container">
          <Form
            categories={categories}
            translations={translations}
            product={product}
          />
        </div>
      </section>
    </main>
  );
}

export default EditProductPage;
