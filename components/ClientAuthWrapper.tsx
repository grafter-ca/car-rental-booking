// components/ClientAuthWrapper.tsx
"use client";

import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Home/Footer";

export default function ClientAuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </SignedIn>

      <SignedOut>
        <div className="flex items-center justify-center min-h-screen py-20">
          <SignIn afterSignInUrl="/" afterSignUpUrl="/" />
        </div>
      </SignedOut>
    </>
  );
}
