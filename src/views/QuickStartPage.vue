<template>
  <div class="quickstart-page">
    <h1 class="page-title">快速开始</h1>
    <p class="page-desc">5 分钟上手 Dream UI，在你的 Vue 3 项目中使用玻璃拟态组件。</p>

    <!-- 安装 -->
    <section class="qs-section">
      <h2 class="qs-section__title">1. 安装</h2>
      <p class="qs-text">通过 npm 或其他包管理器安装：</p>
      <DGlassCard>
        <div class="qs-code-tabs">
          <span
            v-for="pm in pkgManagers"
            :key="pm.name"
            :class="['qs-code-tab', { 'qs-code-tab--active': activePm === pm.name }]"
            @click="activePm = pm.name"
          >{{ pm.name }}</span>
        </div>
        <pre class="qs-code">{{ currentInstallCmd }}</pre>
      </DGlassCard>
      <DGlassAlert type="info" style="margin-top: 16px;">
        <strong>前置要求：</strong>Vue &ge; 3.3.0 · 推荐 TypeScript 项目
      </DGlassAlert>
    </section>

    <!-- 全局注册 -->
    <section class="qs-section">
      <h2 class="qs-section__title">2. 全局注册（推荐入门）</h2>
      <p class="qs-text">在 <code>main.ts</code> 中一行代码注册所有组件，即可在任何 <code>.vue</code> 文件中直接使用：</p>
      <DGlassCard>
        <pre class="qs-code"><span class="qs-kw">import</span> { createApp } <span class="qs-kw">from</span> <span class="qs-str">'vue'</span>
<span class="qs-kw">import</span> DreamUI <span class="qs-kw">from</span> <span class="qs-str">'@tght_1211/dream-ui'</span>
<span class="qs-kw">import</span> <span class="qs-str">'@tght_1211/dream-ui/style'</span>
<span class="qs-kw">import</span> App <span class="qs-kw">from</span> <span class="qs-str">'./App.vue'</span>

createApp(App)
  .<span class="qs-fn">use</span>(DreamUI)  <span class="qs-cm">// 注册全部 PC + 移动端组件</span>
  .<span class="qs-fn">mount</span>(<span class="qs-str">'#app'</span>)</pre>
      </DGlassCard>
      <p class="qs-text" style="margin-top: 16px;">
        注册后，无需 <code>import</code>，直接在模板中使用：
      </p>
      <DGlassCard>
        <pre class="qs-code"><span class="qs-cm">&lt;!-- PC 端组件 --&gt;</span>
&lt;<span class="qs-tag">DGlassButton</span>&gt;点击我&lt;/<span class="qs-tag">DGlassButton</span>&gt;
&lt;<span class="qs-tag">DGlassCard</span> <span class="qs-attr">title</span>=<span class="qs-str">"卡片标题"</span>&gt;内容&lt;/<span class="qs-tag">DGlassCard</span>&gt;

<span class="qs-cm">&lt;!-- 移动端组件 --&gt;</span>
&lt;<span class="qs-tag">DMobileNavBar</span> <span class="qs-attr">title</span>=<span class="qs-str">"页面标题"</span> <span class="qs-attr">left-arrow</span> /&gt;
&lt;<span class="qs-tag">DMobileSwitch</span> <span class="qs-attr">v-model</span>=<span class="qs-str">"checked"</span> /&gt;</pre>
      </DGlassCard>
    </section>

    <!-- 按需导入 -->
    <section class="qs-section">
      <h2 class="qs-section__title">3. 按需导入（推荐生产）</h2>
      <p class="qs-text">按需导入只打包你用到的组件，减小产物体积：</p>
      <DGlassCard>
        <pre class="qs-code"><span class="qs-kw">import</span> { <span class="qs-tag">DGlassButton</span>, <span class="qs-tag">DGlassCard</span> } <span class="qs-kw">from</span> <span class="qs-str">'@tght_1211/dream-ui'</span>
<span class="qs-kw">import</span> <span class="qs-str">'@tght_1211/dream-ui/style'</span>  <span class="qs-cm">// 样式仍需全量引入</span></pre>
      </DGlassCard>
      <p class="qs-text" style="margin-top: 16px;">移动端组件同理：</p>
      <DGlassCard>
        <pre class="qs-code"><span class="qs-kw">import</span> {
  <span class="qs-tag">DMobileNavBar</span>,
  <span class="qs-tag">DMobileTabBar</span>,
  <span class="qs-tag">DMobileCell</span>,
  <span class="qs-tag">DMobileSwitch</span>,
  <span class="qs-tag">DMobileDialog</span>,
} <span class="qs-kw">from</span> <span class="qs-str">'@tght_1211/dream-ui'</span></pre>
      </DGlassCard>
    </section>

    <!-- 深色背景 -->
    <section class="qs-section">
      <h2 class="qs-section__title">4. 背景要求</h2>
      <p class="qs-text">
        Dream UI 的玻璃拟态效果需要 <strong>深色或渐变背景</strong> 才能呈现。请确保页面有背景色：
      </p>
      <DGlassCard>
        <pre class="qs-code"><span class="qs-cm">/* 推荐：使用深色渐变背景 */</span>
