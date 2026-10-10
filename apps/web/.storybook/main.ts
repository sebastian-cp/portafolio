import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: { name: "@storybook/nextjs", options: {} },
  // Solo los logos: todo public/ no sirve, porque build-storybook escribe en public/storybook
  // y copiar public/ dentro de sí mismo hace fallar el build.
  staticDirs: [{ from: "../public/logos", to: "/logos" }],
};
export default config;
