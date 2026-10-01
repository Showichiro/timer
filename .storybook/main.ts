import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
  ],
  async viteFinal(config) {
    // The component explorer must not register the application service worker.
    config.plugins = config.plugins?.flat(1).filter((plugin) => {
      if (!plugin || typeof plugin !== "object" || !("name" in plugin))
        return true;
      return !plugin.name.startsWith("vite-plugin-pwa");
    });
    config.base = "./";
    return config;
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
