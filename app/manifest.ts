import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maria Mangal Parrilla",
    short_name: "Maria Mangal",
    description: "Parrilla argentina em Santa Aurora e Porto Jatobá.",
    start_url: "/",
    display: "browser",
    background_color: "#15110e",
    theme_color: "#15110e",
    lang: "pt-BR",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
