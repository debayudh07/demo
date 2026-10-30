import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono, Unbounded } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sneakers Planet · Premium sneaker store",
  description:
    "The right shoe can make everything different. Premium sneakers and watches with cash on delivery and delivery all over India.",
};

export const viewport: Viewport = {
  themeColor: "#0a0b10",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
