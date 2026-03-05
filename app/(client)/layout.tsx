import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "../_components/Header";
import "../globals.css";
import { Footer } from "../_components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="mn">
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
