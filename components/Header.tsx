import Link from "next/link";
import Navbar from "./Navbar";
import { Changa_One } from "next/font/google";
import MobileNavbar from "./MobileNavbar";

export const changa_one = Changa_One({
    weight: ["400"],
    variable: "--font-aladin",
    subsets: ["latin"],
  });

const Header = () => {
    return (
        <header className="py-8 xl:py-12 text-white">
            <div className="container mx-auto flex justify-between items-center">
                {/* For now, it's simple text, later design a logo */}
                <Link href="/">
                    <h1 className={changa_one.className + ' text-4xl'} >Sami<span className="text-accent ml-2"> J.</span></h1>
                </Link>

                <div className="hidden lg:flex items-center gap-4">
                    <Navbar />
                </div>

                <div className="lg:hidden">
                    <MobileNavbar />
                </div>
                
            </div>    
        </header>
    );
};

export default Header;