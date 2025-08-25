// apps/vue-app/src/polyfills.ts

// 仅导入必要的 polyfill
import { Buffer } from 'buffer'

// 安全地扩展全局对象
if (typeof window !== 'undefined') {
  // 使用类型断言避免类型错误
  const win = window as unknown as Window & {
    Buffer: any
    global: Window & typeof globalThis
    process: NodeJS.Process
  }
  
  // 仅当不存在时才添加
  if (!win.Buffer) win.Buffer = Buffer
  if (!win.global) win.global = win
  if (!win.process) {
    win.process = {
      env: {},
      versions: {},
      cwd: () => '/',
      platform: 'browser',
      nextTick: (cb: Function) => setTimeout(cb, 0),
    } as any
  }
}