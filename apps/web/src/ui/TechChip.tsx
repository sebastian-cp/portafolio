import { TechIcon } from "./TechIcon";

/** Pastilla de tecnología: logo monocromo cuando existe, texto siempre. */
export function TechChip({ name }: { name: string }) {
  return (
    <span className="chip transition-colors hover:border-accent/40 hover:text-foreground">
      <TechIcon name={name} />
      {name}
    </span>
  );
}
