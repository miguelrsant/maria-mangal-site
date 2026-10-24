import Image from "next/image";
import { blur } from "@/lib/blur";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import Mosaic from "@/components/Mosaic";
import Motion from "@/components/Motion";
import ReservationForm, { ReservarNestaCasa } from "@/components/ReservationForm";
import { HoursStatus, Week } from "@/components/Hours";
import { InstagramIcon, Lines, Logo, MonogramaM } from "@/components/Brand";
import { CASAS, DEPOIMENTOS, EVENTOS, GOOGLE, HORARIOS, INSTAGRAM, waLink } from "@/lib/site";

const GOOGLE_URL = "https://www.google.com/maps/search/?api=1&query=Maria+%26+Jos%C3%A9+Parrilla+Franca";
const ORCAMENTO = waLink(EVENTOS.whatsappIntl, "Olá! Gostaria de um orçamento para um evento com a Maria & José Parrilla.");

function SectionHead({ eyebrow, title, children, id }: { eyebrow: string; title: React.ReactNode[]; children?: React.ReactNode; id?: string }) {
  return (
    <div className="head">
      <div>
        <p className="mj-eyebrow" data-reveal="">
          {eyebrow}
        </p>
        <span className="mj-rule" data-reveal="rule" />
        <h2 className="mj-title" data-reveal="title" id={id}>
          <Lines lines={title} />
        </h2>
      </div>
      {children && (
        <p className="mj-body" data-reveal="" style={{ ["--i" as string]: 2 }}>
          {children}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <Motion />

      {/* 1 · Abertura */}
      <section className="hero" data-theme="salao" id="home" aria-label="Abertura">
        <HeroSlider />
        <div className="hero-copy wrap">
          <div className="inner">
            <div>
              <p className="mj-eyebrow hero-in" style={{ ["--d" as string]: 0 }}>
                Parrilla argentina · Franca e Araraquara
              </p>
              <span className="mj-rule hero-in" style={{ ["--d" as string]: 100 }} />
              <h1>
                <span className="line">
                  <span style={{ ["--d" as string]: 150 }}>A noite começa</span>
                </span>
                <span className="line">
                  <span style={{ ["--d" as string]: 280 }}>
                    <em>na brasa.</em>
                  </span>
                </span>
              </h1>
              <p className="lead hero-in" style={{ ["--d" as string]: 500 }}>
                Cortes Angus na parrilla de carvão, vinho na taça e uma casa feita para comemorar: a dois, em família ou com os amigos.
              </p>
              <div className="ctas hero-in" style={{ ["--d" as string]: 650 }}>
                <a className="mj-btn mj-btn-primary" href="#reservas">
                  Reservar mesa
                </a>
                <a className="mj-btn" href="#casa">
                  Conhecer a casa
                </a>
              </div>
              <a className="rating hero-in" style={{ ["--d" as string]: 800 }} href={GOOGLE_URL} target="_blank" rel="noopener">
                <b>{GOOGLE.nota}</b>
                <span>
                  <span className="mj-stars" aria-hidden="true">
                    ★★★★★
                  </span>
                  <br />
                  {GOOGLE.avaliacoes} avaliações no Google · {GOOGLE.casa}
                </span>
              </a>
            </div>
          </div>
        </div>
        <a className="scroll-cue" href="#casa" aria-hidden="true" tabIndex={-1}>
          Role
        </a>
      </section>

      <main id="conteudo">
        {/* 2 · A casa */}
        <section data-theme="marmore" className="sec wrap" id="casa" aria-labelledby="casa-t">
          <div className="inner">
            <SectionHead eyebrow="A casa" title={["Duas casas, a mesma brasa"]} id="casa-t">
              A primeira abriu em Franca em 2017. A segunda chegou a Araraquara em 2023, numa casa de esquina da Rua 5.
            </SectionHead>
            <div className="story">
              <blockquote className="pull" data-reveal="">
                “A raça Angus se adaptou muito bem aos pampas argentinos. Por isso oferecemos sempre a melhor carne do mundo.”
              </blockquote>
              <div className="story-text">
                <p className="mj-body" data-reveal="" style={{ ["--i" as string]: 1 }}>
                  Apaixonado por pecuária, Leone Luis Junior, filho e neto de pecuarista, agregou ao DNA da empresa o fantástico mundo dos cortes Angus, inspirado em nossos hermanos argentinos. A raça
                  Angus, de origem britânica, se adaptou muito bem aos pampas argentinos e trouxe ainda mais suculência e maciez aos cortes.
                </p>
                <p className="mj-body" data-reveal="" style={{ ["--i" as string]: 2 }}>
                  Agregamos um toque de brasilidade aos maiores clássicos argentinos e aos conceitos de frescor de Dona Maria José.
                </p>
                <p className="mj-body" data-reveal="" style={{ ["--i" as string]: 3 }}>
                  Em 2023, a Maria &amp; José Parrilla chegou a Araraquara com a sua segunda unidade, num sobrado muito charmoso e cheio de significados e história: uma casa tombada de esquina, em plena
                  Rua 5, a rua mais arborizada da cidade, com calçadas de paralelepípedos. Lá, oferecemos todas as delícias da gastronomia argentina, num ambiente aconchegante e com atendimento de
                  excelência.
                </p>
              </div>
            </div>
            <div className="grid2">
              {CASAS.map((c, i) => (
                <article className="house" key={c.id} data-reveal="" style={{ ["--i" as string]: i }}>
                  <div className="house-media">
                    <div className="photo house-main" data-reveal="curtain" style={{ ["--i" as string]: i }}>
                      <Image src={c.foto.src} alt={c.foto.alt} fill sizes="(max-width: 760px) 100vw, 50vw" quality={78} loading="eager" {...blur(c.foto.src)} style={{ objectPosition: c.foto.posicao }} />
                    </div>
                    <div className="photo house-inset" data-reveal="curtain" style={{ ["--i" as string]: i + 3 }}>
                      <Image src={c.detalhe.src} alt={c.detalhe.alt} fill sizes="(max-width: 760px) 40vw, 20vw" quality={78} loading="eager" {...blur(c.detalhe.src)} style={{ objectPosition: c.detalhe.posicao }} />
                    </div>
                  </div>
                  <div className="house-body">
                    <div className="house-top">
                      <span className="house-num" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mj-eyebrow">{c.desde}</p>
                    </div>
                    <h3>{c.nome}</h3>
                    <p className="mj-body">{c.texto}</p>
                    <dl className="meta">
                      <div>
                        <dt>Endereço</dt>
                        <dd>
                          {c.endereco} · {c.cidade}
                        </dd>
                      </div>
                      <div>
                        <dt>WhatsApp</dt>
                        <dd>
                          <a href={`https://wa.me/${c.whatsappIntl}`} target="_blank" rel="noopener">
                            {c.whatsapp}
                          </a>
                        </dd>
                      </div>
                      <div>
                        <dt>Horário</dt>
                        <dd>Ter a dom · 11h–16h e 18h30–23h</dd>
                      </div>
                    </dl>
                    <div className="ctas">
                      <ReservarNestaCasa casa={c.id} />
                      <a className="mj-btn mj-btn-link" href={c.mapa} target="_blank" rel="noopener">
                        Como chegar
                      </a>
                    </div>
                    <a className="order" href={c.pedido} target="_blank" rel="noopener">
                      <span className="order-t">Faça seu pedido agora</span>
                      <span className="order-s">
                        Delivery · Anota Aí
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                          <path d="M7 17 17 7M9 7h8v8" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3 · Por dentro */}
        <section data-theme="salao" className="sec wrap" id="galeria" aria-labelledby="galeria-t">
          <div className="inner">
            <SectionHead eyebrow="Por dentro" title={["Mesa posta, brasa acesa"]} id="galeria-t">
              Tijolo, madeira e luz baixa. Toque numa foto para ver em tela cheia.
            </SectionHead>
            <Mosaic />
          </div>
        </section>

        {/* 4 · Horários */}
        <section data-theme="marmore" className="sec wrap hours-sec" id="horarios" aria-labelledby="horarios-t">
          <div className="inner hours">
            <div>
              <p className="mj-eyebrow" data-reveal="">
                Horários
              </p>
              <span className="mj-rule" data-reveal="rule" />
              <h2 className="mj-title" id="horarios-t" data-reveal="title">
                <Lines lines={["Terça a domingo,", "almoço e jantar"]} />
              </h2>
              <div data-reveal="" style={{ ["--i" as string]: 2 }}>
                <HoursStatus />
              </div>
            </div>
            <div className="hours-turns">
              <div className="turn" data-reveal="" style={{ ["--i" as string]: 1 }}>
                <span>Almoço</span>
                <b>
                  {HORARIOS.almoco.rotulo[0]}
                  <small>às</small>
                  {HORARIOS.almoco.rotulo[1]}
                </b>
              </div>
              <div className="turn" data-reveal="" style={{ ["--i" as string]: 2 }}>
                <span>Jantar</span>
                <b>
                  {HORARIOS.jantar.rotulo[0]}
                  <small>às</small>
                  {HORARIOS.jantar.rotulo[1]}
                </b>
              </div>
            </div>
            <div style={{ gridColumn: "1 / -1" }} data-reveal="" >
              <Week />
            </div>
          </div>
        </section>

        {/* 5 · Reservas */}
        <section data-theme="marmore" className="sec wrap" id="reservas" aria-labelledby="reservas-t">
          <div className="inner res">
            <div>
              <p className="mj-eyebrow" data-reveal="">
                Reservas
              </p>
              <span className="mj-rule" data-reveal="rule" />
              <h2 className="mj-title" id="reservas-t" data-reveal="title">
                <Lines lines={["Sua mesa", "está esperando"]} />
              </h2>
              <p className="mj-body" style={{ marginTop: 20 }} data-reveal="">
                Escolha a casa, o dia e o horário. A confirmação chega pelo WhatsApp. Reserve com pelo menos 1h de antecedência.
              </p>
              <div className="contacts" data-reveal="">
                {CASAS.map((c) => (
                  <a key={c.id} href={`https://wa.me/${c.whatsappIntl}`} target="_blank" rel="noopener">
                    <b>{c.nome}</b> · {c.whatsapp}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <ReservationForm />
              <p className="note" data-reveal="">
                Dia dos Namorados (12 de junho): reserva com pagamento antecipado pelo WhatsApp da casa.
              </p>
            </div>
          </div>
        </section>

        {/* 6 · Eventos */}
        <section data-theme="salao" className="sec wrap" id="eventos" aria-labelledby="eventos-t">
          <div className="inner ev">
            <div className="ev-media">
              <span className="ev-frame" aria-hidden="true" data-reveal="" />
              <div className="photo ev-main" data-reveal="curtain">
                <div data-parallax="" style={{ position: "absolute", inset: "-6% 0" }}>
                  <Image src="/fotos/franca-salao-cheio-retrato.jpg" alt="Salão de Franca cheio numa comemoração" fill sizes="(max-width: 760px) 90vw, 45vw" quality={80} {...blur("/fotos/franca-salao-cheio-retrato.jpg")} style={{ objectPosition: "center 40%" }} />
                </div>
              </div>
              <div className="photo ev-inset" data-reveal="curtain" style={{ ["--i" as string]: 3 }}>
                <Image src="/fotos/casal-vinho.jpg" alt="Casal brindando com vinho à mesa" fill sizes="(max-width: 760px) 45vw, 20vw" quality={78} {...blur("/fotos/casal-vinho.jpg")} style={{ objectPosition: "center 30%" }} />
              </div>
              <p className="ev-cap" data-reveal="" style={{ ["--i" as string]: 4 }}>
                Aniversários, formaturas e
                <br />
                fechamentos de negócio
              </p>
            </div>
            <div>
              <p className="mj-eyebrow" data-reveal="">
                Eventos
              </p>
              <span className="mj-rule" data-reveal="rule" />
              <h2 className="mj-title" id="eventos-t" data-reveal="title">
                <Lines lines={["Sua comemoração,", "com a nossa parrilla"]} />
              </h2>
              <p className="mj-body" style={{ marginTop: 20 }} data-reveal="">
                Uma parrillada dos melhores cortes nobres e os clássicos da gastronomia argentina para os seus convidados, nas nossas casas ou no espaço que você escolher.
              </p>
              <div className="facts">
                <div data-reveal="" style={{ ["--i" as string]: 1 }}>
                  <b>10 a 50</b>
                  <span>convidados nas duas casas</span>
                </div>
                <div data-reveal="" style={{ ["--i" as string]: 2 }}>
                  <b>Buffet</b>
                  <span>no local da sua preferência</span>
                </div>
              </div>
              <div className="ctas" data-reveal="" style={{ ["--i" as string]: 3 }}>
                <a className="mj-btn mj-btn-primary" href={ORCAMENTO} target="_blank" rel="noopener">
                  Pedir orçamento
                </a>
                <a className="mj-btn mj-btn-link" href={`https://wa.me/${EVENTOS.whatsappIntl}`} target="_blank" rel="noopener">
                  {EVENTOS.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 7 · Avaliações */}
        <section data-theme="marmore" className="sec wrap" id="avaliacoes" aria-labelledby="avaliacoes-t">
          <div className="inner">
            <div className="head revhead">
              <div>
                <p className="mj-eyebrow" data-reveal="">
                  Avaliações
                </p>
                <span className="mj-rule" data-reveal="rule" />
                <h2 className="mj-title" id="avaliacoes-t" data-reveal="title">
                  <Lines lines={["Quem vem, volta"]} />
                </h2>
              </div>
              <a className="score" href={GOOGLE_URL} target="_blank" rel="noopener" data-reveal="" style={{ ["--i" as string]: 2 }}>
                <b data-count={GOOGLE.nota}>{GOOGLE.nota}</b>
                <span>
                  <span className="mj-stars" aria-label="Nota 4,4 de 5">
                    ★★★★★
                  </span>
                  <br />
                  {GOOGLE.avaliacoes} avaliações no Google · {GOOGLE.casa}
                </span>
              </a>
            </div>
            <div className="grid3">
              {DEPOIMENTOS.map((d, i) => (
                <figure className="quote" key={i} data-reveal="" style={{ ["--i" as string]: i }}>
                  <span className="mj-stars" aria-label="5 de 5 estrelas">
                    ★★★★★
                  </span>
                  <blockquote>{d.texto}</blockquote>
                  <figcaption>{d.origem}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 8 · Rodapé */}
      <footer data-theme="salao" className="foot wrap">
        <div className="inner">
          <div className="fgrid">
            <div>
              <Logo />
              <p className="slogan">A Melhor Carne do Mundo.</p>
            </div>
            {CASAS.map((c) => (
              <div key={c.id}>
                <h2>{c.nome}</h2>
                <p>
                  <a href={c.mapa} target="_blank" rel="noopener">
                    {c.endereco.replace(", Centro", "")}
                  </a>
                  <br />
                  Centro ·{" "}
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
            <span>© {new Date().getFullYear()} Maria &amp; José Parrilla</span>
            <a href={`https://wa.me/${EVENTOS.whatsappIntl}`} target="_blank" rel="noopener">
              Eventos: {EVENTOS.whatsapp}
            </a>
            <a className="credit" href="https://miguelrsant.com.br" target="_blank" rel="noopener">
              Design e desenvolvimento: Miguel Angelo <MonogramaM />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
