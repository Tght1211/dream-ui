<template>
  <div class="mobile-page">
    <!-- 左侧：玻璃拟态侧边导航 -->
    <aside class="mobile-sidebar">
      <div class="mobile-sidebar__header">
        <span class="mobile-sidebar__icon">◆</span>
        <span class="mobile-sidebar__label">Mobile</span>
      </div>
      <nav class="mobile-nav">
        <div v-for="group in navGroups" :key="group.title" class="mobile-nav__group">
          <h5 class="mobile-nav__title">{{ group.title }}</h5>
          <button
            v-for="item in group.items"
            :key="item.key"
            :class="['mobile-nav__link', { 'mobile-nav__link--active': activeDemo === item.key }]"
            @click="switchDemo(item.key)"
          >
            {{ item.label }}
          </button>
        </div>
      </nav>
    </aside>

    <!-- 右侧：手机模拟器 + 组件信息 -->
    <div class="mobile-main">
      <!-- 手机模拟器 -->
      <div class="phone-shell">
        <!-- 手机外壳 -->
        <div class="phone-frame">
          <!-- 状态栏 -->
          <div class="phone-statusbar">
            <span class="phone-statusbar__time">{{ statusTime }}</span>
            <div class="phone-statusbar__island"></div>
            <div class="phone-statusbar__icons">
              <svg class="phone-statusbar__signal" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="0.5" opacity="1"/><rect x="5" y="5" width="3" height="7" rx="0.5" opacity="1"/><rect x="10" y="2" width="3" height="10" rx="0.5" opacity="1"/><rect x="15" y="0" width="3" height="12" rx="0.5" opacity="0.35"/></svg>
              <svg class="phone-statusbar__wifi" viewBox="0 0 16 12" fill="currentColor"><path d="M8 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM8 7c2.2 0 4.2.9 5.7 2.3a.75.75 0 01-1.1 1.1A6.5 6.5 0 008 8.5a6.5 6.5 0 00-4.6 1.9.75.75 0 01-1.1-1.1A8 8 0 018 7zm0-3.5c3.1 0 6 1.2 8.2 3.3a.75.75 0 01-1.1 1.1A10 10 0 008 5a10 10 0 00-7.1 2.9.75.75 0 01-1.1-1.1A11.5 11.5 0 018 3.5z" transform="scale(0.8) translate(2,0)"/></svg>
              <div class="phone-statusbar__battery">
                <div class="phone-statusbar__battery-body">
                  <div class="phone-statusbar__battery-level"></div>
                </div>
                <div class="phone-statusbar__battery-cap"></div>
              </div>
            </div>
          </div>
          <!-- iframe 内容 -->
          <iframe
            ref="iframeRef"
            :src="iframeSrc"
            class="phone-screen"
            frameborder="0"
            allow="clipboard-write"
          />
          <!-- Home Indicator -->
          <div class="phone-home">
            <div class="phone-home__bar"></div>
          </div>
        </div>
      </div>

      <!-- 组件信息卡片 -->
      <div class="comp-info">
        <div class="comp-info__card">
          <h3 class="comp-info__name">{{ currentInfo.name }}</h3>
          <p class="comp-info__desc">{{ currentInfo.desc }}</p>
          <code class="comp-info__tag">&lt;{{ currentInfo.tag }} /&gt;</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * MobilePage - 移动端组件展示页（PC 壳）
 * 左侧导航 + 右侧手机模拟器（iframe 嵌入 MobileDemo）
 * @author buchi
 * @since 2026-02-09
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// ========== 状态栏时间 ==========
const statusTime = ref('')
let timeTimer: ReturnType<typeof setInterval> | null = null

const updateTime = () => {
  const now = new Date()
  statusTime.value = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
}

onMounted(() => {
  updateTime()
  timeTimer = setInterval(updateTime, 10000)
})

onBeforeUnmount(() => {
  if (timeTimer) clearInterval(timeTimer)
})

