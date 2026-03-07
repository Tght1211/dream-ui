# Dream UI

> 灵感源于 AR/VR 空间界面的 **玻璃拟态（Glassmorphism）** Vue 3 组件库
> 半透明 · 毛玻璃 · 光晕边框 · 悬浮感

基于 **Vue 3** + **TypeScript** + **Vite** + **SCSS**，提供 **30+ PC 组件** 和 **30+ 移动端组件**，开箱即用。

**官网**：[https://dream.hulupet.cn](https://dream.hulupet.cn) | **npm**：[@tght_1211/dream-ui](https://www.npmjs.com/package/@tght_1211/dream-ui)

---

## 相关项目

| 项目 | 说明 | 地址 |
|------|------|------|
| **Dream UI** (本仓库) | 核心组件库 | [GitHub](https://github.com/Tght1211/dream-ui) |
| **Dream UI Site** | 官方文档站 | [GitHub](https://github.com/Tght1211/dream-ui-site) |
| **Dream UI Demo** | 演示项目（智能衣柜） | [GitHub](https://github.com/Tght1211/dream-ui-demo) |

---

## 环境要求

| 依赖 | 最低版本 |
|------|----------|
| Node.js | 18+ |
| Vue | 3.3.0+ |
| TypeScript | 5.0+（推荐，非必须） |

---

## 快速开始

### 第一步：创建 Vue 3 项目

如果你还没有项目，先用 Vite 创建一个：

```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install
```

### 第二步：安装 Dream UI

```bash
# npm
npm install @tght_1211/dream-ui

# yarn
yarn add @tght_1211/dream-ui

# pnpm
pnpm add @tght_1211/dream-ui
```

### 第三步：全局注册

在 `main.ts`（或 `main.js`）中引入并注册：

```ts
import { createApp } from 'vue'
import App from './App.vue'

import DreamUI from '@tght_1211/dream-ui'   // 引入组件库
import '@tght_1211/dream-ui/style'           // 引入样式（必须！）

const app = createApp(App)
app.use(DreamUI)                              // 注册全部组件（PC + 移动端）
app.mount('#app')
```

### 第四步：设置深色背景

Dream UI 的玻璃拟态效果**需要深色背景**才能呈现。在你的全局 CSS 中添加：

```css
body {
  background: #0a0a1a;
  min-height: 100vh;
  color: rgba(255, 255, 255, 0.95);
}
```

或者使用 Dream UI 内置的动态背景组件（见下方「背景 & 蒙版」章节）。

### 第五步：开始使用

注册后所有组件全局可用，无需再 import：

```vue
<template>
  <DGlassCard hoverable>
    <h3>Hello Dream UI</h3>
    <p>这是一个玻璃拟态卡片</p>
    <DGlassButton variant="primary">点击我</DGlassButton>
  </DGlassCard>
</template>
```

就这么简单，5 步搞定！

---

## 按需导入（可选）

如果你只需要几个组件，可以按需导入以减小打包体积：

```vue
<template>
  <DGlassCard hoverable>
    <DGlassButton variant="primary" @click="handleClick">确认</DGlassButton>
  </DGlassCard>
</template>

<script setup lang="ts">
import { DGlassCard, DGlassButton } from '@tght_1211/dream-ui'

const handleClick = () => {
  console.log('clicked!')
}
</script>
```

> **注意**：按需导入时**仍然需要**在 `main.ts` 中引入样式：
>
> ```ts
> import '@tght_1211/dream-ui/style'
> ```

---

## 背景 & 蒙版效果

Dream UI 提供了内置的动态背景和滤镜组件，推荐在 `App.vue` 中使用：

```vue
<template>
  <div id="app">
    <!-- 动态背景（18 种可选） -->
    <DBackgroundLayer bg-id="aurora" />
    <!-- 梦幻蒙版：日漫/P5R 风格白色柔光 -->
    <DDreamVeil intensity="medium" :particles="true" />
    <!-- 黑柔镜：高光扩散，类似 Black Pro-Mist 滤镜 -->
    <DBloomVeil intensity="medium" />
    <!-- 右下角背景切换浮窗 -->
    <DBackgroundSwitcher />

    <router-view />
  </div>
</template>
```

### 可选背景

`liquid` · `aurora` · `lava` · `ocean` · `neon` · `sunset` · `forest` · `candy` · `midnight` 等 **18 种**动态/静态背景。

### 通过 `useBackground()` 全局控制

```ts
import { useBackground } from '@tght_1211/dream-ui'

const {
  currentBg,          // 当前背景 ID
  setBg,              // 切换背景：setBg('aurora')
  veilEnabled,        // 梦幻蒙版开关
  toggleVeil,         // 切换蒙版
  bloomEnabled,       // 黑柔镜开关
  toggleBloom,        // 切换黑柔镜
  setBloomIntensity,  // 设置黑柔镜强度：'light' | 'medium' | 'heavy'
} = useBackground()
```

---

## 移动端（H5）组件

所有移动端组件以 `DMobile` 前缀命名，专为触屏交互优化，与 PC 端组件共享同一个包，无需额外安装。

```vue
<template>
  <div style="background: #0a0a1a; min-height: 100vh;">
    <DMobileNavBar title="我的应用" fixed />

    <DMobileCellGroup title="设置">
      <DMobileCell title="深色模式" center>
        <template #extra>
          <DMobileSwitch v-model="darkMode" />
        </template>
      </DMobileCell>
      <DMobileCell title="关于" value="v1.0" is-link />
    </DMobileCellGroup>

    <DMobileTabBar v-model="activeTab" :items="tabs" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const darkMode = ref(true)
const activeTab = ref(0)
const tabs = [
  { icon: 'mdi:home', text: '首页' },
  { icon: 'mdi:account', text: '我的' },
]
</script>
```

---

## 自定义组件样式

每个组件都支持三个通用 Props，无需修改 CSS：

```vue
<DGlassCard
  :bg-opacity="0.12"
  border-color="rgba(100, 200, 255, 0.3)"
  glow-color="rgba(100, 200, 255, 0.15)"
>
  自定义玻璃卡片
</DGlassCard>
```

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `bg-opacity` | 背景透明度 0~1 | `number` | 组件默认值 |
| `border-color` | 边框颜色 | `string` | 组件默认值 |
| `glow-color` | 光晕颜色 | `string` | 组件默认值 |

---

## CSS 变量（主题定制）

Dream UI 所有视觉参数通过 CSS Variables 控制，在你的 CSS 中覆盖即可全局生效：

```css
:root {
  /* 背景 */
  --dream-bg-primary: rgba(255, 255, 255, 0.04);
  --dream-bg-secondary: rgba(255, 255, 255, 0.07);

  /* 主题色 */
  --dream-color-primary: #60a5fa;
  --dream-color-success: #4ade80;
  --dream-color-warning: #fbbf24;
  --dream-color-danger: #f87171;
  --dream-color-info: #a78bfa;

  /* 边框 */
  --dream-border-default: rgba(255, 255, 255, 0.18);
  --dream-border-hover: rgba(255, 255, 255, 0.35);

  /* 文字 */
  --dream-text-primary: rgba(255, 255, 255, 0.95);
  --dream-text-secondary: rgba(255, 255, 255, 0.60);

  /* 圆角 */
  --dream-radius-sm: 8px;
  --dream-radius-md: 12px;
  --dream-radius-lg: 16px;

  /* 模糊 */
  --dream-blur-md: blur(20px);
}
```

SCSS 用户可以直接导入变量文件，在编译阶段使用：

```scss
@use '@tght_1211/dream-ui/variables';
```

### 完整变量列表

<details>
<summary>点击展开全部 CSS 变量</summary>

| 分类 | 变量 | 默认值 | 说明 |
|------|------|--------|------|
| **背景** | `--dream-bg-primary` | `rgba(255,255,255,0.04)` | 组件主背景 |
| | `--dream-bg-secondary` | `rgba(255,255,255,0.07)` | 次级背景 |
| | `--dream-bg-elevated` | `rgba(255,255,255,0.10)` | 浮起背景 |
| | `--dream-bg-deep` | `rgba(0,0,0,0.25)` | 深层背景 |
| | `--dream-bg-overlay` | `rgba(0,0,0,0.55)` | 遮罩背景 |
| **文字** | `--dream-text-primary` | `rgba(255,255,255,0.95)` | 主要文字 |
| | `--dream-text-secondary` | `rgba(255,255,255,0.60)` | 次要文字 |
| | `--dream-text-tertiary` | `rgba(255,255,255,0.35)` | 辅助文字 |
| | `--dream-text-disabled` | `rgba(255,255,255,0.20)` | 禁用文字 |
| **主题色** | `--dream-color-primary` | `#60a5fa` | 主色 |
| | `--dream-color-success` | `#4ade80` | 成功色 |
| | `--dream-color-warning` | `#fbbf24` | 警告色 |
| | `--dream-color-danger` | `#f87171` | 危险色 |
| | `--dream-color-info` | `#a78bfa` | 信息色 |
| **边框** | `--dream-border-default` | `rgba(255,255,255,0.18)` | 默认边框 |
| | `--dream-border-hover` | `rgba(255,255,255,0.35)` | 悬停边框 |
| | `--dream-border-active` | `rgba(255,255,255,0.50)` | 激活边框 |
| **光晕** | `--dream-glow-inset` | `rgba(255,255,255,0.25)` | 内发光 |
| | `--dream-glow-outer` | `rgba(255,255,255,0.06)` | 外光晕 |
| | `--dream-glow-edge` | `rgba(255,255,255,0.15)` | 边缘光 |
| **圆角** | `--dream-radius-sm` | `8px` | 小圆角 |
| | `--dream-radius-md` | `12px` | 中圆角 |
| | `--dream-radius-lg` | `16px` | 大圆角 |
| | `--dream-radius-xl` | `24px` | 超大圆角 |
| | `--dream-radius-full` | `9999px` | 全圆 |
| **间距** | `--dream-space-xs` | `4px` | |
| | `--dream-space-sm` | `8px` | |
| | `--dream-space-md` | `12px` | |
| | `--dream-space-lg` | `16px` | |
| | `--dream-space-xl` | `24px` | |
| | `--dream-space-2xl` | `32px` | |
| | `--dream-space-3xl` | `48px` | |
| **过渡** | `--dream-transition-fast` | `0.15s ease` | 快速过渡 |
| | `--dream-transition-base` | `0.25s ease` | 标准过渡 |
| | `--dream-transition-slow` | `0.35s ease` | 慢速过渡 |
| **层级** | `--dream-z-dropdown` | `100` | 下拉菜单 |
| | `--dream-z-overlay` | `300` | 遮罩层 |
| | `--dream-z-modal` | `400` | 对话框 |
| | `--dream-z-notification` | `600` | 通知 |

</details>

---

## TypeScript 支持

Dream UI 使用 TypeScript 编写，所有组件的 Props、Events、Slots 均有完整类型定义：

```ts
// 类型导入
import type { GlassCustomProps } from '@tght_1211/dream-ui'

// Composable 使用（自动推导类型）
import { useGlassStyle, useBackground } from '@tght_1211/dream-ui'
```

---

## 全部组件

### PC 端组件（30+）

| 分类 | 组件 | 说明 |
|------|------|------|
| **基础** | `DGlassButton` | 按钮 — 多种变体、尺寸、Loading/Disabled |
| | `DGlassCard` | 卡片 — 核心容器，hoverable / glow |
| | `DGlassPanel` | 面板 — 带标题栏的内容面板 |
| | `DGlassDivider` | 分割线 — 水平/垂直，发光效果 |
| **表单** | `DGlassInput` | 输入框 — 标签、清除、错误提示 |
| | `DGlassTextarea` | 文本域 — 多行输入 |
| | `DGlassSelect` | 选择器 — 下拉选择 |
| | `DGlassSwitch` | 开关 — 切换控件 |
| | `DGlassSlider` | 滑块 — 数值滑动选择 |
| **数据展示** | `DGlassBadge` | 徽章 — 标记 + 圆点指示器 |
| | `DGlassTag` | 标签 — 多色可关闭标签 |
| | `DGlassAvatar` | 头像 — 文字头像 + 状态 |
| | `DGlassProgress` | 进度条 — 多变体 |
| | `DGlassWidget` | 小组件 — VR 风格数据卡片 |
| | `DGlassTabs` | 标签页 — 内容切换 |
| | `DGlassTimeline` | 时间线 — 流程展示 |
| | `DGlassCollapse` | 折叠面板 — 手风琴模式 |
| | `DGlassLoading` | 加载 — Ring/Spinner/Skeleton |
| | `DGlassEmpty` | 空状态 — 无数据展示 |
| **反馈** | `DGlassAlert` | 警告提示 — 4 种类型 |
| | `DGlassDialog` | 对话框 — 模态弹窗 |
| | `DGlassDrawer` | 抽屉 — 侧边滑出面板 |
| | `DGlassNotification` | 通知 — 消息通知条 |
| | `DGlassTooltip` | 提示 — 悬浮文字提示 |
| | `DGlassPopover` | 弹出框 — 悬浮内容面板 |
| **导航** | `DGlassNavbar` | 导航栏 — 顶部玻璃导航 |
| | `DGlassBreadcrumb` | 面包屑 — 路径导航 |
| **特效** | `DBackgroundLayer` | 背景层 — 18 种动态/静态背景 |
| | `DBackgroundSwitcher` | 背景切换器 — 交互式浮窗 |
| | `DDreamVeil` | 梦幻蒙版 — 日漫/P5R 白色柔光 |
| | `DBloomVeil` | 黑柔镜 — 高光扩散滤镜 |

### 移动端组件（30+）

| 分类 | 组件 | 说明 |
|------|------|------|
| **导航** | `DMobileNavBar` | 导航栏 — 支持左箭头、标题、右侧操作 |
| | `DMobileTabBar` | 底部标签栏 — 图标 + 文字 |
| | `DMobileTabs` | 标签页 — 可滑动切换 |
| **基础** | `DMobileCell` | 单元格 — 列表项 |
| | `DMobileCellGroup` | 单元格组 — 带标题的列表容器 |
| | `DMobileTag` | 标签 |
| | `DMobileDivider` | 分割线 |
| | `DMobileEmpty` | 空状态 |
| | `DMobileLoading` | 加载指示器 |
| **表单** | `DMobileField` | 输入框 |
| | `DMobileSwitch` | 开关 |
| | `DMobileSearchBar` | 搜索栏 |
| | `DMobileStepper` | 步进器 |
| | `DMobileNumberKeyboard` | 数字键盘 |
| | `DMobilePasswordInput` | 密码输入 |
| | `DMobilePicker` | 选择器 |
| **反馈** | `DMobilePopup` | 弹出层 |
| | `DMobileDialog` | 对话框 |
| | `DMobileActionSheet` | 动作面板 |
| | `DMobileToast` | 轻提示 |
| | `DMobileSwipeCell` | 滑动单元格 |
| **展示** | `DMobileProgress` | 进度条 |
| | `DMobileCollapse` | 折叠面板 |
| | `DMobileNoticeBar` | 通知栏 |
| | `DMobileSwipe` | 轮播 |
| | `DMobileCountDown` | 倒计时 |
| | `DMobileImagePreview` | 图片预览 |
| | `DMobileSkeleton` | 骨架屏 |
| | `DMobileGridCard` | 宫格卡片 |
| | `DMobileHorizontalPicker` | 横向选择器 |
| | `DMobilePullRefresh` | 下拉刷新 |
| | `DMobileBackTop` | 回到顶部 |

---

## Composable 函数

| 函数 | 说明 |
|------|------|
| `useBackground()` | 全局背景 & 蒙版状态管理 |
| `useGlassStyle(props)` | 计算组件玻璃样式（透明度/边框/光晕） |
| `useTouchFeedback()` | 触摸反馈效果（移动端） |
| `useZIndex()` | 全局 z-index 管理（弹窗层级） |

---

## 本地开发（不发 npm 也能用）

如果你克隆了本仓库，想在本地另一个项目中使用：

```bash
# 1. 在 dream-ui 目录中构建并注册 link
cd dream-ui
npm run build
npm link

# 2. 在你的项目中链接
cd my-project
npm link @tght_1211/dream-ui

# 3. 使用方式和 npm install 完全一样
```

> 每次修改核心库代码后，需要重新执行 `npm run build` 再使用。

---

## 常见问题

### 组件没有样式 / 样式缺失？

确保在 `main.ts` 中引入了样式文件：

```ts
import '@tght_1211/dream-ui/style'
```

这行代码会引入所有组件的 CSS 以及 CSS 变量定义，缺少它组件将无法正常显示。

### 组件看不到毛玻璃效果？

Dream UI 的玻璃拟态效果**必须在深色背景上**才能看到。请确保：

1. `body` 设置了深色背景（如 `background: #0a0a1a`）
2. 或者使用了 `<DBackgroundLayer>` 组件提供动态背景

### 按需导入后组件无法识别？

按需导入的组件需要在 `<script setup>` 中手动 import，不会自动全局注册：

```vue
<script setup lang="ts">
import { DGlassButton } from '@tght_1211/dream-ui'
</script>
```

### 和其他 UI 库冲突？

Dream UI 的所有组件以 `DGlass` / `DMobile` / `DBackground` / `DDream` / `DBloom` 为前缀，一般不会与其他库冲突。CSS 变量以 `--dream-` 为前缀。

---

## 项目结构

```
dream-ui/
├── src/
│   ├── index.ts               # npm 库入口
│   ├── components/
│   │   ├── dream-ui/          # 30+ PC 组件
│   │   └── dream-mobile/      # 30+ 移动端组件
│   ├── composables/           # 组合式函数
│   │   ├── useBackground.ts   # 背景 & 蒙版状态管理
│   │   ├── useGlassStyle.ts   # 玻璃样式自定义
│   │   ├── useTouchFeedback.ts
│   │   └── useZIndex.ts
│   └── styles/
│       ├── variables.scss         # PC 端 CSS 变量
│       └── mobile-variables.scss  # 移动端 CSS 变量
├── dist-lib/                  # 构建产出
│   ├── dream-ui.es.js         # ESM 模块
│   ├── dream-ui.umd.js        # UMD 模块
│   ├── dream-ui.css           # 组件样式 + CSS 变量
│   └── types/                 # TypeScript 类型声明
├── vite.config.lib.ts         # 库构建配置
└── package.json
```

---

## 发布到 npm

```bash
# 构建（含类型检查）
npm run build:lib

# 登录 npm（首次需要）
npm login

# 发布
npm publish --access public
```

---

## 技术栈

| 技术 | 版本 |
|------|------|
| Vue | 3.5+ |
| TypeScript | 5.9+ |
| Vite | 7.x |
| Sass/SCSS | 1.97+ |

---

## License

MIT

---

> **Dream UI** — 让每一个像素都充满光晕与通透
