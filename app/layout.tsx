import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Suspense } from "react";
import { StepProvider } from "./become-freelancer/_components/Provider";
import { Toaster } from "@/components/ui/sonner";
import HelpButton from "./_components/HelpButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Suspense>
        <html lang="mn">
          <body>
            <StepProvider>{children}</StepProvider>
            <Toaster />
            <HelpButton />
          </body>
        </html>
      </Suspense>
    </ClerkProvider>
  );
}