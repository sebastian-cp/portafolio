import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./Badge";

const meta = {
  title: "Componentes/Badge",
  component: Badge,
  args: { children: "Next.js 15" },
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["neutral", "accent", "good", "warn", "bad"],
      description: "Color semántico de la etiqueta.",
      table: { type: { summary: '"neutral" | "accent" | "good" | "warn" | "bad"' }, defaultValue: { summary: '"neutral"' } },
    },
    mono: {
      control: "boolean",
      description: "Usa la fuente monoespaciada, para versiones, códigos y nombres técnicos.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    children: { control: "text", description: "Texto de la etiqueta.", table: { type: { summary: "ReactNode" } } },
  },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Todas las props, editables desde el panel de controles. */
export const Playground: Story = { args: { mono: true } };

export const Tones: Story = {
  name: "Tonos",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Neutral</Badge>
      <Badge tone="accent">Acento</Badge>
      <Badge tone="good">Bueno</Badge>
      <Badge tone="warn">Mejorable</Badge>
      <Badge tone="bad">Pobre</Badge>
    </div>
  ),
};

export const Mono: Story = {
  name: "Monoespaciada",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge mono>React 19</Badge>
      <Badge mono>Tailwind 4</Badge>
      <Badge mono>AZ-900</Badge>
    </div>
  ),
};

/** Los estados no dependen solo del color: siempre llevan texto. */
export const WebVitalsRatings: Story = {
  name: "Estados de Web Vitals",
  render: () => (
    <dl className="grid w-fit grid-cols-[auto_auto] items-center gap-x-6 gap-y-2 text-sm">
      <dt className="font-mono">LCP 1.8 s</dt>
      <dd><Badge tone="good">Bueno</Badge></dd>
      <dt className="font-mono">INP 240 ms</dt>
      <dd><Badge tone="warn">Mejorable</Badge></dd>
      <dt className="font-mono">CLS 0.31</dt>
      <dd><Badge tone="bad">Pobre</Badge></dd>
    </dl>
  ),
};

export const InHeading: Story = {
  name: "En un título",
  render: () => (
    <h3 className="t-card flex items-center gap-2">
      Portafolio <Badge tone="accent">Nuevo</Badge>
    </h3>
  ),
};
