import { create } from "storybook/theming";

// Marca del manager y de las páginas de docs: mismos colores y fuentes que el sitio.
export const theme = create({
  base: "light",
  brandTitle: "Sebastián · Design System",
  brandUrl: "/",
  brandTarget: "_self",
  colorPrimary: "#0d6b61",
  colorSecondary: "#0d6b61",
  appBg: "#f6f5f1",
  appContentBg: "#ffffff",
  appPreviewBg: "#f6f5f1",
  appBorderColor: "#dedad1",
  appBorderRadius: 10,
  textColor: "#1b1a17",
  textMutedColor: "#615e56",
  barBg: "#ffffff",
  barSelectedColor: "#0d6b61",
  fontBase: '"Instrument Sans", ui-sans-serif, system-ui, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
});
