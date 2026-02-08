# Dream UI

> 灵感源于 AR/VR 空间界面的 **玻璃拟态（Glassmorphism）** 组件库
> 半透明 · 毛玻璃 · 光晕边框 · 悬浮感

基于 **Vue 3** + **TypeScript** + **Vite** + **SCSS**，提供 30+ 开箱即用的玻璃拟态组件。

---

## 快速开始（3 步上手）

### 1. 安装

```bash
npm install @tght_1211/dream-ui
```

> 要求 Vue >= 3.3.0

### 2. 引入

在 `main.ts`（或 `main.js`）中添加两行：

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

import DreamUI from '@tght_1211/dream-ui'        // ① 引入组件库
import '@tght_1211/dream-ui/style'               // ② 引入样式（必须！）

const app = createApp(App)
app.use(DreamUI)                                  // ③ 全局注册
app.mount('#app')
```

### 3. 直接使用

注册后所有组件全局可用，无需再 import：

```vue
<template>
  <DGlassCard hoverable>
    <h3>Hello Dream UI ✨</h3>
    <p>这是一个玻璃拟态卡片</p>
    <DGlassButton variant="primary">点击我</DGlassButton>
  </DGlassCard>
</template>
```

就这么简单，3 步搞定！

---

## 按需导入（可选，减小打包体积）

如果你只需要几个组件，可以按需导入：

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

> **注意**：按需导入时仍然需要在 `main.ts` 中引入样式：
> ```ts
> import '@tght_1211/dream-ui/style'
> ```

---

## 本地开发（不发 npm 也能用）

如果你想在本地两个项目之间共享，用 `npm link`：

```bash
# 1. 在 dream-ui 项目中
cd dream-ui
npm run build:lib
npm link

# 2. 在你的另一个项目中
cd my-project
npm link @tght_1211/dream-ui
```

使用方式和 npm install 完全一样。

---

## 背景 & 蒙版效果

Dream UI 的核心魅力在于动态背景 + 蒙版滤镜。在深色背景上使用毛玻璃组件效果最佳：

```vue
<template>
  <div id="app">
    <!-- 动态背景 -->
    <DBackgroundLayer bg-id="neon" />
    <!-- 梦幻蒙版（日漫/P5R 白色柔光） -->
    <DDreamVeil intensity="medium" :particles="true" />
    <!-- 黑柔镜（高光扩散，类似 Black Pro-Mist 滤镜） -->
    <DBloomVeil intensity="medium" />
    <!-- 背景切换器（右下角浮窗） -->
    <DBackgroundSwitcher />

    <router-view />
  </div>
</template>

<script setup>
import {
  DBackgroundLayer,
  DDreamVeil,
  DBloomVeil,
  DBackgroundSwitcher,
} from '@tght_1211/dream-ui'
</script>
```

### 通过 `useBackground()` 全局控制

```ts
import { useBackground } from '@tght_1211/dream-ui'

const {
  currentBg,          // 当前背景 ID
  setBg,              // 切换背景
  veilEnabled,        // 梦幻蒙版开关
  toggleVeil,         // 切换蒙版
  bloomEnabled,       // 黑柔镜开关
  toggleBloom,        // 切换黑柔镜
  setBloomIntensity,  // 设置黑柔镜强度
} = useBackground()
```

可选背景：`neon` / `liquid` / `aurora` / `lava` / `ocean` / `sunset` / `forest` / `candy` / `midnight` 等 18 种。

---

## 自定义组件样式

每个组件都支持三个自定义属性，无需修改 CSS：

```vue
<template>
  <!-- 自定义透明度、边框色、光晕色 -->
  <DGlassCard
    :bg-opacity="0.12"
    border-color="rgba(100, 200, 255, 0.3)"
    glow-color="rgba(100, 200, 255, 0.15)"
  >
    自定义玻璃卡片
  </DGlassCard>
