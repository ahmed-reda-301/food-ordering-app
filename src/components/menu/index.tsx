// src/components/menu/index.tsx
//
// Menu Component
// --------------
// Purpose:
// - Displays the list of menu items (e.g., pizzas, drinks, etc.) on the menu page.
// - Fetches and renders a collection of MenuItem components.
//
// Features:
// - Responsive grid or list layout for menu items.
// - Uses MenuItem component for each product.
// - Can be extended to fetch data from an API or database.
//
// Usage:
// <Menu />
//
// Example:
// <section>
//   <div className="container">
//     <Menu />
//   </div>
// </section>

import MenuItem from "./MenuItem";
import { ProductWithRelations } from "@/types/product";

function Menu({ items }: { items: ProductWithRelations[] }) {
  return items.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  ) : (
    <p className="text-accent text-center">No items found</p>
  );
}

export default Menu;
