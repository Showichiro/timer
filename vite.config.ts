import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
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
    rollupOptions: {
      plugins: [visualizer()],
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
        sourcemap: true,
      },
    },
  },
  define: {
    global: "window",
  },
});
