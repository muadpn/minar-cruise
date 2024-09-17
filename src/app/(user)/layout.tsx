import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "@/context/TrpcProvider";
import Navbar from "@/components/navbar/Navbar";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer/Footer";
import WhatsappButton from "@/components/whatsapp/WhatsappButton";
import GoogleRecaptchaWrappers from "@/context/ReCaptchaWrapper";
// import Footer from "@/components/footer/Footer";

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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <GoogleRecaptchaWrappers>
          <Providers>
            {/* <CounterStoreProvider> */}
            <Navbar />
            <Toaster />

            {children}
            {modal}
            <div id="modal-root" />
            <WhatsappButton />
            <Footer />

            {/* </CounterStoreProvider> */}
          </Providers>
        </GoogleRecaptchaWrappers>
      </body>
      <Script defer src="https://checkout.razorpay.com/v1/checkout.js" />
    </html>
  );
}
