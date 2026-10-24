"use client";

import Image, { getImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { MOSAICO } from "@/lib/site";

const SIZES: Record<string, string> = {
  big: "(max-width: 760px) 100vw, 50vw",
  tall: "(max-width: 760px) 50vw, 25vw",
  wide: "(max-width: 760px) 100vw, 50vw",
  "": "(max-width: 760px) 50vw, 25vw",
};

export default function Mosaic() {
  const [open, setOpen] = useState<number | null>(null);
  const last = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const x0 = useRef<number | null>(null);
  const n = MOSAICO.length;

  const show = useCallback((i: number) => setOpen(((i % n) + n) % n), [n]);
  const close = useCallback(() => {
    setOpen(null);
    last.current?.focus();
  }, []);

  useEffect(() => {
    if (open == null) return;
    closeBtn.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(open + 1);
      if (e.key === "ArrowLeft") show(open - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, show]);

  // Assim que a página termina de carregar, já baixa as versões ampliadas: tocar numa foto abre na hora.
  useEffect(() => {
    const precarregar = () =>
      MOSAICO.forEach((f) => {
        const { props } = getImageProps({ src: f.ampliada ?? f.src, alt: "", fill: true, sizes: "100vw" });
        const img = new window.Image();
        img.sizes = props.sizes ?? "100vw";
        if (props.srcSet) img.srcset = props.srcSet;
        img.src = props.src;
      });
    if (document.readyState === "complete") precarregar();
    else window.addEventListener("load", precarregar, { once: true });
    return () => window.removeEventListener("load", precarregar);
  }, []);

  const foto = open != null ? MOSAICO[open] : null;

  return (
    <>
      <div className="mosaic">
        {MOSAICO.map((f, i) => (
          <button
            key={f.src}
            type="button"
            className={f.forma ? `is-${f.forma}` : undefined}
            aria-label={`Ampliar: ${f.alt}`}
            data-reveal=""
            style={{ ["--i" as string]: i }}
            onClick={(e) => {
              last.current = e.currentTarget;
              show(i);
            }}
          >
            <Image src={f.src} alt="" fill sizes={SIZES[f.forma ?? ""]} loading="eager" style={{ objectPosition: f.posicao }} />
            <span className="zoom" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
              </svg>
            </span>
            <em>{f.alt}</em>
          </button>
        ))}
      </div>
      <div
        className={`lightbox${foto ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Fotos da casa"
        aria-hidden={!foto}
        onTouchStart={(e) => (x0.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (x0.current == null || open == null) return;
          const dx = e.changedTouches[0].clientX - x0.current;
          if (Math.abs(dx) > 50) show(open + (dx < 0 ? 1 : -1));
          x0.current = null;
        }}
      >
        <button ref={closeBtn} className="lb-close" type="button" aria-label="Fechar" onClick={close} tabIndex={foto ? 0 : -1}>
          ×
        </button>
        <div className="lightbox-stage" onClick={close}>
          {foto && <Image key={foto.src} src={foto.ampliada ?? foto.src} alt={foto.alt} fill sizes="100vw" loading="eager" />}
        </div>
        <div className="lightbox-bar">
          <span className="lightbox-count">
            {String((open ?? 0) + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
          <span className="lightbox-cap">{foto?.alt}</span>
          <span className="ctas" style={{ gap: 8 }}>
            <button type="button" aria-label="Foto anterior" onClick={() => open != null && show(open - 1)} tabIndex={foto ? 0 : -1}>
              ←
            </button>
            <button type="button" aria-label="Próxima foto" onClick={() => open != null && show(open + 1)} tabIndex={foto ? 0 : -1}>
              →
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
