import type { Meta, StoryObj } from "@storybook/nextjs";

// Ejemplos de las clases de materiales de globals.css. Solo se ven en su página de documentación.
const meta = {
  title: "Fundamentos/Superficies",
  tags: ["!dev"],
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const CardClass: Story = {
  name: ".card",
  render: () => (
    <div className="grid max-w-2xl grid-cols-2 gap-4">
      <div className="card p-6">
        <p className="t-card">.card</p>
        <p className="mt-2 text-sm text-muted">Borde, degradado sutil, luz interior y sombra.</p>
      </div>
      <div className="card p-6" data-spot="">
        <p className="t-card">.card[data-spot]</p>
        <p className="mt-2 text-sm text-muted">Pasa el cursor: el borde toma el acento.</p>
      </div>
    </div>
  ),
};

export const ChipClass: Story = {
  name: ".chip",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <span className="chip">react</span>
      <span className="chip">angular</span>
      <span className="chip uppercase tracking-wider">stack</span>
    </div>
  ),
};

export const Hairline: Story = {
  name: ".hairline",
  render: () => (
    <div className="max-w-md">
      <p className="text-sm text-muted">Sobre la línea</p>
      <div className="hairline my-4" />
      <p className="text-sm text-muted">Bajo la línea</p>
    </div>
  ),
};

export const Elevation: Story = {
  name: "Niveles",
  render: () => (
    <div className="grid max-w-2xl grid-cols-3 gap-4 text-sm">
      <div className="rounded-xl border border-border bg-background p-5">
        <p className="font-mono">bg-background</p>
        <p className="mt-1 text-muted">Fondo de página</p>
      </div>
      <div className="rounded-xl border border-border bg-surface p-5">
        <p className="font-mono">bg-surface</p>
        <p className="mt-1 text-muted">Tarjetas y paneles</p>
      </div>
      <div className="rounded-xl border border-border bg-surface-2 p-5">
        <p className="font-mono">bg-surface-2</p>
        <p className="mt-1 text-muted">Chips, hover, campos</p>
      </div>
    </div>
  ),
};

export const Gradient: Story = {
  name: ".text-gradient",
  render: () => <p className="t-stat text-gradient">2+ años</p>,
};
