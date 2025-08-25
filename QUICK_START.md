# 快速开始指南

## 🚀 5分钟快速上手

### 1. 环境准备
```bash
# 确保已安装 Node.js 18+ 和 pnpm 9+
node --version  # >= 18.0.0
pnpm --version  # >= 9.0.0
```

### 2. 克隆并安装
```bash
git clone <repository-url>
cd turbo
pnpm install
```

### 3. 启动开发环境
```bash
# 启动所有应用
pnpm dev

# 或启动特定应用
pnpm dev --filter=docs      # http://localhost:3001
pnpm dev --filter=web       # http://localhost:3000
pnpm dev --filter=vue-app   # http://localhost:5173
```

## 📱 应用访问

| 应用 | 端口 | 技术栈 | 说明 |
|------|------|--------|------|
| **Docs** | 3001 | Next.js + React | 项目文档中心 |
| **Web** | 3000 | Next.js + React | 主要 Web 应用 |
| **Vue App** | 5173 | Vue 3 + Vite | Vue.js 示例应用 |
| **My Vue App** | 5173 | Vue 3 + Vite | 新创建的 Vue 应用 |

## 🛠️ 常用命令

### 开发命令
```bash
pnpm dev                    # 启动所有应用
pnpm dev --filter=<app>     # 启动特定应用
pnpm build                  # 构建所有应用
pnpm lint                   # 代码检查
pnpm format                 # 代码格式化
```

### 包管理命令
```bash
pnpm add <package> --filter=<app>    # 为特定应用添加依赖
pnpm remove <package> --filter=<app> # 移除依赖
pnpm update                          # 更新依赖
```

### 缓存管理
```bash
pnpm turbo clean            # 清理缓存
pnpm build --force          # 强制重新构建
pnpm turbo show             # 查看缓存状态
```

## 🏗️ 项目结构速览

```
turbo/
├── apps/                   # 应用层
│   ├── docs/              # 📚 文档应用 (Next.js)
│   ├── web/               # 🌐 Web 应用 (Next.js)
│   └── vue-app/           # ⚡ Vue 应用 (Vue 3)
├── packages/              # 共享包
│   ├── ui/                # 🎨 UI 组件库
│   ├── eslint-config/     # 🔍 ESLint 配置
│   └── typescript-config/ # 📝 TypeScript 配置
└── 配置文件
    ├── package.json       # 根包配置
    ├── turbo.json         # Turborepo 配置
    └── pnpm-workspace.yaml # 工作空间配置
```

## 🎯 开发工作流

### 1. 创建功能分支
```bash
git checkout -b feature/your-feature
```

### 2. 开发代码
```bash
# 启动开发服务器
pnpm dev --filter=docs

# 编辑代码...
# 保存文件自动热重载
```

### 3. 代码检查
```bash
pnpm lint
pnpm check-types
```

### 4. 提交代码
```bash
git add .
git commit -m "feat: 添加新功能"
git push origin feature/your-feature
```

## 📦 组件使用

### React 应用中使用 UI 组件
```tsx
import { Button, Card } from '@repo/ui';

function App() {
  return (
    <Card>
      <Button variant="primary">点击我</Button>
    </Card>
  );
}
```

### Vue 应用中使用 UI 组件
```vue
<template>
  <Card>
    <Button variant="primary">点击我</Button>
  </Card>
</template>

<script setup>
import { Button, Card } from '@repo/ui';
</script>
```

## 🔧 配置说明

### 环境变量
```bash
# 复制环境变量模板
cp .env.example .env.local

# 编辑环境变量
nano .env.local
```

### 端口配置
```bash
# 修改应用端口
pnpm dev --filter=docs --port 3002
```

## 🚨 常见问题

### 依赖安装失败
```bash
# 清理并重新安装
rm -rf node_modules
pnpm install
```

### 构建失败
```bash
# 清理缓存重新构建
pnpm turbo clean
pnpm build
```

### 端口被占用
```bash
# 使用不同端口
pnpm dev --filter=docs --port 3002
```

## 📚 下一步

- 📖 阅读 [完整文档](README.md)
- 🛠️ 查看 [开发指南](DEVELOPMENT.md)
- 🎨 了解 [UI 组件库](packages/ui/README.md)
- 🚀 探索 [应用文档](apps/docs/README.md)

## 🆘 获取帮助

- 📧 提交 Issue
- 💬 团队讨论
- 📖 查看官方文档

---

**提示**: 这是一个快速参考指南，详细文档请查看其他 README 文件。 