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
  title: {
    default: "Maria & José Parrilla · Parrilla argentina em Franca e Araraquara",
    template: "%s · Maria & José Parrilla",
  },
  description: DESC,
  applicationName: "Maria & José Parrilla",
  keywords: [
    "parrilla argentina",
    "restaurante argentino Franca",
    "restaurante argentino Araraquara",
    "churrasco argentino",
    "cortes Angus",
    "parrilla Franca",
    "parrilla Araraquara",
    "restaurante para comemorar aniversário",
    "eventos e buffet de parrilla",
    "Maria e José",
  ],
  category: "restaurant",
  openGraph: {
    title: "Maria & José Parrilla",
    description: "A noite começa na brasa. Parrilla argentina em Franca e Araraquara: cortes Angus, vinho na taça e uma casa feita para comemorar.",
    url: "/",
    siteName: "Maria & José Parrilla",
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Maria & José Parrilla", description: "A noite começa na brasa. Parrilla argentina em Franca e Araraquara." },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
  other: { "geo.region": "BR-SP", "geo.placename": "Franca; Araraquara" },
};

export const viewport: Viewport = { themeColor: "#15110e" };

const HORAS = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "11:00", closes: "16:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "18:30", closes: "23:00" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#marca`,
      name: "Maria & José Parrilla",
      url: SITE_URL,
      logo: `${SITE_URL}/apple-icon.png`,
      slogan: "A Melhor Carne do Mundo.",
      sameAs: [INSTAGRAM.url],
      foundingDate: "2017",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      url: SITE_URL,
      name: "Maria & José Parrilla",
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#marca` },
    },
    ...CASAS.map((c) => ({
      "@type": "Restaurant",
      "@id": `${SITE_URL}/#${c.id}`,
      name: `Maria & José Parrilla · ${c.nome}`,
      description: c.texto,
      parentOrganization: { "@id": `${SITE_URL}/#marca` },
      servesCuisine: ["Argentina", "Parrilla", "Carnes"],
      address: {
        "@type": "PostalAddress",
        streetAddress: c.endereco,
        addressLocality: c.nome,
        addressRegion: "SP",
        addressCountry: "BR",
      },
      telephone: `+${c.whatsappIntl}`,
      url: `${SITE_URL}/#casa`,
      hasMap: c.mapa,
      image: [`${SITE_URL}${c.foto.src}`, `${SITE_URL}${c.detalhe.src}`],
      sameAs: [INSTAGRAM.url],
      acceptsReservations: true,
      potentialAction: [
        { "@type": "ReserveAction", target: `https://wa.me/${c.whatsappIntl}`, result: { "@type": "FoodEstablishmentReservation", name: "Reserva de mesa" } },
        { "@type": "OrderAction", target: c.pedido, deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet" },
      ],
      openingHoursSpecification: HORAS,
      ...(c.id === "franca"
        ? { aggregateRating: { "@type": "AggregateRating", ratingValue: GOOGLE.nota.replace(",", "."), reviewCount: GOOGLE.avaliacoes, bestRating: 5 } }
        : {}),
    })),
  ],
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
