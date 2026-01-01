import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  base: "/",
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'dist', // Make sure this matches Vercel settings
    emptyOutDir: true
  }
})