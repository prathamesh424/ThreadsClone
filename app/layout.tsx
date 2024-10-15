import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Let's Tweet",
};

 
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <html lang="en">
                <body  >{children}</body>
        </html>
      </>   
    );
  }