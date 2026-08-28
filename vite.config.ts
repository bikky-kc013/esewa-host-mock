
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    port: 5173,
    origin: "http://localhost:5173",
    cors: true,
    open: false,
  },

  preview: {
    port: 5173,
    strictPort: false,
  },

  build: {
    target: "chrome89",
  },
});

