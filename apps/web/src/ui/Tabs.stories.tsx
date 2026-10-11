import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, userEvent, within } from "storybook/test";
import { Tabs } from "./Tabs";

const items = [
  { id: "a", label: "NTT DATA", hint: "2025 – Actualidad", content: <p>Clínica Alemana de Santiago.</p> },
  { id: "b", label: "LUXXOR", hint: "2024", content: <p>Chatbot con RAG y ChromaDB.</p> },
  { id: "c", label: "BID", hint: "2024", content: <p>Credit scoring con Angular.</p> },
];

const meta = {
  title: "Componentes/Tabs",
  component: Tabs,
  args: { items, label: "Experiencia laboral" },
  argTypes: {
    items: {
      control: false,
      description: "Pestañas: `id`, `label`, `hint` opcional y el `content` de su panel.",
      table: { type: { summary: "TabItem[]" } },
    },
    label: {
      control: "text",
      description: "Nombre accesible de la lista (`aria-label`).",
      table: { type: { summary: "string" } },
    },
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal"],
      description: "Vertical pone la lista a la izquierda desde `md`; horizontal, arriba.",
      table: { type: { summary: '"vertical" | "horizontal"' }, defaultValue: { summary: '"vertical"' } },
    },
    header: { control: false, description: "Texto sobre la lista de pestañas.", table: { type: { summary: "ReactNode" } } },
    pager: {
      control: false,
      description: "Textos de los botones Anterior/Siguiente al pie del panel.",
      table: { type: { summary: "{ prev: string; next: string; of: string }" } },
    },
    className: { control: "text", description: "Clases extra del contenedor.", table: { type: { summary: "string" } } },
  },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Todas las props, editables desde el panel de controles. */
export const Playground: Story = {};

export const Vertical: Story = {};
export const Horizontal: Story = { args: { orientation: "horizontal" } };

export const WithHeader: Story = {
  name: "Con encabezado",
  args: {
    header: <p className="text-sm text-muted">3 empleos. Elige uno para ver el detalle.</p>,
  },
};

export const WithPager: Story = {
  name: "Con paginador",
  args: { pager: { prev: "Anterior", next: "Siguiente", of: "de" } },
};

/** Prueba de interacción: las flechas mueven la selección y el foco (roving tabindex). */
export const KeyboardNavigation: Story = {
  name: "Navegación con teclado",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole("tab", { name: /NTT DATA/ });
    first.focus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(canvas.getByRole("tab", { name: /LUXXOR/ })).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("RAG");
  },
};
