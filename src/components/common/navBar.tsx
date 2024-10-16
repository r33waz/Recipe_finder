"use client"
import React from "react";
import ModeToggle from "@/components/ui/themeSwitcher";
import Logo from "@/assets/image/sec_logo.jpeg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname()
  const navCategory = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Category",
      link: "/category",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];
  return (
    <div className="sticky top-0  z-50 flex items-center w-full py-2 dark:text-white text-black bg-white  dark:bg-dark_mode justify-between">
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
        {navCategory.map((item) => (
          <Link
            href={item.link}
            key={item.name}
            className={`px-4 hover:text-primary ${pathname === item?.link ? "underline underline-offset-2 dark:decoration-white decoration-black":""}`}
          >
            {item.name}
          </Link>
        ))}
        <ModeToggle />
      </div>
    </div>
  );
}

export default NavBar;
