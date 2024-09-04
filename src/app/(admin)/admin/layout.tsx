import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Inter as FontSans } from "next/font/google";
import Providers from "@/context/TrpcProvider";
import MenuBar from "@/components/admin/navigationLayout/MenuBar";
import Header from "@/components/admin/navigationLayout/Header";

import { Suspense } from "react";
import InitialStateDispatcher from "@/wrapper/admin/Schedule/initial-state-dispatcher";
import { Skeleton } from "@/components/ui/skeleton";
import ScheduleBarWrapper from "@/container/admin/schedule/ScheduleBarWrapper";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <InitialStateDispatcher>
        <MenuBar />
        <Header>
          <Toaster />
          <Providers>
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <NextSSRPlugin
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              {children}

              <ScheduleBarWrapper />
            </Suspense>
          </Providers>
        </Header>
      </InitialStateDispatcher>
    </div>
  );
}
