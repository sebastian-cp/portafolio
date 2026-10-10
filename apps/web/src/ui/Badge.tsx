import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "good" | "warn" | "bad";

const tones: Record<Tone, string> = {
  neutral: "bg-background text-muted",
  accent: "bg-accent text-accent-contrast",
  good: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  warn: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  bad: "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200",
};

export function Badge({ tone = "neutral", mono = false, children }: { tone?: Tone; mono?: boolean; children: ReactNode }) {
  return (
    <span className={`inline-block rounded px-2 py-1 text-xs ${mono ? "font-mono" : "font-medium"} ${tones[tone]}`}>
      {children}
    </span>
  );
}
