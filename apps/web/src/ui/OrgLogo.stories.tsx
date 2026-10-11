import type { Meta, StoryObj } from "@storybook/nextjs";
import { ORG_LOGOS } from "@/data/logos";
import { OrgLogo } from "./OrgLogo";

const meta = {
  title: "Componentes/OrgLogo",
  component: OrgLogo,
  args: { logo: ORG_LOGOS.salud },
  argTypes: {
    logo: {
      control: "object",
      description: "Archivo, texto alternativo, fondo original, medidas y alto de dibujo del logo.",
      table: { type: { summary: '{ src; alt; bg: "light" | "dark"; width; height; maxH }' } },
    },
  },
} satisfies Meta<typeof OrgLogo>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Todas las props, editables desde el panel de controles. */
export const Playground: Story = {};

export const All: Story = {
  name: "Organizaciones",
  render: () => (
    <div className="flex flex-wrap gap-3">
      {Object.entries(ORG_LOGOS).map(([key, logo]) => <OrgLogo key={key} logo={logo} />)}
    </div>
  ),
};
