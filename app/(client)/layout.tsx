import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "../_components/Header";
import "../globals.css";
import { Footer } from "../_components/Footer";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Toaster } from "sonner";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  const cartCount = userId
    ? await prisma.booking.count({ where: { userId, status: "PENDING" } })
    : 0;
  return (
    <ClerkProvider>
      <Suspense>
        <Header cartCount={cartCount} />
        {children}
        <Toaster richColors position="top-right" />
        <Footer />
      </Suspense>
    </ClerkProvider>
  );
}
