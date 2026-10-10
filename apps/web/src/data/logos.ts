import type { Logo } from "@/ui/OrgLogo";

/**
 * Logos de las organizaciones donde se usa el trabajo, fuera de i18n porque
 * no dependen del idioma. Recortados y normalizados a 96px de alto.
 */
export const ORG_LOGOS: Record<string, Logo> = {
  salud: { src: "/logos/clinica-alemana.png", alt: "Clínica Alemana de Santiago", bg: "light", width: 422, height: 120, maxH: "h-6" },
  banca: { src: "/logos/bid.png", alt: "Banco Interamericano de Desarrollo", bg: "light", width: 312, height: 120, maxH: "h-6" },
  ia: { src: "/logos/luxxor.png", alt: "LUXXOR", bg: "dark", width: 420, height: 120, maxH: "h-5" },
};
