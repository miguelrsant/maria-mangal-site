// Gera lib/blur.ts: uma prévia borrada (data URL) de cada foto em public/fotos,
// para a imagem aparecer na hora enquanto a versão final carrega.
// Rodar de novo sempre que trocar ou adicionar foto: node scripts/blur.mjs
import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const raiz = "public";
const pastas = ["fotos", "fotos/celular"];
const linhas = [];
for (const pasta of pastas) {
  for (const f of readdirSync(join(raiz, pasta)).filter((x) => x.endsWith(".jpg")).sort()) {
    const buf = await sharp(join(raiz, pasta, f)).resize(24).modulate({ saturation: 1.1 }).webp({ quality: 50 }).toBuffer();
    linhas.push(`  "/${pasta}/${f}": "data:image/webp;base64,${buf.toString("base64")}",`);
  }
}
writeFileSync(
  "lib/blur.ts",
  `// Gerado por scripts/blur.mjs. Não editar à mão.\nconst BLUR: Record<string, string> = {\n${linhas.join("\n")}\n};\n\n/** Props de prévia borrada para next/image: a foto aparece na hora, sem piscar. */\nexport function blur(src: string) {\n  const url = BLUR[src];\n  return url ? ({ placeholder: "blur", blurDataURL: url } as const) : {};\n}\n`,
);
console.log(linhas.length, "fotos");
