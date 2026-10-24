"use client";

import { useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import { HERO } from "@/lib/site";

const MS = 6000;

function Slide({ s, first }: { s: (typeof HERO)[number]; first: boolean }) {
  const common = { alt: s.alt, fill: true, sizes: "100vw", priority: first, quality: 80 } as const;
  const { props: desk } = getImageProps({ ...common, src: s.desktop });
  const { props: cel } = getImageProps({ ...common, src: s.celular });
  return (
    <picture>
      <source media="(max-width: 760px)" srcSet={cel.srcSet} sizes="100vw" />
      <img {...desk} alt={s.alt} style={{ ...desk.style, objectPosition: s.posicao }} />
    </picture>
  );
}

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const dots = useRef<(HTMLButtonElement | null)[]>([]);
  const t0 = useRef(0);
  const x0 = useRef<number | null>(null);

  useEffect(() => {
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    t0.current = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0.current) / MS);
      dots.current[i]?.style.setProperty("--p", `${p * 100}%`);
      if (p >= 1 && !still && !document.hidden) {
        setI((n) => (n + 1) % HERO.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      dots.current.forEach((d) => d?.style.setProperty("--p", "0%"));
    };
  }, [i]);

  const go = (n: number) => setI((n + HERO.length) % HERO.length);

  return (
    <div
      className="hero-slides"
      onTouchStart={(e) => (x0.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (x0.current == null) return;
        const dx = e.changedTouches[0].clientX - x0.current;
        if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
        x0.current = null;
      }}
    >
      {HERO.map((s, n) => (
        <div key={s.desktop} className={`hero-slide${n === i ? " is-on" : ""}`} aria-hidden={n !== i}>
          <Slide s={s} first={n === 0} />
        </div>
      ))}
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-dots wrap">
        <div className="inner" style={{ display: "flex", gap: "inherit", width: "100%" }}>
          {HERO.map((s, n) => (
            <button
              key={s.rotulo}
              ref={(el) => {
                dots.current[n] = el;
              }}
              type="button"
              aria-current={n === i}
              aria-label={`Foto ${n + 1}: ${s.alt}`}
              onClick={() => go(n)}
            >
              {String(n + 1).padStart(2, "0")} {s.rotulo}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
