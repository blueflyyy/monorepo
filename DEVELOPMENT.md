# 开发指南

## 📋 开发环境设置

### 环境要求
- **Node.js**: >= 18.0.0（推荐使用 LTS 版本）
- **pnpm**: >= 9.0.0（包管理器）
- **Git**: 最新版本
- **VS Code**: 推荐编辑器（包含相关插件）
- **Chrome/Edge**: 用于调试和开发者工具

### VS Code 推荐插件
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "vue.volar",
    "ms-vscode.vscode-json",
    "yoavbls.pretty-ts-errors"
  ]
}
```

### 初始化项目
```bash
# 克隆项目
git clone <repository-url>
cd turbo

# 检查 Node.js 版本
node --version  # 应该 >= 18.0.0

# 检查 pnpm 版本
pnpm --version  # 应该 >= 9.0.0

# 安装依赖
pnpm install

# 验证安装
pnpm build

# 运行开发环境
pnpm dev
```

### 环境变量配置
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量
# .env.local 文件内容示例:
# DATABASE_URL="postgresql://..."
# NEXTAUTH_SECRET="your-secret"
# NEXTAUTH_URL="http://localhost:3000"
```

## 🏗️ 项目架构理解

### Monorepo 结构
```
turbo/
├── apps/                    # 应用层 - 独立的可部署应用
│   ├── docs/               # Next.js 文档应用 (端口: 3000)
│   │   ├── src/           # 源代码
│   │   ├── public/        # 静态资源
│   │   ├── package.json   # 包配置
│   │   └── next.config.js # Next.js 配置
│   ├── web/                # Next.js Web 应用 (端口: 3001)
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   ├── vue-app/            # Vue.js 应用 (端口: 3002)
│   │   ├── src/
│   │   ├── public/
│   │   └── vite.config.js
│   └── my-vue-app/         # 另一个 Vue.js 应用
├── packages/               # 共享包 - 可复用的代码包
│   ├── ui/                 # 共享 UI 组件库
│   │   ├── src/
│   │   │   ├── components/ # React/Vue 组件
│   │   │   ├── styles/     # 全局样式
│   │   │   └── index.ts    # 导出入口
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── eslint-config/      # ESLint 配置包
│   │   ├── base.js        # 基础配置
│   │   ├── react.js       # React 配置
│   │   ├── vue.js         # Vue 配置
│   │   └── package.json
│   ├── typescript-config/  # TypeScript 配置包
│   │   ├── base.json      # 基础配置
│   │   ├── nextjs.json    # Next.js 配置
│   │   ├── vue.json       # Vue 配置
│   │   └── package.json
│   └── utils/              # 共享工具函数
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
└── 配置文件
    ├── package.json        # 根包配置
    ├── turbo.json          # Turborepo 配置
    ├── pnpm-workspace.yaml # 工作空间配置
    ├── .gitignore          # Git 忽略规则
    ├── .eslintrc.js        # ESLint 配置
    ├── prettier.config.js  # Prettier 配置
    └── tsconfig.json       # 根 TypeScript 配置
```

### 包命名规范
- **应用包**: 直接使用应用名称 (`docs`, `web`, `vue-app`)
- **共享包**: 使用 `@repo/` 前缀 (`@repo/ui`, `@repo/eslint-config`)
- **工具包**: 使用描述性名称 (`@repo/utils`, `@repo/types`)

### 依赖关系
- **应用层** (`apps/*`) 依赖 **共享包** (`packages/*`)
- **共享包** 之间可以有依赖关系
- 使用 `workspace:*` 协议进行本地包引用

### 依赖关系图
```mermaid
graph TD
    A[docs] --> B[@repo/ui]
    A --> C[@repo/utils]
    D[web] --> B
    D --> C
    E[vue-app] --> B
    F[@repo/ui] --> G[@repo/typescript-config]
    C --> G
```

## 🚀 开发工作流

### 1. 启动开发环境
```bash
# 启动所有应用（推荐）
pnpm dev

# 启动特定应用
pnpm dev --filter=docs      # 启动文档应用 (http://localhost:3000)
pnpm dev --filter=web       # 启动 Web 应用 (http://localhost:3001)
pnpm dev --filter=vue-app   # 启动 Vue 应用 (http://localhost:3002)

# 并行启动多个应用
pnpm dev --filter=docs --filter=web

# 启动应用并监听文件变化
pnpm dev --filter=docs --watch
```

