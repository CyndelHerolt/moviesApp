// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // Spécifiez le fichier HTML principal de votre application
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        // Spécifiez le répertoire de sortie du build
        dir: 'dist'
      }
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