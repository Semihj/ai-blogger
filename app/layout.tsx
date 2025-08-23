import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import ConvexClientProvider from "@/providers/convexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI blogger",
  description:
    "AI Blogger will unlock your content marketing potential. Our AI writing tool helps you create compelling blog posts that resonate with your audience.",
  verification: {
    google: "UApSZeR33HLw88rPsKyPEPQPVAdktXiWdNGi2fuKULU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClerkProvider>
          <ConvexClientProvider>
            <div className="flex flex-col w-full h-full">
              {children}
              <Toaster />
            </div>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
