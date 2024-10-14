"use client";

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
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
        
              />
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
            <div className="flex cursor-pointer gap-4 p-4 cl-sign-out-button">
              <Image
                src="/images/logout.svg"
                alt="logout"
                width={22}
                height={22}
              />
              <p className='text-light-2 max-lg:hidden'>
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
