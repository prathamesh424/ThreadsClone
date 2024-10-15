"use client"
import '../globals.css';
import { Inter } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import Left from '@/components/shared/Left';
import Right from '@/components/shared/Right';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { Toaster } from 'react-hot-toast'; 
 
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar theme={theme} toggleTheme={toggleTheme} /> 
          <main className="flex flex-row">
            <Left />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <Right />
          </main>
          <Footer />
 
          <Toaster position="top-right" reverseOrder={false} />
        </body>
      </html>
    </ClerkProvider>
  );
}
