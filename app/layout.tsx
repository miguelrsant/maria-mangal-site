import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { CASAS, GOOGLE, INSTAGRAM, SITE_URL } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const jost = Jost({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jost", display: "swap" });

const DESC =
  "Parrilla argentina em Franca e Araraquara. Cortes Angus na brasa de carvão, vinho na taça e uma casa feita para comemorar. Reservas pelo WhatsApp, terça a domingo.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Maria & José Parrilla · Franca e Araraquara",
  description: DESC,
  openGraph: {
    title: "Maria & José Parrilla",
    description: "A noite começa na brasa. Parrilla argentina em Franca e Araraquara.",
    images: [{ url: "/fotos/franca-salao-cheio.jpg", width: 2000, height: 1124, alt: "O salão da Maria & José cheio" }],
    locale: "pt_BR",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#15110e" };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": CASAS.map((c) => ({
    "@type": "Restaurant",
    name: `Maria & José Parrilla · ${c.nome}`,
    servesCuisine: ["Argentina", "Parrilla", "Carnes"],
    address: {
      "@type": "PostalAddress",
      streetAddress: c.endereco,
      addressLocality: c.nome,
      addressRegion: "SP",
      addressCountry: "BR",
    },
    telephone: `+${c.whatsappIntl}`,
    url: SITE_URL,
    image: `${SITE_URL}${c.foto.src}`,
    sameAs: [INSTAGRAM.url],
    acceptsReservations: true,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "11:00", closes: "16:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "18:30", closes: "23:00" },
    ],
    ...(c.id === "franca"
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: GOOGLE.nota.replace(",", "."), reviewCount: GOOGLE.avaliacoes } }
      : {}),
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
