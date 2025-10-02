// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

export default defineConfig(({ mode }) => ({
  base: "/", // ✅ custom domain (apex) only
  server: { host: "::", port: 8080 },
  plugins: [
    {
      enforce: "pre" as const,
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    },
    react(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
}));