</template>
```

| 属性 | 说明 | 类型 | 默认 |
|------|------|------|------|
| `bg-opacity` | 背景透明度 0~1 | `number` | 组件默认值 |
| `border-color` | 边框颜色 | `string` | 组件默认值 |
| `glow-color` | 光晕颜色 | `string` | 组件默认值 |

---

## CSS 变量（主题定制）

Dream UI 所有视觉参数通过 CSS Variables 控制，在你的 CSS 中覆盖即可：

```css
:root {
  --dream-bg-primary: rgba(255, 255, 255, 0.06);
  --dream-border-default: rgba(255, 255, 255, 0.20);
  --dream-radius-md: 12px;
  --dream-color-primary: #60a5fa;
  --dream-color-success: #34d399;
  --dream-color-warning: #fbbf24;
  --dream-color-danger: #f87171;
}
```

SCSS 用户可以直接导入变量：

```scss
@use '@tght_1211/dream-ui/variables';
```

---

## 全部组件

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

---

## 使用示例

### Button 按钮

```vue
<DGlassButton variant="primary">Primary</DGlassButton>
<DGlassButton variant="success" size="lg">Large</DGlassButton>
<DGlassButton :loading="true">加载中</DGlassButton>
<DGlassButton outline>Outline</DGlassButton>
```

### Card 卡片

```vue
<DGlassCard hoverable glow>
  <template #header>标题</template>
  <p>内容区域</p>
  <template #footer>
    <DGlassButton variant="primary">确认</DGlassButton>
  </template>
</DGlassCard>
```

### Input 输入框

```vue
<template>
  <DGlassInput v-model="name" label="姓名" placeholder="请输入" clearable />
  <DGlassInput label="邮箱" error="格式不正确" />
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
</script>
```

### Dialog 对话框

```vue
<template>
  <DGlassButton @click="show = true">打开对话框</DGlassButton>
  <DGlassDialog v-model="show" title="确认操作">
    <p>是否继续？</p>
    <template #footer>
      <DGlassButton variant="ghost" @click="show = false">取消</DGlassButton>
      <DGlassButton variant="primary" @click="show = false">确认</DGlassButton>
    </template>
  </DGlassDialog>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)
</script>
```

### Alert 警告

```vue
<DGlassAlert type="success" title="成功" closable>操作已完成</DGlassAlert>
<DGlassAlert type="danger" title="错误">请检查输入</DGlassAlert>
```

### Tabs 标签页

```vue
<template>
  <DGlassTabs v-model="tab" :tabs="tabs" />
</template>

<script setup>
import { ref } from 'vue'
const tab = ref('a')
const tabs = [
  { key: 'a', label: '选项 A' },
  { key: 'b', label: '选项 B' },
]
</script>
```

### Tag & Badge

```vue
<DGlassTag variant="primary" closable>Vue 3</DGlassTag>
<DGlassTag variant="success">TypeScript</DGlassTag>
<DGlassBadge variant="danger" dot>消息</DGlassBadge>
```

### Timeline 时间线

```vue
<DGlassTimeline :items="[
  { time: '09:00', title: '项目启动', desc: '确定技术栈', active: true },
  { time: '10:00', title: '开发组件', desc: '完成 20+ 组件' },
  { time: '11:00', title: '发布上线', desc: 'npm publish' },
]" />
```

---

## 发布到 npm

```bash
# 1. 构建
npm run build:lib

# 2. 登录 npm（首次需要）
npm login

# 3. 发布
npm publish --access public
```

构建产出：

```
dist-lib/
├── dream-ui.es.js       # ESM 模块
├── dream-ui.umd.js      # UMD 模块
├── dream-ui.css          # 组件样式
└── types/                # TypeScript 类型声明
```

---

## 本地开发文档站

```bash
npm install
npm run dev          # 启动文档站 http://localhost:5173
npm run build        # 构建文档站
```

---

## 项目结构

```
dream-ui/
├── src/
│   ├── lib.ts                 # npm 库入口
│   ├── components/dream-ui/   # 30+ 组件源码
│   ├── composables/           # 组合式函数
│   │   ├── useBackground.ts   # 背景 & 蒙版状态管理
│   │   └── useGlassStyle.ts   # 玻璃样式自定义
│   ├── styles/
│   │   ├── variables.scss     # CSS 变量（设计令牌）
│   │   └── global.scss        # 全局样式
│   └── views/                 # 文档站页面
├── dist-lib/                  # npm 库构建产出
├── vite.config.ts             # 文档站配置
├── vite.config.lib.ts         # npm 库构建配置
└── package.json
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
