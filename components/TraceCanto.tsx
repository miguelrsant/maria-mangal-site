"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Luz que corre pela borda de cima e desce pela direita da moldura do elemento pai.
 * O caminho é desenhado no tamanho real (medido), para o traço de luz não se repetir.
 */
export default function TraceCanto({ dur = 6 }: { dur?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const d = `M0.5 0.5 H${box.w - 0.5} V${box.h}`;
  return (
    <svg ref={ref} className="trace is-canto" aria-hidden="true" style={{ ["--dur" as string]: `${dur}s` }} width={box.w} height={box.h}>
      {box.w > 0 && (
        <>
          <path className="trace-glow" d={d} pathLength={100} />
          <path className="trace-line" d={d} pathLength={100} />
        </>
      )}
    </svg>
  );
}
