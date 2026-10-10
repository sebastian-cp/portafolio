import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./Button";

const meta = {
  title: "Design System/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Ver proyectos" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "ghost"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Small: Story = { args: { size: "sm" } };
export const Disabled: Story = { args: { disabled: true } };
/** Con `href` renderiza un `<a>`: misma apariencia, semántica de enlace. */
export const AsLink: Story = { args: { href: "#proyectos", variant: "secondary", children: "Ir a proyectos" } };
