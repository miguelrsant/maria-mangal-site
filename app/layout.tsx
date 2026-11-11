import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { CASAS, MARCA, SITE_URL } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const jost = Jost({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jost", display: "swap" });

const CIDADES = CASAS.map((c) => c.nome).join(" e ");
const DESC = `Parrilla argentina em ${CIDADES}. Cortes nobres na brasa de carvão, vinho na taça e uma casa feita para comemorar. Reservas pelo WhatsApp, terça a domingo.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${MARCA.nome} · Parrilla argentina em ${CIDADES}`,
    template: `%s · ${MARCA.nome}`,
  },
  description: DESC,
  applicationName: MARCA.nome,
  keywords: ["parrilla argentina", "restaurante argentino", "churrasco argentino", "cortes nobres na brasa", "restaurante para comemorar aniversário", "eventos e buffet de parrilla", MARCA.curto],
  category: "restaurant",
  openGraph: {
    title: MARCA.nome,
    description: `A noite começa na brasa. Parrilla argentina em ${CIDADES}: cortes nobres, vinho na taça e uma casa feita para comemorar.`,
    url: "/",
    siteName: MARCA.nome,
    locale: "pt_BR",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: MARCA.nome, description: `A noite começa na brasa. Parrilla argentina em ${CIDADES}.` },
  alternates: { canonical: "/" },
  // Restaurante fictício (site de demonstração): fica fora dos buscadores.
  // Num site real: index/follow true, com googleBot { "max-image-preview": "large", "max-snippet": -1 }.
  robots: { index: false, follow: false },
  formatDetection: { telephone: false },
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
      name: MARCA.nome,
      url: SITE_URL,
      logo: `${SITE_URL}/apple-icon.png`,
      slogan: MARCA.slogan,
      foundingDate: "2016",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#site`,
      url: SITE_URL,
      name: MARCA.nome,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#marca` },
    },
    ...CASAS.map((c) => ({
      "@type": "Restaurant",
      "@id": `${SITE_URL}/#${c.id}`,
      name: `${MARCA.nome} · ${c.nome}`,
      description: c.texto,
      parentOrganization: { "@id": `${SITE_URL}/#marca` },
      servesCuisine: ["Argentina", "Parrilla", "Carnes"],
      address: {
        "@type": "PostalAddress",
        streetAddress: `${c.endereco}, ${c.bairro}`,
        addressLocality: c.nome,
        addressRegion: "SP",
        addressCountry: "BR",
      },
      telephone: `+${c.whatsappIntl}`,
      url: `${SITE_URL}/#casa`,
      hasMap: c.mapa,
      image: [`${SITE_URL}${c.foto.src}`, `${SITE_URL}${c.detalhe.src}`],
      acceptsReservations: true,
      potentialAction: [
        { "@type": "ReserveAction", target: `https://wa.me/${c.whatsappIntl}`, result: { "@type": "FoodEstablishmentReservation", name: "Reserva de mesa" } },
        { "@type": "OrderAction", target: c.pedido, deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet" },
      ],
      openingHoursSpecification: HORAS,
      // Num site real, entra aqui o aggregateRating com a nota e o total de avaliações do Google.
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
