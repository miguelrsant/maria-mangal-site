"use client";

import { useEffect, useState } from "react";
import { CASAS, HORARIOS, waLink } from "@/lib/site";
import { agoraSP } from "@/lib/hours";

const fmt = (m: number) => `${Math.floor(m / 60)}h${m % 60 ? String(m % 60).padStart(2, "0") : ""}`;
const faixa = (abre: number, ultima: number) => {
  const out: string[] = [];
  for (let m = abre; m <= ultima; m += 30) out.push(fmt(m));
  return out;
};
// Última reserva 1h antes de fechar a cozinha.
const ALMOCO = faixa(HORARIOS.almoco.abre, HORARIOS.almoco.fecha - 60);
const JANTAR = faixa(HORARIOS.jantar.abre, HORARIOS.jantar.fecha - 60);
const PESSOAS = Array.from({ length: 19 }, (_, i) => i + 2);
const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

/** Próximo dia aberto (hoje se ainda der tempo), no formato aaaa-mm-dd, no fuso de São Paulo. */
function proximaData() {
  const { dia, min } = agoraSP();
  const base = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  let add = min >= HORARIOS.jantar.fecha - 90 ? 1 : 0;
  while (!HORARIOS.diasAbertos.includes((dia + add) % 7)) add++;
  base.setDate(base.getDate() + add);
  return iso(base);
}
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export default function ReservationForm() {
  const [casa, setCasa] = useState<string>(CASAS[0].id);
  const [data, setData] = useState("");
  const [min, setMin] = useState("");
  const [hora, setHora] = useState("20h");
  const [pessoas, setPessoas] = useState("2");
  const [obs, setObs] = useState("");
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    const d = proximaData();
    setData(d);
    setMin(iso(new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }))));
    const onCasa = (e: Event) => setCasa((e as CustomEvent<string>).detail);
    window.addEventListener("mj:casa", onCasa);
    return () => window.removeEventListener("mj:casa", onCasa);
  }, []);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const c = CASAS.find((x) => x.id === casa) ?? CASAS[0];
    const [a, m, d] = data.split("-").map(Number);
    const dia = data ? new Date(a, m - 1, d).getDay() : -1;
    if (dia >= 0 && !HORARIOS.diasAbertos.includes(dia)) {
      setAviso("Às segundas a casa fica fechada. Escolha outro dia, de terça a domingo.");
      return;
    }
    setAviso("");
    const quando = data ? `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${a} (${DIAS[dia]})` : "a combinar";
    const texto = [
      `Olá! Gostaria de reservar uma mesa na Maria & José ${c.nome}.`,
      ``,
      `Data: ${quando}`,
      `Horário: ${hora}`,
      `Pessoas: ${pessoas}`,
      obs.trim() ? `Observações: ${obs.trim()}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");
    window.open(waLink(c.whatsappIntl, texto), "_blank", "noopener");
  };

  return (
    <form className="resbar" onSubmit={enviar} data-reveal="" style={{ ["--i" as string]: 1 }}>
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
        <input className="field" type="date" name="data" value={data} min={min} onChange={(e) => setData(e.target.value)} required />
      </label>
      <label className="half">
        Horário
        <select className="field" value={hora} onChange={(e) => setHora(e.target.value)} name="horario">
          <optgroup label="Almoço">
            {ALMOCO.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </optgroup>
          <optgroup label="Jantar">
            {JANTAR.map((h) => (
              <option key={h}>{h}</option>
            ))}
          </optgroup>
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
      {aviso && (
        <p className="res-msg" role="alert">
          {aviso}
        </p>
      )}
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
