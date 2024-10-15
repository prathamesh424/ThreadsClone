import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  theme: string;
  toggleTheme: () => void;
};
 
function Navbar({ theme, toggleTheme }: NavbarProps) {
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
                <Image src="/images/logout.svg" alt="logout" width={22} height={22} />
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
