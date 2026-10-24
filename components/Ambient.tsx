/**
 * Movimento que acontece sozinho, mesmo sem rolar: uma luz que percorre uma moldura
 * e brasas que sobem devagar. Tudo em CSS; com "reduzir movimento" fica parado.
 */

/**
 * Luz que dá a volta na moldura do elemento pai (que precisa ter position).
 * Para a moldura de Eventos, que fica meio escondida atrás da foto, ver TraceCanto.
 */
export function Trace({ dur = 9, delay = 0 }: { dur?: number; delay?: number }) {
  const s = { ["--dur" as string]: `${dur}s`, ["--delay" as string]: `${delay}s` };
  return (
    <svg className="trace" aria-hidden="true" style={s}>
      <rect className="trace-glow" width="100%" height="100%" pathLength={100} />
      <rect className="trace-line" width="100%" height="100%" pathLength={100} />
    </svg>
  );
}

/** Brasas subindo. Posições fixas (sem aleatório) para o servidor e o navegador desenharem igual. */
export function Brasas({ n = 14 }: { n?: number }) {
  return (
    <div className="brasas" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const x = (i * 37 + 11) % 100;
        const dur = 7 + ((i * 5) % 7);
        const size = 2 + ((i * 3) % 3);
        const drift = ((i % 2 ? 1 : -1) * (10 + ((i * 7) % 24))).toString();
        return (
          <i
            key={i}
            style={{
              left: `${x}%`,
              width: size,
              height: size,
              animationDuration: `${dur}s`,
              animationDelay: `${-((i * 1.7) % dur)}s`,
              ["--drift" as string]: `${drift}px`,
            }}
          />
        );
      })}
    </div>
  );
}
