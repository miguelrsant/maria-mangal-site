import type { ReactNode } from "react";
import type { Pagina } from "@/lib/pages";
import { jsonLd } from "@/lib/jsonld";
import { Logo } from "./Brand";
import Footer from "./Footer";
import JsonLd from "./JsonLd";

// Links em Markdown simples dentro dos textos: [texto](https://...) vira <a>.
function rich(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((parte, i) => {
    const m = parte.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return parte;
    const externo = /^https?:/.test(m[2]);
    return (
      <a key={i} href={m[2]} {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {m[1]}
      </a>
    );
  });
}

export function InnerBar() {
  return (
    <header data-theme="salao" className="in-bar wrap">
      <div className="inner in-bar-in">
        <a className="logo-link" href="/" aria-label="Maria Mangal Parrilla, voltar ao início">
          <Logo />
        </a>
        <a className="mj-btn mj-btn-link" href="/">
          Início
        </a>
      </div>
    </header>
  );
}

/** Sobre, Contato e Privacidade: mesma marca, mesmo rodapé, texto em coluna de leitura. */
export default function InnerPage({ page }: { page: Pagina }) {
  return (
    <>
      <JsonLd data={jsonLd({ path: page.path, titulo: page.titulo, descricao: page.descricao, tipo: page.tipo, nome: page.rotulo })} />
      <InnerBar />
      <main data-theme="marmore" className="in-main wrap" id="conteudo">
        <div className="in-col">
          <p className="mj-eyebrow">{page.rotulo}</p>
          <span className="mj-rule" />
          <h1 className="mj-title">{page.h1}</h1>
          <p className="in-lead">{page.descricao}</p>
          {page.blocos.map((b, i) => (
            <section key={i} className="in-block">
              {b.h && <h2>{b.h}</h2>}
              {b.p?.map((t, j) => <p key={j}>{rich(t)}</p>)}
              {b.lista && (
                <ul>
                  {b.lista.map((t, j) => (
                    <li key={j}>{rich(t)}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p className="in-cta">
            <a className="mj-btn mj-btn-primary" href="/">
              Voltar ao início
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
