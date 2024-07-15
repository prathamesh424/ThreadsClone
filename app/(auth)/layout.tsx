import { Metadata } from 'next';
import '../globals.css' ;
import { Inter} from 'next/font/google'
import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';



const inter = Inter({subsets: ['latin']})

export const metadata : Metadata ={
    title: 'Threads',
    description: ' A Next.js 13 Social Threads Webapp',
}

export default function RootLayout ({children} :
    {children : React.ReactNode}){
        return (
            <ClerkProvider>
                <html lang='en'>
                    <body className={`${inter.className}  bg-dark-1`}>
                        {children}
                    </body>
                </html>
            </ClerkProvider>
        )
    }