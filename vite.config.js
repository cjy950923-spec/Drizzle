import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = fileURLToPath(new URL(".", import.meta.url));

/** 기본 빌드: 루트(index=Drizzle)만. React DS는 `BUILD_DS_PREVIEW=true npm run build`일 때만 dist에 포함. */
const input = { main: resolve(root, "index.html") };
if (process.env.BUILD_DS_PREVIEW === "true") {
  input.dsPreview = resolve(root, "ds-preview.html");
}

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input,
    },
  },
});
