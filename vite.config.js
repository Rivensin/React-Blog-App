import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/React-Blog-App/',
  plugins: [react()],
  css: {
    postcss: './postcss.config.js', // Ensure this path matches your project setup
  },
})
