import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./Badge";

const meta = {
  title: "Design System/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Next.js 15" },
  argTypes: { tone: { control: "inline-radio", options: ["neutral", "accent", "good", "warn", "bad"] } },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { mono: true } };
export const Good: Story = { args: { tone: "good", children: "Bueno" } };
export const Warn: Story = { args: { tone: "warn", children: "Mejorable" } };
export const Bad: Story = { args: { tone: "bad", children: "Pobre" } };

/** Los estados no dependen solo del color: siempre llevan texto. */
export const WebVitalsRatings: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge tone="good">Bueno</Badge>
      <Badge tone="warn">Mejorable</Badge>
      <Badge tone="bad">Pobre</Badge>
    </div>
  ),
};
