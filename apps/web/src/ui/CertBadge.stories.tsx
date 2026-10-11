import type { Meta, StoryObj } from "@storybook/nextjs";
import { CertBadge } from "./CertBadge";

const meta = {
  title: "Componentes/CertBadge",
  component: CertBadge,
  args: { code: "AZ-900", title: "Azure Fundamentals", issuer: "Microsoft Certified" },
  argTypes: {
    code: { control: "text", description: "Código de la certificación. Se usa en el `alt` de la imagen.", table: { type: { summary: "string" } } },
    title: { control: "text", description: "Nombre de la certificación.", table: { type: { summary: "string" } } },
    issuer: { control: "text", description: "Entidad que la emite.", table: { type: { summary: "string" } } },
    image: {
      control: "text",
      description: "Ruta a la insignia oficial. Sin ella se dibuja el escudo propio en SVG.",
      table: { type: { summary: "string" } },
    },
  },
} satisfies Meta<typeof CertBadge>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Todas las props, editables desde el panel de controles. */
export const Playground: Story = {};

export const Default: Story = { name: "Escudo propio" };
