// -----------------------------------------------------------------------------
// src/app/menu/page.tsx
//
// Menu Page
// ---------
// Purpose:
// - Renders the main menu page, displaying all product categories and their products.
// - Fetches categories and their associated products from the database using getProductsByCategory.
//
// Features:
// - Dynamically lists all categories, each with a styled heading and a Menu component for its products.
// - Uses the Menu component to render products for each category, ensuring type safety and modularity.
// - Gracefully handles the case where no categories are found, displaying a user-friendly message.
// - Fully server-side rendered for fast, SEO-friendly content.
//
// Usage:
//   This page is accessible at /menu and is linked from the main navigation.
//
// Example:
//   <main>
//     <section>
//       <h1>Category Name</h1>
//       <Menu items={category.products} />
//     </section>
//   </main>
//
// Notes:
// - The page is easily extendable for filtering, sorting, or adding category images.
// - Data fetching is abstracted to the server/db layer for maintainability.
// -----------------------------------------------------------------------------

import Menu from "@/components/menu";

import { getProductsByCategory } from "@/server/db/products";

async function MenuPage() {
  const categorites = await getProductsByCategory();
  return (
    <main>
      {categorites.length > 0 ? (
        categorites.map((category) => (
          <section key={category.id} className="section-gap">
            <div className="container text-center">
              <h1 className="text-primary font-bold text-4xl italic mb-6">
                {category.name}
              </h1>
              <Menu items={category.products} />
            </div>
          </section>
        ))
      ) : (
        <p className="text-accent text-center py-20">
            No categories found
        </p>
      )}
    </main>
  );
}

export default MenuPage;