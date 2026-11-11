# Maria Mangal Parrilla · site de demonstração

Site institucional de uma parrilla argentina com duas casas, feito em Next.js. **A Maria Mangal Parrilla é um restaurante fictício**: nomes, cidades, endereços, telefones e avaliações são inventados. O projeto serve de modelo para sites de restaurantes.

## Rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # versão de produção
```

## Onde mudar o conteúdo

Tudo que muda de um restaurante para outro fica em `lib/site.ts`:

- nome e slogan (`MARCA`)
- casas, endereços e WhatsApp (`CASAS`) e WhatsApp de eventos (`EVENTOS`)
- horários (`HORARIOS`)
- nota e número de avaliações (`GOOGLE`) e depoimentos (`DEPOIMENTOS`)
- fotos da abertura (`HERO`) e do mosaico (`MOSAICO`)

Os textos da história e das seções ficam em `app/page.tsx`. Título, descrição e dados estruturados (JSON-LD) ficam em `app/layout.tsx`. Por ser uma demonstração, o site está com `robots: noindex`: num site real, voltar para `index: true` e incluir o `aggregateRating`.

## Fotos

As fotos originais ficam em `public/fotos/` (até 2000px) e `public/fotos/celular/` (1080px, em pé, para a abertura no celular). Ao trocar ou adicionar uma foto, rodar:

```bash
node scripts/webp.mjs   # gera public/img/<foto>-<largura>.webp
node scripts/blur.mjs   # gera lib/blur.ts (prévia borrada)
```

Todas as fotos vêm do [Pexels](https://www.pexels.com/license/) (uso gratuito, inclusive comercial). Créditos e links em `CREDITOS-FOTOS.md`.

## Marca

- `public/marca/maria-mangal-logo.svg`: marca em curvas, uma cor só (`currentColor`)
- `components/brand-paths.ts`: a mesma marca para uso no React
- `app/icon.svg` e `app/apple-icon.png`: ícone do site

## Estrutura

- `app/page.tsx`: a página (abertura, a casa, por dentro, horários, reservas, eventos, avaliações, rodapé)
- `app/globals.css`: tokens do design system (temas `salao` e `marmore`) e estilos
- `components/`: topo e menu, abertura com fotos que trocam a cada 6s, mosaico com ampliação, horários com o dia de hoje (fuso de São Paulo), formulário de reserva que abre o WhatsApp da casa escolhida, animações de entrada

Design e desenvolvimento: [Miguel Angelo](https://miguelrsant.com.br).
