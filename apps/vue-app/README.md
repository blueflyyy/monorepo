# Vue 应用

## 📋 应用概述

Vue 应用是基于 Vue 3 和 Vite 构建的现代化单页应用，展示了在 monorepo 中集成 Vue.js 生态系统的最佳实践。该应用与 React 应用共存，共享 UI 组件库和开发工具链。

## 🛠️ 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 快速构建工具
- **TypeScript** - 类型安全的 JavaScript
- **Vue Router** - 官方路由管理器
- **Pinia** - 状态管理库

## 🚀 快速开始

### 开发模式
```bash
# 启动开发服务器
pnpm dev --filter=vue-app

# 或者进入应用目录
cd apps/vue-app
pnpm dev
```

### 构建应用
```bash
# 构建生产版本
pnpm build --filter=vue-app

# 预览构建结果
pnpm preview --filter=vue-app
```

## 📁 项目结构

```
apps/vue-app/
├── src/                    # 源代码目录
│   ├── assets/            # 静态资源
│   │   └── vue.svg        # Vue 图标
│   ├── components/        # Vue 组件
│   │   └── HelloWorld.vue # 示例组件
│   ├── App.vue            # 根组件
│   ├── main.ts            # 应用入口
│   ├── polyfills.ts       # 兼容性填充
│   ├── shims-vue.d.ts     # Vue 类型声明
│   ├── style.css          # 全局样式
│   └── vite-env.d.ts      # Vite 环境类型
├── public/                # 公共资源
│   └── vite.svg           # Vite 图标
├── packages/              # 本地包配置
│   └── tsconfig/          # TypeScript 配置
├── package.json           # 依赖配置
├── vite.config.ts         # Vite 配置
├── tsconfig.json          # TypeScript 配置
├── tsconfig.app.json      # 应用 TypeScript 配置
└── tsconfig.node.json     # Node.js TypeScript 配置
```

## 🎨 组件说明

### HelloWorld 组件
- **位置**: `src/components/HelloWorld.vue`
- **功能**: 示例组件，展示 Vue 3 组件开发
- **特性**: 使用 Composition API 和 TypeScript

### App 组件
- **位置**: `src/App.vue`
- **功能**: 应用根组件
- **特性**: 集成共享 UI 组件库

## 🔧 配置说明

### Vite 配置
- 支持 Vue 3 单文件组件
- 配置 TypeScript 支持
- 集成 ESLint 和 Prettier

### TypeScript 配置
- 使用 Vue 3 类型定义
- 支持单文件组件类型检查
- 配置路径别名和模块解析

### 依赖关系
- 使用 `@repo/ui` 共享 UI 组件库
- 集成 Vue 3 生态系统工具
- 支持浏览器兼容性

## 🌐 访问地址

- **开发环境**: http://localhost:5173 (默认 Vite 端口)
- **生产环境**: 根据部署配置确定

## 📝 开发指南

### 添加新组件
1. 在 `src/components/` 目录下创建 `.vue` 文件
2. 使用 Composition API 和 TypeScript
3. 遵循 Vue 3 最佳实践

### 样式开发
- 使用 CSS 或 SCSS 进行样式开发
- 支持 CSS Modules 和 Scoped Styles
- 全局样式定义在 `style.css` 中

### 状态管理
- 使用 Pinia 进行状态管理
- 遵循 Vue 3 响应式系统
- 利用 Composition API 的优势

## 🔍 调试技巧

### 开发工具
- 使用 Vue DevTools 调试组件
- 利用 Vite 的热模块替换
- 使用 TypeScript 类型检查

### 性能优化
- 使用 Vite 的快速构建
- 支持代码分割和懒加载
- 利用 Vue 3 的编译时优化

## 🚀 部署指南

### 构建优化
```bash
# 生产构建
pnpm build --filter=vue-app

# 分析构建结果
pnpm build --filter=vue-app --analyze
```

### 静态部署
- 支持部署到 Vercel、Netlify 等平台
- 配置路由重写规则
- 优化静态资源加载

## 📚 相关资源

- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [Vue Router 文档](https://router.vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/)

## 🔄 与 React 应用的区别

| 特性 | Vue 应用 | React 应用 |
|------|----------|------------|
| 框架 | Vue 3 | React 19 |
| 构建工具 | Vite | Next.js |
| 组件语法 | 单文件组件 | JSX |
| 状态管理 | Pinia | React Hooks |
| 路由 | Vue Router | Next.js Router |

## 🌟 特色功能

1. **现代化开发**: 使用最新的 Vue 3 和 Vite 技术栈
2. **类型安全**: 完整的 TypeScript 支持
3. **组件共享**: 与 React 应用共享 UI 组件库
4. **快速构建**: 利用 Vite 的快速构建能力
5. **开发体验**: 优秀的热重载和调试体验
