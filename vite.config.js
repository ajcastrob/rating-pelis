import { defineConfig } from "vite";
import { standardCssModules } from "vite-plugin-standard-css-modules";

export default defineConfig({
  root: "src",
  base: "/01-promise/",
  publicDir: "../public",
  plugins: [standardCssModules()],
  server: { port: 1234 },
  build: {
    outDir: "../dist",
  },
  css: {
    transformer: "lightningcss",
    lightningcss: {
      drafts: {
        customMedia: true,
      },
    },
  },
});
