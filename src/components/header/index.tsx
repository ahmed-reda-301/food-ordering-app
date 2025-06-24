
import { Routes } from "@/constants/enums";
import Link from "../link"; // Adjust the import path as necessary

function Header() {
  return (
    <header>
      <div className="container">
        <Link href={Routes.ROOT}> 🍕 Pizza</Link>
      </div>
    </header>
  );
}

export default Header;
