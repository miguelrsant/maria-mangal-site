import { AUTOR, CASAS, EVENTOS, INSTAGRAM, MARCA } from "@/lib/site";
import { PAGINAS } from "@/lib/pages";
import { InstagramIcon, Logo, MonogramaM } from "./Brand";

/** Rodapé: as casas, os horários, as páginas internas e o crédito de quem fez o site. */
export default function Footer() {
  return (
    <footer data-theme="salao" className="foot wrap">
      <div className="inner">
        <div className="fgrid">
          <div>
            <Logo />
            <p className="slogan">{MARCA.slogan}</p>
          </div>
          {CASAS.map((c) => (
            <div key={c.id}>
              <h2>{c.nome}</h2>
              <p>
                <a href={c.mapa} target="_blank" rel="noopener">
                  {c.endereco}
                </a>
                <br />
                {c.bairro} ·{" "}
                <a href={`https://wa.me/${c.whatsappIntl}`} target="_blank" rel="noopener">
                  {c.whatsapp}
                </a>
              </p>
            </div>
          ))}
          <div>
            <h2>Horários</h2>
            <p>
              Terça a domingo
              <br />
              11h–16h · 18h30–23h
            </p>
            <p>
              <a className="foot-ig" href={INSTAGRAM.url} target="_blank" rel="noopener">
                <InstagramIcon /> {INSTAGRAM.usuario}
              </a>
            </p>
          </div>
        </div>
        <div className="legal">
          <span>
            © {new Date().getFullYear()} {MARCA.nome} · Site conceito, restaurante fictício
          </span>
          <nav className="legal-nav" aria-label="Sobre o site">
            {PAGINAS.map((p) => (
              <a key={p.path} href={p.path}>
                {p.rotulo}
              </a>
            ))}
          </nav>
          <a href={`https://wa.me/${EVENTOS.whatsappIntl}`} target="_blank" rel="noopener">
            Eventos: {EVENTOS.whatsapp}
          </a>
        </div>
        <div className="made">
          <a className="credit" href={AUTOR.url} target="_blank" rel="noopener">
            <MonogramaM /> Site desenvolvido por {AUTOR.nome}
          </a>
          <span className="made-links">
            <a href={AUTOR.url} target="_blank" rel="noopener">
              {AUTOR.site}
            </a>
            <a href={AUTOR.instagram} target="_blank" rel="noopener">
              Instagram {AUTOR.instagramUsuario}
            </a>
            <a href={AUTOR.repo} target="_blank" rel="noopener">
              Código no GitHub
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
