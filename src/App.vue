<template>
  <div id="dream-app" :class="['dream-app', { 'dream-app--light-bg': isLightBg }]">
    <!-- 动态背景层 -->
    <DBackgroundLayer :bg-id="currentBg" />

    <!-- 梦幻白色蒙版（日漫/P5R 风格柔光滤镜） -->
    <DDreamVeil v-if="veilEnabled" :intensity="veilIntensity" :particles="veilParticles" />

    <!-- 黑柔镜（Bloom 高光扩散滤镜） -->
    <DBloomVeil v-if="bloomEnabled" :intensity="bloomIntensity" />

    <!-- 背景切换器 -->
    <DBackgroundSwitcher />

    <DGlassNavbar>
      <template #brand>
        <router-link to="/" class="brand-link">
          <span class="brand-icon">◆</span>
          <span class="brand-text">Dream UI</span>
        </router-link>
      </template>
      <template #center>
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="['nav-link', { 'nav-link--active': $route.path === item.path }]"
        >
          {{ item.label }}
        </router-link>
      </template>
      <template #actions>
        <DGlassButton size="sm" variant="ghost" @click="openGitHub">
          GitHub
        </DGlassButton>
      </template>
    </DGlassNavbar>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="site-footer">
      <p>Dream UI &copy; 2026 · Glassmorphism Design System</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
/**
 * @author buchi
 * @since 2026-02-08
 */
import { computed } from 'vue'
import { DGlassNavbar, DGlassButton, DBackgroundLayer, DBackgroundSwitcher, DDreamVeil, DBloomVeil } from './components/dream-ui'
import { useBackground } from './composables/useBackground'

const { currentBg, veilEnabled, veilIntensity, veilParticles, bloomEnabled, bloomIntensity } = useBackground()

const navItems = [
  { path: '/', label: '首页' },
  { path: '/guide', label: '设计指南' },
  { path: '/components', label: '组件' },
]

// 浅色背景时需要反转文字颜色
const lightBgs = ['grid-white', 'pure-white']
const isLightBg = computed(() => lightBgs.includes(currentBg.value))

const openGitHub = () => {
  window.open('https://github.com', '_blank')
}
</script>

<style lang="scss">
.brand-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--dream-text-primary);

  .brand-icon {
    font-size: 22px;
    color: rgba(255, 255, 255, 0.8);
  }

  .brand-text {
    font-size: var(--dream-text-xl);
    font-weight: var(--dream-font-bold);
    letter-spacing: -0.02em;
    color: var(--dream-text-primary);
  }
}

.nav-link {
  padding: 8px 16px;
  border-radius: var(--dream-radius-md);
  font-size: var(--dream-text-sm);
  font-weight: var(--dream-font-medium);
  color: var(--dream-text-secondary);
  text-decoration: none;
  transition: all var(--dream-transition-fast);
  border: 1px solid transparent;

  &:hover {
    color: var(--dream-text-primary);
    background: var(--dream-bg-primary);
    border-color: var(--dream-border-default);
  }

  &--active {
    color: var(--dream-text-primary);
    background: var(--dream-bg-secondary);
    border-color: var(--dream-border-default);
    box-shadow:
      inset 0 0 12px rgba(255, 255, 255, 0.03),
      0 0 1px rgba(255, 255, 255, 0.12);
  }
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--dream-space-3xl) var(--dream-space-xl);
  min-height: calc(100vh - 140px);
  position: relative;
  z-index: 1;
}

.site-footer {
  text-align: center;
  padding: var(--dream-space-2xl);
  color: var(--dream-text-tertiary);
  font-size: var(--dream-text-sm);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  z-index: 1;
}

/* 浅色背景时文字反转为深色 */
.dream-app--light-bg {
  --dream-text-primary: rgba(0, 0, 0, 0.85);
  --dream-text-secondary: rgba(0, 0, 0, 0.60);
  --dream-text-tertiary: rgba(0, 0, 0, 0.38);
  --dream-text-disabled: rgba(0, 0, 0, 0.20);
  --dream-bg-primary: rgba(0, 0, 0, 0.04);
  --dream-bg-secondary: rgba(0, 0, 0, 0.07);
  --dream-bg-elevated: rgba(0, 0, 0, 0.10);
  --dream-border-default: rgba(0, 0, 0, 0.12);
  --dream-border-hover: rgba(0, 0, 0, 0.25);

  .brand-link .brand-icon {
    color: rgba(0, 0, 0, 0.7);
  }

  .site-footer {
    border-top-color: rgba(0, 0, 0, 0.08);
  }
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
