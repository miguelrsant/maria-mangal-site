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

/** (19) 99999-9999 enquanto a pessoa digita. */
const mascaraTel = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};
const telOk = (v: string) => /^\d{10,11}$/.test(v.replace(/\D/g, ""));
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

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
  const [casa, setCasa] = useState("");
  const [dias, setDias] = useState<Dia[]>([]);
  const [agoraMin, setAgoraMin] = useState(0);
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [pessoas, setPessoas] = useState("");
  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [obs, setObs] = useState("");

  useEffect(() => {
    const p = proximosDias();
    setDias(p.dias);
    setAgoraMin(p.agoraMin);
    const onCasa = (e: Event) => setCasa((e as CustomEvent<string>).detail);
    window.addEventListener("mj:casa", onCasa);
    return () => window.removeEventListener("mj:casa", onCasa);
  }, []);

  const dia = dias.find((d) => d.iso === data);
  const turnos = dia ? horariosDoDia(dia.hoje, agoraMin) : [];

  // Trocou a data e o horário escolhido não existe nela: pede o horário de novo.
  useEffect(() => {
    if (hora && !turnos.some((t) => t.horarios.includes(Number(hora)))) setHora("");
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  // Um passo de cada vez: casa → nome → telefone → e-mail → data → horário → pessoas → observações.
  const feito = [!!casa, nome.trim().length >= 2, telOk(tel), emailOk(email), !!dia, !!hora, !!pessoas];
  const liberado = (i: number) => feito.slice(0, i).every(Boolean);
  const pronto = feito.every(Boolean);
  const passo = (i: number) => ({ "data-step": String(i + 1).padStart(2, "0"), "data-done": feito[i] ? "" : undefined, "data-locked": liberado(i) ? undefined : "" });

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pronto) return;
    const c = CASAS.find((x) => x.id === casa) ?? CASAS[0];
    const texto = [
      `Olá! Gostaria de reservar uma mesa na Maria Mangal ${c.nome}.`,
      ``,
      `Reserva em nome de: ${nome.trim()}`,
      `Telefone: ${tel}`,
      `E-mail: ${email.trim()}`,
      `Data: ${dia!.dataBR}`,
      `Horário: ${fmt(Number(hora))}`,
      `Pessoas: ${pessoas}`,
      obs.trim() ? `Observações: ${obs.trim()}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");
    window.open(waLink(c.whatsappIntl, texto), "_blank", "noopener");
  };

  return (
    <form className="resbar steps" onSubmit={enviar} data-reveal="" style={{ ["--i" as string]: 1 }}>
      <label className="full" {...passo(0)}>
        <span>Casa</span>
        <select className="field" value={casa} onChange={(e) => setCasa(e.target.value)} name="unidade" required>
          <option value="" disabled>
            Escolha a casa
          </option>
          {CASAS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
      </label>
      <label className="full" {...passo(1)}>
        <span>Nome da reserva</span>
        <input className="field" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Em nome de quem fica a mesa" autoComplete="name" required disabled={!liberado(1)} />
      </label>
      <label className="half" {...passo(2)}>
        <span>Telefone</span>
        <input className="field" name="telefone" type="tel" inputMode="tel" value={tel} onChange={(e) => setTel(mascaraTel(e.target.value))} placeholder="(19) 99999-9999" autoComplete="tel-national" required disabled={!liberado(2)} />
      </label>
      <label className="half" {...passo(3)}>
        <span>E-mail</span>
        <input className="field" name="email" type="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" autoComplete="email" required disabled={!liberado(3)} />
      </label>
      <label className="half" {...passo(4)}>
        <span>Data</span>
        <select className="field" value={data} onChange={(e) => setData(e.target.value)} name="data" required disabled={!liberado(4)}>
          <option value="" disabled>
            Escolha o dia
          </option>
          {dias.map((d) => (
            <option key={d.iso} value={d.iso}>
              {d.rotulo}
            </option>
          ))}
        </select>
      </label>
      <label className="half" {...passo(5)}>
        <span>Horário</span>
        <select className="field" value={hora} onChange={(e) => setHora(e.target.value)} name="horario" required disabled={!liberado(5)}>
          <option value="" disabled>
            {liberado(5) ? "Escolha a hora" : "Antes, a data"}
          </option>
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
      <label className="full" {...passo(6)}>
        <span>Pessoas</span>
        <select className="field" value={pessoas} onChange={(e) => setPessoas(e.target.value)} name="pessoas" required disabled={!liberado(6)}>
          <option value="" disabled>
            Quantas pessoas
          </option>
          {PESSOAS.map((p) => (
            <option key={p} value={p}>
              {p} pessoas
            </option>
          ))}
          <option value="mais de 20">Mais de 20</option>
        </select>
      </label>
      <label className="full" {...passo(7)} data-done={undefined}>
        <span>
          Observações <em>(opcional)</em>
        </span>
        <input className="field" name="obs" value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Aniversário, cadeira de bebê, preferência de mesa" disabled={!liberado(7)} />
      </label>
      <p className="res-msg">Terça a domingo. Almoço até 14h30 e jantar até 21h30, para a cozinha receber você com calma.</p>
      <button className="mj-btn mj-btn-primary" type="submit" disabled={!pronto}>
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
