import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

/**
 * GitHub Pages has no SPA fallback: when a user refreshes on a client route
 * (e.g. /LumorixStudiosHq/downloads), GitHub Pages looks for a real file,
 * doesn't find one, and serves its own 404. Copying index.html to 404.html
 * makes GitHub Pages serve our app instead, letting React Router handle the
 * URL client-side.
 */
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
