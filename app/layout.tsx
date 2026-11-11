import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { pageMeta } from "@/lib/meta";
import { AUTOR, MARCA, SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const jost = Jost({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jost", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMeta({ path: "/", titulo: SITE.titulo, descricao: SITE.descricao }),
  applicationName: MARCA.nome,
  authors: [{ name: AUTOR.nome, url: AUTOR.url }],
  creator: AUTOR.nome,
  keywords: ["site para restaurante", "site de parrilla argentina", "site com reserva pelo WhatsApp", "modelo de site para restaurante", "site conceito", MARCA.curto, AUTOR.nome],
  category: "restaurant",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
  other: { "is-agentic-site-type": "content" },
};

export const viewport: Viewport = { themeColor: "#15110e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
