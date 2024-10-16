"use client";
import { BiLogOut } from "react-icons/bi";

import Link from 'next/link';
import Image from 'next/image';
import { sidebarLinks } from '../../constants/index.js';
import { usePathname, useRouter } from 'next/navigation';
import { SignedIn, SignOutButton, useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

function Left() {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  // Redirect after sign-out
  useEffect(() => {
    const handleSignOut = () => {
      router.push('/sign-in');
    };

    const signOutButton = document.querySelector('.cl-sign-out-button');
    if (signOutButton) {
      signOutButton.addEventListener('click', handleSignOut);
    }

    return () => {
      if (signOutButton) {
        signOutButton.removeEventListener('click', handleSignOut);
      }
    };
  }, [router]);

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="w-full flex-1 gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

          if (link.route === '/profile') link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
            >
            <div className='font-bold h-5 text-primary_text text-heading3-bold'>{link.logo}</div>
              
              <p className='text-primary_text max-lg:hidden'>
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className='mt-10 px-6'>
        <SignedIn>
          <SignOutButton>
            <div className="flex flex-row items-center cursor-pointer gap-4 p-4 cl-sign-out-button">
              <BiLogOut className="font-bold h-7 text-primary_text text-heading2-bold "/>
              <p className='text-primary_text max-lg:hidden'>
                Logout
              </p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default Left;
