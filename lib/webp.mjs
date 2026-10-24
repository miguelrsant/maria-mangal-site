// Larguras geradas para cada foto (WebP). Usado pelo gerador e pelo loader de imagens.
export const LARGURAS = [384, 640, 828, 1080, 1280, 1600, 2000];

/** "/fotos/celular/x.jpg" → "celular-x"; "/fotos/x.jpg" → "x". */
export const nomeWebp = (src) => src.replace(/^\/fotos\//, "").replace(/\.jpe?g$/i, "").replace(/\//g, "-");
