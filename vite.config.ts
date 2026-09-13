import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        id: '/',
        name: 'Estrelar',
        short_name: 'Estrelar',
        description:
          'Aprenda a cuidar do Perfil da Empresa no Google com microlições práticas, missões e gamificação — feito para o pequeno empresário brasileiro.',
        lang: 'pt-BR',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#faf6ef',
        background_color: '#faf6ef',
        icons: [
          {
            src: '/icons/icon-192-any.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-512-any.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // SPA com rotas próprias (react-router) — qualquer navegação cai no
        // index.html cacheado; os assets versionados (JS/CSS/imagens) usam
        // cache-first automático do Workbox.
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,woff2}'],
      },
    }),
  ],
})
