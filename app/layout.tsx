import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/providers/global";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "33cm - Diablo IV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GlobalProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </GlobalProvider>
    </html>
  );
}