### 2. 代码开发流程
```bash
# 1. 创建功能分支
git checkout -b feature/new-component

# 2. 开发代码
# ... 编写代码 ...

# 3. 实时代码检查
pnpm lint

# 4. 类型检查
pnpm check-types

# 5. 代码格式化
pnpm format

# 6. 运行测试
pnpm test

# 7. 构建验证
pnpm build

# 8. 提交代码
git add .
git commit -m "feat: 添加新组件"
```

### 3. 代码质量检查
```bash
# 全项目代码检查
pnpm lint                    # ESLint 检查
pnpm lint:fix               # 自动修复 ESLint 问题
pnpm check-types            # TypeScript 类型检查
pnpm format                 # Prettier 格式化
pnpm format:check           # 检查格式化状态

# 特定包检查
pnpm lint --filter=ui       # 检查 UI 组件库
pnpm check-types --filter=docs  # 检查文档应用类型

# 代码质量报告
pnpm lint --format=json > lint-report.json
```

### 4. 构建和测试
```bash
# 构建所有应用
pnpm build

# 构建特定应用
pnpm build --filter=docs
pnpm build --filter=web
pnpm build --filter=vue-app

# 增量构建（仅构建有变化的包）
pnpm build --filter=...[HEAD~1]

# 并行构建
pnpm build --parallel

# 构建并生成分析报告
pnpm build:analyze

# 预览构建结果
pnpm preview --filter=docs  # Next.js 应用预览
pnpm preview --filter=vue-app  # Vue 应用预览
```

## 📦 包管理最佳实践

### 添加依赖
```bash
# 为特定应用添加依赖
pnpm add lodash --filter=docs

# 为共享包添加依赖
pnpm add react --filter=ui

# 添加开发依赖
pnpm add -D @types/node --filter=docs
```

### 包间依赖
```bash
# 应用依赖共享包
pnpm add @repo/ui --filter=docs

# 共享包依赖其他共享包
pnpm add @repo/typescript-config --filter=ui
```

## 🔧 高级开发主题

### 热重载和开发体验

#### 组件热重载配置
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@repo/ui'],
  },
  transpilePackages: ['@repo/ui', '@repo/utils'],
}

module.exports = nextConfig
```

#### Vite 热重载配置
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: {
      overlay: false, // 禁用错误覆盖层
    },
    watch: {
      // 监听 monorepo 中的共享包
      ignored: ['!**/node_modules/@repo/**']
    }
  },
  optimizeDeps: {
    include: ['@repo/ui', '@repo/utils']
  }
})
```

### 跨包类型安全

#### 共享类型定义
```typescript
// packages/types/src/index.ts
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T = any> {
  data: T
  message: string
  success: boolean
  timestamp: string
}

export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended'

// 事件类型定义
export interface AppEvents {
  'user:created': { user: User }
  'user:updated': { user: User, changes: Partial<User> }
  'user:deleted': { userId: string }
}
```

#### 类型导出和使用
```typescript
// 在应用中使用共享类型
import type { User, ApiResponse, AppEvents } from '@repo/types'
import type { EventEmitter } from 'events'

interface TypedEventEmitter extends EventEmitter {
  on<K extends keyof AppEvents>(event: K, listener: (data: AppEvents[K]) => void): this
  emit<K extends keyof AppEvents>(event: K, data: AppEvents[K]): boolean
}
```

### 性能优化策略

#### 代码分割和懒加载
```typescript
// Next.js 动态导入
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('@repo/ui/complex-chart'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // 仅客户端渲染
})

// Vue 异步组件
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent({
  loader: () => import('@repo/ui/vue-components/DataTable'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorMessage,
  delay: 200,
  timeout: 3000,
})
```

#### Bundle 分析和优化
```bash
# Next.js Bundle 分析
pnpm build --filter=docs
pnpm analyze --filter=docs

# Vue Bundle 分析
pnpm build --filter=vue-app --analyze

# 查看包大小详情
pnpm run bundle-size
```

### 状态管理模式

