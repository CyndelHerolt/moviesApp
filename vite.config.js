import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // Fonction servant à copier les fichiers du répertoire public/img
  // dans le répertoire de sortie lors du build
  // Cette fonction sera exécutée avant le processus de build
  // Cela garantit que les fichiers sont disponibles lors de la construction
  optimizeDeps: {
    include: ['src/assets/posters/**']
  }
})
