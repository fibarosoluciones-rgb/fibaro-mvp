import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "../styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementMarquee } from "@/components/layout/AnnouncementMarquee";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Tu-Line | Alta perfumería y cosmética inteligente",
  description:
    "Tu-Line es la casa boutique que combina perfumería de autor y dermocosmética clínica con experiencias digitales exquisitas.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans text-base text-neutral-900">
        <AnnouncementMarquee />
        <Header />
        <main className="pb-24 pt-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
