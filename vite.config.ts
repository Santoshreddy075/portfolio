/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // The site has real page URLs (/about, /projects/…), so assets need an absolute
  // base. GitHub Pages serves a project site under /<repo>/; the deploy workflow
  // sets BASE_PATH to that. Locally it's served from the root.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
