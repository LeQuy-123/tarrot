import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SettingsApplier } from "@/components/ui/SettingsApplier";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { SkipLink } from "@/components/ui/SkipLink";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: {
    default: "ARCANA — The Astral Archive",
    template: "%s · ARCANA",
  },
  description:
    "An immersive 3D tarot reading chamber with an original 78-card deck and AI-assisted interpretations for reflection.",
};

export const viewport: Viewport = {
  themeColor: "#05060d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <div className="astral-backdrop" aria-hidden="true" />
        <SettingsApplier />
        <SkipLink />
        <SiteHeader />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
