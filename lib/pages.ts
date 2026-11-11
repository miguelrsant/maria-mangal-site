// Páginas internas (Sobre, Contato, Privacidade). O HTML e o Markdown saem destes mesmos textos.
// Os textos aceitam links em Markdown: [texto](https://...).
import { AUTOR, MARCA } from "./site";

export interface Bloco {
  h?: string;
  p?: string[];
  lista?: string[];
}
export interface Pagina {
  path: string;
  tipo: "AboutPage" | "ContactPage" | "WebPage";
  rotulo: string;
  h1: string;
  titulo: string;
  descricao: string;
  blocos: Bloco[];
}

export const PAGINAS: Pagina[] = [
  {
    path: "/sobre",
    tipo: "AboutPage",
    rotulo: "Sobre",
    h1: "Sobre este site",
    titulo: `Sobre o site conceito ${MARCA.nome}`,
    descricao: `${MARCA.nome} é um site conceito de restaurante, criado por Miguel Angelo para mostrar como fica o site de uma parrilla com reserva pelo WhatsApp.`,
    blocos: [
      {
        p: [
          `A ${MARCA.nome} não existe. É um restaurante fictício, criado para um site conceito: as casas de Santa Aurora e Porto Jatobá, os endereços, os telefones, a nota do Google e as avaliações são inventados. Os números de WhatsApp são de exemplo e não atendem ninguém.`,
          "O site mostra, do começo ao fim, como pode ser a presença de um restaurante na internet: uma abertura com as fotos da casa, a história contada em capítulos, as duas unidades lado a lado, a galeria, os horários com o dia de hoje e a reserva de mesa.",
        ],
      },
      {
        h: "O que o site faz",
        lista: [
          "Reserva de mesa: a pessoa escolhe a casa, o dia, o horário e o número de pessoas, e o pedido abre pronto no WhatsApp da casa escolhida.",
          "Horários ao vivo: o site diz se a casa está aberta agora e quando abre de novo, no fuso de São Paulo.",
          "Pedido para entrega e orçamento de eventos, cada um com a sua mensagem pronta no WhatsApp.",
          "Galeria em mosaico, com as fotos abrindo em tela cheia.",
          "Dois temas de cor, Salão (escuro) e Mármore (claro), que se alternam entre as seções.",
        ],
      },
      {
        h: "Quem fez",
        p: [
          `O site foi desenhado e desenvolvido por [${AUTOR.nome}](${AUTOR.url}), desenvolvedor full stack e designer de Franca (SP). Ele cuida do código, da interface e do movimento dos projetos que faz, e este é um modelo do que entrega para restaurantes, bares e cafés.`,
        ],
        lista: [
          `Site: [${AUTOR.site}](${AUTOR.url})`,
          `Instagram: [${AUTOR.instagramUsuario}](${AUTOR.instagram})`,
          `Código deste projeto no GitHub: [miguelrsant/maria-mangal-site](${AUTOR.repo})`,
        ],
      },
      {
        h: "Como foi feito",
        lista: [
          "Next.js, React e TypeScript, com CSS puro e um design system próprio (marca, cores, tipografia e componentes).",
          "As fotos já saem prontas em WebP, em vários tamanhos, para a página abrir rápido no celular.",
          "Todo o conteúdo que muda de um restaurante para outro fica num arquivo só, fácil de trocar.",
          "As fotos são do Pexels, de uso gratuito, com os créditos no repositório.",
        ],
      },
    ],
  },
  {
    path: "/contato",
    tipo: "ContactPage",
    rotulo: "Contato",
    h1: "Contato",
    titulo: `Contato · ${MARCA.nome}`,
    descricao: `Fale com Miguel Angelo, que desenhou e desenvolveu o site conceito ${MARCA.nome}: site, Instagram, LinkedIn, GitHub e e-mail para orçamentos.`,
    blocos: [
      {
        p: [
          `A ${MARCA.nome} é um restaurante fictício: não há mesa para reservar e os números de WhatsApp do site são de exemplo. Quem responde por este site é ${AUTOR.nome}, que o desenhou e desenvolveu, pelos canais abaixo.`,
        ],
      },
      {
        h: "Canais",
        lista: [
          `Site e portfólio: [${AUTOR.site}](${AUTOR.url})`,
          `Instagram: [${AUTOR.instagramUsuario}](${AUTOR.instagram})`,
          `LinkedIn: [linkedin.com/in/miguelrsant](${AUTOR.linkedin})`,
          `GitHub: [github.com/miguelrsant](${AUTOR.github})`,
          `E-mail: [${AUTOR.email}](mailto:${AUTOR.email})`,
        ],
      },
      {
        h: "Quando falar com ele",
        lista: [
          "Você tem um restaurante, bar, café ou outro negócio e quer um site como este, com reserva, horários e a cara da sua casa.",
          "Você achou um erro no funcionamento do site.",
          "Você quer usar o código como referência: ele é aberto e está no GitHub.",
        ],
      },
      {
        h: "O que mandar na primeira mensagem",
        p: [
          "Conte qual é o negócio, em que cidade fica, o que o site precisa fazer (reserva, cardápio, pedido, eventos) e se já existe marca ou fotos. Com isso ele responde com as perguntas que faltam, uma ideia de prazo e o orçamento.",
        ],
      },
    ],
  },
  {
    path: "/privacidade",
    tipo: "WebPage",
    rotulo: "Privacidade",
    h1: "Privacidade",
    titulo: `Privacidade · ${MARCA.nome}`,
    descricao: `O que o site conceito ${MARCA.nome} coleta: nada além dos registros técnicos da hospedagem. O formulário de reserva só monta uma mensagem no WhatsApp.`,
    blocos: [
      {
        p: [`A ${MARCA.nome} é um site conceito, de um restaurante fictício, e foi feito para coletar o mínimo possível de dados de quem visita.`],
      },
      {
        h: "O formulário de reserva",
        p: [
          "O formulário pede a casa, o dia, o horário, o número de pessoas e os seus dados de contato. Nada disso é enviado para um servidor nem fica guardado no site: os dados só montam, no seu próprio navegador, uma mensagem que abre no WhatsApp. Ela só é enviada se você confirmar o envio lá.",
          "Como o restaurante é fictício, os números de WhatsApp são de exemplo. Não envie dados pessoais de verdade para eles.",
        ],
      },
      {
        h: "O que o site não faz",
        lista: [
          "Não tem cadastro, login nem área de cliente.",
          "Não usa cookies de rastreamento nem ferramentas de análise de audiência.",
          "Não exibe anúncios e não compartilha dados com anunciantes.",
        ],
      },
      {
        h: "Registros técnicos da hospedagem",
        p: [
          "O site é hospedado na Vercel. Como em qualquer hospedagem, o servidor registra dados técnicos de cada acesso, como endereço IP, data e hora, página pedida e tipo de navegador. Esses registros servem para manter o site no ar e seguro e seguem a política de privacidade da Vercel.",
        ],
      },
      {
        h: "Links para outros sites",
        p: [
          "O WhatsApp, o Google Maps, o Instagram, o GitHub e o site de quem fez o projeto abrem em outros endereços. Ao clicar, você sai deste site e passa a valer a política de privacidade de cada um.",
        ],
      },
      {
        h: "Dúvidas e direitos",
        p: [
          `Pela LGPD você pode perguntar se há dados seus e pedir a correção ou a exclusão. Como o site não guarda dados pessoais, a resposta costuma ser curta. Para qualquer dúvida, escreva para [${AUTOR.email}](mailto:${AUTOR.email}).`,
          "Última atualização: 11 de novembro de 2026.",
        ],
      },
    ],
  },
];

export const paginaPorPath = (path: string) => PAGINAS.find((p) => p.path === path);
