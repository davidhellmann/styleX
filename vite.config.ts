import stylex from "@stylexjs/unplugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    stylex.vite({
      devMode: "full",
      useCSSLayers: {
        before: ["reset", "tokens", "themes", "base"],
        after: ["utilities"],
      },
    }),
    react(),
  ],
});
