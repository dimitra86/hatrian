import { defineConfig } from "vite";
import path from "path";
// import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  publicDir: false,
  base: "./",
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    outDir: "dist1",
    sourcemap: true,

    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash][extname]",
      },
    },
  },
});
