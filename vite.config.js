import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

let copy

export default async () => {
  if (!copy) {
    copy = (await import('vite-plugin-copy')).default
  }

  return defineConfig({
    plugins: [
      vue(),
      copy({
        targets: [
          { src: 'src/assets/posters/*', dest: 'dist/src/assets/posters' }
        ],
        hook: 'writeBundle' // exécuté après le processus de build
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    optimizeDeps: {
      include: ['src/assets/posters/**']
    }
  })
}