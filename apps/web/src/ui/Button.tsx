import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

interface Common {
  variant?: Variant;
  size?: Size;
}

type ButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-contrast border border-accent",
  secondary: "border border-border bg-transparent text-foreground hover:bg-surface",
  ghost: "border border-transparent text-muted hover:text-foreground",
};
const sizes: Record<Size, string> = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5" };

/** Botón o enlace con el mismo aspecto. Si recibe `href`, renderiza `<a>`. */
export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", className = "", ...rest } = props;
  const cls = `inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;
  if ("href" in rest && rest.href !== undefined) {
    return <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={cls} />;
  }
  return <button type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={cls} />;
}
