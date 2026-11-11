# SEO, agentes de IA e velocidade

O que o site tem para ser bem indexado no Google e lido por agentes de IA. Os textos saem de uma fonte só: `lib/site.ts` (dados do site, da casa e de quem fez) e `lib/pages.ts` (páginas internas).

## O que existe

- **Markdown para agentes**: qualquer página pedida com `Accept: text/markdown` ou com `.md` no fim (`/index.md`, `/sobre.md`) devolve Markdown, com `Vary: Accept`. Quem resolve é `middleware.ts`; o texto é montado em `lib/agents.ts`.
- **404**: HTML no visual do site, com `noindex` (`app/not-found.tsx`), e Markdown para agentes, com links para `/llms.txt` e `/sitemap.xml`.
- **`/llms.txt`** no formato do llmstxt.org, com a seção `## When to use`.
- **JSON-LD** (`lib/jsonld.ts`): `Person` (o autor), `WebSite`, `CreativeWork` e o tipo de cada página. O restaurante é fictício, então não entra como `Restaurant`.
- **`/robots.txt` e `/sitemap.xml`** (`app/robots.ts`, `app/sitemap.ts`), com a data real de cada página.
- **Páginas de confiança**: `/sobre`, `/contato` e `/privacidade`, linkadas no rodapé. `/about`, `/contact` e `/privacy` redirecionam (308).
- **Metadados** (`lib/meta.ts`): título e descrição por página, canonical absoluto, Open Graph e Twitter card.
- **Um domínio só**: os endereços `*-miguelrsants-projects.vercel.app` redirecionam para o oficial (`next.config.ts`).
- **Crédito**: o rodapé diz quem desenvolveu o site, com link para miguelrsant.com.br, Instagram e o repositório.

## Como testar

```bash
npm run build && npm start        # em outro terminal
npm run test:agents               # BASE_URL=https://maria-mangal-parrilla.vercel.app testa o site publicado
```

## Pendente (depende do dono)

- Novo scan no https://is-agentic.com e PageSpeed no endereço publicado.
- Registrar o domínio no Google Search Console e no Bing Webmaster Tools e enviar o sitemap.
- O site saiu do `noindex` e agora é indexado como site conceito (título, descrição e JSON-LD dizem que o restaurante é fictício).
