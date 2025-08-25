# Docs 应用

## 📋 应用概述

Docs 应用是基于 Next.js 15 构建的文档展示应用，作为整个 monorepo 项目的文档中心。该应用运行在端口 3001，提供项目文档、API 参考和使用指南。

## 🛠️ 技术栈

- **Next.js 15** - React 全栈框架
- **React 19** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **Turbopack** - 快速构建工具
- **CSS Modules** - 样式隔离

## 🚀 快速开始

### 开发模式
```bash
# 启动开发服务器 (端口: 3001)
pnpm dev --filter=docs

# 或者进入应用目录
cd apps/docs
pnpm dev
```

### 构建应用
```bash
# 构建生产版本
pnpm build --filter=docs

# 启动生产服务器
pnpm start --filter=docs
```

## 📁 项目结构

```
apps/docs/
├── app/                    # Next.js App Router
│   ├── favicon.ico        # 网站图标
│   ├── fonts/             # 字体文件
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局组件
│   ├── page.module.css    # 首页样式
│   └── page.tsx           # 首页组件
├── public/                # 静态资源
│   ├── file-text.svg      # 文件图标
│   ├── globe.svg          # 地球图标
│   ├── next.svg           # Next.js 图标
│   ├── turborepo-dark.svg # Turborepo 深色图标
│   ├── turborepo-light.svg# Turborepo 浅色图标
│   ├── vercel.svg         # Vercel 图标
│   └── window.svg         # 窗口图标
├── package.json           # 依赖配置
├── next.config.js         # Next.js 配置
├── tsconfig.json          # TypeScript 配置
└── eslint.config.js       # ESLint 配置
```

## 🎨 组件说明

### ThemeImage 组件
- **位置**: `app/page.tsx`
- **功能**: 根据主题显示不同版本的图片
- **特性**: 支持深色/浅色主题切换

### 主要功能
1. **文档展示**: 展示项目相关文档和指南
2. **快速链接**: 提供到 Turborepo 官网和示例的链接
3. **部署集成**: 集成 Vercel 部署功能

## 🔧 配置说明

### Next.js 配置
- 启用 Turbopack 进行快速构建
- 配置端口为 3001
- 支持 TypeScript 和 ESLint

### 依赖关系
- 使用 `@repo/ui` 共享 UI 组件库
- 使用 `@repo/eslint-config` 统一代码规范
- 使用 `@repo/typescript-config` 统一类型配置

## 🌐 访问地址

- **开发环境**: http://localhost:3001
- **生产环境**: 根据部署配置确定

## 📝 开发指南

### 添加新页面
1. 在 `app/` 目录下创建新的路由目录
2. 添加 `page.tsx` 文件作为页面组件
3. 根据需要添加样式文件

### 样式开发
- 使用 CSS Modules 进行样式隔离
- 全局样式定义在 `globals.css` 中
- 组件样式使用 `.module.css` 文件

### 组件开发
- 优先使用共享的 `@repo/ui` 组件
- 遵循 TypeScript 类型定义
- 使用 ESLint 进行代码质量检查

## 🔍 调试技巧

### 开发工具
- 使用 React Developer Tools 调试组件
- 使用 Next.js 内置的开发工具
- 利用 TypeScript 类型检查

### 性能优化
- 使用 Turbopack 进行快速构建
- 图片组件支持懒加载
- 利用 Next.js 的自动代码分割

## 📚 相关资源

- [Next.js 文档](https://nextjs.org/docs)
- [Turborepo 文档](https://turborepo.com/docs)
- [React 文档](https://react.dev)
