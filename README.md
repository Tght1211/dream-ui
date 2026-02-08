# Dream UI

> 灵感源于 AR/VR 空间界面的 **玻璃拟态（Glassmorphism）** 组件库
> 半透明 · 毛玻璃 · 光晕边框 · 悬浮感

基于 **Vue 3** + **TypeScript** + **Vite** + **SCSS**，提供 20+ 开箱即用的玻璃拟态组件。

---

## 安装

```bash
npm install dream-ui
```

> 要求 Vue >= 3.3.0

---

## 在其他项目中使用

### 方式一：全量注册（推荐新手）

一行代码注册所有组件，全局可用：

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

import DreamUI from 'dream-ui'
import 'dream-ui/style'       // 引入组件样式（必须）

const app = createApp(App)
app.use(DreamUI)               // 全局注册所有组件
app.mount('#app')
```

然后在任意 `.vue` 文件中直接使用，无需 import：

```vue
<template>
  <DGlassCard hoverable>
    <h3>Hello Dream UI</h3>
    <DGlassButton variant="primary">点击我</DGlassButton>
  </DGlassCard>
</template>
```

### 方式二：按需导入（推荐生产项目）

只导入你需要的组件，减小打包体积：

```vue
<template>
  <DGlassCard hoverable>
    <DGlassButton variant="primary" @click="handleClick">
      确认
    </DGlassButton>
  </DGlassCard>
</template>

<script setup lang="ts">
import { DGlassCard, DGlassButton } from 'dream-ui'

const handleClick = () => {
  console.log('clicked!')
}
</script>
```

> **注意**：按需导入时仍然需要在 `main.ts` 中引入样式：
> ```ts
> import 'dream-ui/style'
> ```

### 方式三：本地 link 开发（不发布到 npm）

如果你暂时不想发 npm，可以用 `npm link` 在本地项目间共享：

```bash
# 1. 在 dream-ui 项目中构建并创建 link
cd dream-ui
npm run build:lib
npm link

# 2. 在你的其他项目中
cd my-project
npm link dream-ui
```

然后使用方式和 npm install 完全一样。

---

## CSS 变量（自定义主题）

Dream UI 所有视觉参数通过 CSS Variables 控制。你可以在项目中覆盖它们来自定义主题：

```css
/* 在你的项目 CSS 中覆盖 */
:root {
  /* 背景透明度 */
  --dream-bg-primary: rgba(255, 255, 255, 0.06);

  /* 边框亮度 */
  --dream-border-default: rgba(255, 255, 255, 0.20);

  /* 圆角 */
  --dream-radius-md: 12px;

  /* 主题色 */
  --dream-color-primary: #60a5fa;
  --dream-color-success: #34d399;
  --dream-color-warning: #fbbf24;
  --dream-color-danger: #f87171;
}
```

如果你使用 SCSS，也可以直接导入变量文件：

```scss
@use 'dream-ui/variables';
```

---

## 组件列表

| 分类 | 组件 | 说明 |
|------|------|------|
| **基础** | `DGlassButton` | 按钮 — 多种变体、尺寸、Loading/Disabled |
| | `DGlassCard` | 卡片 — 核心容器，hoverable / glow 脉冲 |
| | `DGlassPanel` | 面板 — 带标题栏的内容面板 |
| | `DGlassDivider` | 分割线 — 水平/垂直，文字插槽，发光 |
| **表单** | `DGlassInput` | 输入框 — 标签、清除、错误提示 |
| | `DGlassTextarea` | 文本域 — 多行输入 |
| | `DGlassSelect` | 选择器 — 下拉选择 |
| | `DGlassSwitch` | 开关 — 切换控件 |
| **数据展示** | `DGlassBadge` | 徽章 — 标记 + 圆点指示器 |
| | `DGlassTag` | 标签 — 多色可关闭标签 |
| | `DGlassAvatar` | 头像 — 文字头像 + 状态 |
| | `DGlassProgress` | 进度条 — 多变体 |
| | `DGlassWidget` | 小组件 — VR 风格数据卡片 |
| | `DGlassTabs` | 标签页 — 内容切换 |
| | `DGlassTimeline` | 时间线 — 流程展示 |
| | `DGlassCollapse` | 折叠面板 — 手风琴模式 |
| | `DGlassLoading` | 加载 — Ring/Spinner/Skeleton |
| **反馈** | `DGlassAlert` | 警告提示 — 4 种类型 |
| | `DGlassDialog` | 对话框 — 模态弹窗 |
| | `DGlassNotification` | 通知 — 消息通知条 |
| **导航** | `DGlassNavbar` | 导航栏 — 顶部玻璃导航 |
| **背景** | `DBackgroundLayer` | 背景层 — 动态/静态背景 |
| | `DBackgroundSwitcher` | 背景切换器 — 交互式切换 |

---

## 使用示例

### Button

```vue
<template>
  <DGlassButton variant="primary">Primary</DGlassButton>
  <DGlassButton variant="success" size="lg">Large</DGlassButton>
  <DGlassButton :loading="true">加载中</DGlassButton>
  <DGlassButton outline>Outline</DGlassButton>
  <DGlassButton disabled>Disabled</DGlassButton>
