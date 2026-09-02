import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

function copy404ForGithubPages(): Plugin {
  return {
    name: 'copy-404-for-github-pages',
    apply: 'build',
    closeBundle() {
      const outDir = resolve(import.meta.dirname, 'dist')
      const indexHtml = resolve(outDir, 'index.html')
      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, resolve(outDir, '404.html'))
        console.log('  ✔ copied dist/index.html → dist/404.html (GitHub Pages SPA fallback)')
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), copy404ForGithubPages()],
  base: '/LumorixStudiosHq/',
})
