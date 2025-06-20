"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Projects",
        path: "/projects",
    },
    {
      name: "Experience",
      path: "/experience",
    },
    {
      name: "Contact",
      path: "/contact"
    }
]

const Navbar = () => {
const pathname = usePathname();
  return (
    <nav className="flex gap-8 items-center">
      {links.map((link, index) => {
        return (
          <Link key={index} href={link.path} 
          className={`
            text-lg
            transition-all
            duration-500
            ${pathname === link.path || pathname.startsWith(`${link.path}/`) 
              ? "text-accent drop-shadow-spotlight animate-spotlight"
              : "text-white"}
          `}>
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default Navbar;