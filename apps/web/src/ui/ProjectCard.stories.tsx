import type { Meta, StoryObj } from "@storybook/nextjs";
import { ProjectCard } from "@/components/ProjectCard";
import { es } from "@/i18n/content/es";

const meta = {
  title: "Design System/ProjectCard",
  component: ProjectCard,
  tags: ["autodocs"],
  args: { project: es.projects[1], t: es.projectsUi },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
} satisfies Meta<typeof ProjectCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const React: Story = {};
export const Angular: Story = { args: { project: es.projects[5] } };
export const WithDemo: Story = { args: { project: { ...es.projects[1], demo: "https://example.com" } } };
