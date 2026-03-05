import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "./_components/Header";
import "./globals.css";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Suspense>
        <html lang="mn">
          <body>{children}</body>
        </html>
      </Suspense>
    </ClerkProvider>
  );
}
