import type { Meta, StoryObj } from "@storybook/nextjs";
import { ChileFlag } from "./Flag";

const meta = {
  title: "Componentes/Flag",
  component: ChileFlag,
  args: { title: "Chile" },
  argTypes: {
    title: {
      control: "text",
      description: "Si existe, la bandera es una imagen con ese nombre. Si no, es decorativa y se oculta a lectores de pantalla.",
      table: { type: { summary: "string" } },
    },
    className: { control: "text", description: "Clases extra; el tamaño por defecto es `h-3`.", table: { type: { summary: "string" } } },
  },
} satisfies Meta<typeof ChileFlag>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Todas las props, editables desde el panel de controles. */
export const Playground: Story = {};

export const InText: Story = {
  name: "Junto a texto",
  render: () => (
    <p className="inline-flex items-center gap-2 text-sm text-muted">
      <ChileFlag /> Santiago, Chile
    </p>
  ),
};

export const Sizes: Story = {
  name: "Tamaños",
  render: () => (
    <div className="flex items-end gap-4">
      <ChileFlag title="Chile" />
      <ChileFlag title="Chile" className="h-5 w-[1.875rem]" />
      <ChileFlag title="Chile" className="h-8 w-12" />
    </div>
  ),
};
