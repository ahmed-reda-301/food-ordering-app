// CartButton Component
// -------------------
// This component displays a shopping cart icon with a badge showing the total quantity of items in the cart.
// It uses Redux state to get the cart items and a utility function to calculate the total quantity.
//
// Features:
// - Uses a custom Link component to navigate to the cart page.
// - Shows a badge with the current cart quantity (updates reactively).
// - Uses Lucide's ShoppingCartIcon for a modern look.
// - Applies Tailwind CSS classes for styling and hover effects.
//
// Usage:
//   <CartButton />
//
// Best Practices:
// - Keeps UI and state logic separated: cart state is managed by Redux, and quantity calculation is handled by a utility function.
// - The component is a client component ("use client") to access Redux hooks.
// - Designed to be reusable in headers, navbars, or anywhere a cart icon is needed.

'use client';
import React from 'react';
import Link from '../link';
import { Routes } from '@/constants/enums';
import { ShoppingCartIcon } from 'lucide-react';
import { getCartQuantity } from '@/lib/cart';
import { useAppSelector } from '@/redux/hooks';
import { selectCartItems } from '@/redux/features/cart/cartSlice';

const CartButton = () => {
  const cart = useAppSelector(selectCartItems);
  const cartQuantity = getCartQuantity(cart);
  return (
    <Link href={`/${Routes.CART}`} className='block relative group'>
      <span className='absolute -top-4 start-4 w-5 h-5 text-sm bg-primary rounded-full text-white text-center'>
        {cartQuantity}
      </span>
      <ShoppingCartIcon
        className={`text-accent group-hover:text-primary duration-200 transition-colors !w-6 !h-6`}
      />
    </Link>
  );
};

export default CartButton;