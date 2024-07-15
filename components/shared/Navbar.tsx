import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"


function Navbar () {

    const isUserLogin =true ;
    return (
      <nav className="topbar">
        <Link href="/"  className="flex-items-center flex gap-4">
          <Image src="assets/logo.svg" alt="logo" width={28} height= {28} />
          <p className="text-heading3-bold  text-light-1 max-xs:hidden">Threads</p>
        </Link>

        <div className="flex items-center gap-1">
          <div className="block md:hidden">
              <SignedIn>
                <SignOutButton>
                  <div className="flex cursor-pointer">
                    <Image
                    src="/assets/logout.svg"
                    alt="logout"
                    width={22}
                    height={22}
                    />
                  </div>
                </SignOutButton>
              </SignedIn>
          </div>
          <OrganizationSwitcher
              appearance={{
                elements :{ 
                  orgaizationSwitcherTrigger:"py-2  px-4" 
                }
              }}
          />
        </div>
      </nav>
    )
  }
  
  export default Navbar