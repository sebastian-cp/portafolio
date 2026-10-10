import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, userEvent, within } from "storybook/test";
import { Tabs } from "./Tabs";

const items = [
  { id: "a", label: "NTT DATA", hint: "2025 – Actualidad", content: <p>Clínica Alemana de Santiago.</p> },
  { id: "b", label: "LUXXOR", hint: "2024", content: <p>Chatbot con RAG y ChromaDB.</p> },
  { id: "c", label: "BID", hint: "2024", content: <p>Credit scoring con Angular.</p> },
];

const meta = {
  title: "Design System/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: { items, label: "Experiencia laboral" },
  argTypes: { orientation: { control: "inline-radio", options: ["vertical", "horizontal"] } },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};
export const Horizontal: Story = { args: { orientation: "horizontal" } };

/** Prueba de interacción: las flechas mueven la selección y el foco (roving tabindex). */
export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole("tab", { name: /NTT DATA/ });
    first.focus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(canvas.getByRole("tab", { name: /LUXXOR/ })).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("RAG");
  },
};
