import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";

const meta = {
  title: "Componentes/Card",
  component: Card,
  argTypes: {
    padding: {
      control: "inline-radio",
      options: ["none", "sm", "md", "lg"],
      description: "Relleno interior. `lg` crece en pantallas anchas.",
      table: { type: { summary: '"none" | "sm" | "md" | "lg"' }, defaultValue: { summary: '"md"' } },
    },
    spot: {
      control: "boolean",
      description: "Luz que sigue al cursor. Desactívala en tarjetas con mucho contenido interactivo.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
    as: {
      control: "text",
      description: "Elemento HTML que se renderiza: `article`, `section`, `li`…",
      table: { type: { summary: "ElementType" }, defaultValue: { summary: '"div"' } },
    },
    className: { control: "text", description: "Clases extra que se suman a `.card`.", table: { type: { summary: "string" } } },
    children: { control: false, description: "Contenido de la tarjeta.", table: { type: { summary: "ReactNode" } } },
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

/** Todas las props, editables desde el panel de controles. */
export const Playground: Story = {};

export const Basic: Story = {
  name: "Básica",
  render: () => (
    <Card>
      <h3 className="t-card">Clínica Alemana</h3>
      <p className="mt-2 text-sm text-muted">Portal de pacientes en Angular, con foco en accesibilidad y rendimiento.</p>
    </Card>
  ),
};

export const Flat: Story = { name: "Sin luz", args: { spot: false } };

export const Paddings: Story = {
  name: "Rellenos",
  decorators: [(Story) => <div className="w-[48rem]"><Story /></div>],
  render: () => (
    <div className="grid grid-cols-3 items-start gap-4">
      {(["sm", "md", "lg"] as const).map((p) => (
        <Card key={p} padding={p}>
          <p className="font-mono text-sm">padding=&quot;{p}&quot;</p>
        </Card>
      ))}
    </div>
  ),
};

export const WithActions: Story = {
  name: "Con acciones",
  render: () => (
    <Card as="article" spot={false} className="flex flex-col gap-4">
      <header>
        <p className="t-eyebrow">Proyecto</p>
        <h3 className="t-card mt-1">Chatbot con RAG</h3>
      </header>
      <p className="text-sm text-muted">Responde preguntas sobre el portafolio con búsqueda semántica en ChromaDB.</p>
      <footer className="flex gap-2 border-t border-border pt-4">
        <Button size="sm">Ver demo</Button>
        <Button size="sm" variant="ghost">Código</Button>
      </footer>
    </Card>
  ),
};

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
