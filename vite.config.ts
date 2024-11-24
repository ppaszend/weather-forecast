import { AliasOptions, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//@ts-expect-error IDK
import path from "path";

//@ts-expect-error IDK
const root = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "src",
  resolve: {
    alias: {
      "@": root,
    } as AliasOptions,
  },
});
