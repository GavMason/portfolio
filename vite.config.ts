import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

function copy404(): Plugin {
  return {
    name: 'copy-404',
    closeBundle() {
      copyFileSync(resolve('build/index.html'), resolve('build/404.html'))
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), copy404()],
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          three: ['three'],
        },
      },
    },
  },
})