// ========== 导航分组 ==========
const navGroups = [
  {
    title: '导航',
    items: [
      { key: 'navbar', label: 'NavBar 导航栏' },
      { key: 'tabbar', label: 'TabBar 标签栏' },
      { key: 'tabs', label: 'Tabs 标签页' },
    ],
  },
  {
    title: '基础',
    items: [
      { key: 'cell', label: 'Cell 单元格' },
      { key: 'tag', label: 'Tag 标签' },
      { key: 'divider', label: 'Divider 分隔线' },
      { key: 'empty', label: 'Empty 空状态' },
      { key: 'loading', label: 'Loading 加载' },
    ],
  },
  {
    title: '表单',
    items: [
      { key: 'field', label: 'Field 输入框' },
      { key: 'switch', label: 'Switch 开关' },
      { key: 'searchbar', label: 'SearchBar 搜索栏' },
      { key: 'stepper', label: 'Stepper 步进器' },
      { key: 'passwordinput', label: 'PasswordInput 密码' },
      { key: 'picker', label: 'Picker 选择器' },
    ],
  },
  {
    title: '反馈',
    items: [
      { key: 'popup', label: 'Popup 弹出层' },
      { key: 'dialog', label: 'Dialog 对话框' },
      { key: 'actionsheet', label: 'ActionSheet 动作面板' },
      { key: 'toast', label: 'Toast 轻提示' },
    ],
  },
  {
    title: '展示',
    items: [
      { key: 'progress', label: 'Progress 进度条' },
      { key: 'collapse', label: 'Collapse 折叠面板' },
      { key: 'noticebar', label: 'NoticeBar 通知栏' },
      { key: 'countdown', label: 'CountDown 倒计时' },
      { key: 'skeleton', label: 'Skeleton 骨架屏' },
      { key: 'gridcard', label: 'GridCard 网格卡片' },
      { key: 'hpicker', label: 'HorizontalPicker 横向选择' },
    ],
  },
  {
    title: '交互',
    items: [
      { key: 'swipecell', label: 'SwipeCell 滑动单元格' },
      { key: 'backtop', label: 'BackTop 回到顶部' },
    ],
  },
]

const activeDemo = ref('home')
const iframeRef = ref<HTMLIFrameElement>()

const iframeSrc = computed(() => `/mobile-demo#${activeDemo.value === 'home' ? '' : activeDemo.value}`)

const switchDemo = (key: string) => {
  activeDemo.value = key
  // 通过 postMessage 通知 iframe 切换
  iframeRef.value?.contentWindow?.postMessage({ type: 'switchDemo', key }, '*')
}

// ========== 组件信息 ==========
const infoMap: Record<string, { name: string; desc: string; tag: string }> = {
  home: { name: 'Dream UI Mobile', desc: '玻璃拟态风格的移动端（H5）组件库，点击左侧列表预览各组件效果', tag: 'DMobile*' },
  // 导航
  navbar: { name: 'NavBar 导航栏', desc: '移动端顶部导航栏，支持标题、返回箭头和左右插槽', tag: 'DMobileNavBar' },
  tabbar: { name: 'TabBar 标签栏', desc: '移动端底部标签栏，支持图标、文字和徽章', tag: 'DMobileTabBar' },
  tabs: { name: 'Tabs 标签页', desc: '选项卡切换组件，支持滑动指示器和徽章', tag: 'DMobileTabs' },
  // 基础
  cell: { name: 'Cell 单元格', desc: '列表展示基础组件，支持标题、描述、图标和导航箭头', tag: 'DMobileCell' },
  tag: { name: 'Tag 标签', desc: '标记和分类信息，支持五种类型和圆角/可关闭模式', tag: 'DMobileTag' },
  divider: { name: 'Divider 分隔线', desc: '视觉分隔线，支持文字描述和虚线样式', tag: 'DMobileDivider' },
  empty: { name: 'Empty 空状态', desc: '空数据占位提示，支持自定义图标和描述', tag: 'DMobileEmpty' },
  loading: { name: 'Loading 加载', desc: '加载状态指示器，支持旋转动画和文案', tag: 'DMobileLoading' },
  // 表单
  field: { name: 'Field 输入框', desc: '表单输入框，支持文本/密码/多行输入和字数限制', tag: 'DMobileField' },
  switch: { name: 'Switch 开关', desc: '开关切换组件，支持加载和禁用状态', tag: 'DMobileSwitch' },
  searchbar: { name: 'SearchBar 搜索栏', desc: '搜索输入框，支持清除按钮和搜索动作', tag: 'DMobileSearchBar' },
  stepper: { name: 'Stepper 步进器', desc: '数量选择器，支持步长、范围和圆角风格', tag: 'DMobileStepper' },
  passwordinput: { name: 'PasswordInput 密码', desc: '网格式密码输入框，配合虚拟数字键盘使用', tag: 'DMobilePasswordInput' },
  picker: { name: 'Picker 选择器', desc: '滚动选择器，支持单列/多列数据选择', tag: 'DMobilePicker' },
  // 反馈
  popup: { name: 'Popup 弹出层', desc: '基础弹出层，支持上/下/左/右/居中五个方向', tag: 'DMobilePopup' },
  dialog: { name: 'Dialog 对话框', desc: 'iOS 风格模态对话框，支持确认/取消按钮', tag: 'DMobileDialog' },
  actionsheet: { name: 'ActionSheet 动作面板', desc: '底部弹出的操作菜单，支持多选项和取消按钮', tag: 'DMobileActionSheet' },
  toast: { name: 'Toast 轻提示', desc: '轻量级反馈，支持文字/成功/失败/加载四种类型', tag: 'DMobileToast' },
  // 展示
  progress: { name: 'Progress 进度条', desc: '线性进度指示器，支持百分比气泡和自定义颜色', tag: 'DMobileProgress' },
  collapse: { name: 'Collapse 折叠面板', desc: '可折叠内容面板，支持手风琴模式', tag: 'DMobileCollapse' },
  noticebar: { name: 'NoticeBar 通知栏', desc: '滚动通知栏，支持可关闭和可跳转模式', tag: 'DMobileNoticeBar' },
  countdown: { name: 'CountDown 倒计时', desc: '倒计时组件，支持自定义格式', tag: 'DMobileCountDown' },
  skeleton: { name: 'Skeleton 骨架屏', desc: '加载占位骨架，支持头像、标题和多行', tag: 'DMobileSkeleton' },
  gridcard: { name: 'GridCard 网格卡片', desc: '智能多图网格，首图放大+动态列数排列', tag: 'DMobileGridCard' },
  hpicker: { name: 'HorizontalPicker 横向选择', desc: '水平无限循环选择器，支持惯性动画和吸附', tag: 'DMobileHorizontalPicker' },
  // 交互
  swipecell: { name: 'SwipeCell 滑动单元格', desc: '滑动操作组件，左右滑动露出操作按钮', tag: 'DMobileSwipeCell' },
  backtop: { name: 'BackTop 回到顶部', desc: '滚动超过阈值后显示回到顶部按钮', tag: 'DMobileBackTop' },
}

