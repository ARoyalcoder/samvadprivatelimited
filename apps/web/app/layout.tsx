import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

export const metadata: Metadata = {
  title: "SAMVAD PERCEPTION ADVISORY | Strategic Communications & Reputation Management",
  description:
    "Institutional PR, Strategic Communications, Crisis Architecture, and Perception Intelligence for sovereign leaders, defense contractors, and Fortune 500 enterprises.",
  keywords: [
    "Perception Advisory",
    "Strategic Communications",
    "Reputation Management",
    "Crisis PR",
    "Corporate Communications",
    "Public Affairs",
    "Perception Intelligence",
  ],
  authors: [{ name: "SAMVAD Advisory Group" }],
  creator: "SAMVAD PERCEPTION ADVISORY",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://samvadadvisory.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "SAMVAD PERCEPTION ADVISORY",
    title: "SAMVAD | Strategic Communications & Perception Intelligence",
    description:
      "Architecting enterprise narratives, sovereign reputation defense, and predictive perception management.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAMVAD PERCEPTION ADVISORY",
    description:
      "Enterprise PR, Strategic Communications, Crisis Architecture, and Perception Intelligence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-100 antialiased">
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
