import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI blogger",
  description: "AI Blogger will Unlock your content marketing potential. Our AI writing tool helps you create compelling blog posts that resonate with your audience.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <div className="flex flex-col w-full h-full">
            {children}
            <Toaster />
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
