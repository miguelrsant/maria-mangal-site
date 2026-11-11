"use client";

import { useEffect, useState } from "react";
import { CASAS, INSTAGRAM } from "@/lib/site";
import { InstagramIcon, Logo } from "./Brand";

const LINKS = [
  { href: "#casa", label: "A casa" },
  { href: "#reservas", label: "Reservas" },
  { href: "#eventos", label: "Eventos" },
  { href: "#avaliacoes", label: "Avaliações" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header data-theme="salao" className={`top wrap${solid || open ? " is-solid" : ""}`}>
        <div className="top-in inner">
          <a className="logo-link" href="#home" aria-label="Maria Mangal Parrilla, início" onClick={close}>
            <Logo />
          </a>
          <nav className="nav" aria-label="Principal">
            {LINKS.map((l) => (
              <a key={l.href} className="nav-link" href={l.href}>
                {l.label}
              </a>
            ))}
            <a className="ig" href={INSTAGRAM.url} target="_blank" rel="noopener" aria-label={`Instagram ${INSTAGRAM.usuario}`}>
              <InstagramIcon />
            </a>
            <a className="mj-btn mj-btn-primary" href="#reservas">
              Reservar mesa
            </a>
            <button className="burger" type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
              <span />
              <span />
              <span />
            </button>
          </nav>
        </div>
      </header>
      <div id="menu" data-theme="salao" className={`menu wrap${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Menu">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={close} tabIndex={open ? 0 : -1}>
              {l.label}
            </a>
          ))}
          <a href="#horarios" onClick={close} tabIndex={open ? 0 : -1}>
            Horários
          </a>
        </nav>
        <div className="menu-foot">
          <a className="mj-btn mj-btn-primary" href="#reservas" onClick={close} tabIndex={open ? 0 : -1}>
            Reservar mesa
          </a>
          <div className="menu-contacts">
            {CASAS.map((c) => (
              <a key={c.id} href={`https://wa.me/${c.whatsappIntl}`} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>
                <b>{c.nome}</b> · {c.whatsapp}
              </a>
            ))}
            <a href={INSTAGRAM.url} target="_blank" rel="noopener" tabIndex={open ? 0 : -1}>
              {INSTAGRAM.usuario}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
