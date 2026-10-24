"use client";

import { useEffect, useState } from "react";
import { CASAS, HORARIOS, waLink } from "@/lib/site";
import { agoraSP } from "@/lib/hours";

const fmt = (m: number) => `${Math.floor(m / 60)}h${m % 60 ? String(m % 60).padStart(2, "0") : ""}`;
// Horários de reserva a cada 30 min. A última fica antes de 1h para fechar (fecha às 23h → até 21h30).
const MARGEM_FECHAMENTO = 60;
const ANTECEDENCIA = 60;
const faixa = (abre: number, fecha: number) => {
  const out: number[] = [];
  for (let m = abre; m < fecha - MARGEM_FECHAMENTO; m += 30) out.push(m);
  return out;
};
const TURNOS = [
  { nome: "Almoço", horarios: faixa(HORARIOS.almoco.abre, HORARIOS.almoco.fecha) },
  { nome: "Jantar", horarios: faixa(HORARIOS.jantar.abre, HORARIOS.jantar.fecha) },
];
const PESSOAS = Array.from({ length: 19 }, (_, i) => i + 2);
const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
const DIAS_CURTOS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

type Dia = { iso: string; rotulo: string; dataBR: string; semana: number; hoje: boolean };

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Horários ainda possíveis num dia (hoje: só com 1h de antecedência). */
function horariosDoDia(hoje: boolean, agoraMin: number) {
  return TURNOS.map((t) => ({ ...t, horarios: t.horarios.filter((m) => !hoje || m >= agoraMin + ANTECEDENCIA) })).filter((t) => t.horarios.length);
}

/** Próximos 45 dias em que a casa abre, no fuso de São Paulo. Hoje só entra se ainda houver horário. */
function proximosDias(): { dias: Dia[]; agoraMin: number } {
  const { min } = agoraSP();
  const base = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  base.setHours(12, 0, 0, 0);
  const dias: Dia[] = [];
  for (let i = 0; i < 45; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const semana = d.getDay();
    if (!HORARIOS.diasAbertos.includes(semana)) continue;
    if (i === 0 && horariosDoDia(true, min).length === 0) continue;
    const curto = `${DIAS_CURTOS[semana]}, ${d.getDate()}/${String(d.getMonth() + 1).padStart(2, "0")}`;
    dias.push({
      iso: iso(d),
      rotulo: i === 0 ? `Hoje (${curto})` : i === 1 ? `Amanhã (${curto})` : curto,
      dataBR: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()} (${DIAS[semana]})`,
      semana,
      hoje: i === 0,
    });
  }
  return { dias, agoraMin: min };
}

export default function ReservationForm() {
  const [casa, setCasa] = useState<string>(CASAS[0].id);
  const [dias, setDias] = useState<Dia[]>([]);
  const [agoraMin, setAgoraMin] = useState(0);
  const [data, setData] = useState("");
  const [hora, setHora] = useState<number>(20 * 60);
  const [pessoas, setPessoas] = useState("2");
  const [nome, setNome] = useState("");
  const [obs, setObs] = useState("");

  useEffect(() => {
    const p = proximosDias();
    setDias(p.dias);
    setAgoraMin(p.agoraMin);
    setData(p.dias[0]?.iso ?? "");
    const onCasa = (e: Event) => setCasa((e as CustomEvent<string>).detail);
    window.addEventListener("mj:casa", onCasa);
    return () => window.removeEventListener("mj:casa", onCasa);
  }, []);

  const dia = dias.find((d) => d.iso === data);
  const turnos = horariosDoDia(!!dia?.hoje, agoraMin);
  const livres = turnos.flatMap((t) => t.horarios);

  // Se o horário escolhido não existe no dia (ex.: hoje já passou), cai no mais próximo disponível.
  useEffect(() => {
    if (livres.length && !livres.includes(hora)) setHora(livres.find((m) => m >= hora) ?? livres[livres.length - 1]);
  }, [data, livres.join(","), hora]); // eslint-disable-line react-hooks/exhaustive-deps

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const c = CASAS.find((x) => x.id === casa) ?? CASAS[0];
    const texto = [
      `Olá! Gostaria de reservar uma mesa na Maria & José ${c.nome}.`,
      ``,
      `Reserva em nome de: ${nome.trim()}`,
      `Data: ${dia ? dia.dataBR : "a combinar"}`,
      `Horário: ${fmt(hora)}`,
      `Pessoas: ${pessoas}`,
      obs.trim() ? `Observações: ${obs.trim()}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");
    window.open(waLink(c.whatsappIntl, texto), "_blank", "noopener");
  };

  return (
    <form className="resbar" onSubmit={enviar} data-reveal="" style={{ ["--i" as string]: 1 }}>
      <label className="full">
        Nome da reserva
        <input className="field" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Em nome de quem fica a mesa" autoComplete="name" required />
      </label>
      <label className="half">
        Unidade
        <select className="field" value={casa} onChange={(e) => setCasa(e.target.value)} name="unidade">
          {CASAS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
      </label>
      <label className="half">
        Data
        <select className="field" value={data} onChange={(e) => setData(e.target.value)} name="data" required>
          {dias.length === 0 && <option value="">Carregando…</option>}
          {dias.map((d) => (
            <option key={d.iso} value={d.iso}>
              {d.rotulo}
            </option>
          ))}
        </select>
      </label>
      <label className="half">
        Horário
        <select className="field" value={hora} onChange={(e) => setHora(Number(e.target.value))} name="horario">
          {turnos.map((t) => (
            <optgroup key={t.nome} label={t.nome}>
              {t.horarios.map((m) => (
                <option key={m} value={m}>
                  {fmt(m)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
      <label className="half">
        Pessoas
        <select className="field" value={pessoas} onChange={(e) => setPessoas(e.target.value)} name="pessoas">
          {PESSOAS.map((p) => (
            <option key={p} value={p}>
              {p} pessoas
            </option>
          ))}
          <option value="mais de 20">Mais de 20</option>
        </select>
      </label>
      <label className="full">
        Observações
        <input className="field" name="obs" value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Aniversário, cadeira de bebê, preferência de mesa" />
      </label>
      <p className="res-msg">Terça a domingo. Almoço até 14h30 e jantar até 21h30, para a cozinha receber você com calma.</p>
      <button className="mj-btn mj-btn-primary" type="submit">
        Reservar pelo WhatsApp
      </button>
    </form>
  );
}

/** Botão "Reservar nesta casa": já deixa a casa escolhida no formulário. */
export function ReservarNestaCasa({ casa }: { casa: string }) {
  return (
    <a className="mj-btn mj-btn-primary" href="#reservas" onClick={() => window.dispatchEvent(new CustomEvent("mj:casa", { detail: casa }))}>
      Reservar nesta casa
    </a>
  );
}
