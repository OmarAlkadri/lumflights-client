"use client";
import "./globals.css";

import "@/i18n";
import Providers from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`flex flex-col w-full h-screen bg-white dark:bg-black antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
