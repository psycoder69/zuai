import { promiseWithResolversPolyfill } from "@/lib/polyfill";

promiseWithResolversPolyfill();

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZuAI: 24/7 Study Buddy - Score Like a Pro",
  description: "An International Baccalaureate coursework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>

      <body className={inter.className}>
        {children}

        <Toaster />
      </body>
    </html>
  );
}
