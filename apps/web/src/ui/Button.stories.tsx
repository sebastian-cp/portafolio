import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./Button";

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const meta = {
  title: "Componentes/Button",
  component: Button,
  args: { children: "Ver proyectos" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "ghost"],
      description: "Peso visual. Usa un solo `primary` por bloque.",
      table: { type: { summary: '"primary" | "secondary" | "ghost"' }, defaultValue: { summary: '"primary"' } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md"],
      description: "Tamaño del texto y del relleno.",
      table: { type: { summary: '"sm" | "md"' }, defaultValue: { summary: '"md"' } },
    },
    href: {
      control: "text",
      description: "Si existe, renderiza un `<a>` con el mismo aspecto.",
      table: { type: { summary: "string" } },
    },
    disabled: {
      control: "boolean",
      description: "Solo para `<button>`: baja la opacidad y bloquea el puntero.",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    children: { control: "text", description: "Etiqueta del botón.", table: { type: { summary: "ReactNode" } } },
    className: { control: "text", description: "Clases extra que se suman a las del componente.", table: { type: { summary: "string" } } },
  },
  parameters: { controls: { include: ["variant", "size", "href", "disabled", "children", "className"] } },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Todas las props, editables desde el panel de controles. */
export const Playground: Story = {};

export const Variants: Story = {
  name: "Variantes",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primario</Button>
      <Button variant="secondary">Secundario</Button>
      <Button variant="ghost">Fantasma</Button>
    </div>
  ),
};

export const Sizes: Story = {
  name: "Tamaños",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="md">Mediano</Button>
      <Button size="sm">Pequeño</Button>
      <Button size="md" variant="secondary">Mediano</Button>
      <Button size="sm" variant="secondary">Pequeño</Button>
    </div>
  ),
};

export const Disabled: Story = {
  name: "Deshabilitado",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Primario</Button>
      <Button variant="secondary" disabled>Secundario</Button>
      <Button variant="ghost" disabled>Fantasma</Button>
    </div>
  ),
};

/** Con `href` renderiza un `<a>`: misma apariencia, semántica de enlace. */
export const AsLink: Story = {
  name: "Como enlace",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button href="#proyectos">Ir a proyectos</Button>
      <Button href="#contacto" variant="secondary">Contacto</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  name: "Con icono",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        Ver proyectos <Arrow />
      </Button>
      <Button variant="secondary" size="sm">
        Descargar CV <Arrow />
      </Button>
    </div>
  ),
};
