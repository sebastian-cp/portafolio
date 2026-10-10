import type { ReactNode } from "react";

interface Props {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  aside?: ReactNode;
}

export function SectionHeader({ id, index, eyebrow, title, aside }: Props) {
  return (
    <div className="mb-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="t-eyebrow flex items-center gap-2">
            <span className="text-accent">{index}</span>
            <span aria-hidden="true" className="inline-block h-px w-6 bg-border" />
            {eyebrow}
          </p>
          <h2 id={id} className="t-section mt-3">{title}</h2>
        </div>
        {aside && <div className="hidden shrink-0 sm:block">{aside}</div>}
      </div>
      <div className="hairline mt-6" />
    </div>
  );
}
