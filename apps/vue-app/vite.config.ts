// apps/vue-app/vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // 指向 UI 包的源码目录
      '@repo/ui': path.resolve(__dirname, '../../packages/ui/src'),
    }
  },
  optimizeDeps: {
    include: ['@repo/ui']
  }
})