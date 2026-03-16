import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "./_components/Header";
import "./globals.css";
import { Suspense } from "react";
import { StepProvider } from "./become-freelancer/_components/Provider";
import { Toaster } from "@/components/ui/sonner";
import { SecondFooter } from "./_components/SecondFooter";

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
            <StepProvider>
              {children}
              <SecondFooter />
            </StepProvider>
            <Toaster />
          </body>
        </html>
      </Suspense>
    </ClerkProvider>
  );
}