#### 跨应用状态同步
```typescript
// packages/store/src/global-state.ts
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

interface GlobalState {
  user: User | null
  theme: 'light' | 'dark'
  language: string
  setUser: (user: User | null) => void
  setTheme: (theme: 'light' | 'dark') => void
  setLanguage: (language: string) => void
}

export const useGlobalStore = create<GlobalState>()(
  subscribeWithSelector((set) => ({
    user: null,
    theme: 'light',
    language: 'zh-CN',
    setUser: (user) => set({ user }),
    setTheme: (theme) => set({ theme }),
    setLanguage: (language) => set({ language }),
  }))
)

// 状态持久化
import { persist } from 'zustand/middleware'

export const usePersistentStore = create<GlobalState>()(
  persist(
    (set) => ({
      // 状态定义...
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ theme: state.theme, language: state.language })
    }
  )
)
```

### API 集成和数据获取

#### 统一 API 客户端
```typescript
// packages/api/src/client.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@repo/types'

class ApiClient {
  private client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // 请求拦截器
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth-token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // 响应拦截器
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          // 处理认证失败
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.get(url, config)
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.client.post(url, data, config)
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api')
```

#### React Query 集成
```typescript
// hooks/useUser.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@repo/api'
import type { User } from '@repo/types'

export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => apiClient.get<User>(`/users/${userId}`),
    staleTime: 5 * 60 * 1000, // 5 分钟
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: Partial<User> }) =>
      apiClient.put<User>(`/users/${userId}`, data),
    onSuccess: (data, variables) => {
      // 更新缓存
      queryClient.setQueryData(['user', variables.userId], data)
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
```

## 🐛 调试和故障排除

### 开发工具配置

#### Chrome DevTools 扩展
```json
// .vscode/extensions.json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "vue.volar",
    "ms-playwright.playwright",
    "ms-vscode.vscode-json"
  ]
}
```

#### VS Code 调试配置
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Next.js",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/apps/docs/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}/apps/docs",
      "runtimeExecutable": "pnpm",
      "runtimeArgs": ["dlx"],
      "console": "integratedTerminal",
      "env": {
        "NODE_OPTIONS": "--inspect"
      }
    },
    {
      "name": "Debug Vue.js",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3002",
      "webRoot": "${workspaceFolder}/apps/vue-app/src"
    }
  ]
}
```

### 常见问题诊断

#### 依赖解析问题
```bash
# 1. 清理所有依赖
find . -name "node_modules" -type d -prune -exec rm -rf {} +
find . -name ".turbo" -type d -prune -exec rm -rf {} +

# 2. 清理 pnpm 缓存
pnpm store prune

# 3. 重新安装
pnpm install

# 4. 验证依赖树
pnpm list --depth=2

# 5. 检查重复依赖
pnpm list --depth=0 | grep -E "^└─|^├─" | sort | uniq -d
```

#### 类型检查问题
```bash
# 生成类型声明
pnpm build --filter=ui

# 检查特定文件类型
pnpm tsc --noEmit apps/docs/src/pages/index.tsx

# 详细类型错误信息
pnpm check-types --verbose

# 忽略特定类型检查
// @ts-ignore
// @ts-expect-error: 预期的类型错误
```

#### 热重载问题
```bash
# 检查文件监听限制
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf

# 重启开发服务器
pnpm dev --filter=docs --reset-cache

# 检查端口占用
lsof -i :3000
kill -9 <PID>
```

### 性能分析工具

#### 构建性能分析
```bash
# Turborepo 构建时间分析
pnpm build --profile

# 详细构建日志
pnpm build --verbose --log-level=debug

# 并行构建分析
pnpm build --parallel --graph

# 生成构建报告
pnpm turbo build --dry-run --graph > build-graph.json
```

#### 运行时性能监控
```typescript
// 性能监控工具
class PerformanceMonitor {
  private metrics: Map<string, number> = new Map()

  startMeasure(name: string) {
    performance.mark(`${name}-start`)
  }

  endMeasure(name: string) {
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)
    
    const measure = performance.getEntriesByName(name)[0]
    this.metrics.set(name, measure.duration)
    
    console.log(`${name}: ${measure.duration.toFixed(2)}ms`)
  }

  getMetrics() {
    return Object.fromEntries(this.metrics)
  }
}

