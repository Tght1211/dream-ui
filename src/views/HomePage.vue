<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__badge">
        <DGlassBadge dot>v0.1.0 · Glassmorphism</DGlassBadge>
      </div>
      <h1 class="hero__title">Dream UI</h1>
      <p class="hero__subtitle">
        灵感源于 AR/VR 空间界面的玻璃拟态设计系统<br />
        半透明 · 毛玻璃 · 光晕边框 · 悬浮感
      </p>
      <div class="hero__actions">
        <DGlassButton size="lg" @click="$router.push('/components')">
          浏览组件
        </DGlassButton>
        <DGlassButton variant="ghost" size="lg" @click="$router.push('/guide')">
          设计指南
        </DGlassButton>
      </div>
      <p class="hero__stat">20+ 玻璃拟态组件 · TypeScript · Vue 3 Composition API</p>
    </section>

    <!-- Features -->
    <section class="features">
      <div class="features__grid">
        <DGlassCard v-for="(feature, i) in features" :key="i" hoverable>
          <div class="feature-item">
            <span class="feature-item__icon">{{ feature.icon }}</span>
            <h3 class="feature-item__title">{{ feature.title }}</h3>
            <p class="feature-item__desc">{{ feature.desc }}</p>
          </div>
        </DGlassCard>
      </div>
    </section>

    <!-- ============ 组件预览区 ============ -->
    <section class="showcase">
      <h2 class="section-title">组件预览</h2>
      <p class="section-desc">每个组件都可以展开查看使用代码，点击「显示代码」即可复制使用</p>

      <!-- Button 按钮 -->
      <h3 class="showcase__subtitle">Button 按钮</h3>
      <DemoBlock description="多种变体、尺寸和状态的玻璃拟态按钮" :code="codeButton">
        <div class="demo-row">
          <DGlassButton variant="default">Default</DGlassButton>
          <DGlassButton variant="primary">Primary</DGlassButton>
          <DGlassButton variant="success">Success</DGlassButton>
          <DGlassButton variant="warning">Warning</DGlassButton>
          <DGlassButton variant="danger">Danger</DGlassButton>
          <DGlassButton variant="ghost">Ghost</DGlassButton>
        </div>
        <div class="demo-row" style="margin-top:12px;">
          <DGlassButton size="sm">Small</DGlassButton>
          <DGlassButton size="md">Medium</DGlassButton>
          <DGlassButton size="lg">Large</DGlassButton>
          <DGlassButton outline>Outline</DGlassButton>
          <DGlassButton :loading="true">Loading</DGlassButton>
          <DGlassButton disabled>Disabled</DGlassButton>
        </div>
      </DemoBlock>

      <!-- Card 卡片 -->
      <h3 class="showcase__subtitle">Card 卡片</h3>
      <DemoBlock description="核心容器组件，支持悬停交互和光晕脉冲" :code="codeCard">
        <div class="demo-grid-3">
          <DGlassCard hoverable>
            <div class="mini-card">
              <h4>基础卡片</h4>
              <p>这是一个带有 hoverable 的玻璃卡片，鼠标移上去看效果</p>
            </div>
          </DGlassCard>
          <DGlassCard hoverable variant="primary">
            <div class="mini-card">
              <h4>Primary</h4>
              <p>主题色变体卡片，边框带有淡蓝色光晕</p>
            </div>
          </DGlassCard>
          <DGlassCard hoverable glow>
            <div class="mini-card">
              <h4>Glow 脉冲</h4>
              <p>开启 glow 属性后边框光晕会缓慢呼吸闪烁</p>
            </div>
          </DGlassCard>
        </div>
      </DemoBlock>

      <!-- Input 输入框 -->
      <h3 class="showcase__subtitle">Input 输入框</h3>
      <DemoBlock description="带标签、清除按钮、多尺寸的玻璃输入框" :code="codeInput">
        <div class="demo-grid-2">
          <DGlassInput v-model="inputVal" label="用户名" placeholder="请输入用户名" clearable />
          <DGlassInput v-model="inputPwd" label="密码" type="password" placeholder="请输入密码" />
          <DGlassInput label="错误状态" placeholder="验证失败" error="请输入有效的邮箱地址" />
          <DGlassInput label="禁用" placeholder="不可编辑" disabled />
        </div>
      </DemoBlock>

      <!-- Select 选择器 -->
      <h3 class="showcase__subtitle">Select 选择器</h3>
      <DemoBlock description="玻璃拟态下拉选择器" :code="codeSelect">
        <div class="demo-grid-2">
          <DGlassSelect v-model="selectVal" label="城市" :options="cityOptions" placeholder="请选择城市" />
          <DGlassSelect label="禁用" :options="cityOptions" placeholder="不可选择" disabled />
        </div>
      </DemoBlock>

      <!-- Switch 开关 -->
      <h3 class="showcase__subtitle">Switch 开关</h3>
      <DemoBlock description="玻璃拟态开关切换" :code="codeSwitch">
        <div class="demo-row" style="align-items:center;">
          <DGlassSwitch v-model="switchVal">开启通知</DGlassSwitch>
          <DGlassSwitch v-model="switchVal2" size="sm">小尺寸</DGlassSwitch>
          <DGlassSwitch :model-value="true" disabled>禁用状态</DGlassSwitch>
        </div>
      </DemoBlock>

      <!-- Tag 标签 -->
      <h3 class="showcase__subtitle">Tag 标签</h3>
      <DemoBlock description="多彩可关闭标签，用于标记和分类" :code="codeTag">
        <div class="demo-row">
          <DGlassTag>Default</DGlassTag>
          <DGlassTag variant="primary">Primary</DGlassTag>
          <DGlassTag variant="success">Success</DGlassTag>
          <DGlassTag variant="warning">Warning</DGlassTag>
          <DGlassTag variant="danger">Danger</DGlassTag>
          <DGlassTag variant="info">Info</DGlassTag>
        </div>
        <div class="demo-row" style="margin-top:12px;">
          <DGlassTag closable variant="primary">可关闭</DGlassTag>
          <DGlassTag closable variant="success">Vue 3</DGlassTag>
          <DGlassTag closable variant="warning">TypeScript</DGlassTag>
          <DGlassTag size="sm">SM</DGlassTag>
          <DGlassTag size="lg" variant="info">LG</DGlassTag>
        </div>
      </DemoBlock>

      <!-- Badge 徽章 -->
      <h3 class="showcase__subtitle">Badge 徽章</h3>
      <DemoBlock description="徽章与圆点指示器" :code="codeBadge">
        <div class="demo-row">
          <DGlassBadge>Default</DGlassBadge>
          <DGlassBadge variant="primary">Primary</DGlassBadge>
          <DGlassBadge variant="success">Success</DGlassBadge>
          <DGlassBadge variant="warning">Warning</DGlassBadge>
          <DGlassBadge variant="danger">Danger</DGlassBadge>
        </div>
        <div class="demo-row" style="margin-top:12px;">
          <DGlassBadge variant="success" dot>在线</DGlassBadge>
          <DGlassBadge variant="danger" dot>离线</DGlassBadge>
          <DGlassBadge variant="warning" dot>忙碌</DGlassBadge>
        </div>
      </DemoBlock>

      <!-- Avatar 头像 -->
      <h3 class="showcase__subtitle">Avatar 头像</h3>
      <DemoBlock description="支持文字头像、状态指示器和多尺寸" :code="codeAvatar">
        <div class="demo-row" style="align-items:flex-end;">
          <DGlassAvatar name="Alice" size="sm" status="online" />
          <DGlassAvatar name="Buchi" size="md" status="busy" variant="primary" />
          <DGlassAvatar name="Carol" size="lg" status="offline" variant="success" />
          <DGlassAvatar name="DreamUI" size="xl" variant="info" />
        </div>
      </DemoBlock>

      <!-- Alert 警告 -->
      <h3 class="showcase__subtitle">Alert 警告提示</h3>
      <DemoBlock description="四种类型的提示信息，支持标题和关闭" :code="codeAlert">
        <div class="demo-col">
          <DGlassAlert type="info" title="信息提示">这是一条普通的信息提示</DGlassAlert>
          <DGlassAlert type="success" title="操作成功">数据已保存到云端</DGlassAlert>
          <DGlassAlert type="warning" title="注意" closable>磁盘空间即将不足，请及时清理</DGlassAlert>
          <DGlassAlert type="danger" title="错误" closable>网络连接已断开，请检查网络设置</DGlassAlert>
        </div>
      </DemoBlock>

      <!-- Progress 进度条 -->
      <h3 class="showcase__subtitle">Progress 进度条</h3>
      <DemoBlock description="玻璃拟态进度条，多种变体" :code="codeProgress">
        <div class="demo-col" style="gap:16px;">
          <DGlassProgress :percentage="30" label="下载中" show-value />
          <DGlassProgress :percentage="65" variant="primary" label="上传进度" show-value />
          <DGlassProgress :percentage="88" variant="success" label="安装完成" show-value />
          <DGlassProgress :percentage="45" variant="warning" label="编译中" show-value />
        </div>
      </DemoBlock>

      <!-- Tabs 标签页 -->
      <h3 class="showcase__subtitle">Tabs 标签页</h3>
      <DemoBlock description="标签页切换组件" :code="codeTabs">
        <DGlassTabs v-model="activeTab" :tabs="tabItems" />
        <DGlassCard>
          <div class="tab-content">
            <p v-if="activeTab === 'design'">Dream UI 灵感来自 VR/AR 头显设备的空间界面设计，追求极致的玻璃通透感。</p>
            <p v-if="activeTab === 'develop'">基于 Vue 3 + TypeScript + Composition API，提供完整的类型定义和 Props 说明。</p>
            <p v-if="activeTab === 'deploy'">使用 Vite 构建，支持按需加载，体积小巧，性能极佳。</p>
          </div>
        </DGlassCard>
      </DemoBlock>

      <!-- Divider 分割线 -->
      <h3 class="showcase__subtitle">Divider 分割线</h3>
      <DemoBlock description="水平分割线，支持文字和发光变体" :code="codeDivider">
        <p style="color:var(--dream-text-secondary);font-size:14px;">默认分割线</p>
        <DGlassDivider />
        <p style="color:var(--dream-text-secondary);font-size:14px;">带文字</p>
        <DGlassDivider>Dream UI</DGlassDivider>
        <p style="color:var(--dream-text-secondary);font-size:14px;">发光效果</p>
        <DGlassDivider variant="glow">GLOW</DGlassDivider>
      </DemoBlock>

      <!-- Timeline 时间线 -->
      <h3 class="showcase__subtitle">Timeline 时间线</h3>
      <DemoBlock description="时间线组件，适合展示流程和历史记录" :code="codeTimeline">
        <DGlassTimeline :items="timelineItems" />
      </DemoBlock>

      <!-- Collapse 折叠面板 -->
      <h3 class="showcase__subtitle">Collapse 折叠面板</h3>
      <DemoBlock description="手风琴模式的折叠面板" :code="codeCollapse">
        <DGlassCollapse :items="collapseItems" accordion />
      </DemoBlock>

      <!-- Loading 加载 -->
      <h3 class="showcase__subtitle">Loading 加载</h3>
      <DemoBlock description="三种加载动效：Ring 环、Spinner 点、Skeleton 骨架屏" :code="codeLoading">
        <div class="demo-row" style="gap:48px; align-items:flex-start;">
          <div style="text-align:center;">
            <DGlassLoading type="ring" text="Ring" />
          </div>
          <div style="text-align:center;">
            <DGlassLoading type="spinner" text="Spinner" />
          </div>
          <div style="width:200px;">
            <DGlassLoading type="skeleton" :lines="4" />
          </div>
        </div>
      </DemoBlock>

      <!-- Widget 小组件 -->
      <h3 class="showcase__subtitle">Widget 数据小组件</h3>
      <DemoBlock description="模拟 VR/AR 界面中的数据统计小组件" :code="codeWidget">
        <div class="demo-grid-4">
          <DGlassWidget icon="❤️" title="心率" subtitle="实时监测" variant="danger">
            <div class="stat-value">70 <span class="stat-unit">BPM</span></div>
          </DGlassWidget>
          <DGlassWidget icon="👣" title="步行数" subtitle="今日统计" variant="success">
            <div class="stat-value">8,642 <span class="stat-unit">步</span></div>
          </DGlassWidget>
          <DGlassWidget icon="🔥" title="卡路里" subtitle="今日消耗" variant="warning">
            <div class="stat-value">320 <span class="stat-unit">kcal</span></div>
          </DGlassWidget>
          <DGlassWidget icon="🌡" title="天气" subtitle="广州 · 晴" variant="info">
            <div class="stat-value">18 <span class="stat-unit">°C</span></div>
          </DGlassWidget>
        </div>
      </DemoBlock>

      <!-- Dialog 对话框 -->
      <h3 class="showcase__subtitle">Dialog 对话框</h3>
      <DemoBlock description="模态对话框，点击按钮打开" :code="codeDialog">
        <DGlassButton @click="dialogVisible = true">打开对话框</DGlassButton>
        <DGlassDialog v-model="dialogVisible" title="确认操作">
          <p style="color:var(--dream-text-secondary);line-height:1.7;">
            这是一个玻璃拟态的模态对话框，背景会呈现毛玻璃模糊效果。
            你确定要执行此操作吗？
          </p>
          <template #footer>
            <DGlassButton variant="ghost" @click="dialogVisible = false">取消</DGlassButton>
            <DGlassButton variant="primary" @click="dialogVisible = false">确认</DGlassButton>
          </template>
        </DGlassDialog>
      </DemoBlock>

      <!-- Notification 通知 -->
      <h3 class="showcase__subtitle">Notification 通知</h3>
      <DemoBlock description="通知消息条，四种类型" :code="codeNotification">
        <div class="demo-col">
          <DGlassNotification type="info" title="系统通知" message="Dream UI v0.1.0 已发布，快来体验全新的玻璃拟态组件" :duration="0" />
          <DGlassNotification type="success" title="操作成功" message="文件已成功上传至云端" :duration="0" />
          <DGlassNotification type="warning" title="安全提醒" message="检测到异地登录，请确认是否为本人操作" :duration="0" />
          <DGlassNotification type="danger" title="连接断开" message="服务器连接中断，正在尝试重新连接..." :duration="0" />
        </div>
      </DemoBlock>

      <!-- Clock 时钟组合 -->
      <h3 class="showcase__subtitle">组合示例：时钟卡片</h3>
      <DemoBlock description="使用 Card + 自定义内容实现 VR 风格时钟" :code="codeClock">
        <div style="max-width:280px;">
          <DGlassCard>
            <div class="clock-widget">
              <div class="clock-widget__time">{{ currentTime }}</div>
              <div class="clock-widget__date">{{ currentDate }}</div>
              <DGlassDivider variant="light" />
              <div class="clock-widget__weather">
                <span class="clock-widget__weather-icon">☀</span>
                <span class="clock-widget__temp">18°C</span>
              </div>
              <div class="clock-widget__quality">广州 · 晴 · 空气质量优</div>
            </div>
          </DGlassCard>
        </div>
      </DemoBlock>
    </section>

    <!-- CTA -->
    <section class="cta">
      <DGlassCard hoverable glow>
        <div class="cta__inner">
          <h2>开始使用 Dream UI</h2>
          <p>查看完整组件文档，了解每个组件的 Props、Events 和 Slots</p>
          <div class="demo-row" style="justify-content:center;margin-top:20px;">
            <DGlassButton variant="primary" size="lg" @click="$router.push('/components')">
              查看组件文档
            </DGlassButton>
          </div>
        </div>
      </DGlassCard>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * HomePage - Dream UI 首页
 * @author buchi
 * @since 2026-02-08
 */
