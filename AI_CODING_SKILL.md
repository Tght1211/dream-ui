# Dream UI — AI Coding Skill

> 本文档供 AI 编程助手（Cursor、GitHub Copilot、Cline、Windsurf 等）阅读，
> 以确保在使用 Dream UI 组件库开发前端项目时，样式统一、用法正确、代码高效。

---

## 概览

- **包名**：`@tght_1211/dream-ui`
- **版本**：1.0.3+
- **技术栈**：Vue 3.5+ / TypeScript 5.9+ / Vite 7.x / SCSS
- **风格**：Glassmorphism（玻璃拟态） — 深色背景 + 半透明毛玻璃 + 白色光晕边框
- **组件数**：30+ PC 组件 + 30+ 移动端组件
- **官网**：https://dream.hulupet.cn
- **npm**：https://www.npmjs.com/package/@tght_1211/dream-ui
- **GitHub**：https://github.com/Tght1211/dream-ui

---

## 1. 项目初始化模板

当用户要求使用 Dream UI 创建新项目时，按此模板初始化：

### main.ts

```ts
import { createApp } from 'vue'
import DreamUI from '@tght_1211/dream-ui'
import '@tght_1211/dream-ui/style'        // 必须引入！
import App from './App.vue'

const app = createApp(App)
app.use(DreamUI)
app.mount('#app')
```

### 全局样式（必须）

```css
body {
  background: #000;
  min-height: 100vh;
  color: rgba(255, 255, 255, 0.95);
  font-family: var(--dream-font-family);
  -webkit-font-smoothing: antialiased;
}
```

> **严格要求**：body 背景必须为深色（`#000` 或 `#0a0a1a`），否则玻璃拟态效果不可见。

### App.vue 推荐结构

```vue
<template>
  <!-- 动态背景（18 种可选） -->
  <DBackgroundLayer bg-id="aurora" />
  <!-- 可选：梦幻蒙版 -->
  <DDreamVeil intensity="medium" :particles="true" />
  <!-- 可选：黑柔镜 -->
  <DBloomVeil intensity="light" />
  <!-- 右下角背景切换器 -->
  <DBackgroundSwitcher />

  <!-- 页面内容 -->
  <router-view />
</template>
```

---

## 2. 设计规范（编码时必须遵守）

### 2.1 核心原则

- 所有容器组件使用 Dream UI 组件（`DGlassCard`、`DGlassPanel`），不要自己写卡片容器
- 所有按钮使用 `DGlassButton`，不要写自定义 button
- 所有表单控件使用 Dream UI 表单组件
- **禁止**在白色/浅色背景上使用组件
- **禁止**使用纯色不透明背景容器（透明度不超过 10%）

### 2.2 自定义业务容器样式

当需要额外的业务容器（Dream UI 组件无法覆盖）时，遵循以下模板：

```css
.my-container {
  backdrop-filter: blur(24px) saturate(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.1);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--dream-radius-lg);
  box-shadow:
    inset 0 0 20px rgba(255, 255, 255, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 0 1px 0 rgba(255, 255, 255, 0.20),
    0 0 15px rgba(255, 255, 255, 0.04),
    0 8px 32px rgba(0, 0, 0, 0.25);
  transition: all var(--dream-transition-base);
}

.my-container:hover {
  border-color: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
  box-shadow:
    inset 0 0 30px rgba(255, 255, 255, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.20),
    0 0 1px 0 rgba(255, 255, 255, 0.35),
    0 0 20px rgba(255, 255, 255, 0.08),
    0 12px 40px rgba(0, 0, 0, 0.30);
}
```

### 2.3 CSS 变量使用

所有样式值必须使用 Dream UI 的 CSS 变量，**禁止硬编码**：

