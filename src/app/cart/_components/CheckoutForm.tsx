// CheckoutForm Component
// ----------------------
// This component renders the checkout form for the cart page, allowing users to enter their contact and delivery information.
//
// Features:
// - Fetches cart items from Redux state using a selector (selectCartItems).
// - Calculates the total amount using a utility function (getTotalAmount).
// - Renders a form with fields for phone, address, postal code, city, and country.
// - Displays the total price to pay on the submit button, formatted as currency.
// - Uses custom UI components (Button, Input, Label, Textarea) for consistent styling.
// - The form is only shown if there are items in the cart.
// - Responsive and accessible layout using Tailwind CSS classes.
//
// Usage:
//   <CheckoutForm />
//
// Best Practices:
// - Keeps UI and state logic separated: cart state is managed by Redux, calculations by utilities.
// - Designed to be reusable in the cart page or as a modal.
// - Can be extended to handle form submission, validation, and payment integration.
// - Handles empty cart state by not rendering the form.

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getTotalAmount } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatters";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";

function CheckoutForm() {
  const cart = useAppSelector(selectCartItems);
  const totalAmount = getTotalAmount(cart);
  return (
    cart &&
    cart.length > 0 && (
      <div className="grid gap-6 bg-gray-100 rounded-md p-4">
        <h2 className="text-2xl text-black font-semibold">Checkout</h2>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="phone" className="text-accent">
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="Enter your phone"
                type="text"
                name="phone"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="address" className="text-accent">
                Street address
              </Label>
              <Textarea
                id="address"
                placeholder="Enter your address"
                name="address"
                className="resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-1">
                <Label htmlFor="postal-code" className="text-accent">
                  Postal code
                </Label>
                <Input
                  type="text"
                  id="postal-code"
                  placeholder="Enter postal code"
                  name="postal-code"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="city" className="text-accent">
                  City
                </Label>
                <Input
                  type="text"
                  id="city"
                  placeholder="Enter your City"
                  name="city"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="country" className="text-accent">
                  Country
                </Label>
                <Input
                  type="text"
                  id="country"
                  placeholder="Enter your country"
                  name="country"
                />
              </div>
            </div>
            <Button className="h-10">Pay {formatCurrency(totalAmount)}</Button>
          </div>
        </form>
      </div>
    )
  );
}

export default CheckoutForm;
