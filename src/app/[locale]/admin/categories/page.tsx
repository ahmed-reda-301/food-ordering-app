/**
 * CategoriesPage Component
 * ------------------------
 * Renders the admin categories management page.
 * - Loads categories and translations asynchronously for the current locale.
 * - Displays a form to add new categories and a list of existing categories.
 * - Handles i18n for all UI text and messages.
 *
 * Props:
 *   - params: Promise resolving to an object containing the current locale.
 *
 * Usage:
 *   Used as the main page for managing categories in the admin dashboard.
 *
 * Best Practices:
 *   - Keep category management logic and UI modular (Form, CategoryItem).
 *   - Ensure translations are up-to-date for all supported locales.
 */

import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { getCategories } from "@/server/db/categories";
import Form from "./_components/Form";
import CategoryItem from "./_components/CategoryItem";

async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const locale = (await params).locale;
  const categories = await getCategories();
  const translations = await getTrans(locale);

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <div className="sm:max-w-[625px] mx-auto space-y-6">
            <Form translations={translations} />
            {categories.length > 0 ? (
              <ul className="flex flex-col gap-4">
                {categories.map((category) => (
                  <CategoryItem key={category.id} category={category} />
                ))}
              </ul>
            ) : (
              <p className="text-accent text-center py-10">
                {translations.noCategoriesFound}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default CategoriesPage;
