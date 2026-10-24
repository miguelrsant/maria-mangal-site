import { HORARIOS } from "./site";

/** Dia da semana (0 = domingo) e minutos desde 0h no horário de São Paulo. */
export function agoraSP(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const get = (k: string) => parts.find((p) => p.type === k)?.value ?? "0";
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const min = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  return { dia, min };
}

export function statusAgora(now = new Date()) {
  const { dia, min } = agoraSP(now);
  const { almoco, jantar, diasAbertos } = HORARIOS;
  const abreHoje = diasAbertos.includes(dia);
  const amanhaAbre = diasAbertos.includes((dia + 1) % 7);
  const aberto = abreHoje && ((min >= almoco.abre && min < almoco.fecha) || (min >= jantar.abre && min < jantar.fecha));
  let msg: string;
  if (!abreHoje) msg = "Fechado hoje · abre amanhã às 11h";
  else if (aberto) msg = min < almoco.fecha ? "Aberto agora · almoço até 16h" : "Aberto agora · jantar até 23h";
  else if (min < almoco.abre) msg = "Fechado agora · abre hoje às 11h";
  else if (min < jantar.abre) msg = "Fechado agora · jantar a partir das 18h30";
  else msg = amanhaAbre ? "Fechado agora · abre amanhã às 11h" : "Fechado agora · abre terça às 11h";
  return { dia, aberto, msg };
}
