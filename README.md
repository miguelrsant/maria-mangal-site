# Maria & José Parrilla · site

Site institucional da Maria & José Parrilla (Franca e Araraquara), feito em Next.js a partir do guia do design.

## Rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # versão de produção
```

## Onde mudar o conteúdo

Tudo que muda com o tempo fica em `lib/site.ts`:

- casas, endereços e WhatsApp (`CASAS`)
- horários (`HORARIOS`)
- nota e número de avaliações do Google (`GOOGLE`)
- fotos da abertura (`HERO`) e do mosaico (`MOSAICO`)
- depoimentos (`DEPOIMENTOS`): **trocar pelos textos reais do Google antes de lançar**

Fotos ficam em `public/fotos/` (2000px) e `public/fotos/celular/` (1080px, versões em pé para a abertura no celular). O Next gera AVIF/WebP no tamanho certo para cada tela.

## Estrutura

- `app/page.tsx`: a página, na ordem do guia (abertura, a casa, por dentro, horários, reservas, eventos, avaliações, rodapé)
- `app/globals.css`: tokens do design system (temas `salao` e `marmore`) e estilos
- `components/`: topo e menu, abertura com fotos que trocam a cada 6s, mosaico com ampliação, horários com o dia de hoje (fuso de São Paulo), formulário de reserva que abre o WhatsApp da casa escolhida, animações de entrada

Design e desenvolvimento: Miguel Angelo.
