import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "good" | "warn" | "bad";

const tones: Record<Tone, string> = {
  neutral: "border-border bg-surface-2 text-muted",
  accent: "border-transparent bg-accent-fill text-accent-fill-text",
  good: "border-good/30 bg-good/10 text-good",
  warn: "border-warn/30 bg-warn/10 text-warn",
  bad: "border-bad/30 bg-bad/10 text-bad",
};

export function Badge({ tone = "neutral", mono = false, children }: { tone?: Tone; mono?: boolean; children: ReactNode }) {
  return (
    <span
      className={`inline-block rounded-md border px-2 py-0.5 text-xs ${mono ? "font-mono" : "font-medium"} ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
