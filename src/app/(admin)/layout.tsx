import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Providers from "@/context/TrpcProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { CounterStoreProvider } from "@/providers/counter-store-provider";
import MenuBar from "@/components/admin/navigationLayout/MenuBar";
import Header from "@/components/admin/navigationLayout/Header";
import HeaderNav from "@/components/admin/navigationLayout/HeaderNav";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body
        className={cn(
          "min-h-screen dark bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <CounterStoreProvider>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
              <MenuBar />
              <Header>{children}</Header>
            </div>
          </CounterStoreProvider>
        </Providers>
      </body>
    </html>
  );
}

{/* uncomment add this below <MenuBar/>, if you want to do not want to pass children inside header component */}
{/* <div className="">
  <HeaderNav/>
  {children}
</div> */}