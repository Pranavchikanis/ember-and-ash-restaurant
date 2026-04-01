import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RESTAURANT_CONFIG } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: `${RESTAURANT_CONFIG.name} | ${RESTAURANT_CONFIG.tagline}`,
    template: `%s | ${RESTAURANT_CONFIG.name}`,
  },
  description: RESTAURANT_CONFIG.description,
  keywords: ["restaurant Mumbai", "wood fired", "fine dining", "Bandra restaurant", "online food order Mumbai", "table reservation Mumbai"],
  openGraph: {
    type: "website",
    siteName: RESTAURANT_CONFIG.name,
    title: `${RESTAURANT_CONFIG.name} | ${RESTAURANT_CONFIG.tagline}`,
    description: RESTAURANT_CONFIG.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
