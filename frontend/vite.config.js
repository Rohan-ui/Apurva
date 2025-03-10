import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    compression({ algorithm: "brotliCompress" }) // Brotli is better than Gzip
  ],
  build: {
    minify: "terser", // Better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
        drop_debugger: true
      },
      output: {
        comments: false // Remove comments
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/react-icons/")) {
            return "icons"; // Merge all icons into one chunk
          }
        }
      }
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3023",
      },
    },
  },
});
