// src/app/_components/BestSellers.tsx
//
// BestSellers Component
// ---------------------
// Purpose:
// - Displays the "Best Sellers" section on the homepage or menu page.
// - Uses the MainHeading component for a consistent section header.
// - Intended to showcase the most popular or top-selling menu items.
//
// Features:
// - Responsive section layout using Tailwind CSS utility classes.
// - Centered heading with subtitle and title.
// - Placeholder for future dynamic content (e.g., best seller cards from database).
//
// Usage:
// - Import and use <BestSellers /> in your main page (e.g., Home or Menu).
// - You can later extend this component to fetch and display real best seller data.
//
// Example:
// <section>
//   <div className="container">
//     <div className="text-center mb-4">
//       <MainHeading subTitle="checkOut" title="Our Best Sellers" />
//     </div>
//     {/* Best seller items go here */}
//   </div>
// </section>

import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu";

function BestSellers() {
  const bestSellers = [
    // Example best seller items, can be replaced with dynamic data later
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic pizza with fresh mozzarella and basil",
      basePrice: 12.99,
      imageUrl: "/assets/images/margherita.png",
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Spicy pepperoni with melted cheese",
      basePrice: 14.99,
      imageUrl: "/assets/images/pepperoni.png",
    },
    {
      id: 3,
      name: "Veggie Supreme",
      description: "Loaded with fresh vegetables and herbs",
      basePrice: 11.99,
      imageUrl: "/assets/images/veggie.png",
    },
  ]; // Placeholder for best seller items, can be fetched from a database or API later
  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading subTitle={"checkOut"} title={"Our Best Sellers"} />
        </div>
        <Menu items={bestSellers} />

      </div>
    </section>
  );
}

export default BestSellers;
