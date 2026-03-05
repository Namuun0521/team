import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "./_components/Header";
import "./globals.css";
import { Suspense } from "react";
import { StepProvider } from "./become-freelancer/_components/Provider";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Suspense>
        <html lang="en">
          <body>
            <StepProvider>{children}</StepProvider>
            <Toaster />
          </body>
        </html>
      </Suspense>
    </ClerkProvider>
  );
}
