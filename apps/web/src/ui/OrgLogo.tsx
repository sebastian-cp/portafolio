import Image from "next/image";

export interface Logo {
  src: string;
  alt: string;
  /** Fondo sobre el que el logo fue diseñado. */
  bg: "light" | "dark";
  width: number;
  height: number;
  /** Alto de dibujo. Los lockups verticales necesitan más que los horizontales. */
  maxH: string;
}

/**
 * Logo de una organización dentro de una pastilla con su propio fondo: así se
 * ve correcto en tema claro y oscuro sin retocar el archivo original.
 */
export function OrgLogo({ logo }: { logo: Logo }) {
  return (
    <span
      className={`inline-flex h-12 items-center justify-center rounded-lg px-3 ring-1 ${
        logo.bg === "dark" ? "bg-[#0d0d0d] ring-white/10" : "bg-white ring-black/10"
      }`}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        className={`w-auto object-contain ${logo.maxH}`}
      />
    </span>
  );
}
