## Turborepo 配置详解

## 📋 `turbo.json` 配置说明

### 🏗️ 基础配置

```json
{
  "$schema": "https://turborepo.com/schema.json",  // JSON Schema 定义
  "ui": "tui",                                     // 使用终端 UI 界面
  "tasks": { ... }                                 // 任务定义
}
```

**配置说明**:
- `$schema`: JSON Schema 定义，提供配置文件的类型检查和自动补全
- `ui`: 使用终端用户界面 (Terminal User Interface)
- `tasks`: 定义 Turborepo 的任务配置

---

## 🚀 任务配置详解

### 1. **build 任务** - 生产环境构建

```json
"build": {
  "dependsOn": ["^build"],                    // 依赖其他包的构建
  "inputs": ["$TURBO_DEFAULT$", ".env*"],     // 构建输入文件
  "outputs": [".next/**", "!.next/cache/**", "dist/**", "src/**"], // 构建输出
  "cache": true                               // 启用缓存
}
```

**参数详解**:

#### `dependsOn: ["^build"]`
- **作用**: 定义依赖关系，先构建依赖的包
- **`^` 符号**: 表示依赖包，不是当前包
- **示例**: `apps/docs` 依赖 `@repo/ui`，所以会先构建 `@repo/ui`

#### `inputs: ["$TURBO_DEFAULT$", ".env*"]`
- **作用**: 监控这些文件的变化来触发重新构建
- **`$TURBO_DEFAULT$`**: 包含常见的源文件
  - `src/` 目录
  - `package.json`
  - `tsconfig.json`
  - `*.ts`, `*.tsx`, `*.js`, `*.jsx`
- **`.env*`**: 监控所有环境变量文件
  - `.env`
  - `.env.local`
  - `.env.production`

#### `outputs: [".next/**", "!.next/cache/**", "dist/**", "src/**"]`
- **作用**: 构建产物路径，用于缓存判断
- **`.next/**`**: Next.js 构建输出目录
- **`!.next/cache/**`**: 排除 Next.js 缓存目录（`!` 表示排除）
- **`dist/**`**: Vite 等工具的构建输出目录
- **`src/**`**: 源代码文件（用于 UI 包等）

#### `cache: true`
- **作用**: 启用构建缓存
- **效果**: 相同输入时直接使用缓存，避免重复构建
- **优势**: 大幅提升构建速度

---

### 2. **lint 任务** - 代码质量检查

```json
"lint": {
  "dependsOn": ["^lint"]                      // 依赖其他包的 lint
}
```

**作用**: 
- 运行 ESLint 等代码检查工具
- 依赖其他包的 lint 任务完成
- 确保整个项目的代码质量

---

### 3. **check-types 任务** - TypeScript 类型检查

```json
"check-types": {
  "dependsOn": ["^check-types"]               // 依赖其他包的类型检查
}
```

**作用**:
- 运行 TypeScript 类型检查
- 依赖其他包的类型检查完成
- 确保类型安全

---

### 4. **dev 任务** - 开发模式

```json
"dev": {
  "cache": false,                             // 不缓存开发模式
  "persistent": true,                         // 持续运行
  "env": ["VITE_*"]                          // 环境变量
}
```

**参数详解**:

#### `cache: false`
- **作用**: 不缓存开发模式
- **原因**: 每次都重新启动，确保开发体验
- **效果**: 避免缓存导致的问题

#### `persistent: true`
- **作用**: 持续运行
- **效果**: 开发服务器不会自动结束，需要手动停止
- **适用**: 开发服务器、文件监听等

#### `env: ["VITE_*"]`
- **作用**: 传递环境变量给任务
- **`VITE_*`**: 所有以 `VITE_` 开头的环境变量
- **示例**: `VITE_API_URL`, `VITE_APP_NAME` 等

---

### 5. **preview 任务** - 预览构建结果

```json
"preview": {
  "cache": false,                             // 不缓存预览
  "persistent": true                          // 持续运行预览服务器
}
```

**作用**:
- 预览构建后的应用
- 不缓存，每次都启动新的预览服务器
- 持续运行，直到手动停止

---

## 🔄 工作流程示例

### 构建流程
```bash
pnpm build
```

**执行顺序**:
1. 构建 `@repo/ui` (依赖包)
2. 构建 `@repo/typescript-config` (依赖包)
3. 构建 `@repo/eslint-config` (依赖包)
4. 构建 `apps/docs`, `apps/web`, `apps/vue-app`, `apps/my-vue-app`
5. 缓存构建结果

### 开发流程
```bash
pnpm dev
```

**执行过程**:
1. 启动所有应用的开发服务器
2. 持续运行，监听文件变化
3. 不缓存，每次都重新启动

### 代码检查流程
```bash
pnpm lint
```

**执行顺序**:
1. 先运行依赖包的 lint
2. 再运行应用的 lint
3. 确保整个项目的代码质量

---

## 🎯 缓存机制

### 缓存策略
- **build**: 缓存构建产物，相同输入直接使用缓存
- **dev**: 不缓存，确保开发体验
- **preview**: 不缓存，展示最新构建结果

### 缓存路径
```
.turbo/                    # Turborepo 缓存目录
├── cache/                # 构建缓存
└── logs/                 # 日志缓存
```

### 缓存清理
```bash
# 清理所有缓存
pnpm turbo clean

# 强制重新构建（忽略缓存）
pnpm build --force
```

---

## 🌟 配置优势

1. **并行构建**: 多个包可以同时构建
2. **智能缓存**: 避免重复构建相同代码
3. **依赖管理**: 自动处理包间依赖关系
4. **增量构建**: 只构建变更的部分
5. **统一配置**: 所有应用使用相同的构建规则

---

## 📝 常用命令

```bash
# 构建所有应用
pnpm build

# 构建特定应用
pnpm build --filter=docs

# 开发模式
pnpm dev

# 代码检查
pnpm lint

# 类型检查
pnpm check-types

# 预览构建结果
pnpm preview --filter=my-vue-app

# 清理缓存
pnpm turbo clean
```

这个配置让您的 monorepo 项目能够高效地管理多个应用的构建和开发流程！🚀 