</template>
```

### Card

```vue
<template>
  <DGlassCard hoverable glow>
    <template #header>标题</template>
    <p>内容</p>
    <template #footer>
      <DGlassButton variant="primary">确认</DGlassButton>
    </template>
  </DGlassCard>
</template>
```

### Input

```vue
<template>
  <DGlassInput v-model="name" label="姓名" placeholder="请输入" clearable />
  <DGlassInput label="邮箱" error="格式不正确" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
</script>
```

### Alert

```vue
<template>
  <DGlassAlert type="success" title="成功" closable>操作完成</DGlassAlert>
  <DGlassAlert type="danger" title="错误">请检查输入</DGlassAlert>
</template>
```

### Tabs

```vue
<template>
  <DGlassTabs v-model="tab" :tabs="tabs" />
  <p v-if="tab === 'a'">Tab A 内容</p>
  <p v-if="tab === 'b'">Tab B 内容</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tab = ref('a')
const tabs = [
  { key: 'a', label: '选项 A' },
  { key: 'b', label: '选项 B' },
]
</script>
```

### Dialog

```vue
<template>
  <DGlassButton @click="show = true">打开对话框</DGlassButton>
  <DGlassDialog v-model="show" title="确认">
    <p>是否继续？</p>
    <template #footer>
      <DGlassButton variant="ghost" @click="show = false">取消</DGlassButton>
      <DGlassButton variant="primary" @click="show = false">确认</DGlassButton>
    </template>
  </DGlassDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>
```

### Tag + Badge

```vue
<template>
  <DGlassTag variant="primary" closable>Vue 3</DGlassTag>
  <DGlassTag variant="success">TypeScript</DGlassTag>
  <DGlassBadge variant="danger" dot>消息</DGlassBadge>
</template>
```

### Timeline

```vue
<template>
  <DGlassTimeline :items="[
    { time: '09:00', title: '项目启动', desc: '确定技术栈', active: true },
    { time: '10:00', title: '开发组件', desc: '完成 20+ 组件' },
    { time: '11:00', title: '发布上线', desc: 'npm publish' },
  ]" />
</template>
```

---

## 背景效果

Dream UI 内置动态背景切换器，适合在深色背景上展示毛玻璃效果：

```vue
<template>
  <DBackgroundLayer bg-id="liquid" />
  <DBackgroundSwitcher />
</template>
```

可选背景：`liquid` / `aurora` / `lava` / `ocean` / `neon` / `gradient-sunset` / `grid-white` 等。

---

## 发布到 npm

```bash
# 1. 构建库文件
npm run build:lib

# 2. 登录 npm（首次需要）
npm login

# 3. 发布
npm publish
```

构建产出：

```
dist-lib/
├── dream-ui.es.js       # ESM 模块
├── dream-ui.umd.js      # UMD 模块（CDN / <script> 引入）
├── dream-ui.css          # 组件样式
├── dream-ui.es.js.map    # SourceMap
├── dream-ui.umd.js.map
└── types/                # TypeScript 类型声明
    ├── lib.d.ts
    └── components/...
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
│   ├── lib.ts                 # npm 库入口（按需导出 + Vue 插件）
│   ├── components/dream-ui/   # 组件源码（20+ 组件）
│   ├── styles/
│   │   ├── variables.scss     # CSS 变量
│   │   └── global.scss        # 全局样式
│   ├── views/                 # 文档站页面
│   └── router/
├── dist-lib/                  # npm 库构建产出
├── vite.config.ts             # 文档站构建配置
├── vite.config.lib.ts         # npm 库构建配置
├── tsconfig.lib.json          # 库类型声明配置
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
