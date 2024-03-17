import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/

dotenv.config();
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "/#/": path.resolve(__dirname, "src") + "/",
    },
  },
});
