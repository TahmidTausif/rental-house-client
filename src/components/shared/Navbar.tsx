"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; // Importing useSession and signOut from next-auth/react
import logo from "../../assets/rental.png";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { LogOut } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const [dropDownState, setDropDownState] = useState(false);
  const dropDownMenuRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const { data: session } = useSession(); // Get session data
console.log(session?.user?.imageUrl, "user img data")
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const scrollBtn = document.querySelector("button.scroll-to-top") as HTMLElement;
if (scrollBtn) {
  scrollBtn.style.display = dropDownState ? "none" : "flex";
}

    return () => {
      document.body.style.overflow = "auto";
      const scrollBtn = document.querySelector("button.scroll-to-top") as HTMLElement;
      if (scrollBtn) scrollBtn.style.display = "flex";
    };
  }, [dropDownState]);

  const navbarStyles: React.CSSProperties = {
    "--dropText-color": "#414956",
    "--dropBg-color": "#876ff6",
  } as React.CSSProperties;

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Listings", path: "/listing" },
    ...(session?.user?.role === "landlord" ? [{ name: "Add Listing", path: "/dashboard/landlord/add-listing" }] : []),
    { name: "FAQ", path: "/faq" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Contact", path: "/contact" },
  ];

 

  return (
    <nav
      className={`section-padding-x fixed md:fixed lg:absolute z-30 w-full flex items-center justify-between bg-[#b2b2f1] pt-3 lg:container px-3 text-white left-1/2 transform -translate-x-1/2 ${scrolled ? "md:bg-[#b2b2f1] md:py-2" : "bg-transparent"
        }`}
      style={navbarStyles}
    >
      {/* Logo */}
      <div className="scale-100 cursor-pointer rounded-2xl lg:px-3 lg:py-0 py-2 text-xl font-semibold text-white transition-all duration-200">
        <Link href="/" className={`flex items-center lg:flex ${dropDownState ? "md:hidden" : ""}`}>
          <Image src={logo} alt="logo" width={72} height={42} className="font-bold" />
          <p className="text-2xl lg:text-3xl font-bold lg:font-extrabold text-primary">
            Rental<span className="text-secondary">House</span>
          </p>
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden items-center justify-between gap-10 md:gap-5 lg:gap-10 font-semibold lg:flex">
        {menuItems.slice(0, 5).map(({ name, path }) => {
          const isActive = pathname === path;
          return (
            <li
              key={name}
              className={`group flex cursor-pointer flex-col py-6 relative transition-all duration-300 hover:text-secondary ${isActive ? "text-secondary" : "text-primary"
                }`}
            >
              <Link href={path}>{name}</Link>
            </li>
            
          );
        })}

        {/* Avatar and Dropdown (if user is logged in) */}
        <div className="relative">
          {session?.user && (
            <div className="relative">
              <button
                onClick={() => setDropDownState(!dropDownState)}
                className="rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="User Menu"
              >
                <Image
                  src={session?.user?.imageUrl || "/default-avatar.jpg"}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full border border-primary"
                />
              </button>
              {/* Dropdown Menu */}
              {dropDownState && (
                <div className="absolute right-0 mt-2 bg-white text-primary rounded-lg shadow-theme py-2 w-48 z-50">
                  <Link href="/dashboard" className="block px-4 py-2">Dashboard</Link>
                  <button
                    onClick={() => signOut()} // Using signOut() from NextAuth.js to log the user out
                    className="flex items-center gap-2 text-sm px-3 py-2 text-red-400 hover:text-red-500 rounded-md mt-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Login and Signup Buttons */}
        {!session && (
          <><Link href="/login">
            <PrimaryButton customClass="text-base font-semibold">
              Login
            </PrimaryButton></Link>
            <Link href="/register">
            <SecondaryButton customClass="text-base font-semibold">
              Sign up
            </SecondaryButton></Link>
          </>
        )}
      </ul>

      {/* Mobile Hamburger */}
      <div
        ref={dropDownMenuRef}
        onClick={() => setDropDownState(!dropDownState)}
        className="relative flex lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cursor-pointer text-primary"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
