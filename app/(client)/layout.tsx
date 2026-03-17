import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "../_components/Header";
import "../globals.css";
import { Footer } from "../_components/Footer";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  let cartCount = 0;

  if (userId) {
    try {
      cartCount = await prisma.booking.count({
        where: {
          userId,
          status: "PENDING",
        },
      });
    } catch (error) {
      console.error("cartCount error:", error);
      cartCount = 0;
    }
  }
  return (
    <ClerkProvider>
      <Suspense>
        <Header cartCount={cartCount} />
        {children}
        <Footer />
      </Suspense>
    </ClerkProvider>
  );
}
