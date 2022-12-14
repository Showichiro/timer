import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/timer/",
  build: {
    rollupOptions: {
      plugins: [visualizer()],
      output: {
        manualChunks: {
          "vendor": ["react", "react-dom"]
        },
        sourcemap: true
      }
    }
  }
});
