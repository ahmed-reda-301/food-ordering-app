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
import { db } from "@/lib/prisma"; // Import your database client
import { getBestSellers } from "@/server/db/products";

async function BestSellers() {
  // add categories to the database

  // const _categories = await db.category.createMany({
  //   data: [
  //     { name: "Pizzas" },
  //     { name: "Burgers" },
  //     { name: "Salads" },
  //     { name: "Desserts" },
  //   ],
  // });

  // add products in Classic Pizzas category to the database

  // const _products = await db.product.createMany({
  //   data: [
  //     {
  //       name: "Margherita Pizza",
  //       description: "Classic pizza with fresh mozzarella and basil",
  //       basePrice: 12.99,
  //       imageUrl: "/assets/images/margherita.png",
  //       categoryId: "a6ef6116-0c79-4938-b598-eb9929b4b6a8", // Replace with actual category ID
  //     },
  //     {
  //       name: "Pepperoni Pizza",
  //       description: "Spicy pepperoni with melted cheese",
  //       basePrice: 14.99,
  //       imageUrl: "/assets/images/pepperoni.png",
  //       categoryId: "a6ef6116-0c79-4938-b598-eb9929b4b6a8",
  //     },
  //     {
  //       name: "Veggie Supreme",
  //       description: "Loaded with fresh vegetables and herbs",
  //       basePrice: 11.99,
  //       imageUrl: "/assets/images/veggie.png",
  //       categoryId: "a6ef6116-0c79-4938-b598-eb9929b4b6a8",
  //     },
  //   ],
  // });

  // add products in Specialty Pizzas category to the database
  // const _specialtyPizzas = await db.product.createMany({
  //   data: [
  //     {
  //       name: "BBQ Chicken Pizza",
  //       description: "Grilled chicken with BBQ sauce and red onions",
  //       basePrice: 15.99,
  //       imageUrl: "/assets/images/bbq-chicken.png",
  //       categoryId: "2a380919-28f0-4ec2-8983-7cb97e8e9f06", // Replace with actual category ID
  //     },
  //     {
  //       name: "Hawaiian Pizza",
  //       description: "Ham, pineapple, and cheese on a classic crust",
  //       basePrice: 13.99,
  //       imageUrl: "/assets/images/hawaiian.png",
  //       categoryId: "2a380919-28f0-4ec2-8983-7cb97e8e9f06",
  //     },
  //     {
  //       name: "Meat Lovers Pizza",
  //       description: "Pepperoni, sausage, and bacon on a cheesy base",
  //       basePrice: 16.99,
  //       imageUrl: "/assets/images/meat-lovers.png",
  //       categoryId: "2a380919-28f0-4ec2-8983-7cb97e8e9f06",
  //     },
  //   ],
  // });

  //add sizes to the database

  // const _sizes = await db.size.createMany({
  //   data: [
  //       { name: "MEDIUM", price: 2, productId: "cmcdxkjsy001h8rn1zgsr20kl" },
  //       { name: "LARGE", price: 4, productId: "cmcdxkjsy001h8rn1zgsr20kl" },
  //       { name: "SMALL", price: 0, productId: "cmcdxkjsy001h8rn1zgsr20kl" }, // Replace with actual product IDs
  //     ],
  //   });

  // add extras to the database]

  // const _extras = await db.extra.createMany({
  //   data: [
  //       { name: "CHEESE", price: 2, productId: "cmcdxkjsy001h8rn1zgsr20kl" }, // Replace with actual product IDs
  //       { name: "BACON", price: 3, productId: "cmcdxkjsy001h8rn1zgsr20kl" },
  //       { name: "TOMATO", price: 1, productId: "cmcdxkjsy001h8rn1zgsr20kl" },
  //       { name: "ONION", price: 1, productId: "cmcdxkjsy001h8rn1zgsr20kl" },
  //       { name: "PEPPER", price: 1, productId: "cmcdxkjsy001h8rn1zgsr20kl" },
  //   ],
  // });

  // Placeholder for best seller items, can be replaced with dynamic data later

  //   const bestSellers = [
  //     // Example best seller items, can be replaced with dynamic data later
  //     {
  //       id: 1,
  //       name: "Margherita Pizza",
  //       description: "Classic pizza with fresh mozzarella and basil",
  //       price: 12.99,
  //       imageUrl: "/assets/images/margherita.png",
  //     },
  //     {
  //       id: 2,
  //       name: "Pepperoni Pizza",
  //       description: "Spicy pepperoni with melted cheese",
  //       basePrice: 14.99,
  //       imageUrl: "/assets/images/pepperoni.png",
  //     },
  //     {
  //       id: 3,
  //       name: "Veggie Supreme",
  //       description: "Loaded with fresh vegetables and herbs",
  //       basePrice: 11.99,
  //       imageUrl: "/assets/images/veggie.png",
  //     },
  //   ]; // Placeholder for best seller items, can be fetched from a database or API later

  //   const bestSellers = await db.product.findMany({
  //     include: { sizes: true, extras: true },
  //   }); // Fetching best sellers from the database using Prisma Client and including sizes and extras

  const bestSellers = await getBestSellers(); // Fetching best sellers from the database using a server-side function

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