const currentInfo = computed(() => infoMap[activeDemo.value] || infoMap.home)
</script>

<style scoped lang="scss">
.mobile-page {
  display: flex;
  gap: var(--dream-space-2xl);
  min-height: calc(100vh - 200px);
  animation: fade-in 0.5s ease;
}

/* ========== 侧边导航（glassmorphism 风格） ========== */
.mobile-sidebar {
  width: 230px;
  flex-shrink: 0;
  position: sticky;
  top: 88px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;

  /* 玻璃拟态容器 */
  backdrop-filter: blur(24px) saturate(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.1);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: var(--dream-radius-lg);
  padding: var(--dream-space-md) 0;
  box-shadow:
    inset 0 0 20px rgba(255, 255, 255, 0.02),
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 1px 0 rgba(255, 255, 255, 0.12),
    0 0 15px rgba(255, 255, 255, 0.02),
    0 8px 32px rgba(0, 0, 0, 0.20);

  /* 滚动条 */
  &::-webkit-scrollbar { width: 2px; }
  &::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.12); border-radius: 1px; }

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: var(--dream-space-sm) var(--dream-space-lg) var(--dream-space-md);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    margin-bottom: var(--dream-space-sm);
  }

  &__icon {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
  }

  &__label {
    font-size: var(--dream-text-sm);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
    letter-spacing: -0.01em;
  }
}

.mobile-nav {
  &__group {
    margin-bottom: var(--dream-space-md);
  }

  &__title {
    font-size: 10px;
    color: var(--dream-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0 0 var(--dream-space-xs);
    padding: 0 var(--dream-space-lg);
  }

  &__link {
    display: block;
    width: 100%;
    padding: 7px var(--dream-space-lg);
    font-size: 13px;
    color: var(--dream-text-secondary);
    text-align: left;
    background: none;
    border: 1px solid transparent;
    border-radius: var(--dream-radius-sm);
    cursor: pointer;
    transition: all var(--dream-transition-fast);
    margin: 0 var(--dream-space-xs);
    width: calc(100% - var(--dream-space-xs) * 2);

    &:hover {
      color: var(--dream-text-primary);
      background: rgba(255, 255, 255, 0.04);
    }

    &--active {
      color: var(--dream-text-primary);
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.10);
      box-shadow:
        inset 0 0 10px rgba(255, 255, 255, 0.02),
        0 0 1px rgba(255, 255, 255, 0.10);
    }
  }
}

/* ========== 右侧主内容 ========== */
.mobile-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dream-space-xl);
  padding-top: var(--dream-space-md);
}

