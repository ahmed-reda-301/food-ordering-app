// -----------------------------------------------------------------------------
// src/lib/cart.ts
//
// Cart Utility Functions
// ----------------------
// Purpose:
// - Provides utility functions for cart calculations and logic.
// - Used throughout the app to calculate quantities, subtotals, totals, and delivery fees.
//
// Features:
// - deliveryFee: Constant for the delivery fee applied to all orders.
// - getCartQuantity: Returns the total quantity of all items in the cart.
// - getItemQuantity: Returns the quantity of a specific item in the cart by ID.
// - getSubTotal: Calculates the subtotal (sum of all items, sizes, and extras).
// - getTotalAmount: Calculates the total amount including delivery fee.
//
// Usage:
//   import { getCartQuantity, getSubTotal, getTotalAmount } from '@/lib/cart';
//   const quantity = getCartQuantity(cart);
//   const subtotal = getSubTotal(cart);
//   const total = getTotalAmount(cart);
//
// Best Practices:
// - Keeps business logic out of UI components for maintainability.
// - All calculations are type-safe and handle optional fields (size, extras, quantity).
// - Can be extended for discounts, taxes, or other pricing logic.
// -----------------------------------------------------------------------------

import { CartItem } from '@/redux/features/cart/cartSlice';

export const deliveryFee = 5;

export const getCartQuantity = (cart: CartItem[]) => {
  return cart.reduce((quantity, item) => item.quantity! + quantity, 0);
};

export const getItemQuantity = (id: string, cart: CartItem[]) => {
  return cart.find((item) => item.id === id)?.quantity || 0;
};

export const getSubTotal = (cart: CartItem[]) => {
  return cart.reduce((total, cartItem) => {
    // item.basePrice + item.size.price + extra prices
    const extrasTotal = cartItem.extras?.reduce(
      (sum, extra) => sum + (extra.price || 0),
      0
    );

    const itemTotal =
      cartItem.basePrice + (extrasTotal || 0) + (cartItem.size?.price || 0);

    return total + itemTotal * cartItem.quantity!;
  }, 0);
};

export const getTotalAmount = (cart: CartItem[]) => {
  return getSubTotal(cart) + deliveryFee;
};