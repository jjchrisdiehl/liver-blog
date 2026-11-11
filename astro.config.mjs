import { defineConfig } from "astro/config";

export default defineConfig({
  // Configure site and base for GitHub Pages (https://<username>.github.io/liver-blog/)
  // Adjust site URL to match your GitHub username
  site: "https://username.github.io",
  base: "/liver-blog",
  output: "static",
  vite: {
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
      },
    },
  },
});
