"use client";

import { useEffect, useState } from "react";
import { HORARIOS } from "@/lib/site";
import { statusAgora } from "@/lib/hours";

const SEMANA = [
  { d: 2, curto: "Ter", longo: "Terça" },
  { d: 3, curto: "Qua", longo: "Quarta" },
  { d: 4, curto: "Qui", longo: "Quinta" },
  { d: 5, curto: "Sex", longo: "Sexta" },
  { d: 6, curto: "Sáb", longo: "Sábado" },
  { d: 0, curto: "Dom", longo: "Domingo" },
  { d: 1, curto: "Seg", longo: "Segunda" },
];

export function HoursStatus() {
  const [st, setSt] = useState<ReturnType<typeof statusAgora> | null>(null);
  useEffect(() => {
    const up = () => setSt(statusAgora());
    up();
    const t = setInterval(up, 60_000);
    return () => clearInterval(t);
  }, []);
  return (
    <p className="status" data-open={st ? String(st.aberto) : undefined} aria-live="polite">
      <i />
      <span>{st ? st.msg : "Terça a domingo · fechado às segundas"}</span>
    </p>
  );
}

export function Week() {
  const [hoje, setHoje] = useState<number | null>(null);
  useEffect(() => setHoje(statusAgora().dia), []);
  return (
    <ol className="week">
      {SEMANA.map((s) => {
        const aberto = HORARIOS.diasAbertos.includes(s.d);
        const cls = [aberto ? "" : "is-off", s.d === hoje ? "is-today" : ""].filter(Boolean).join(" ");
        return (
          <li key={s.d} className={cls || undefined} aria-current={s.d === hoje ? "date" : undefined}>
            <abbr title={s.longo}>{s.curto}</abbr>
            <small>{s.d === hoje ? "hoje" : aberto ? "aberto" : "fechado"}</small>
          </li>
        );
      })}
    </ol>
  );
}
