import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "@/context/TrpcProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <Providers>
            {/* <CounterStoreProvider> */}
            <Navbar />
            <Toaster />

            {children}
            <Footer />
            {/* </CounterStoreProvider> */}
          </Providers>
        </body>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}
