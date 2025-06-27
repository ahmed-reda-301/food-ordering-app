// CartPage Component
// ------------------
// This page component renders the main cart view, displaying both the list of cart items and the checkout form.
//
// Features:
// - Uses the CartItems component to show all products currently in the cart, with quantity, extras, and prices.
// - Uses the CheckoutForm component to collect user delivery and contact information, and display the total price.
// - Responsive layout: on large screens, items and form are side by side; on small screens, stacked vertically.
// - Styled with Tailwind CSS utility classes for modern, clean appearance.
// - Includes a prominent page title for clarity and accessibility.
//
// Usage:
//   This is the main page for the /cart route. It is automatically rendered by Next.js when users visit /cart.
//
// Best Practices:
// - Keeps the page layout simple by delegating logic and UI to CartItems and CheckoutForm components.
// - Ensures separation of concerns: this file only handles layout and composition, not business logic.
// - Easy to extend with additional features (e.g., order summary, promo codes, etc.).

import CartItems from "./_components/CartItems";
import CheckoutForm from "./_components/CheckoutForm";

function CartPage() {
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <h1 className="text-primary text-center font-bold text-4xl italic mb-10">
            Cart
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <CartItems />
            <CheckoutForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export default CartPage;
