// -----------------------------------------------------------------------------
// src/components/menu/index.tsx
//
// Menu Component
// --------------
// Purpose:
// - Renders a list/grid of menu items (e.g., pizzas, drinks, etc.) using the MenuItem component.
// - Receives an array of ProductWithRelations (with sizes, extras, etc.) as a prop.
//
// Features:
// - Responsive grid layout for displaying menu items.
// - Uses the strongly-typed ProductWithRelations for type safety and consistency.
// - Gracefully handles empty product lists with a user-friendly message.
// - Each MenuItem receives the full product object for detailed rendering.
//
// Usage:
//   <Menu items={products} />
//
// Example:
//   <section>
//     <div className="container">
//       <Menu items={products} />
//     </div>
//   </section>
//
// Notes:
// - The component is now fully typed and expects data from the database (not static data).
// - Easily extendable for filtering, sorting, or pagination in the future.
// -----------------------------------------------------------------------------

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
    <p className="text-accent text-center">No products found</p>
  );
}

export default Menu;
