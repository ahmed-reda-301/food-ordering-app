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

function BestSellers() {

  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading subTitle={"checkOut"} title={"Our Best Sellers"} />
        </div>

      </div>
    </section>
  );
}

export default BestSellers;
