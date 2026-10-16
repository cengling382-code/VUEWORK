import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 访问路径带仓库名前缀（https://<username>.github.io/VUEWORK/）
  // 必须与 GitHub 仓库名完全一致（大小写敏感）
  base: '/VUEWORK/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
