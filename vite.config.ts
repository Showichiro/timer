import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,mp3}"],
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Timer",
        description:
          "Countdown timer application. You can set as many timers as you want. The timers are stored, so they are not lost even if you close the browser.",
        short_name: "Timer",
        lang: "ja",
        start_url: "index.html",
        icons: [
          {
            src: "icon.png",
            sizes: "512x512",
            purpose: "any",
          },
          {
            src: "icon-mini.png",
            sizes: "192x192",
            purpose: "any",
          },
        ],
      },
    }),
  ],
  base: "/timer/",
  build: {
    sourcemap: true,
    rolldownOptions: {
      plugins: [visualizer()],
    },
  },
});
