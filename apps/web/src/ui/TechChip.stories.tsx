import type { Meta, StoryObj } from "@storybook/nextjs";
import { TechChip } from "./TechChip";

const meta = {
  title: "Componentes/TechChip",
  component: TechChip,
  args: { name: "React 19" },
  argTypes: {
    name: {
      control: "text",
      description: "Nombre de la tecnología. Si coincide con un logo conocido (sin distinguir mayúsculas), lo muestra.",
      table: { type: { summary: "string" } },
    },
  },
} satisfies Meta<typeof TechChip>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Todas las props, editables desde el panel de controles. */
export const Playground: Story = {};

export const Stack: Story = {
  render: () => (
    <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
      {["Next.js 15", "React 19", "TypeScript", "Tailwind 4", "Storybook", "PostgreSQL", "OpenAI API"].map((t) => (
        <li key={t}><TechChip name={t} /></li>
      ))}
    </ul>
  ),
};

export const WithoutIcon: Story = {
  name: "Sin logo",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <TechChip name="ChromaDB" />
      <TechChip name="PL/SQL" />
      <TechChip name="Oracle" />
    </div>
  ),
};
