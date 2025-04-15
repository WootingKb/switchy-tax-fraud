import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // This needs to be the name of the repo to host the game on github pages
  base: "/gamejam-template/",
  plugins: [react()],
});
