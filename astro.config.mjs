import { defineConfig } from "astro/config";

// Change base to '/' if you rename your repo to jjchrisdiehl.github.io,
// or keep '/liver-blog' if you keep it as a project repository.
const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  site: "https://jjchrisdiehl.github.io",
  base: isProd ? "/liver-blog" : "/", // Set to '/' if using a user root repo
  output: "static",
  vite: {
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
      },
    },
  },
});
