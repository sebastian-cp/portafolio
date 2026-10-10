import type { Locale } from "./config";
import { en } from "./content/en";
import { es, type Content } from "./content/es";

export * from "./config";
export type { Content };

export const getContent = (locale: Locale): Content => (locale === "en" ? en : es);
