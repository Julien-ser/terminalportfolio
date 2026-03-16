/// <reference types="vite" />
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Helps with debugging in production
    rollupOptions: {
      output: {
        // Use deterministic chunk names for better caching
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Compression (gzip and brotli) enabled by default in Vite
    // We can explicitly configure it
    minify: 'esbuild', // Fast minification
    cssMinify: true,
    // Remove console.log in production (optional, can be toggled)
    // For debugging, keep console statements
    // terserOptions can be used for more aggressive minification
  },
  // Pre-bundle dependencies that have complex exports
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'zustand',
      'langchain',
    ],
  },
  // Environment variable handling - Vite automatically injects VITE_* prefixed vars
  // No additional config needed
});
