import type { Content } from "@/i18n";
import { Card } from "@/ui/Card";

const punct = "text-faint";
const key = "text-accent-2";
const str = "text-foreground";
const kw = "text-accent";

/**
 * Tarjeta decorativa del hero: el perfil representado como código.
 * Va oculta para lectores de pantalla porque la misma información está en el
 * encabezado y en la sección de contacto.
 */
export function HeroCard({ profile, experience }: { profile: Content["profile"]; experience: Content["experience"] }) {
  const now = experience[0];
  const role = profile.role.split(" · ")[1] ?? profile.role;

  const Str = ({ children }: { children: string }) => <span className={str}>&quot;{children}&quot;</span>;

  return (
    <Card aria-hidden="true" padding="none" className="overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 font-mono text-xs text-faint">perfil.ts</span>
      </div>

      <pre className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-[1.9]">
        <code>
          <span className={kw}>const</span> perfil <span className={punct}>= {"{"}</span>
          {"\n  "}
          <span className={key}>rol</span>
          <span className={punct}>: </span>
          <Str>{role}</Str>
          <span className={punct}>,</span>
          {"\n  "}
          <span className={key}>experiencia</span>
          <span className={punct}>: </span>
          <Str>3 años</Str>
          <span className={punct}>,</span>
          {"\n  "}
          <span className={key}>stack</span>
          <span className={punct}>: [</span>
          <Str>Angular</Str>
          <span className={punct}>, </span>
          <Str>React</Str>
          <span className={punct}>, </span>
          <Str>Node</Str>
          <span className={punct}>],</span>
          {"\n  "}
          <span className={key}>ahora</span>
          <span className={punct}>: </span>
          <Str>{now.company}</Str>
          <span className={punct}>,</span>
          {"\n  "}
          <span className={key}>dominio</span>
          <span className={punct}>: [</span>
          <Str>salud</Str>
          <span className={punct}>, </span>
          <Str>banca</Str>
          <span className={punct}>],</span>
          {"\n  "}
          <span className={key}>ia</span>
          <span className={punct}>: </span>
          <Str>RAG · agentes · Playwright</Str>
          <span className={punct}>,</span>
          {"\n  "}
          <span className={key}>idiomas</span>
          <span className={punct}>: [</span>
          <Str>español</Str>
          <span className={punct}>, </span>
          <Str>inglés básico</Str>
          <span className={punct}>],</span>
          {"\n  "}
          <span className={key}>zona</span>
          <span className={punct}>: </span>
          <Str>America/Santiago</Str>
          <span className={punct}>,</span>
          {"\n  "}
          <span className={key}>disponible</span>
          <span className={punct}>: </span>
          <span className="text-good">true</span>
          <span className={punct}>,</span>
          <span className="pulse-dot ml-2.5 inline-block h-1.5 w-1.5 rounded-full bg-good align-middle" />
          {"\n"}
          <span className={punct}>{"}"}</span>
        </code>
      </pre>
    </Card>
  );
}
