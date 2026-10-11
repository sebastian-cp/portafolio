import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import type { Decorator, Preview } from "@storybook/nextjs";
import { addons } from "storybook/preview-api";
import "../src/app/globals.css";
import "./docs.css";
import { theme } from "./theme";

// Las mismas fuentes que el sitio, para que las stories no caigan al tipo del sistema.
const instrument = Instrument_Sans({ subsets: ["latin"], display: "swap", variable: "--font-instrument" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], display: "swap", weight: ["400", "500"], variable: "--font-jetbrains" });

// Las páginas MDX sin stories no pasan por el decorador: el tema se aplica también al
// cargar y cada vez que cambia el global, para que no caigan al tema del sistema.
document.documentElement.dataset.theme = "light";
// Las variables de fuente también en <html>, para los bloques de las páginas MDX.
document.documentElement.classList.add(instrument.variable, jetbrains.variable);
const applyTheme = ({ globals }: { globals?: { theme?: string } }) => {
  if (globals?.theme) document.documentElement.dataset.theme = globals.theme;
};
addons.getChannel().on("setGlobals", applyTheme);
addons.getChannel().on("globalsUpdated", applyTheme);

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
    // Orden de la barra lateral, por secciones como la documentación de Bootstrap.
    options: {
      storySort: {
        order: [
          "Introducción",
          ["Bienvenida", "Uso", "Temas"],
          "Fundamentos",
          ["Colores", "Tipografía", "Superficies"],
          "Componentes",
          ["Button", "Badge", "Card", "Tabs", "TechChip", "CertBadge", "OrgLogo", "Flag"],
          "Patrones",
        ],
      },
    },
    docs: {
      theme,
      toc: { headingSelector: "h2, h3", title: "En esta página" },
      // El código de cada ejemplo queda a la vista, no detrás de "Show code".
      canvas: { sourceState: "shown" },
      // JSX listo para copiar, no el objeto de la story ni el envoltorio del tema.
      source: { type: "dynamic", excludeDecorators: true },
    },
  },
};

export default preview;
