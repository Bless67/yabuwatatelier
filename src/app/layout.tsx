import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Yabuwat Atelier | Modern Nigerian Fashion",
  description:
    "Yabuwat Atelier delivers premium Nigerian-inspired fashion with elegant tailoring, handcrafted details, and a polished online shopping experience.",
  keywords: [
    "Yabuwat Atelier",
    "Nigerian fashion",
    "online boutique",
    "luxury apparel",
    "modern tailoring",
    "crafted clothing",
    "ecommerce",
  ],
  authors: [{ name: "Yabuwat Atelier" }],
  openGraph: {
    title: "Yabuwat Atelier | Modern Nigerian Fashion",
    description:
      "Yabuwat Atelier delivers premium Nigerian-inspired fashion with elegant tailoring, handcrafted details, and a polished online shopping experience.",
    type: "website",
    siteName: "Yabuwat Atelier",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 800,
        alt: "Yabuwat Atelier logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yabuwat Atelier | Modern Nigerian Fashion",
    description:
      "Yabuwat Atelier delivers premium Nigerian-inspired fashion with elegant tailoring, handcrafted details, and a polished online shopping experience.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-cream flex flex-col min-h-screen`}>
        <CartProvider>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