import { ref, onMounted, onUnmounted } from 'vue'
import DemoBlock from '../components/site/DemoBlock.vue'
import {
  DGlassButton,
  DGlassBadge,
  DGlassCard,
  DGlassInput,
  DGlassSelect,
  DGlassSwitch,
  DGlassTag,
  DGlassAvatar,
  DGlassAlert,
  DGlassProgress,
  DGlassTabs,
  DGlassDivider,
  DGlassTimeline,
  DGlassCollapse,
  DGlassLoading,
  DGlassWidget,
  DGlassDialog,
  DGlassNotification,
} from '../components/dream-ui'

// ========== 特性列表 ==========
const features = [
  { icon: '✦', title: '毛玻璃效果', desc: 'backdrop-filter 驱动的真实模糊穿透效果，为每个组件赋予通透的玻璃质感' },
  { icon: '◈', title: '光晕边框', desc: '多层 box-shadow 精心调配的发光边框，营造科技悬浮感与空间深度' },
  { icon: '◆', title: 'Vue 3 组件', desc: 'TypeScript + Composition API，完整的 Props 类型定义，开箱即用' },
  { icon: '❖', title: '纯白色调', desc: '纯净的白色光晕主题，颜色只用于图标点缀，整体冷白通透' },
  { icon: '⬡', title: '流畅动效', desc: '所有交互状态均有丝滑过渡动画，光晕跟随状态动态变化' },
  { icon: '◉', title: '深色优先', desc: '为深色背景场景深度优化，在任何暗色调背景上都呈现最佳视觉效果' },
]

