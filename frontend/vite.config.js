import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import compression from "vite-plugin-compression";

import { visualizer } from "rollup-plugin-visualizer";
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
    svgr({
      svgrOptions: {
        icon: true, // This will optimize SVG files for icon usage
        ref: true,
      },
    }),
    compression({ algorithm: "brotliCompress" }), // Brotli compression
    compression({ algorithm: "gzip" }), // Also add gzip for broader compatibility
  ],
  build: {
    minify: "terser", 
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove these functions entirely
      },
      output: {
        comments: false,
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          // Split the icons into smaller chunks to avoid the massive icons file
          'core-icons': ['react-icons/fa', 'react-icons/io'],
          'additional-icons': ['react-icons/md', 'react-icons/fi', 'react-icons/ai'],
          'extended-icons': ['react-icons/bi', 'react-icons/ri', 'react-icons/gi'],
          // Add more icon groups if needed
        },
        // Enable code splitting for dynamic imports
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Enable tree-shaking
    sourcemap: false, // Disable source maps in production to reduce size
  },
  // Optimize dependencies for faster builds
  optimizeDeps: {
    include: ['react', 'react-dom'],
    esbuildOptions: {
      target: 'es2020', // Modern target for better tree-shaking
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