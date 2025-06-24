import { Pages, Routes } from "@/constants/enums";
import Link from "../link";
function Navbar() {
  const links = [
    {
      id: crypto.randomUUID(),
      title: "Menu",
      href: Routes.MENU,
    },
    {
      id: crypto.randomUUID(),
      title: "About",
      href: Routes.ABOUT,
    },
    {
      id: crypto.randomUUID(),
      title: "Contact",
      href: Routes.CONTACT,
    },
    {
      id: crypto.randomUUID(),
      title: "Login",
      href: `${Routes.AUTH}/${Pages.LOGIN}`,
    },
  ];
  return (
    <nav className="flex-1 justify-end flex">
      <ul className="fixed lg:static top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10">
        {links.map((link) => (
          <li key={link.id}>
            <Link href={link.href} className="text-accent hover:text-primary duration-200 transition-colors font-semibold">
                {link.title}
            </Link>
            </li>
            ))}
      </ul>
    </nav>
  );
}
export default Navbar;