// ========== 交互状态 ==========
const inputVal = ref('')
const inputPwd = ref('')
const selectVal = ref('')
const switchVal = ref(true)
const switchVal2 = ref(false)
const activeTab = ref('design')
const dialogVisible = ref(false)

const cityOptions = [
  { label: '广州', value: 'gz' },
  { label: '深圳', value: 'sz' },
  { label: '上海', value: 'sh' },
  { label: '北京', value: 'bj' },
]

const tabItems = [
  { key: 'design', label: '设计理念' },
  { key: 'develop', label: '开发体验' },
  { key: 'deploy', label: '构建部署' },
]

const timelineItems = [
  { time: '2026-02-08', title: 'Dream UI 发布', desc: '首个版本包含 20+ 玻璃拟态组件', active: true },
  { time: '2026-02-07', title: '完成组件开发', desc: '全部组件通过 TypeScript 类型检查' },
  { time: '2026-02-06', title: '设计规范确定', desc: '完成毛玻璃效果、光晕、间距等设计系统定义' },
  { time: '2026-02-05', title: '项目启动', desc: '创建项目架构，确定技术栈 Vue 3 + Vite + SCSS' },
]

const collapseItems = [
  { title: '什么是 Glassmorphism？', content: 'Glassmorphism（玻璃拟态）是一种 UI 设计风格，核心特征是半透明背景 + 模糊效果 + 发光边框，模拟真实玻璃材质在光线下的表现，给人以悬浮、通透的视觉体验。' },
  { title: 'Dream UI 支持哪些框架？', content: '当前 Dream UI 基于 Vue 3 + TypeScript 开发，使用 Composition API 和 <script setup> 语法。未来计划支持 React 和 Web Components 版本。' },
  { title: '如何自定义主题色？', content: '所有样式通过 CSS Variables（自定义属性）管理，你可以在项目中覆盖 --dream-* 变量来自定义配色、间距、圆角等设计参数，无需修改源码。' },
]

