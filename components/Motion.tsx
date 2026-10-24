"use client";

import { useEffect } from "react";

/**
 * Movimento discreto: entradas ao rolar ([data-reveal]) e parallax leve ([data-parallax], só no desktop).
 * Sem JavaScript tudo já aparece: a classe .js no <html> é que esconde antes de animar.
 */
/** Conta de 0 até o número (ex.: "4,4") quando o bloco entra na tela. */
function contar(el: HTMLElement) {
  const alvo = el.dataset.count ?? "";
  const n = parseFloat(alvo.replace(",", "."));
  const casas = (alvo.split(",")[1] ?? "").length;
  if (Number.isNaN(n) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const t0 = performance.now();
  const passo = (t: number) => {
    const p = Math.min(1, (t - t0) / 1600);
    el.textContent = (n * (1 - Math.pow(1 - p, 3))).toFixed(casas).replace(".", ",");
    if (p < 1) requestAnimationFrame(passo);
    else el.textContent = alvo;
  };
  requestAnimationFrame(passo);
}

function entrarQuandoPronto(el: HTMLElement, entrar: () => void) {
  const pendentes = Array.from(el.querySelectorAll("img")).filter((img) => !img.complete);
  if (!pendentes.length) return entrar();
  let feito = false;
  const vai = () => {
    if (!feito) {
      feito = true;
      entrar();
    }
  };
  let faltam = pendentes.length;
  pendentes.forEach((img) => img.addEventListener("load", () => --faltam === 0 && vai(), { once: true }));
  setTimeout(vai, 1500);
}

export default function Motion() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            // Foto ainda chegando: espera ela (no máximo 1,5 s) para não entrar uma moldura vazia.
            entrarQuandoPronto(el, () => {
              el.classList.add("is-in");
              el.querySelectorAll<HTMLElement>("[data-count]").forEach(contar);
            });
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desk = matchMedia("(min-width: 1024px)").matches;
    const par = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        par.forEach((el) => {
          const box = el.parentElement!.getBoundingClientRect();
          if (box.bottom < 0 || box.top > vh) return;
          const p = (box.top + box.height / 2 - vh / 2) / (vh / 2 + box.height / 2); // -1..1
          el.style.transform = `translate3d(0, ${(-p * 5).toFixed(2)}%, 0)`;
        });
      });
    };
    if (!still && desk && par.length) {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
