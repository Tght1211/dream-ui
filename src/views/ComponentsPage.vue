<template>
  <div class="comp-layout">
    <!-- 侧边导航 -->
    <aside class="comp-sidebar">
      <nav class="comp-nav">
        <div v-for="group in navGroups" :key="group.title" class="comp-nav__group">
          <h5 class="comp-nav__title">{{ group.title }}</h5>
          <router-link
            v-for="item in group.items"
            :key="item.path"
            :to="`/components/${item.path}`"
            :class="['comp-nav__link', { 'comp-nav__link--active': $route.path === `/components/${item.path}` }]"
          >
            {{ item.label }}
            <span class="comp-nav__tag">{{ item.tag }}</span>
          </router-link>
        </div>
      </nav>
    </aside>

    <!-- 内容区 -->
    <div class="comp-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @author buchi
 * @since 2026-02-08
 */
const navGroups = [
  {
    title: '基础',
    items: [
      { path: 'button', label: 'Button 按钮', tag: 'DGlassButton' },
      { path: 'card', label: 'Card 卡片', tag: 'DGlassCard' },
      { path: 'panel', label: 'Panel 面板', tag: 'DGlassPanel' },
      { path: 'divider', label: 'Divider 分割线', tag: 'DGlassDivider' },
    ],
  },
  {
    title: '表单',
    items: [
      { path: 'input', label: 'Input 输入框', tag: 'DGlassInput' },
      { path: 'select', label: 'Select 选择器', tag: 'DGlassSelect' },
      { path: 'switch', label: 'Switch 开关', tag: 'DGlassSwitch' },
    ],
  },
  {
    title: '数据展示',
    items: [
      { path: 'badge', label: 'Badge 徽章', tag: 'DGlassBadge' },
      { path: 'tag', label: 'Tag 标签', tag: 'DGlassTag' },
      { path: 'avatar', label: 'Avatar 头像', tag: 'DGlassAvatar' },
      { path: 'progress', label: 'Progress 进度条', tag: 'DGlassProgress' },
      { path: 'widget', label: 'Widget 小组件', tag: 'DGlassWidget' },
      { path: 'tabs', label: 'Tabs 标签页', tag: 'DGlassTabs' },
      { path: 'timeline', label: 'Timeline 时间线', tag: 'DGlassTimeline' },
      { path: 'collapse', label: 'Collapse 折叠面板', tag: 'DGlassCollapse' },
      { path: 'loading', label: 'Loading 加载', tag: 'DGlassLoading' },
    ],
  },
  {
    title: '反馈',
    items: [
      { path: 'alert', label: 'Alert 警告', tag: 'DGlassAlert' },
      { path: 'dialog', label: 'Dialog 对话框', tag: 'DGlassDialog' },
      { path: 'notification', label: 'Notification 通知', tag: 'DGlassNotification' },
    ],
  },
]
</script>

<style scoped lang="scss">
.comp-layout {
  display: flex;
  gap: var(--dream-space-2xl);
  min-height: calc(100vh - 200px);
}

.comp-sidebar {
  width: 220px;
  flex-shrink: 0;
  position: sticky;
  top: 88px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.comp-nav {
  &__group {
    margin-bottom: var(--dream-space-xl);
  }

  &__title {
    font-size: var(--dream-text-xs);
    color: var(--dream-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 var(--dream-space-sm);
    padding: 0 var(--dream-space-md);
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px var(--dream-space-md);
    font-size: var(--dream-text-sm);
    color: var(--dream-text-secondary);
    text-decoration: none;
    border-radius: var(--dream-radius-sm);
    transition: all var(--dream-transition-fast);
    border: 1px solid transparent;

    &:hover {
      color: var(--dream-text-primary);
      background: rgba(255, 255, 255, 0.04);
    }

    &--active {
      color: var(--dream-text-primary);
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.10);
      box-shadow: inset 0 0 8px rgba(255,255,255,0.02), 0 0 1px rgba(255,255,255,0.08);
    }
  }

  &__tag {
    font-size: 9px;
    color: var(--dream-text-tertiary);
    font-family: var(--dream-font-mono);
    display: none;
  }
}

.comp-content {
  flex: 1;
  min-width: 0;
}

@media (max-width: 768px) {
  .comp-layout { flex-direction: column; }
  .comp-sidebar { width: 100%; position: static; max-height: none; }
}
</style>