export const monitor = new PerformanceMonitor()
```

### 日志和监控

#### 结构化日志
```typescript
// packages/logger/src/index.ts
import pino from 'pino'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
})

export function createLogger(service: string) {
  return logger.child({ service })
}

// 使用示例
const log = createLogger('api')
log.info({ userId: '123', action: 'login' }, 'User logged in')
log.error({ error: error.message, stack: error.stack }, 'API error')
```

#### 错误边界和错误处理
```typescript
// React 错误边界
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // 发送错误报告
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo)
    }
  }

  private reportError(error: Error, errorInfo: ErrorInfo) {
    // 发送到错误监控服务
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      }),
    })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>
    }

    return this.props.children
  }
}
```

### 测试和质量保证

#### 测试配置
```typescript
// jest.config.js
const { createJestConfig } = require('@repo/jest-config')

module.exports = createJestConfig({
  displayName: 'ui',
  testMatch: ['<rootDir>/src/**/*.test.{js,ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
})
```

#### 组件测试示例
```typescript
// packages/ui/src/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('calls onClick handler', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('supports custom variants', () => {
    render(<Button variant="danger">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('button--danger')
  })
})
```

#### E2E 测试配置
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'pnpm dev --filter=docs',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
## 🔧 配置管理

### Turborepo 配置 (`turbo.json`)
```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],      // 依赖其他包的构建
      "outputs": [".next/**", "dist/**", "build/**"],  // 构建输出
      "cache": true,               // 启用缓存
      "persistent": false          // 非持续任务
    },
    "dev": {
      "cache": false,              // 开发模式不缓存
      "persistent": true           // 持续运行
    },
    "test": {
      "dependsOn": ["build"],      // 测试前先构建
      "outputs": ["coverage/**"],  // 覆盖率输出
      "cache": true
    },
    "lint": {
      "cache": true,
      "outputs": []
    },
    "check-types": {
      "dependsOn": ["^build"],
      "cache": true,
      "outputs": []
    }
  },
  "globalDependencies": [
    "package.json",
    "turbo.json",
    ".eslintrc.js",
    "tsconfig.json"
  ],
  "pipeline": {
    "deploy": {
      "dependsOn": ["build", "test", "lint"],
      "cache": false
    }
  }
}
```

### 工作空间配置 (`pnpm-workspace.yaml`)
```yaml
packages:
  - "apps/*"          # 应用包
  - "packages/*"      # 共享包
  - "tools/*"         # 工具包
```

### 环境配置管理
```typescript
// packages/config/src/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url(),
  API_BASE_URL: z.string().url().optional(),
  REDIS_URL: z.string().url().optional(),
})

export const env = envSchema.parse(process.env)

export type Env = z.infer<typeof envSchema>
```

## 🎯 开发规范

### 代码风格
- 使用 **TypeScript** 进行类型安全开发
- 遵循 **ESLint** 规则进行代码检查
- 使用 **Prettier** 进行代码格式化
- 遵循 **Conventional Commits** 提交规范

### 提交消息规范
```bash
# 格式: <type>[optional scope]: <description>
# 示例:
feat: 添加用户认证功能
feat(ui): 新增 Button 组件
fix: 修复登录状态检查问题
docs: 更新 API 文档
style: 优化代码格式
refactor: 重构用户服务
test: 添加用户组件测试
chore: 更新依赖包版本
```

### 组件开发规范
```typescript
// packages/ui/src/components/Button/Button.tsx
import React, { forwardRef } from 'react'
import { cn } from '@repo/utils'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

// 变体定义
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// 组件接口
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// 组件实现
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
export type { ButtonProps }
```

### API 路由规范
```typescript
// apps/api/src/routes/users.ts
import { Router } from 'express'
import { z } from 'zod'
import { validateRequest } from '../middleware/validation'
import type { User } from '@repo/types'

const router = Router()

// 请求验证 Schema
const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    role: z.enum(['admin', 'user', 'guest']).default('user'),
  }),
})

const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().email().optional(),
    role: z.enum(['admin', 'user', 'guest']).optional(),
  }),
})

