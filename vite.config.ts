import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { UserConfig as VitestUserConfigInterface } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/folder/",
});
