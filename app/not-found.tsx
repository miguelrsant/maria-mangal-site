import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { InnerBar } from "@/components/InnerPage";
import { PAGINAS } from "@/lib/pages";

export const metadata: Metadata = {
  title: { absolute: "Página não encontrada · Maria Mangal Parrilla" },
  description: "Este endereço não existe no site da Maria Mangal Parrilla.",
  robots: { index: false, follow: true },
};

// 404 no visual do site, com os caminhos de volta.
export default function NotFound() {
  return (
    <>
      <InnerBar />
      <main data-theme="marmore" className="in-main wrap" id="conteudo">
        <div className="in-col">
          <p className="mj-eyebrow">Erro 404</p>
          <span className="mj-rule" />
          <h1 className="mj-title">Esta mesa não está no salão.</h1>
          <p className="in-lead">O endereço que você abriu não existe, ou mudou de lugar. A brasa continua acesa logo ali.</p>
          <p className="in-cta">
            <a className="mj-btn mj-btn-primary" href="/">
              Voltar ao início
            </a>
          </p>
          <ul className="in-links">
            {PAGINAS.map((p) => (
              <li key={p.path}>
                <a href={p.path}>{p.rotulo}</a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
