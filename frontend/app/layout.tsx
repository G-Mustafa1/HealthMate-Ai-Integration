import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HealthMate — Your Smart Health Companion",
    template: "%s | HealthMate",
  },
  description:
    "Upload medical reports, get simple AI summaries in English and Roman Urdu, and track your vitals in one secure place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ReduxProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <main className="flex-grow">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}