"use client"


import { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";



function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.add(savedTheme);
    } else {
      document.body.classList.add(theme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
  };

  return (
    <nav className="topbar flex justify-between items-center p-4">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/images/logo.svg" alt="logo" width={28} height={28} onClick={toggleTheme} />
        <p className="text-heading3-bold text-primary_text max-xs:hidden">Let`s Tweet</p>
      </Link>

      <div className="flex items-center gap-4">
        {/* <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button> */}
        

        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
              <BiLogOut className="font-bold h-6 text-primary_text text-heading2-bold "/>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            elements: { orgaizationSwitcherTrigger: "py-2  px-4" },
          }}
        />
      </div>
    </nav>
  );
}

export default Navbar;
