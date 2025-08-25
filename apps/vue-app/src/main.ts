// apps/vue-app/src/main.ts
import { createApp } from 'vue'
import './style.css'
// import * as ui from '@repo/ui';
import App from './App.vue'

// 只在开发环境下导入 polyfill
if (import.meta.env.DEV) {
  import('./polyfills')
}

createApp(App).mount('#app')