// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import viteCompression from "vite-plugin-compression";

export default defineConfig(({ mode }) => ({
  base: "/",
  server: { host: "::", port: 8080 },
  
  plugins: [
    {
      enforce: "pre" as const,
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    },
    react(),
    mode === "development" && componentTagger(),
    // Brotli compression for production
    mode === "production" && viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
    }),
    // Gzip compression for production
    mode === "production" && viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
    }),
  ].filter(Boolean),
  
  resolve: { 
    alias: { "@": path.resolve(__dirname, "./src") } 
  },
  
  build: {
    // Enable source maps in production for better error tracking
    sourcemap: mode === "production" ? "hidden" : true,
    
    // Performance optimizations
    minify: "esbuild",
    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : [],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"],
          mermaid: ["mermaid"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssMinify: true,
  },
  
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
}));
