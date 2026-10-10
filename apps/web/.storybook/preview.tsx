import type { Decorator, Preview } from "@storybook/nextjs";
import "../src/app/globals.css";

// Cambia el tema desde la barra de herramientas, igual que el toggle del sitio.
const withTheme: Decorator = (Story, ctx) => {
  document.documentElement.dataset.theme = ctx.globals.theme;
  return (
    <div className="bg-background p-6 text-foreground">
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  initialGlobals: { theme: "light" },
  globalTypes: {
    theme: {
      description: "Tema",
      toolbar: {
        title: "Tema",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Claro" },
          { value: "dark", title: "Oscuro" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: "todo" },
  },
};

export default preview;
