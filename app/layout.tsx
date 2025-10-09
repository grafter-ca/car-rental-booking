// app/layout.tsx
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ClientAuthWrapper from "@/components/ClientAuthWrapper";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DriveEasy Rentals",
  description: "Premium car rental service",
};

// This needs to be a client component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<body
  suppressHydrationWarning
  className={`${outfit.className} antialiased flex flex-col min-h-screen`}
>        {/* Wrap only inside body */}
        <ClerkProvider>
          <ClientAuthWrapper>{children}</ClientAuthWrapper>
        </ClerkProvider>
      </body>
    </html>
  );
}