| 用途 | 正确 | 错误 |
|------|------|------|
| 文字颜色 | `color: var(--dream-text-primary)` | `color: white` |
| 次要文字 | `color: var(--dream-text-secondary)` | `color: #999` |
| 辅助文字 | `color: var(--dream-text-tertiary)` | `color: rgba(255,255,255,0.4)` |
| 间距 | `padding: var(--dream-space-lg)` | `padding: 16px` |
| 圆角 | `border-radius: var(--dream-radius-md)` | `border-radius: 12px` |
| 过渡 | `transition: all var(--dream-transition-base)` | `transition: all 0.3s` |
| 字号 | `font-size: var(--dream-text-sm)` | `font-size: 14px` |
| 字重 | `font-weight: var(--dream-font-semibold)` | `font-weight: 600` |
| 边框 | `border-color: var(--dream-border-default)` | `border-color: rgba(255,255,255,0.2)` |

### 2.4 常用 CSS 变量速查

```
背景：    --dream-bg-primary (0.04) / --dream-bg-secondary (0.07) / --dream-bg-elevated (0.10)
文字：    --dream-text-primary / --dream-text-secondary / --dream-text-tertiary / --dream-text-disabled
主题色：  --dream-color-primary (#60a5fa) / success / warning / danger / info
边框：    --dream-border-default (0.18) / --dream-border-hover (0.35) / --dream-border-active (0.50)
圆角：    --dream-radius-sm (8px) / md (12px) / lg (16px) / xl (24px) / full (9999px)
间距：    --dream-space-xs (4) / sm (8) / md (12) / lg (16) / xl (24) / 2xl (32) / 3xl (48)
字号：    --dream-text-xs / sm / base / lg / xl / 2xl / 3xl / 4xl
字重：    --dream-font-light / regular / medium / semibold / bold
过渡：    --dream-transition-fast (0.15s) / base (0.25s) / slow (0.35s)
层级：    --dream-z-dropdown (100) / sticky (200) / overlay (300) / modal (400) / notification (600)
```

---

## 3. 组件使用指南

### 3.1 全局注册后直接使用

`app.use(DreamUI)` 后，所有组件全局可用，无需在 `<script>` 中 import：

```vue
<template>
  <DGlassCard hoverable>
    <h3>标题</h3>
    <DGlassButton variant="primary">操作</DGlassButton>
  </DGlassCard>
</template>
```

### 3.2 按需导入

```vue
<script setup lang="ts">
import { DGlassCard, DGlassButton } from '@tght_1211/dream-ui'
</script>
```

> 按需导入时仍然需要 `import '@tght_1211/dream-ui/style'`。

### 3.3 PC 端组件速查

| 组件 | 常用 Props | 用途 |
|------|-----------|------|
| `DGlassButton` | `variant="primary/success/warning/danger/ghost"` `size="sm/md/lg"` `loading` `disabled` `block` `outline` | 按钮 |
| `DGlassCard` | `hoverable` `glow` `variant="primary/success"` `:bg-opacity` `border-color` `glow-color` | 卡片容器 |
| `DGlassPanel` | `title` | 带标题面板 |
| `DGlassInput` | `v-model` `label` `placeholder` `error` `size` `clearable` `disabled` | 输入框 |
| `DGlassTextarea` | `v-model` `label` `placeholder` `:rows` | 多行输入 |
| `DGlassSelect` | `v-model` `:options` `label` `placeholder` `disabled` | 下拉选择 |
| `DGlassSwitch` | `v-model` `label` `size` `disabled` | 开关 |
| `DGlassSlider` | `v-model` `label` `:min` `:max` `show-value` | 滑块 |
| `DGlassTag` | `variant="default/primary/success/warning/danger/info"` `size="sm/md"` `closable` | 标签 |
| `DGlassBadge` | `:value` `dot` | 徽章 |
| `DGlassAvatar` | `text` `size` `status` | 头像 |
| `DGlassAlert` | `type="info/success/warning/danger"` `title` `closable` | 警告提示 |
| `DGlassProgress` | `:percentage` `variant` | 进度条 |
| `DGlassWidget` | `title` `:value` `icon` `unit` `trend` | 数据卡片 |
| `DGlassTabs` | `v-model` `:items` | 标签页 |
| `DGlassTimeline` | `:items` | 时间线 |
| `DGlassCollapse` | `#title` slot | 折叠面板 |
| `DGlassLoading` | `type="ring/spinner/skeleton"` | 加载指示 |
| `DGlassEmpty` | `description` | 空状态 |
| `DGlassDialog` | `v-model` `title` | 对话框 |
| `DGlassDrawer` | `v-model` `title` `position` | 抽屉 |
| `DGlassNotification` | `type` `title` `message` `:duration` | 通知 |
| `DGlassTooltip` | `content` `position` | 工具提示 |
| `DGlassPopover` | `title` `content` | 弹出框 |
| `DGlassNavbar` | `#brand` `#center` `#actions` slots | 导航栏 |
| `DGlassBreadcrumb` | `:items` | 面包屑 |
| `DGlassDivider` | `text` `variant="default/light"` | 分割线 |
| `DBackgroundLayer` | `bg-id` | 动态背景 |
| `DBackgroundSwitcher` | — | 背景切换器 |
| `DDreamVeil` | `intensity` `:particles` | 梦幻蒙版 |
| `DBloomVeil` | `intensity` | 黑柔镜 |

