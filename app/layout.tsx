import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "NEXORA — Digital Systems & Experiences",
  description:
    "We build what comes next. Digital products, systems and experiences developed to transform complex ideas into real solutions.",
  openGraph: {
    title: "NEXORA — Digital Systems & Experiences",
    description: "Strategy, design and engineering. From complex ideas to digital products that feel effortless to use.",
    type: "website",
    locale: "en_US",
    siteName: "NEXORA",
  },
  twitter: {
    card: "summary",
    title: "NEXORA — Digital Systems & Experiences",
    description: "We build what comes next. Digital products, software and AI.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
    >
      <body className="min-h-full bg-dark text-light">
        {children}
      </body>
    </html>
  );
}
