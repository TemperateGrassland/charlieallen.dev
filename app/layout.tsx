import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://charlieallen.dev"),
  title: {
    default: "Charlie Allen | Freelance Software Engineer",
    template: "%s | Charlie Allen",
  },
  description:
    "Freelance software engineer. Four years building AI at Amazon Alexa, two years in cybersecurity at Darktrace, now building and shipping software for the people who need it.",
  keywords: [
    "freelance software engineer UK",
    "software engineer for hire",
    "full-stack developer UK",
    "web application developer",
    "build software for my business",
    "product engineer freelance",
  ],
  openGraph: {
    title: "Charlie Allen | Freelance Software Engineer",
    description:
      "Four years building AI at Amazon Alexa, two years in cybersecurity at Darktrace. Now I build software people can rely on.",
    url: "https://charlieallen.dev",
    siteName: "Charlie Allen",
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