<span class="qs-tag">body</span> {
  <span class="qs-attr">background</span>: <span class="qs-str">#0a0a1a</span>;
  <span class="qs-attr">min-height</span>: <span class="qs-str">100vh</span>;
}

<span class="qs-cm">/* 或使用 Dream UI 内置背景组件 */</span></pre>
      </DGlassCard>
      <p class="qs-text" style="margin-top: 16px;">
        也可以使用内置的 <code>&lt;DBackgroundLayer&gt;</code> 组件提供动态背景：
      </p>
      <DGlassCard>
        <pre class="qs-code">&lt;<span class="qs-tag">template</span>&gt;
  &lt;<span class="qs-tag">DBackgroundLayer</span> <span class="qs-attr">bg-id</span>=<span class="qs-str">"aurora"</span> /&gt;
  &lt;<span class="qs-tag">div</span> <span class="qs-attr">class</span>=<span class="qs-str">"my-app"</span>&gt;
    &lt;<span class="qs-tag">DGlassCard</span> <span class="qs-attr">title</span>=<span class="qs-str">"Hello"</span>&gt;玻璃拟态 &lt;/<span class="qs-tag">DGlassCard</span>&gt;
  &lt;/<span class="qs-tag">div</span>&gt;
&lt;/<span class="qs-tag">template</span>&gt;</pre>
      </DGlassCard>
    </section>

    <!-- 移动端 H5 用法 -->
    <section class="qs-section">
      <h2 class="qs-section__title">5. 移动端（H5）组件</h2>
      <p class="qs-text">
        所有移动端组件以 <code>DMobile</code> 前缀命名，专为触屏交互优化。
        它与 PC 端组件共享同一个包，无需额外安装。
      </p>
      <DGlassCard>
        <pre class="qs-code"><span class="qs-kw">import</span> {
  DMobileNavBar,    <span class="qs-cm">// 导航栏</span>
  DMobileTabBar,    <span class="qs-cm">// 底部标签栏</span>
  DMobileTabs,      <span class="qs-cm">// 标签页</span>
  DMobileField,     <span class="qs-cm">// 输入框</span>
  DMobileSwitch,    <span class="qs-cm">// 开关</span>
  DMobileDialog,    <span class="qs-cm">// 对话框</span>
  DMobileToast,     <span class="qs-cm">// 轻提示</span>
  DMobileCollapse,  <span class="qs-cm">// 折叠面板</span>
  DMobileProgress,  <span class="qs-cm">// 进度条</span>
  <span class="qs-cm">// ... 共 30 个移动端组件</span>
} <span class="qs-kw">from</span> <span class="qs-str">'@tght_1211/dream-ui'</span></pre>
      </DGlassCard>
      <p class="qs-text" style="margin-top: 16px;">一个最小的移动端页面示例：</p>
      <DGlassCard>
        <pre class="qs-code">&lt;<span class="qs-tag">template</span>&gt;
  &lt;<span class="qs-tag">div</span> <span class="qs-attr">style</span>=<span class="qs-str">"background: #0a0a1a; min-height: 100vh;"</span>&gt;
    &lt;<span class="qs-tag">DMobileNavBar</span> <span class="qs-attr">title</span>=<span class="qs-str">"我的应用"</span> <span class="qs-attr">fixed</span> /&gt;

    &lt;<span class="qs-tag">DMobileCellGroup</span> <span class="qs-attr">title</span>=<span class="qs-str">"设置"</span>&gt;
      &lt;<span class="qs-tag">DMobileCell</span> <span class="qs-attr">title</span>=<span class="qs-str">"深色模式"</span> <span class="qs-attr">center</span>&gt;
        &lt;<span class="qs-tag">template</span> #extra&gt;
          &lt;<span class="qs-tag">DMobileSwitch</span> <span class="qs-attr">v-model</span>=<span class="qs-str">"darkMode"</span> /&gt;
        &lt;/<span class="qs-tag">template</span>&gt;
      &lt;/<span class="qs-tag">DMobileCell</span>&gt;
      &lt;<span class="qs-tag">DMobileCell</span> <span class="qs-attr">title</span>=<span class="qs-str">"关于"</span> <span class="qs-attr">value</span>=<span class="qs-str">"v1.0"</span> <span class="qs-attr">is-link</span> /&gt;
    &lt;/<span class="qs-tag">DMobileCellGroup</span>&gt;
  &lt;/<span class="qs-tag">div</span>&gt;
