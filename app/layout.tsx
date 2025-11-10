import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Inter, Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "./context/SidebarContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omnistock",
  description: "Simple Inventory Management System built with Next.js, TypeScript, and Prisma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${roboto.variable} ${inter.variable} antialiased`}
      >
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <Toaster />
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </StackTheme>
        </StackProvider></body>
    </html>
  );
}
