/**
 * MenuItems Component
 * -------------------
 * Renders a grid/list of products for the admin menu items page.
 * - Displays product image, name, and edit link for each product.
 * - i18n-ready: Uses translations for empty state message.
 *
 * Props:
 *   - products: Array of product objects to display.
 *
 * Usage:
 *   <MenuItems products={products} />
 *
 * Best Practices:
 *   - Ensure product data includes all necessary fields (image, name, id).
 *   - Use Next.js <Image /> for optimized images.
 *   - Keep UI responsive and accessible.
 */

import Link from "@/components/link";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { Product } from "@prisma/client";
import Image from "next/image";

async function MenuItems({ products }: { products: Product[] }) {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  return products && products.length > 0 ? (
    <ul className="grid grid-cols-3 gap-4 sm:max-w-[625px] mx-auto">
      {products.map((product) => (
        <li
          key={product.id}
          className="bg-gray-100 hover:bg-gray-200 duration-200 transition-colors rounded-md"
        >
          <Link
            href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${product.id}/${Pages.EDIT}`}
            className="element-center flex-col py-4"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={100}
              height={100}
            />
            <h3 className="text-lg text-accent font-medium">{product.name}</h3>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-accent text-center">{translations.noProductsFound}</p>
  );
}

export default MenuItems;
