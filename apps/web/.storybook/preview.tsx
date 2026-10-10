import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import type { Decorator, Preview } from "@storybook/nextjs";
import "../src/app/globals.css";

// Las mismas fuentes que el sitio, para que las stories no caigan al tipo del sistema.
const instrument = Instrument_Sans({ subsets: ["latin"], display: "swap", variable: "--font-instrument" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", weight: ["400", "500"], variable: "--font-jetbrains" });

// Cambia el tema desde la barra de herramientas, igual que el toggle del sitio.
const withTheme: Decorator = (Story, ctx) => {
  document.documentElement.dataset.theme = ctx.globals.theme;
  return (
    <div className={`${instrument.variable} ${jetbrains.variable} bg-background p-8 font-sans text-foreground`}>
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
