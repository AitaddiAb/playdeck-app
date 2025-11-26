/**
 * Vite Configuration
 *
 * Configures Vite build tool with Vue, Quasar, and DevTools plugins.
 * Sets up path aliases (@ for src) and build output configuration.
 *
 * @module ViteConfig
 */

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

/**
 * Vite configuration
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),

    quasar({
      autoImportComponentCase: 'combined',
      sassVariables: fileURLToPath(new URL('./src/Styles/Quasar.sass', import.meta.url)),
    }),
    vueDevTools({ appendTo: 'src/App/App.js' }),
  ],

  server: {
    port: 3900,
  },
  build: {
    outDir: 'build/spa',
    rollupOptions: {
      output: {
        entryFileNames: '[hash:16].js',
        chunkFileNames: '[hash:16].js',
        assetFileNames: '[hash:16].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