/* ========== 手机模拟器（glassmorphism 风格） ========== */
.phone-shell {
  display: flex;
  justify-content: center;
}

.phone-frame {
  position: relative;
  width: 393px;
  height: 852px;
  border-radius: 55px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* iPhone 17 Pro 钛金属质感外壳 — 毛玻璃 */
  backdrop-filter: blur(40px) saturate(1.2);
  -webkit-backdrop-filter: blur(40px) saturate(1.2);
  background: rgba(255, 255, 255, 0.04);
  border: 2px solid rgba(255, 255, 255, 0.16);
  box-shadow:
    /* 内部屏幕边缘微光 */
    inset 0 0 60px rgba(255, 255, 255, 0.03),
    inset 0 2px 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(255, 255, 255, 0.06),
    /* 钛金属外边缘发光 */
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 0 1px 0 rgba(255, 255, 255, 0.22),
    0 0 20px rgba(255, 255, 255, 0.04),
    0 0 60px rgba(255, 255, 255, 0.015),
    /* 投影 */
    0 20px 60px rgba(0, 0, 0, 0.40),
    0 4px 20px rgba(0, 0, 0, 0.30);
}

/* ===== 状态栏 ===== */
.phone-statusbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 10px 28px 0;
  flex-shrink: 0;
  z-index: 10;

  &__time {
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 0.02em;
  }

  /* 灵动岛 — 绝对居中，不受两侧宽度影响 */
  &__island {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -40%);
    width: 100px;
    height: 28px;
    background: #000;
    border-radius: 14px;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.06),
      inset 0 0 4px rgba(0, 0, 0, 0.9);
  }

  /* 右侧图标组 */
  &__icons {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__signal {
    width: 18px;
    height: 12px;
    color: rgba(255, 255, 255, 0.85);
  }

  &__wifi {
    width: 16px;
    height: 12px;
    color: rgba(255, 255, 255, 0.85);
  }

  /* 电池图标 */
  &__battery {
    display: flex;
    align-items: center;
    gap: 1px;
  }

  &__battery-body {
    width: 24px;
    height: 11px;
    border: 1.5px solid rgba(255, 255, 255, 0.5);
    border-radius: 3px;
    padding: 1.5px;
    position: relative;
  }

  &__battery-level {
    width: 70%;
    height: 100%;
    background: rgba(255, 255, 255, 0.85);
    border-radius: 1px;
  }

  &__battery-cap {
    width: 2px;
    height: 5px;
    background: rgba(255, 255, 255, 0.35);
    border-radius: 0 1px 1px 0;
  }
}

/* ===== 屏幕区域 ===== */
.phone-screen {
  flex: 1;
  width: 100%;
  border: none;
  background: transparent;
}

/* ===== Home Indicator ===== */
.phone-home {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &__bar {
    width: 140px;
    height: 5px;
    border-radius: 2.5px;
    background: rgba(255, 255, 255, 0.18);
  }
}

/* ========== 组件信息卡片（glassmorphism 风格） ========== */
.comp-info {
  width: 100%;
  max-width: 400px;
}

.comp-info__card {
  text-align: center;
  padding: var(--dream-space-xl);
  backdrop-filter: blur(24px) saturate(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.1);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: var(--dream-radius-lg);
  box-shadow:
    inset 0 0 20px rgba(255, 255, 255, 0.02),
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 1px 0 rgba(255, 255, 255, 0.12),
    0 0 15px rgba(255, 255, 255, 0.02),
    0 8px 32px rgba(0, 0, 0, 0.20);
}

.comp-info__name {
  font-size: var(--dream-text-lg);
  font-weight: var(--dream-font-bold);
  color: var(--dream-text-primary);
  margin: 0 0 var(--dream-space-xs);
}

.comp-info__desc {
  font-size: var(--dream-text-sm);
  color: var(--dream-text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--dream-space-md);
}

.comp-info__tag {
  display: inline-block;
  font-size: 12px;
  font-family: var(--dream-font-mono);
  color: rgba(125, 211, 252, 0.8);
  background: rgba(125, 211, 252, 0.06);
  padding: 4px 14px;
  border-radius: var(--dream-radius-sm);
  border: 1px solid rgba(125, 211, 252, 0.12);
}

/* ========== 响应式 ========== */
@media (max-width: 900px) {
  .mobile-page {
    flex-direction: column;
  }
  .mobile-sidebar {
    width: 100%;
    position: static;
    max-height: none;
    border-radius: var(--dream-radius-md);
  }
  .phone-frame {
    width: 100%;
    max-width: 393px;
    height: 700px;
  }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
