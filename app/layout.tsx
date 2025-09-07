import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedOut, SignIn, SignedIn } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Home/Footer"; // Import your Footer component

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // adjust as needed
  display: "swap",
});

export const metadata: Metadata = {
  title: "DriveEasy Rentals",
  description: "Premium car rental service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${outfit.className} antialiased flex flex-col min-h-screen`}
        >
          <SignedIn>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </SignedIn>

          <SignedOut>
            <div className="flex items-center justify-center min-h-screen py-20">
              <SignIn />
            </div>
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
