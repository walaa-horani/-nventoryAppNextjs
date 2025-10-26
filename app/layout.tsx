import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Inventory App - Manage Your Products Efficiently",
    template: "%s | Inventory App"
  },

  description: "Manage your inventory efficiently with our intuitive product management system. Track products, monitor stock levels, and streamline your business operations.",
  keywords: ["inventory management", "product tracking", "stock management", "inventory system", "business management"],
 authors: [{ name: "inventory management" }],
  creator: "inventory management",
  publisher: "inventory management",
  metadataBase : new URL("https://nventory-app-nextjs.vercel.app/"),
  openGraph:{
     type: "website",
      locale: "en_US",
    url: "https://nventory-app-nextjs.vercel.app/", 
    
     title: "Inventory App - Manage Your Products Efficiently",
    description: "Manage your inventory efficiently with our intuitive product management system. Track products, monitor stock levels, and streamline your business operations.",
    siteName: "Inventory App",

    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Inventory App Dashboard",
      },
    ]


  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><StackProvider app={stackClientApp}><StackTheme>
        {children}
      </StackTheme></StackProvider></body>
    </html>
  );
}
