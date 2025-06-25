// src/components/menu/MenuItem.tsx
//
// MenuItem Component
// ------------------
// Purpose:
// - Represents a single menu item (e.g., a pizza or drink) in the menu list.
// - Displays product image, name, price, and an add-to-cart button.
//
// Features:
// - Receives item data as props (name, price, image, etc.).
// - Uses formatCurrency utility for price formatting.
// - Integrates AddToCartButton for cart functionality.
// - Responsive and accessible design.
//
// Usage:
// <MenuItem name="Margherita" price={12.99} image="/assets/images/margherita.png" />
//
// Example:
// <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//   {items.map(item => <MenuItem key={item.id} {...item} />)}
// </div>

import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import AddToCartButton from "./add-to-cart-button";

/* eslint-disable @typescript-eslint/no-explicit-any */
function MenuItem({ item }: { item: any }) {
  return (
    <li
      className="p-6 rounded-lg text-center
    group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
    >
      <div className="relative w-48 h-48 mx-auto">
        <Image
          src={item.imageUrl}
          className="object-cover"
          alt={item.name}
          fill
        />
      </div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-xl my-3">{item.name}</h4>
        <strong className="text-accent">
          {formatCurrency(item.basePrice)}
        </strong>
      </div>
      <p className="text-gray-500 text-sm line-clamp-3">{item.description}</p>
      <AddToCartButton item={item} />
    </li>
  );
}

export default MenuItem;
