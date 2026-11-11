import { LOGO_PATHS, LOGO_VIEWBOX, MONOGRAMA_M_PATHS, MONOGRAMA_M_VIEWBOX } from "./brand-paths";

type Props = { className?: string; title?: string };

export function Logo({ className = "logo", title = "Maria Mangal Parrilla" }: Props) {
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} role="img" aria-label={title} dangerouslySetInnerHTML={{ __html: LOGO_PATHS }} />
  );
}

export function MonogramaM({ className }: Props) {
  return <svg className={className} viewBox={MONOGRAMA_M_VIEWBOX} aria-hidden="true" dangerouslySetInnerHTML={{ __html: MONOGRAMA_M_PATHS }} />;
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Divide um título em linhas que sobem por trás de uma máscara. */
export function Lines({ lines }: { lines: React.ReactNode[] }) {
  return (
    <>
      {lines.map((l, i) => (
        <span className="line" key={i} style={{ ["--l" as string]: i }}>
          <span>{l}</span>
        </span>
      ))}
    </>
  );
}
