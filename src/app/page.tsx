import About from "@/components/about";
import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";
import { db } from "@/lib/prisma";
import Contact from "@/components/contact";
export default async function Home() {
  // This is the main page of your application
  // It serves as the entry point for your app and can be used to display the homepage content.
  // by default, the component is server-side rendered (SSR) in Next.js and runs on the server.
  // You can fetch data from the database directly without the need for API calls.

  // You can add components, fetch data, and render UI elements here.
  // You can fetch data from the database here if needed
  // For example, fetching All products or best sellers
  const products = await db.product.findMany();
  // Uncomment the following line to log the products fetched from the database
  console.log("Fetched products:", products); // This will log all products to the console taht meening you can see them in the server logs

  return (
    <main>
      <Hero />
      <BestSellers />
      <About />
      <Contact />
    </main>
  );
}