&lt;/<span class="qs-tag">template</span>&gt;</pre>
      </DGlassCard>
    </section>

    <!-- 自定义主题 -->
    <section class="qs-section">
      <h2 class="qs-section__title">6. 自定义主题</h2>
      <p class="qs-text">
        Dream UI 通过 <strong>CSS 变量</strong> 实现主题定制，覆盖变量即可改变全局风格：
      </p>
      <DGlassCard>
        <pre class="qs-code"><span class="qs-tag">:root</span> {
  <span class="qs-cm">/* 调整主色 */</span>
  <span class="qs-attr">--dream-color-primary</span>: <span class="qs-str">#818cf8</span>;

  <span class="qs-cm">/* 调整文字透明度 */</span>
  <span class="qs-attr">--dream-text-primary</span>: <span class="qs-str">rgba(255, 255, 255, 0.95)</span>;

  <span class="qs-cm">/* 调整圆角 */</span>
  <span class="qs-attr">--dream-radius-md</span>: <span class="qs-str">16px</span>;

  <span class="qs-cm">/* 调整模糊强度 */</span>
  <span class="qs-attr">--dream-blur-md</span>: <span class="qs-str">blur(24px)</span>;
}</pre>
      </DGlassCard>
      <p class="qs-text" style="margin-top: 16px;">
        也可以通过 <code>bgOpacity</code>、<code>borderColor</code>、<code>glowColor</code> 三个通用 Props 在组件级别微调：
      </p>
      <DGlassCard>
        <pre class="qs-code">&lt;<span class="qs-tag">DGlassCard</span>
  <span class="qs-attr">:bg-opacity</span>=<span class="qs-str">"0.15"</span>
  <span class="qs-attr">border-color</span>=<span class="qs-str">"rgba(96, 165, 250, 0.3)"</span>
  <span class="qs-attr">glow-color</span>=<span class="qs-str">"rgba(96, 165, 250, 0.2)"</span>
&gt;
  自定义光晕颜色的卡片
&lt;/<span class="qs-tag">DGlassCard</span>&gt;</pre>
      </DGlassCard>
    </section>

    <!-- TypeScript -->
    <section class="qs-section">
      <h2 class="qs-section__title">7. TypeScript 支持</h2>
      <p class="qs-text">
        Dream UI 使用 TypeScript 编写，开箱即用：组件 Props 自动推导，Composable 完整类型。
      </p>
      <DGlassCard>
        <pre class="qs-code"><span class="qs-cm">// 类型导入</span>
<span class="qs-kw">import type</span> { GlassCustomProps } <span class="qs-kw">from</span> <span class="qs-str">'@tght_1211/dream-ui'</span>

<span class="qs-cm">// Composable 使用</span>
<span class="qs-kw">import</span> { useGlassStyle } <span class="qs-kw">from</span> <span class="qs-str">'@tght_1211/dream-ui'</span>
<span class="qs-kw">const</span> { glassVars } = <span class="qs-fn">useGlassStyle</span>(props)</pre>
      </DGlassCard>
    </section>

    <!-- 组件总览 -->
    <section class="qs-section">
      <h2 class="qs-section__title">8. 组件总览</h2>
      <div class="qs-overview">
        <DGlassCard v-for="cat in componentOverview" :key="cat.title">
          <h4 class="qs-overview__cat">{{ cat.title }} <DGlassBadge :value="cat.items.length" /></h4>
          <div class="qs-overview__list">
            <DGlassTag v-for="c in cat.items" :key="c" size="sm">{{ c }}</DGlassTag>
          </div>
        </DGlassCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * QuickStartPage - 使用指南/快速开始
 * @author buchi
 * @since 2026-02-09
 */
import { ref, computed } from 'vue'
import { DGlassCard, DGlassAlert, DGlassBadge, DGlassTag } from '../components/dream-ui'

