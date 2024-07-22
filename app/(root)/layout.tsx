import { Metadata } from 'next';
import '../globals.css' ;
import {Inter} from 'next/font/google'
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import Left from '@/components/shared/Left';
import Right from '@/components/shared/Right';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';




const inter = Inter({subsets: ['latin']})

export const metadata : Metadata ={
    title: 'Threads',
    description: ' A Next.js Social Threads Webapp',
}

export default function RootLayout ({children} :
    {children : React.ReactNode}){

        return (
            <ClerkProvider>
                <html>
                    <body className={inter.className}> 
                        < Navbar/>
                        <main className='flex flex-row'>
                            <Left/>
                                <section className='main-container'>
                                    <div className='w-full max-w-4xl'>
                                        {children}
                                    </div>
                                </section>
                            <Right/>
                        </main>
                        <Footer />
                    </body>
                </html>
            </ClerkProvider>
        )
    }