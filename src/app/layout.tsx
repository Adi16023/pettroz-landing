import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Petrozz is one brand with two products: petrol pump management, and standalone attendance & payroll for any business.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${inter.className}`}>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <a href="#main-content" className="fixed top-3 left-3 z-50 -translate-y-24 rounded-full bg-navy px-5 py-3 text-sm text-white focus:translate-y-0">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
