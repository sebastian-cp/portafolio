import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

interface Common {
  variant?: Variant;
  size?: Size;
}

type ButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-[transform,background-color,border-color,box-shadow] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary:
    "border border-transparent bg-accent-fill font-semibold text-accent-fill-text shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] hover:brightness-110",
  secondary:
    "border border-border bg-surface text-foreground shadow-[inset_0_1px_0_0_var(--hairline)] hover:border-accent/50 hover:bg-surface-2",
  ghost: "border border-transparent text-muted hover:bg-surface-2 hover:text-foreground",
};

const sizes: Record<Size, string> = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-base" };

/** Botón o enlace con el mismo aspecto. Si recibe `href`, renderiza `<a>`. */
export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className = "", ...rest } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if ("href" in rest && rest.href !== undefined) {
    return <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={cls} />;
  }
  return <button type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={cls} />;
}