### 3.4 移动端组件

所有移动端组件以 `DMobile` 前缀命名，用法与 PC 组件类似。

### 3.5 Composable 函数

```ts
import { useBackground } from '@tght_1211/dream-ui'
const { currentBg, setBg, veilEnabled, toggleVeil, bloomEnabled, toggleBloom } = useBackground()

import { useGlassStyle } from '@tght_1211/dream-ui'
const { glassVars } = useGlassStyle(props)
```

---

## 4. 禁止事项（AI 编码时严格遵守）

- ❌ **禁止**在白色/浅色背景上使用 Dream UI 组件
- ❌ **禁止**使用纯色不透明背景容器（透明度不超过 10%）
- ❌ **禁止**硬编码颜色/间距/圆角/字号值，必须使用 `--dream-*` CSS 变量
- ❌ **禁止**省略 `backdrop-filter`（毛玻璃是核心特征）
- ❌ **禁止**使用单层 `box-shadow`（至少 4 层才有正确光晕效果）
- ❌ **禁止**省略 hover 状态的光晕增强过渡
- ❌ **禁止**使用尖锐直角（最小圆角 8px）
- ❌ **禁止**遗漏 `import '@tght_1211/dream-ui/style'`
- ❌ **禁止**遗漏 body 深色背景设置
- ❌ **禁止**自己写卡片/按钮/输入框等 Dream UI 已有的组件

---

## 5. 代码示例

### 5.1 典型页面布局

```vue
<template>
  <div class="page">
    <div class="page__header">
      <h1>页面标题</h1>
      <p>页面描述文字</p>
    </div>

    <div class="page__grid">
      <DGlassCard v-for="item in items" :key="item.id" hoverable>
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
        <DGlassTag size="sm">{{ item.tag }}</DGlassTag>
      </DGlassCard>
    </div>
  </div>
</template>

<style scoped>
.page__header {
  margin-bottom: var(--dream-space-xl);
}

.page__header h1 {
  font-size: var(--dream-text-2xl);
  font-weight: var(--dream-font-bold);
  margin-bottom: var(--dream-space-sm);
}

.page__header p {
  font-size: var(--dream-text-sm);
  color: var(--dream-text-tertiary);
}

.page__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--dream-space-lg);
}
</style>
```

### 5.2 表单页面

```vue
<template>
  <DGlassCard>
    <DGlassInput v-model="form.name" label="名称" placeholder="请输入名称" />
    <DGlassSelect v-model="form.category" :options="categories" label="分类" />
    <DGlassSwitch v-model="form.enabled" label="启用" />
    <DGlassButton variant="primary" block @click="submit">提交</DGlassButton>
  </DGlassCard>
</template>
```

---

## 6. 可选背景列表

`DBackgroundLayer` 的 `bg-id` 可选值：

`liquid` · `aurora` · `lava` · `ocean` · `neon` · `sunset` · `forest` · `candy` · `midnight` · `warm` · `grid-white` · `grid-dark` · `dots` · `pure-dark` · `pure-blue` · `pure-purple` · `pure-green` · `pure-red` · `pure-white`