// ========== 时钟 ==========
const currentTime = ref('9:33')
const currentDate = ref('2026年2月8日 星期日')
let timer: ReturnType<typeof setInterval> | null = null

const updateTime = () => {
  const now = new Date()
  currentTime.value = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  currentDate.value = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${days[now.getDay()]}`
}

onMounted(() => { updateTime(); timer = setInterval(updateTime, 1000) })
onUnmounted(() => { if (timer) clearInterval(timer) })

// ========== 示例代码 ==========
const codeButton = `<template>
  <DGlassButton variant="default">Default</DGlassButton>
  <DGlassButton variant="primary">Primary</DGlassButton>
  <DGlassButton variant="success">Success</DGlassButton>
  <DGlassButton variant="warning">Warning</DGlassButton>
  <DGlassButton variant="danger">Danger</DGlassButton>
  <DGlassButton variant="ghost">Ghost</DGlassButton>

  <!-- 尺寸 -->
  <DGlassButton size="sm">Small</DGlassButton>
  <DGlassButton size="md">Medium</DGlassButton>
  <DGlassButton size="lg">Large</DGlassButton>

  <!-- 状态 -->
  <DGlassButton outline>Outline</DGlassButton>
  <DGlassButton :loading="true">Loading</DGlassButton>
  <DGlassButton disabled>Disabled</DGlassButton>
</template>`

const codeCard = `<template>
  <!-- 基础 + 悬停 -->
  <DGlassCard hoverable>
    <h4>基础卡片</h4>
    <p>鼠标悬停查看光晕增强效果</p>
  </DGlassCard>

  <!-- 主题变体 -->
  <DGlassCard hoverable variant="primary">
    <h4>Primary</h4>
    <p>边框带有主题色光晕</p>
  </DGlassCard>

  <!-- 光晕脉冲 -->
  <DGlassCard hoverable glow>
    <h4>Glow 脉冲</h4>
    <p>边框光晕缓慢呼吸闪烁</p>
  </DGlassCard>
</template>`

const codeInput = `<template>
  <DGlassInput
    v-model="username"
    label="用户名"
    placeholder="请输入用户名"
    clearable
  />
  <DGlassInput
    v-model="password"
    label="密码"
    type="password"
    placeholder="请输入密码"
  />
  <DGlassInput
    label="错误状态"
    error="请输入有效的邮箱地址"
  />
  <DGlassInput label="禁用" disabled />
</template>

<script setup>
import { ref } from 'vue'
const username = ref('')
const password = ref('')
<\/script>`

const codeSelect = `<template>
  <DGlassSelect
    v-model="city"
    label="城市"
    :options="options"
    placeholder="请选择城市"
  />
</template>

<script setup>
import { ref } from 'vue'
const city = ref('')
const options = [
  { label: '广州', value: 'gz' },
  { label: '深圳', value: 'sz' },
  { label: '上海', value: 'sh' },
]
<\/script>`

const codeSwitch = `<template>
  <DGlassSwitch v-model="notify">开启通知</DGlassSwitch>
  <DGlassSwitch v-model="mini" size="sm">小尺寸</DGlassSwitch>
  <DGlassSwitch :model-value="true" disabled>禁用</DGlassSwitch>
</template>

<script setup>
import { ref } from 'vue'
const notify = ref(true)
const mini = ref(false)
<\/script>`

const codeTag = `<template>
  <!-- 颜色变体 -->
  <DGlassTag>Default</DGlassTag>
  <DGlassTag variant="primary">Primary</DGlassTag>
  <DGlassTag variant="success">Success</DGlassTag>
  <DGlassTag variant="warning">Warning</DGlassTag>
  <DGlassTag variant="danger">Danger</DGlassTag>
  <DGlassTag variant="info">Info</DGlassTag>

  <!-- 可关闭 -->
  <DGlassTag closable variant="primary">可关闭</DGlassTag>
  <DGlassTag closable variant="success">Vue 3</DGlassTag>

  <!-- 尺寸 -->
  <DGlassTag size="sm">SM</DGlassTag>
  <DGlassTag size="lg" variant="info">LG</DGlassTag>
</template>`

const codeBadge = `<template>
  <!-- 变体 -->
  <DGlassBadge>Default</DGlassBadge>
  <DGlassBadge variant="primary">Primary</DGlassBadge>
  <DGlassBadge variant="success">Success</DGlassBadge>

  <!-- 圆点指示器 -->
  <DGlassBadge variant="success" dot>在线</DGlassBadge>
  <DGlassBadge variant="danger" dot>离线</DGlassBadge>
  <DGlassBadge variant="warning" dot>忙碌</DGlassBadge>
</template>`

const codeAvatar = `<template>
  <DGlassAvatar name="Alice" size="sm" status="online" />
  <DGlassAvatar name="Buchi" size="md" status="busy" variant="primary" />
  <DGlassAvatar name="Carol" size="lg" status="offline" variant="success" />
  <DGlassAvatar name="DreamUI" size="xl" variant="info" />
</template>`

const codeAlert = `<template>
  <DGlassAlert type="info" title="信息提示">
    这是一条普通的信息提示
  </DGlassAlert>
  <DGlassAlert type="success" title="操作成功">
    数据已保存到云端
  </DGlassAlert>
  <DGlassAlert type="warning" title="注意" closable>
    磁盘空间即将不足
  </DGlassAlert>
  <DGlassAlert type="danger" title="错误" closable>
    网络连接已断开
  </DGlassAlert>
</template>`

const codeProgress = `<template>
  <DGlassProgress :percentage="30" label="下载中" show-value />
  <DGlassProgress :percentage="65" variant="primary" label="上传进度" show-value />
  <DGlassProgress :percentage="88" variant="success" label="安装完成" show-value />
  <DGlassProgress :percentage="45" variant="warning" label="编译中" show-value />
</template>`

const codeTabs = `<template>
  <DGlassTabs v-model="active" :tabs="tabs" />
  <DGlassCard>
    <p v-if="active === 'design'">设计理念内容...</p>
    <p v-if="active === 'develop'">开发体验内容...</p>
    <p v-if="active === 'deploy'">构建部署内容...</p>
  </DGlassCard>
</template>

<script setup>
import { ref } from 'vue'
const active = ref('design')
const tabs = [
  { key: 'design', label: '设计理念' },
  { key: 'develop', label: '开发体验' },
  { key: 'deploy', label: '构建部署' },
]
<\/script>`

const codeDivider = `<template>
  <!-- 默认 -->
  <DGlassDivider />

  <!-- 带文字 -->
  <DGlassDivider>Dream UI</DGlassDivider>

  <!-- 发光效果 -->
  <DGlassDivider variant="glow">GLOW</DGlassDivider>
</template>`

const codeTimeline = `<template>
  <DGlassTimeline :items="items" />
</template>

<script setup>
const items = [
  { time: '2026-02-08', title: 'Dream UI 发布', desc: '首个版本发布', active: true },
  { time: '2026-02-07', title: '完成组件开发', desc: '通过类型检查' },
  { time: '2026-02-06', title: '设计规范确定', desc: '完成设计系统定义' },
  { time: '2026-02-05', title: '项目启动', desc: '确定技术栈' },
]
<\/script>`

const codeCollapse = `<template>
  <DGlassCollapse :items="items" accordion />
</template>

<script setup>
const items = [
  { title: '什么是 Glassmorphism？', content: '一种以半透明、模糊、光晕为特征的 UI 设计风格...' },
  { title: 'Dream UI 支持哪些框架？', content: '当前基于 Vue 3 + TypeScript 开发...' },
  { title: '如何自定义主题色？', content: '所有样式通过 CSS Variables 管理...' },
]
<\/script>`

const codeLoading = `<template>
  <!-- Ring 环形 -->
  <DGlassLoading type="ring" text="加载中" />

  <!-- Spinner 跳点 -->
  <DGlassLoading type="spinner" text="请稍候" />

  <!-- Skeleton 骨架屏 -->
  <DGlassLoading type="skeleton" :lines="4" />
</template>`

const codeWidget = `<template>
  <DGlassWidget icon="❤️" title="心率" subtitle="实时监测" variant="danger">
    <div class="stat">70 <span>BPM</span></div>
  </DGlassWidget>

  <DGlassWidget icon="👣" title="步行数" subtitle="今日统计" variant="success">
    <div class="stat">8,642 <span>步</span></div>
  </DGlassWidget>

  <DGlassWidget icon="🔥" title="卡路里" subtitle="今日消耗" variant="warning">
    <div class="stat">320 <span>kcal</span></div>
  </DGlassWidget>

  <DGlassWidget icon="🌡" title="天气" subtitle="广州 · 晴" variant="info">
    <div class="stat">18 <span>°C</span></div>
  </DGlassWidget>
</template>`

const codeDialog = `<template>
  <DGlassButton @click="visible = true">打开对话框</DGlassButton>

  <DGlassDialog v-model="visible" title="确认操作">
    <p>这是一个玻璃拟态的模态对话框。</p>
    <template #footer>
      <DGlassButton variant="ghost" @click="visible = false">取消</DGlassButton>
      <DGlassButton variant="primary" @click="visible = false">确认</DGlassButton>
    </template>
  </DGlassDialog>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
<\/script>`

const codeNotification = `<template>
  <DGlassNotification
    type="info"
    title="系统通知"
    message="Dream UI v0.1.0 已发布"
    :duration="0"
  />
  <DGlassNotification
    type="success"
    title="操作成功"
    message="文件已上传至云端"
    :duration="0"
  />
  <DGlassNotification
    type="warning"
    title="安全提醒"
    message="检测到异地登录"
    :duration="0"
  />
  <DGlassNotification
    type="danger"
    title="连接断开"
    message="正在尝试重新连接..."
    :duration="0"
  />
</template>`

const codeClock = `<template>
  <DGlassCard>
    <div class="clock">
      <div class="clock__time">{{ time }}</div>
      <div class="clock__date">{{ date }}</div>
      <DGlassDivider variant="light" />
      <div class="clock__weather">
        <span>☀</span>
        <span>18°C</span>
      </div>
      <div class="clock__info">广州 · 晴 · 空气质量优</div>
    </div>
  </DGlassCard>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const time = ref('9:33')
const date = ref('2026年2月8日')
onMounted(() => {
  setInterval(() => {
    const now = new Date()
    time.value = now.getHours() + ':' +
      String(now.getMinutes()).padStart(2, '0')
  }, 1000)
})
<\/script>`
</script>

<style scoped lang="scss">
.home-page {
  animation: dream-slide-up 0.6s ease;
}

/* Hero */
.hero {
  text-align: center;
  padding: 60px 0 80px;

  &__badge { margin-bottom: var(--dream-space-xl); }

  &__title {
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: var(--dream-font-bold);
    line-height: 1.1;
    margin-bottom: var(--dream-space-xl);
    letter-spacing: -0.03em;
    color: var(--dream-text-primary);
    text-shadow: 0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(255,255,255,0.05);
  }

  &__subtitle {
    font-size: var(--dream-text-lg);
    color: var(--dream-text-secondary);
    line-height: 1.8;
    max-width: 500px;
    margin: 0 auto var(--dream-space-2xl);
  }

  &__actions {
    display: flex;
    gap: var(--dream-space-md);
    justify-content: center;
    flex-wrap: wrap;
  }

  &__stat {
    margin-top: var(--dream-space-xl);
    font-size: var(--dream-text-xs);
    color: var(--dream-text-tertiary);
    letter-spacing: 0.02em;
  }
}

/* Features */
.features {
  padding: var(--dream-space-3xl) 0;

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--dream-space-lg);
  }
}

.feature-item {
  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px; height: 44px;
    font-size: 20px;
    border-radius: var(--dream-radius-md);
    background: var(--dream-bg-secondary);
    border: 1px solid rgba(255,255,255,0.10);
    margin-bottom: var(--dream-space-lg);
    box-shadow: inset 0 0 8px rgba(255,255,255,0.02), 0 0 1px rgba(255,255,255,0.10);
  }

  &__title {
    font-size: var(--dream-text-lg);
    font-weight: var(--dream-font-semibold);
    margin: 0 0 var(--dream-space-sm);
    color: var(--dream-text-primary);
  }

  &__desc {
    font-size: var(--dream-text-sm);
    color: var(--dream-text-secondary);
    line-height: 1.7;
    margin: 0;
  }
}

/* Section */
.section-title {
  font-size: var(--dream-text-2xl);
  font-weight: var(--dream-font-bold);
  margin-bottom: var(--dream-space-sm);
  color: var(--dream-text-primary);
}

.section-desc {
  font-size: var(--dream-text-sm);
  color: var(--dream-text-tertiary);
  margin-bottom: var(--dream-space-2xl);
}

/* Showcase */
.showcase {
  padding: var(--dream-space-3xl) 0;

  &__subtitle {
    font-size: var(--dream-text-lg);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
    margin: var(--dream-space-2xl) 0 var(--dream-space-md);
    padding-left: 12px;
    border-left: 3px solid rgba(255,255,255,0.15);

    &:first-of-type {
      margin-top: 0;
    }
  }
}

/* Demo 布局工具 */
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.demo-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.demo-grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.demo-grid-4 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.mini-card {
  h4 {
    font-size: var(--dream-text-base);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
    margin: 0 0 8px;
  }
  p {
    font-size: var(--dream-text-sm);
    color: var(--dream-text-secondary);
    margin: 0;
    line-height: 1.6;
  }
}

.tab-content {
  p {
    color: var(--dream-text-secondary);
    font-size: var(--dream-text-sm);
    line-height: 1.7;
    margin: 0;
  }
}

.stat-value {
  font-size: var(--dream-text-3xl);
  font-weight: var(--dream-font-bold);
  color: var(--dream-text-primary);
  margin-top: var(--dream-space-sm);
  font-variant-numeric: tabular-nums;
}

.stat-unit {
  font-size: var(--dream-text-sm);
  color: var(--dream-text-tertiary);
  font-weight: var(--dream-font-regular);
}

/* Clock */
.clock-widget {
  text-align: center;
  padding: var(--dream-space-md) 0;

  &__time {
    font-size: 3rem;
    font-weight: var(--dream-font-bold);
    color: var(--dream-text-primary);
    line-height: 1;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }

  &__date {
    font-size: var(--dream-text-sm);
    color: var(--dream-text-secondary);
    margin-top: var(--dream-space-sm);
    margin-bottom: var(--dream-space-sm);
  }

  &__weather {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--dream-space-sm);
    margin-top: var(--dream-space-sm);
  }

  &__weather-icon { font-size: 24px; }

  &__temp {
    font-size: var(--dream-text-2xl);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
  }

  &__quality {
    font-size: var(--dream-text-xs);
    color: var(--dream-text-tertiary);
    margin-top: var(--dream-space-xs);
  }
}

/* CTA */
.cta {
  padding: var(--dream-space-3xl) 0 var(--dream-space-xl);

  &__inner {
    text-align: center;
    padding: var(--dream-space-xl) 0;

    h2 {
      font-size: var(--dream-text-2xl);
      font-weight: var(--dream-font-bold);
      color: var(--dream-text-primary);
      margin: 0 0 var(--dream-space-sm);
    }

    p {
      font-size: var(--dream-text-sm);
      color: var(--dream-text-secondary);
      margin: 0;
    }
  }
}

@keyframes dream-slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
