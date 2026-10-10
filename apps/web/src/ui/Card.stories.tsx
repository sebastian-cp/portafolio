import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./Badge";
import { Card } from "./Card";

const meta = {
  title: "Design System/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    padding: { control: "inline-radio", options: ["none", "sm", "md", "lg"] },
    spot: { control: "boolean" },
  },
  args: {
    children: (
      <>
        <h3 className="t-card">Superficie base</h3>
        <p className="mt-2 text-sm text-muted">
          Borde fino, degradado sutil y luz interior. Con <code className="font-mono text-xs">spot</code> activo, sigue al
          cursor.
        </p>
        <div className="mt-4 flex gap-2">
          <Badge mono>Tailwind 4</Badge>
          <Badge tone="good">Accesible</Badge>
        </div>
      </>
    ),
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Flat: Story = { args: { spot: false } };
export const Roomy: Story = { args: { padding: "lg" } };

/** Las tarjetas se componen en rejilla: el bento de la portada usa esta primitiva. */
export const Bento: Story = {
  decorators: [(Story) => <div className="w-[48rem]"><Story /></div>],
  render: (args) => (
    <div className="grid grid-cols-4 gap-4">
      <Card {...args} padding="lg" className="col-span-2">
        <p className="t-stat text-gradient">2+</p>
        <p className="mt-3 text-sm text-muted">años en proyectos de software</p>
      </Card>
      <Card {...args} padding="lg">
        <p className="t-stat text-gradient">3</p>
        <p className="mt-3 text-sm text-muted">proyectos</p>
      </Card>
      <Card {...args} padding="lg">
        <p className="t-stat text-gradient">1</p>
        <p className="mt-3 text-sm text-muted">certificación</p>
      </Card>
    </div>
  ),
};