// 路由处理
router.post('/users', validateRequest(createUserSchema), async (req, res) => {
  try {
    const userData = req.body
    const user = await createUser(userData)
    
    res.status(201).json({
      success: true,
      data: user,
      message: 'User created successfully',
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
})

router.put('/users/:id', validateRequest(updateUserSchema), async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    const user = await updateUser(id, updates)
    
    res.json({
      success: true,
      data: user,
      message: 'User updated successfully',
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
})

export { router as usersRouter }
```
    "dev": {
      "cache": false,  // 开发模式不缓存
      "persistent": true  // 持续运行
    }
  }
}
```

### 工作空间配置 (`pnpm-workspace.yaml`)
```yaml
packages:
  - "apps/*"      # 应用包
  - "packages/*"  # 共享包
  - "vue-app"     # Vue 应用
```

## 🎯 开发规范

### 代码风格
- 使用 **TypeScript** 进行类型安全开发
- 遵循 **ESLint** 规则进行代码检查
- 使用 **Prettier** 进行代码格式化
- 遵循 **Conventional Commits** 提交规范

### 组件开发
```typescript
// 组件开发模板
import React from 'react';

interface ComponentProps {
  title: string;
  children?: React.ReactNode;
}

export function Component({ title, children }: ComponentProps) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
```

### 类型定义
```typescript
// 共享类型定义
export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserStatus = 'active' | 'inactive' | 'pending';
```

## 🔄 缓存策略

### Turborepo 缓存
- **构建缓存**: 避免重复构建相同代码
- **依赖缓存**: 智能缓存依赖关系
- **远程缓存**: 支持团队间共享缓存

### 缓存配置
```bash
# 清理缓存
pnpm turbo clean

# 强制重新构建
pnpm build --force

# 查看缓存状态
pnpm turbo show
```

## 🧪 测试策略

### 单元测试
```bash
# 运行所有测试
pnpm test

# 运行特定包测试
pnpm test --filter=ui

# 监听模式
pnpm test --watch
```

### 集成测试
```bash
# 构建并测试
pnpm build && pnpm test

# 端到端测试
pnpm e2e
```

## 📊 性能监控

### 构建性能
```bash
# 分析构建性能
pnpm build --profile

# 查看构建时间
pnpm turbo show --json
```

### 应用性能
- 使用 **Lighthouse** 进行性能审计
- 监控 **Core Web Vitals**
- 分析 **Bundle 大小**

## 🔍 调试技巧

### 开发工具
- **React Developer Tools**: React 应用调试
- **Vue DevTools**: Vue 应用调试
- **TypeScript**: 类型检查和智能提示

### 日志调试
```typescript
// 开发环境日志
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}

// 错误边界
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }
}
```

## 🚀 部署流程

### 构建部署
```bash
# 生产构建
pnpm build

# 部署到 Vercel
vercel --prod

# 部署到其他平台
pnpm deploy
```

### 环境配置
```bash
# 环境变量
cp .env.example .env.local

# 生产环境变量
cp .env.example .env.production
```

## 📚 学习资源

### 官方文档
- [Turborepo 文档](https://turborepo.com/docs)
- [Next.js 文档](https://nextjs.org/docs)
- [Vue.js 文档](https://vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)

### 最佳实践
- [Monorepo 最佳实践](https://monorepo.tools/)
- [React 最佳实践](https://react.dev/learn)
- [Vue 最佳实践](https://vuejs.org/guide/best-practices/)

## 🤝 团队协作

### Git 工作流
```bash
# 创建功能分支
git checkout -b feature/new-feature

# 提交代码
git add .
git commit -m "feat: 添加新功能"

# 推送分支
git push origin feature/new-feature

# 创建 Pull Request
```

### 代码审查
- 使用 **Pull Request** 进行代码审查
- 遵循 **Conventional Commits** 规范
- 确保 **CI/CD** 检查通过

## 🆘 常见问题

### 依赖问题
```bash
# 清理依赖
rm -rf node_modules
pnpm install

# 更新依赖
pnpm update
```

### 构建问题
```bash
# 清理构建缓存
pnpm turbo clean

# 重新安装依赖
pnpm install --force
```

### 端口冲突
```bash
# 修改端口
pnpm dev --filter=docs --port 3002
```

---

**注意**: 本指南会随着项目发展持续更新，请定期查看最新版本。 