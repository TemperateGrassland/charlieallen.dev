import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://charlieallen.dev"), // replace with your real domain
  title: {
    default: "Shopify & WhatsApp Integrations | Freelance Developer",
    template: "%s | Shopify & WhatsApp Integrations",
  },
  description:
    "Freelance developer specialising in high-converting Shopify stores and WhatsApp integrations that drive sales, retention, and automation.",
  keywords: [
    "Shopify developer UK",
    "Shopify freelancer UK",
    "Shopify store development",
    "WhatsApp integrations UK",
    "WhatsApp automation UK",
    "ecommerce automation",
    "Shopify WhatsApp integration UK",
  ],
  openGraph: {
    title: "Shopify & WhatsApp Integrations | Freelance Developer",
    description:
      "I build fast, scalable Shopify stores and WhatsApp integrations that help businesses sell more and automate customer engagement.",
    url: "https://charlieallen.dev",
    siteName: "Shopify & WhatsApp Integrations",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
