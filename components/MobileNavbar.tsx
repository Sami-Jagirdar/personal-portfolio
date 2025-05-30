"use client";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { TbMenu2 } from "react-icons/tb";

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
    }
]

const MobileNavbar = () => {
    const pathname = usePathname();
  return (
    <Sheet>
        <SheetTrigger className="flex justify-center items-center" aria-label="Open menu">
            <TbMenu2 size={32} color="text-accent" />
        </SheetTrigger>
        <SheetContent>
        <SheetTitle className="text-center text-accent"></SheetTitle>
            <nav className="flex flex-col gap-4 items-center mt-8">
            {links.map((link, index) => {
                return (
                <Link key={index} href={link.path} 
                className={`
                    text-lg
                    transition-all
                    duration-500
                    ${pathname === link.path 
                    ? "text-accent drop-shadow-spotlight animate-spotlight"
                    : "text-white"}
                `}>
                    {link.name}
                </Link>
                );
            })}
            </nav>
        </SheetContent>
    </Sheet>
  )
}

export default MobileNavbar