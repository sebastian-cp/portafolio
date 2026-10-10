import type { ElementType, HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** Luz que sigue al cursor (desactívala en tarjetas con mucho contenido interactivo). */
  spot?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  children: ReactNode;
}

const pads = { none: "", sm: "p-4", md: "p-6", lg: "p-6 sm:p-8" };

/** Superficie base del sistema: borde fino, degradado sutil y luz interior. */
export function Card({ as: Tag = "div", spot = true, padding = "md", className = "", children, ...rest }: Props) {
  return (
    <Tag {...rest} {...(spot ? { "data-spot": "" } : {})} className={`card ${pads[padding]} ${className}`}>
      {children}
    </Tag>
  );
}
