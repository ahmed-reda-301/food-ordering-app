import { Routes } from "@/constants/enums";
import Link from "../link"; // Adjust the import path as necessary
import Navbar from "./Navbar";
import CartButton from "./cart-button";

function Header() {
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between gap-6 lg:gap-10">
        <Link
          href={Routes.ROOT}
          className="text-primary font-semibold text-2xl"
        >
          {" "}
          🍕 Pizza
        </Link>
        <Navbar />
        <CartButton />
      </div>
    </header>
  );
}

export default Header;
