// Dados fixos do site. Atualize aqui (horários, telefones, nota do Google, depoimentos).
// Maria Mangal Parrilla é um restaurante fictício: site de demonstração. Nomes, endereços,
// telefones e avaliações são inventados.

/** Endereço público do site. Na Vercel vem do domínio de produção do projeto. */
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";

export const MARCA = {
  nome: "Maria Mangal Parrilla",
  curto: "Maria Mangal",
  slogan: "Fogo lento, mesa cheia.",
};

export type Casa = {
  id: "aurora" | "jatoba";
  nome: string;
  desde: string;
  texto: string;
  endereco: string;
  bairro: string;
  cidade: string;
  whatsapp: string; // como aparece na tela
  whatsappIntl: string; // só dígitos, com 55
  mapa: string;
  /** Pedido para entrega, pelo WhatsApp da casa. */
  pedido: string;
  foto: { src: string; alt: string; posicao?: string };
  detalhe: { src: string; alt: string; posicao?: string };
};

export const waLink = (intl: string, texto: string) => `https://wa.me/${intl}?text=${encodeURIComponent(texto)}`;
const mapa = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const CASAS: Casa[] = [
  {
    id: "aurora",
    nome: "Santa Aurora",
    desde: "Desde 2016",
    texto: "A primeira casa: um sobrado de 1920 com varanda de madeira, onde o braseiro da Dona Maria virou parrilla.",
    endereco: "Rua das Figueiras, 120",
    bairro: "Centro",
    cidade: "Santa Aurora/SP",
    whatsapp: "(19) 90000-0101",
    whatsappIntl: "5519900000101",
    mapa: mapa("Rua das Figueiras, 120, Santa Aurora SP"),
    pedido: waLink("5519900000101", "Olá! Gostaria de fazer um pedido para entrega na Maria Mangal Santa Aurora."),
    foto: { src: "/fotos/aurora-fachada.jpg", alt: "Entrada da casa de Santa Aurora, com as luminárias acesas", posicao: "center 84%" },
    detalhe: { src: "/fotos/aurora-varanda.jpg", alt: "A varanda de madeira da casa de Santa Aurora, com as mesas postas", posicao: "center" },
  },
  {
    id: "jatoba",
    nome: "Porto Jatobá",
    desde: "Desde 2022",
    texto: "Um antigo armazém de pedra à beira do rio, com os barris na fachada, a adega à vista e a parrilla no centro do salão.",
    endereco: "Av. Beira-Rio, 845",
    bairro: "Cais Velho",
    cidade: "Porto Jatobá/SP",
    whatsapp: "(19) 90000-0202",
    whatsappIntl: "5519900000202",
    mapa: mapa("Av. Beira-Rio, 845, Porto Jatobá SP"),
    pedido: waLink("5519900000202", "Olá! Gostaria de fazer um pedido para entrega na Maria Mangal Porto Jatobá."),
    foto: { src: "/fotos/jatoba-fachada.jpg", alt: "Fachada de pedra da casa de Porto Jatobá, com os barris iluminados", posicao: "center" },
    detalhe: { src: "/fotos/jatoba-salao.jpg", alt: "Um canto do salão de Porto Jatobá, com tijolo aparente e quadros", posicao: "center 60%" },
  },
];

export const EVENTOS = {
  whatsapp: "(19) 90000-0303",
  whatsappIntl: "5519900000303",
};

export const INSTAGRAM = {
  usuario: "@mariamangal.parrilla",
  url: "https://www.instagram.com/",
};

export const GOOGLE = {
  nota: "4,8",
  avaliacoes: "1.248",
  casa: "Santa Aurora",
  url: "#avaliacoes",
};

// Funcionamento: terça a domingo (0 = domingo ... 6 = sábado). Minutos desde 0h.
export const HORARIOS = {
  diasAbertos: [0, 2, 3, 4, 5, 6],
  almoco: { abre: 11 * 60, fecha: 16 * 60, rotulo: ["11h", "16h"] },
  jantar: { abre: 18 * 60 + 30, fecha: 23 * 60, rotulo: ["18h30", "23h"] },
};

export const HERO = [
  {
    rotulo: "A brasa",
    alt: "Cortes na grelha, sobre a brasa e o fogo",
    desktop: "/fotos/brasa.jpg",
    celular: "/fotos/celular/brasa.jpg",
    posicao: "center 60%",
  },
  {
    rotulo: "A noite",
    alt: "Casal brindando com vinho tinto num jantar a dois",
    desktop: "/fotos/noite.jpg",
    celular: "/fotos/celular/noite.jpg",
    posicao: "center 40%",
  },
  {
    rotulo: "O salão",
    alt: "O salão da casa, com forro de madeira e luz quente",
    desktop: "/fotos/salao.jpg",
    celular: "/fotos/celular/salao.jpg",
    posicao: "center",
  },
  {
    rotulo: "O pátio",
    alt: "O pátio à noite, com as lanternas acesas entre as árvores",
    desktop: "/fotos/patio.jpg",
    celular: "/fotos/celular/patio.jpg",
    posicao: "center",
  },
];

/** ampliada: outra versão da foto para abrir ao tocar (ex.: uma foto em pé que abre na horizontal). */
export type FotoMosaico = { src: string; alt: string; forma?: "big" | "tall" | "wide"; posicao?: string; ampliada?: string };

export const MOSAICO: FotoMosaico[] = [
  { src: "/fotos/brinde.jpg", alt: "Amigos brindando numa mesa do salão", forma: "big" },
  { src: "/fotos/parrillero.jpg", alt: "O parrillero cuidando dos cortes na brasa", forma: "tall", posicao: "center 60%" },
  { src: "/fotos/prato-vinho.jpg", alt: "O corte servido à mesa, com vinho na taça" },
  { src: "/fotos/corte-tabua.jpg", alt: "Corte fatiado na tábua, com sal grosso" },
  { src: "/fotos/grelha.jpg", alt: "Um corte com osso virando na grelha", forma: "wide" },
  { src: "/fotos/mesa-posta.jpg", alt: "Mesa posta à meia-luz, com as taças prontas", forma: "wide", posicao: "center 60%" },
];

// Avaliações inventadas, para demonstração.
export const DEPOIMENTOS = [
  {
    texto:
      "Comemorei meus 40 anos no salão de Santa Aurora e foi tudo no ponto: a carne, o vinho e o cuidado da equipe com cada convidado. Já deixei reservado o ano que vem.",
    origem: "Helena V. · Avaliação no Google · Santa Aurora",
  },
  {
    texto: "O melhor ojo de bife que já comi fora de Buenos Aires. O pátio à noite é lindo e ninguém tem pressa de tirar você da mesa.",
    origem: "Rafael T. · Avaliação no Google · Porto Jatobá",
  },
  {
    texto: "Levamos a família inteira num domingo e fomos recebidos como gente de casa. As crianças adoraram ver a brasa de perto. Voltamos sempre.",
    origem: "Camila e Bruno · Avaliação no Google · Santa Aurora",
  },
];
