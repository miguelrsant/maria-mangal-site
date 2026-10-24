// Gera public/img/<foto>-<largura>.webp para cada foto de public/fotos (e fotos/celular).
// Rodar de novo sempre que trocar ou adicionar foto: node scripts/webp.mjs
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { LARGURAS, nomeWebp } from "../lib/webp.mjs";

const saida = "public/img";
rmSync(saida, { recursive: true, force: true });
mkdirSync(saida, { recursive: true });
let n = 0;
for (const pasta of ["fotos", "fotos/celular"]) {
  for (const f of readdirSync(join("public", pasta)).filter((x) => /\.jpe?g$/i.test(x))) {
    const src = `/${pasta}/${f}`;
    const { width } = await sharp(join("public", pasta, f)).metadata();
    for (const w of LARGURAS) {
      // Sem aumentar além do original: a largura maior repete o tamanho real da foto.
      await sharp(join("public", pasta, f))
        .resize({ width: Math.min(w, width) })
        .webp({ quality: 80, effort: 6, smartSubsample: true })
        .toFile(join(saida, `${nomeWebp(src)}-${w}.webp`));
      n++;
    }
  }
}
console.log(n, "arquivos WebP em", saida);
