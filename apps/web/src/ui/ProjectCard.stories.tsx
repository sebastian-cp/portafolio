import type { Meta, StoryObj } from "@storybook/nextjs";
import { ProjectCard } from "@/components/ProjectCard";
import { es } from "@/i18n/content/es";

const meta = {
  title: "Patrones/ProjectCard",
  component: ProjectCard,
  args: { project: es.projects[1], t: es.projectsUi },
  argTypes: {
    project: {
      control: "object",
      description: "Proyecto del contenido i18n: título, stack, resumen, logros, tecnologías y enlaces opcionales.",
      table: { type: { summary: 'Content["projects"][number]' } },
    },
    t: {
      control: false,
      description: "Textos de la interfaz en el idioma activo (Ver demo, Código…).",
      table: { type: { summary: 'Content["projectsUi"]' } },
    },
  },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
} satisfies Meta<typeof ProjectCard>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Todas las props, editables desde el panel de controles. */
export const Playground: Story = {};

export const React: Story = {};
export const Angular: Story = { args: { project: es.projects[5] } };
export const WithDemo: Story = { name: "Con demo", args: { project: { ...es.projects[1], demo: "https://example.com" } } };

export const Grid: Story = {
  name: "Rejilla",
  decorators: [(Story) => <div className="w-[56rem]"><Story /></div>],
  render: (args) => (
    <div className="grid grid-cols-2 gap-4">
      <ProjectCard project={es.projects[1]} t={args.t} />
      <ProjectCard project={es.projects[5]} t={args.t} />
    </div>
  ),
};
