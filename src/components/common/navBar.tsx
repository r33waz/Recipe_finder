"use client";
import React, { useState } from "react";
import ModeToggle from "@/components/ui/themeSwitcher";
import Logo from "@/assets/image/sec_logo.jpeg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState<boolean>(false);

  const navCategory = [
    { name: "Home", link: "/" },
    { name: "Recipe", link: "/recipe" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <>
      <header className="px-4">
        <div className="sticky top-0 z-50 flex items-center w-full py-2 bg-white dark:bg-dark_mode justify-between px-4 shadow-sm dark:text-white text-black dark:shadow-white">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              width={60}
              height={40}
              className="rounded-full"
            />
          </Link>
          <div className="flex items-center">
            {/* Links hidden on mobile, shown on larger screens */}
            {navCategory.map((item) => (
              <Link
                href={item.link}
                key={item.name}
                className={`px-4 hover:text-primary hidden items-center md:flex ${
                  pathname === item?.link
                    ? "underline underline-offset-2 dark:decoration-white decoration-black"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="md:hidden flex ">
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  onClick={() => setOpen(!isOpen)}
                >
                  <path
                    fill="currentColor"
                    d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  onClick={() => setOpen(!isOpen)}
                >
                  <path
                    fill="currentColor"
                    d="M4 17.27v-1h16v1zm0-4.77v-1h16v1zm0-4.77v-1h16v1z"
                  />
                </svg>
              )}
            </div>
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-14 left-0 w-full bg-white dark:bg-dark_mode shadow-md z-40">
            <nav className="flex flex-col space-y-2 px-4 py-4">
              {navCategory.map((item) => (
                <Link
                  href={item.link}
                  key={item.name}
                  className={`px-4 py-2 hover:text-primary ${
                    pathname === item.link
                      ? "underline underline-offset-2 dark:decoration-white decoration-black"
                      : ""
                  }`}
                  onClick={() => setOpen(false)} // Close the menu on link click
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export default NavBar;
