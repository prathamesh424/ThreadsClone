import { Metadata } from 'next';
import '../globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import Left from '@/components/shared/Left';
import Right from '@/components/shared/Right';
 import { Toaster } from 'react-hot-toast'; // Import Toaster component
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Let's Tweet",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar theme={''} toggleTheme={function (): void {
            throw new Error('Function not implemented.');
          } } />
          <main className="flex flex-row">
            <Left />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <Right />
          </main>
          <Footer />

          {/* Toaster component for toast notifications */}
          <Toaster position="top-right" reverseOrder={false} />
        </body>
      </html>
    </ClerkProvider>
  );
}