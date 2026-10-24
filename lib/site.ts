// Dados fixos do site. Atualize aqui (horários, telefones, nota do Google, depoimentos).

/**
 * Endereço público do site. Na Vercel vem do domínio de produção do projeto (vira mariaejose.com.br
 * quando o domínio for apontado para lá); fora dela, usa o domínio da casa.
 */
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://mariaejose.com.br";

export type Casa = {
  id: "franca" | "araraquara";
  nome: string;
  desde: string;
  texto: string;
  endereco: string;
  cidade: string;
  whatsapp: string; // como aparece na tela
  whatsappIntl: string; // só dígitos, com 55
  mapa: string;
  /** Delivery pelo Anota Aí. */
  pedido: string;
  foto: { src: string; alt: string; posicao?: string };
  detalhe: { src: string; alt: string; posicao?: string };
};

export const CASAS: Casa[] = [
  {
    id: "franca",
    nome: "Franca",
    desde: "Desde 2017",
    texto:
      "Feita em homenagem à Dona Maria José de Freitas: comida fresca, receitas de família e o cliente amigo.",
    endereco: "Av. Major Nicácio, 2060, Centro",
    cidade: "Franca/SP",
    whatsapp: "(16) 99996-5739",
    whatsappIntl: "5516999965739",
    mapa: "https://www.google.com/maps/search/?api=1&query=Maria+%26+Jos%C3%A9+Parrilla+Av.+Major+Nic%C3%A1cio+2060+Franca+SP",
    pedido: "https://pedido.anota.ai/loja/maria-jose-parrilla-1",
    foto: { src: "/fotos/franca-fachada.jpg", alt: "Fachada da casa de Franca, com o letreiro aceso", posicao: "center 30%" },
    detalhe: { src: "/fotos/franca-arvore.jpg", alt: "O pátio com a árvore, em Franca", posicao: "center 40%" },
  },
  {
    id: "araraquara",
    nome: "Araraquara",
    desde: "Desde 2023",
    texto:
      "Um sobrado tombado de esquina na Rua 5, a rua mais arborizada da cidade, com os cortes Angus da parrilla argentina.",
    endereco: "Rua Voluntários da Pátria, 1505, Centro",
    cidade: "Araraquara/SP",
    whatsapp: "(16) 99713-0782",
    whatsappIntl: "5516997130782",
    mapa: "https://www.google.com/maps/search/?api=1&query=Maria+%26+Jos%C3%A9+Parrilla+Rua+Volunt%C3%A1rios+da+P%C3%A1tria+1505+Araraquara+SP",
    pedido: "https://pedido.anota.ai/loja/maria-jose-parrilla",
    foto: { src: "/fotos/arara-entrada.jpg", alt: "Entrada da casa de Araraquara, com a marquise de vidro", posicao: "center 30%" },
    detalhe: { src: "/fotos/arara-salao.jpg", alt: "O salão de Araraquara, com as mesas postas", posicao: "center" },
  },
];

export const EVENTOS = {
  whatsapp: "(16) 98254-0005",
  whatsappIntl: "5516982540005",
};

export const INSTAGRAM = {
  usuario: "@mariaejoseparrilla",
  url: "https://www.instagram.com/mariaejoseparrilla/",
};

export const GOOGLE = {
  nota: "4,4",
  avaliacoes: 935,
  casa: "Franca",
};

// Funcionamento: terça a domingo (0 = domingo ... 6 = sábado). Minutos desde 0h.
export const HORARIOS = {
  diasAbertos: [0, 2, 3, 4, 5, 6],
  almoco: { abre: 11 * 60, fecha: 16 * 60, rotulo: ["11h", "16h"] },
  jantar: { abre: 18 * 60 + 30, fecha: 23 * 60, rotulo: ["18h30", "23h"] },
};

export const HERO = [
  {
    rotulo: "A noite",
    alt: "Jantar a dois na varanda de Araraquara, à noite",
    desktop: "/fotos/arara-noite.jpg",
    celular: "/fotos/celular/arara-noite.jpg",
    posicao: "center 40%",
  },
  {
    rotulo: "O salão",
    alt: "O salão de Franca cheio, numa comemoração",
    desktop: "/fotos/franca-salao-cheio.jpg",
    celular: "/fotos/celular/franca-salao-cheio.jpg",
    posicao: "center",
  },
  {
    rotulo: "A brasa",
    alt: "Picanha na grelha, sobre a brasa",
    desktop: "/fotos/grelha-horizontal-b.jpg",
    celular: "/fotos/celular/grelha-brasa-caprichada-1.jpg",
    posicao: "center",
  },
  {
    rotulo: "A casa",
    alt: "O pátio e a cozinha aberta da casa de Franca",
    desktop: "/fotos/franca-patio-cozinha.jpg",
    celular: "/fotos/celular/franca-patio-cozinha.jpg",
    posicao: "center",
  },
];

/** ampliada: outra versão da foto para abrir ao tocar (ex.: a brasa vertical abre na horizontal). */
export type FotoMosaico = { src: string; alt: string; forma?: "big" | "tall" | "wide"; posicao?: string; ampliada?: string };

export const MOSAICO: FotoMosaico[] = [
  { src: "/fotos/franca-mesa.jpg", alt: "Salão de Franca, mesa cheia", forma: "big" },
  { src: "/fotos/grelha-brasa-caprichada-2.jpg", alt: "A picanha na grelha, sobre a brasa", forma: "tall", ampliada: "/fotos/grelha-horizontal-b.jpg" },
  { src: "/fotos/prato-mesa.jpg", alt: "O corte servido à mesa" },
  { src: "/fotos/prato-picanha.jpg", alt: "Picanha na pedra" },
  { src: "/fotos/prato-tabua-madeira.jpg", alt: "Corte na mesa de madeira, com os acompanhamentos", forma: "wide", posicao: "center 42%" },
  { src: "/fotos/franca-patio-cozinha.jpg", alt: "O pátio e a cozinha aberta, em Franca", forma: "wide" },
];

// Avaliações reais do Google (copiadas pelo Miguel em 24/10/2026; "[...]" marca trechos omitidos).
export const DEPOIMENTOS = [
  {
    texto:
      "Fui comemorar meu aniversário no restaurante e não conhecia. [...] O ambiente é lindo, muito bem organizado e atende bem desde casais, famílias grandes, turma de amigos e crianças. [...] Os garçons muito atenciosos e sempre prontos a nos atender.",
    origem: "Anna Luiza R. · Avaliação no Google",
  },
  {
    texto:
      "Já visitei diversos restaurantes argentinos no Brasil, e o Maria e José entrou para a lista dos melhores. A carne estava no ponto certo, os acompanhamentos bem feitos e o atendimento de qualidade.",
    origem: "Gustavo · Avaliação no Google · Franca",
  },
  {
    texto: "Ambiente agradável e único na região! Comidas deliciosas, preço justo pela qualidade e cortes nobres! Ótimo atendimento.",
    origem: "Aline B. · Avaliação no Google",
  },
];

export const waLink = (intl: string, texto: string) =>
  `https://wa.me/${intl}?text=${encodeURIComponent(texto)}`;
