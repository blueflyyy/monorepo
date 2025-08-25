# UI 组件库

## 📋 组件库概述

UI 组件库是 monorepo 中的共享组件库，为 React 和 Vue 应用提供统一的 UI 组件。该库采用 TypeScript 开发，支持跨框架使用，确保设计系统的一致性和可维护性。

## 🛠️ 技术栈

- **TypeScript** - 类型安全的 JavaScript
- **React** - 用户界面库
- **Vue 3** - 渐进式 JavaScript 框架
- **CSS Modules** - 样式隔离
- **ESLint** - 代码质量检查

## 📦 可用组件

### 基础组件

#### Button 组件
- **文件**: `src/components/Button.tsx`
- **功能**: 通用按钮组件
- **特性**: 支持多种样式变体和状态
- **使用**: 适用于表单提交、操作触发等场景

#### Card 组件
- **文件**: `src/card.tsx`
- **功能**: 卡片容器组件
- **特性**: 提供统一的卡片布局和样式
- **使用**: 适用于内容展示、信息卡片等

#### Code 组件
- **文件**: `src/code.tsx`
- **功能**: 代码展示组件
- **特性**: 支持语法高亮和代码格式化
- **使用**: 适用于文档、代码示例展示

## 🚀 快速开始

### 安装依赖
```bash
# 在应用中使用组件库
# 组件库已通过 workspace 协议自动链接
```

### 在 React 应用中使用
```tsx
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import { Code } from '@repo/ui/code';

function App() {
  return (
    <Card>
      <Button>点击我</Button>
      <Code language="javascript">
        console.log('Hello World');
      </Code>
    </Card>
  );
}
```

### 在 Vue 应用中使用
```vue
<template>
  <Card>
    <Button>点击我</Button>
    <Code language="javascript">
      console.log('Hello World');
    </Code>
  </Card>
</template>

<script setup lang="ts">
import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import { Code } from '@repo/ui/code';
</script>
```

## 📁 项目结构

```
packages/ui/
├── src/                    # 源代码目录
│   ├── components/        # React 组件
│   │   └── Button.tsx     # Button 组件
│   ├── button.tsx         # Button 导出
│   ├── card.tsx           # Card 组件
│   ├── code.tsx           # Code 组件
│   └── index.ts           # 主入口文件
├── package.json           # 依赖配置
├── tsconfig.json          # TypeScript 配置
├── eslint.config.mjs      # ESLint 配置
└── vue-adapter.js         # Vue 适配器
```

## 🎨 组件 API

### Button 组件

#### Props
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}
```

#### 使用示例
```tsx
// 基础用法
<Button>默认按钮</Button>

// 不同变体
<Button variant="primary">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="outline">轮廓按钮</Button>

// 不同尺寸
<Button size="sm">小按钮</Button>
<Button size="md">中按钮</Button>
<Button size="lg">大按钮</Button>

// 禁用状态
<Button disabled>禁用按钮</Button>
```

### Card 组件

#### Props
```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: boolean;
}
```

#### 使用示例
```tsx
// 基础用法
<Card>
  <h2>卡片标题</h2>
  <p>卡片内容</p>
</Card>

// 自定义样式
<Card padding="lg" shadow>
  <h2>带阴影的大内边距卡片</h2>
</Card>
```

### Code 组件

#### Props
```typescript
interface CodeProps {
  children: string;
  language?: string;
  className?: string;
}
```

#### 使用示例
```tsx
// 基础用法
<Code>console.log('Hello World');</Code>

// 指定语言
<Code language="javascript">
  const message = 'Hello World';
  console.log(message);
</Code>
```

## 🔧 开发指南

### 添加新组件
1. 在 `src/` 目录下创建组件文件
2. 使用 TypeScript 定义组件接口
3. 添加相应的样式文件
4. 在 `index.ts` 中导出组件
5. 更新 Vue 适配器（如需要）

### 组件开发规范
- 使用 TypeScript 进行类型定义
- 遵循 React 函数组件最佳实践
- 使用 CSS Modules 进行样式隔离
- 添加适当的 JSDoc 注释

### 样式开发
- 使用 CSS Modules 避免样式冲突
- 遵循 BEM 命名规范
- 支持主题定制和响应式设计
- 确保无障碍访问性

## 🧪 测试指南

### 单元测试
```bash
# 运行组件测试
pnpm test --filter=ui

# 运行特定组件测试
pnpm test --filter=ui Button
```

### 视觉测试
- 使用 Storybook 进行组件展示
- 确保不同状态下的视觉效果
- 测试响应式布局

## 📚 文档生成

### API 文档
- 使用 TypeScript 类型定义生成 API 文档
- 提供使用示例和最佳实践
- 包含组件变体和状态说明

### 设计系统
- 定义颜色、字体、间距等设计令牌
- 提供组件使用指南
- 确保设计一致性

## 🔄 跨框架支持

### React 支持
- 原生 React 组件
- 支持所有 React 特性
- TypeScript 类型安全

### Vue 支持
- 通过适配器提供 Vue 组件
- 保持 API 一致性
- 支持 Vue 3 Composition API

## 🌟 特色功能

1. **跨框架兼容**: 同时支持 React 和 Vue
2. **类型安全**: 完整的 TypeScript 支持
3. **设计一致**: 统一的设计系统和样式
4. **易于扩展**: 模块化的组件架构
5. **性能优化**: 支持 Tree Shaking 和代码分割

## 📄 许可证

本项目采用私有许可证，仅供内部使用。

## 🤝 贡献指南

1. 遵循组件开发规范
2. 添加完整的类型定义
3. 提供使用示例和文档
4. 确保跨框架兼容性
5. 进行充分的测试验证 