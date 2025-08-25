# Turbo Monorepo 项目

## 📋 项目概述

这是一个基于 [Turborepo](https://turborepo.com/) 构建的现代化 monorepo 项目，集成了多种前端技术栈，包括 Next.js、Vue.js 和共享 UI 组件库。项目采用 pnpm 作为包管理器，提供高效的开发体验和构建性能。

## 🏗️ 项目架构

```
turbo/
├── apps/                    # 应用层
│   ├── docs/               # Next.js 文档应用 (端口: 3001)
│   ├── web/                # Next.js Web 应用
│   └── vue-app/            # Vue.js 应用
├── packages/               # 共享包
│   ├── ui/                 # 共享 UI 组件库
│   ├── eslint-config/      # ESLint 配置
│   └── typescript-config/  # TypeScript 配置
└── turbo.json             # Turborepo 配置文件
```

## 🛠️ 技术栈

### 核心工具
- **Turborepo** - Monorepo 构建系统
- **pnpm** - 包管理器
- **TypeScript** - 类型安全的 JavaScript

### 前端框架
- **Next.js 15** - React 全栈框架
- **Vue 3** - 渐进式 JavaScript 框架
- **React 19** - 用户界面库

### 开发工具
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Vite** - 前端构建工具

## 🚀 快速开始

### 环境要求
- Node.js >= 18
- pnpm >= 9.0.0

### 安装依赖
```bash
# 安装所有依赖
pnpm install
```

### 开发模式
```bash
# 启动所有应用的开发服务器
pnpm dev

# 启动特定应用
pnpm dev --filter=docs      # 启动文档应用 (端口: 3001)
pnpm dev --filter=web       # 启动 Web 应用
pnpm dev --filter=vue-app   # 启动 Vue 应用
```

### 构建项目
```bash
# 构建所有应用
pnpm build

# 构建特定应用
pnpm build --filter=docs
pnpm build --filter=web
pnpm build --filter=vue-app
```

## 📦 应用说明

### 1. Docs 应用 (`apps/docs`)
- **技术栈**: Next.js 15 + React 19
- **端口**: 3001
- **功能**: 项目文档展示
- **特点**: 支持 Turbopack 快速构建

### 2. Web 应用 (`apps/web`)
- **技术栈**: Next.js 15 + React 19
- **功能**: 主要 Web 应用
- **特点**: 与 docs 应用共享技术栈

### 3. Vue 应用 (`apps/vue-app`)
- **技术栈**: Vue 3 + Vite + TypeScript
- **功能**: Vue.js 示例应用
- **特点**: 展示 Vue 与 React 应用的共存

## 📚 共享包

### UI 组件库 (`packages/ui`)
- 提供跨应用共享的 UI 组件
- 支持 React 和 Vue 双框架
- 包含基础组件如 Button、Card、Code 等

### ESLint 配置 (`packages/eslint-config`)
- 统一的代码规范配置
- 支持 Next.js、React、Vue 等不同场景
- 确保代码质量和一致性

### TypeScript 配置 (`packages/typescript-config`)
- 统一的 TypeScript 配置
- 针对不同项目类型提供专门配置
- 确保类型安全

## 🔧 开发指南

### 添加新应用
1. 在 `apps/` 目录下创建新应用
2. 在 `pnpm-workspace.yaml` 中注册新应用
3. 配置 `turbo.json` 中的任务

### 添加新包
1. 在 `packages/` 目录下创建新包
2. 在 `pnpm-workspace.yaml` 中注册新包
3. 配置包的依赖关系

### 新建一个vue项目
```bash
# 创建新的 Vue 项目
pnpm create vite my-vue-app --template vue

# 将项目移动到 apps 目录
mv my-vue-app apps/

# 在 pnpm-workspace.yaml 中注册项目（已自动添加）
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev --filter=my-vue-app
```

### 代码规范
```bash
# 代码检查
pnpm lint

# 类型检查
pnpm check-types

# 代码格式化
pnpm format
```

## 📝 脚本命令

| 命令 | 描述 |
|------|------|
| `pnpm dev` | 启动所有应用的开发服务器 |
| `pnpm build` | 构建所有应用 |
| `pnpm lint` | 运行代码检查 |
| `pnpm check-types` | 运行类型检查 |
| `pnpm format` | 格式化代码 |

## 🔄 Turborepo 特性

### 缓存优化
- 构建缓存：避免重复构建
- 依赖缓存：智能缓存依赖关系
- 增量构建：只构建变更的部分

### 任务编排
- 并行执行：充分利用多核性能
- 依赖管理：自动处理包间依赖
- 任务过滤：支持按需执行特定任务

## 🌟 项目特色

1. **多框架支持**: 同时支持 React 和 Vue 生态系统
2. **统一工具链**: 共享 ESLint、TypeScript 配置
3. **高效构建**: 利用 Turborepo 的缓存和并行构建
4. **类型安全**: 全项目 TypeScript 支持
5. **现代化开发**: 使用最新的框架版本和工具

## 📄 许可证

本项目采用私有许可证，仅供内部使用。

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: 添加新功能'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

**注意**: 这是一个示例项目，展示了如何使用 Turborepo 构建现代化的 monorepo 架构。