const pkgManagers = [
  { name: 'npm', cmd: 'npm install @tght_1211/dream-ui' },
  { name: 'yarn', cmd: 'yarn add @tght_1211/dream-ui' },
  { name: 'pnpm', cmd: 'pnpm add @tght_1211/dream-ui' },
]
const activePm = ref('npm')
const currentInstallCmd = computed(() => pkgManagers.find(p => p.name === activePm.value)!.cmd)

const componentOverview = [
  {
    title: 'PC 端组件',
    items: [
      'Button', 'Card', 'Panel', 'Divider', 'Input', 'Textarea', 'Select',
      'Switch', 'Slider', 'Badge', 'Tag', 'Avatar', 'Progress', 'Widget',
      'Timeline', 'Collapse', 'Tabs', 'Loading', 'Empty',
      'Dialog', 'Drawer', 'Notification', 'Alert', 'Tooltip', 'Popover',
      'Navbar', 'Breadcrumb', 'BackgroundLayer', 'BackgroundSwitcher',
      'DreamVeil', 'BloomVeil',
    ],
  },
  {
    title: '移动端组件',
    items: [
      'NavBar', 'TabBar', 'Tabs', 'Cell', 'CellGroup',
      'Tag', 'Divider', 'Empty', 'Loading',
      'Field', 'Switch', 'SearchBar', 'Stepper', 'NumberKeyboard', 'PasswordInput', 'Picker',
      'Popup', 'Dialog', 'ActionSheet', 'Toast', 'SwipeCell',
      'Progress', 'Collapse', 'NoticeBar', 'Swipe', 'CountDown',
      'ImagePreview', 'Skeleton', 'GridCard', 'HorizontalPicker',
      'PullRefresh', 'BackTop',
    ],
  },
]
</script>

<style scoped lang="scss">
.quickstart-page {
  animation: qs-slide-up 0.6s ease;
}

.page-title {
  font-size: var(--dream-text-3xl);
  font-weight: var(--dream-font-bold);
  margin-bottom: var(--dream-space-md);
}

.page-desc {
  font-size: var(--dream-text-lg);
  color: var(--dream-text-secondary);
  margin-bottom: var(--dream-space-3xl);
}

/* ===== 区块 ===== */
.qs-section {
  margin-bottom: var(--dream-space-3xl);

  &__title {
    font-size: var(--dream-text-xl);
    font-weight: var(--dream-font-bold);
    color: var(--dream-text-primary);
    margin: 0 0 var(--dream-space-md);
    padding-left: 12px;
    border-left: 3px solid var(--dream-color-primary, rgba(96, 165, 250, 0.6));
  }
}

.qs-text {
  font-size: var(--dream-text-sm);
  color: var(--dream-text-secondary);
  line-height: 1.8;
  margin-bottom: var(--dream-space-md);

  code {
    font-family: var(--dream-font-mono);
    font-size: 12px;
    color: rgba(125, 211, 252, 0.85);
    background: rgba(125, 211, 252, 0.08);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid rgba(125, 211, 252, 0.12);
  }
}

/* ===== 代码块 ===== */
.qs-code {
  font-family: 'SF Mono', 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.80);
  margin: 0;
  white-space: pre;
  overflow-x: auto;
}

/* 代码高亮 */
.qs-kw { color: rgba(199, 146, 234, 0.9); }     /* 关键字：import, from, const */
.qs-str { color: rgba(195, 232, 141, 0.9); }     /* 字符串 */
.qs-fn { color: rgba(130, 170, 255, 0.9); }      /* 函数名 */
.qs-cm { color: rgba(255, 255, 255, 0.30); }     /* 注释 */
.qs-tag { color: rgba(255, 203, 107, 0.9); }     /* 组件/标签名 */
.qs-attr { color: rgba(173, 219, 103, 0.9); }    /* 属性名 */

/* ===== Tab 切换 ===== */
.qs-code-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.qs-code-tab {
  font-size: 12px;
  font-family: var(--dream-font-mono);
  padding: 4px 12px;
  border-radius: 6px;
  color: var(--dream-text-tertiary);
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;

  &:hover {
    color: var(--dream-text-secondary);
    background: rgba(255, 255, 255, 0.04);
  }

  &--active {
    color: var(--dream-text-primary);
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.10);
  }
}

/* ===== 组件总览 ===== */
.qs-overview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--dream-space-lg);
}

.qs-overview__cat {
  font-size: var(--dream-text-base);
  font-weight: var(--dream-font-semibold);
  color: var(--dream-text-primary);
  margin: 0 0 var(--dream-space-md);
  display: flex;
  align-items: center;
  gap: 8px;
}

.qs-overview__list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .qs-overview {
    grid-template-columns: 1fr;
  }
}

@keyframes qs-slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
