<template>
  <div :class="['d-bg-switcher', { 'd-bg-switcher--open': isOpen }]">
    <!-- 触发按钮 -->
    <button class="d-bg-switcher__trigger" @click="isOpen = !isOpen" title="切换背景">
      🎨
    </button>

    <!-- 面板 -->
    <Transition name="switcher-panel">
      <div v-if="isOpen" class="d-bg-switcher__panel">
        <div class="d-bg-switcher__header">
          <span class="d-bg-switcher__title">背景切换</span>
          <button class="d-bg-switcher__close" @click="isOpen = false">✕</button>
        </div>

        <!-- 动态 -->
        <div class="d-bg-switcher__group">
          <span class="d-bg-switcher__group-label">动态</span>
          <div class="d-bg-switcher__grid">
            <button
              v-for="opt in animatedOptions"
              :key="opt.id"
              :class="['d-bg-switcher__item', { 'd-bg-switcher__item--active': currentBg === opt.id }]"
              @click="setBg(opt.id)"
              :title="opt.label"
            >
              <span class="d-bg-switcher__icon">{{ opt.icon }}</span>
              <span class="d-bg-switcher__label">{{ opt.label }}</span>
            </button>
          </div>
        </div>

        <!-- 渐变 -->
        <div class="d-bg-switcher__group">
          <span class="d-bg-switcher__group-label">渐变</span>
          <div class="d-bg-switcher__grid">
            <button
              v-for="opt in gradientOptions"
              :key="opt.id"
              :class="['d-bg-switcher__item', { 'd-bg-switcher__item--active': currentBg === opt.id }]"
              @click="setBg(opt.id)"
              :title="opt.label"
            >
              <span class="d-bg-switcher__icon">{{ opt.icon }}</span>
              <span class="d-bg-switcher__label">{{ opt.label }}</span>
            </button>
          </div>
        </div>

        <!-- 图案 -->
        <div class="d-bg-switcher__group">
          <span class="d-bg-switcher__group-label">图案</span>
          <div class="d-bg-switcher__grid">
            <button
              v-for="opt in patternOptions"
              :key="opt.id"
              :class="['d-bg-switcher__item', { 'd-bg-switcher__item--active': currentBg === opt.id }]"
              @click="setBg(opt.id)"
              :title="opt.label"
            >
              <span class="d-bg-switcher__icon">{{ opt.icon }}</span>
              <span class="d-bg-switcher__label">{{ opt.label }}</span>
            </button>
          </div>
        </div>

        <!-- 纯色 -->
        <div class="d-bg-switcher__group">
          <span class="d-bg-switcher__group-label">纯色</span>
          <div class="d-bg-switcher__grid">
            <button
              v-for="opt in solidOptions"
              :key="opt.id"
              :class="['d-bg-switcher__item', { 'd-bg-switcher__item--active': currentBg === opt.id }]"
              @click="setBg(opt.id)"
              :title="opt.label"
            >
              <span class="d-bg-switcher__icon">{{ opt.icon }}</span>
              <span class="d-bg-switcher__label">{{ opt.label }}</span>
            </button>
          </div>
        </div>

        <!-- 梦幻蒙版控制 -->
        <div class="d-bg-switcher__divider" />
        <div class="d-bg-switcher__group">
          <span class="d-bg-switcher__group-label">梦幻蒙版 DreamVeil</span>
          <div class="d-bg-switcher__veil-row">
            <button
              :class="['d-bg-switcher__veil-toggle', { 'd-bg-switcher__veil-toggle--on': veilEnabled }]"
              @click="toggleVeil"
            >
              {{ veilEnabled ? '✦ 开启' : '○ 关闭' }}
            </button>
            <button
              :class="['d-bg-switcher__veil-toggle', { 'd-bg-switcher__veil-toggle--on': veilParticles }]"
              @click="toggleVeilParticles"
              :disabled="!veilEnabled"
            >
              {{ veilParticles ? '✧ 光斑' : '○ 光斑' }}
            </button>
          </div>
          <div v-if="veilEnabled" class="d-bg-switcher__veil-row" style="margin-top:6px;">
            <button
              v-for="level in veilLevels"
              :key="level.id"
              :class="['d-bg-switcher__veil-opt', { 'd-bg-switcher__veil-opt--active': veilIntensity === level.id }]"
              @click="setVeilIntensity(level.id)"
            >
              {{ level.label }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
/**
 * DBackgroundSwitcher - 背景切换器
 * @author buchi
 * @since 2026-02-08
 */
import { ref, computed } from 'vue'
import { useBackground, type VeilIntensity } from '../../composables/useBackground'

defineOptions({ name: 'DBackgroundSwitcher' })

const { currentBg, bgOptions, setBg, veilEnabled, veilIntensity, veilParticles, toggleVeil, setVeilIntensity, toggleVeilParticles } = useBackground()
const isOpen = ref(false)

const animatedOptions = computed(() => bgOptions.filter(o => o.category === 'animated'))
const gradientOptions = computed(() => bgOptions.filter(o => o.category === 'gradient'))
const patternOptions = computed(() => bgOptions.filter(o => o.category === 'pattern'))
const solidOptions = computed(() => bgOptions.filter(o => o.category === 'solid'))

const veilLevels: { id: VeilIntensity; label: string }[] = [
  { id: 'subtle', label: '轻柔' },
  { id: 'medium', label: '标准' },
  { id: 'strong', label: '浓郁' },
]
</script>

<style scoped lang="scss">
.d-bg-switcher {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;

  &__trigger {
    width: 48px;
    height: 48px;
    border-radius: var(--dream-radius-full);
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.18);
    font-size: 20px;
    cursor: pointer;
    transition: all var(--dream-transition-base);
    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow:
      inset 0 0 15px rgba(255, 255, 255, 0.04),
      0 0 1px rgba(255, 255, 255, 0.20),
      0 0 15px rgba(255, 255, 255, 0.04),
      0 4px 20px rgba(0, 0, 0, 0.25);

    &:hover {
      border-color: rgba(255, 255, 255, 0.35);
      transform: scale(1.08);
      box-shadow:
        inset 0 0 20px rgba(255, 255, 255, 0.06),
        0 0 1px rgba(255, 255, 255, 0.35),
        0 0 20px rgba(255, 255, 255, 0.08),
        0 6px 24px rgba(0, 0, 0, 0.3);
    }
  }

  &__panel {
    position: absolute;
    bottom: 60px;
    right: 0;
    width: 320px;
    max-height: 70vh;
    overflow-y: auto;
    backdrop-filter: blur(40px) saturate(1.3);
    -webkit-backdrop-filter: blur(40px) saturate(1.3);
    background: rgba(10, 12, 16, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--dream-radius-xl);
    padding: var(--dream-space-lg);

    box-shadow:
      inset 0 0 30px rgba(255, 255, 255, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 0 1px rgba(255, 255, 255, 0.20),
      0 0 20px rgba(255, 255, 255, 0.05),
      0 20px 60px rgba(0, 0, 0, 0.4);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--dream-space-lg);
    padding-bottom: var(--dream-space-md);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  &__title {
    font-size: var(--dream-text-base);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
  }

  &__close {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--dream-radius-sm);
    color: var(--dream-text-tertiary);
    font-size: 12px;
    transition: all var(--dream-transition-fast);
    background: transparent;
    border: none;

    &:hover {
      background: rgba(255, 255, 255, 0.06);
      color: var(--dream-text-primary);
    }
  }

  &__group {
    margin-bottom: var(--dream-space-md);

    &:last-child { margin-bottom: 0; }
  }

  &__group-label {
    font-size: var(--dream-text-xs);
    color: var(--dream-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: var(--dream-space-sm);
    display: block;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--dream-space-sm);
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 10px 6px;
    border-radius: var(--dream-radius-md);
    background: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all var(--dream-transition-fast);
    color: var(--dream-text-secondary);

    &:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.10);
    }

    &--active {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.25);
      color: var(--dream-text-primary);
      box-shadow:
        inset 0 0 10px rgba(255, 255, 255, 0.03),
        0 0 1px rgba(255, 255, 255, 0.15);
    }
  }

  &__icon {
    font-size: 20px;
    line-height: 1;
  }

  &__label {
    font-size: 10px;
    white-space: nowrap;
  }

  &__divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
    margin: var(--dream-space-md) 0;
  }

  &__veil-row {
    display: flex;
    gap: 6px;
  }

  &__veil-toggle {
    flex: 1;
    padding: 7px 10px;
    font-size: 12px;
    border-radius: var(--dream-radius-sm);
    background: transparent;
    border: 1px solid rgba(255,255,255,0.08);
    color: var(--dream-text-tertiary);
    cursor: pointer;
    transition: all var(--dream-transition-fast);

    &:hover { border-color: rgba(255,255,255,0.15); color: var(--dream-text-secondary); }
    &--on {
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,255,255,0.22);
      color: var(--dream-text-primary);
    }
    &:disabled { opacity: 0.3; pointer-events: none; }
  }

  &__veil-opt {
    flex: 1;
    padding: 5px 8px;
    font-size: 11px;
    border-radius: var(--dream-radius-sm);
    background: transparent;
    border: 1px solid rgba(255,255,255,0.06);
    color: var(--dream-text-tertiary);
    cursor: pointer;
    transition: all var(--dream-transition-fast);

    &:hover { color: var(--dream-text-secondary); border-color: rgba(255,255,255,0.12); }
    &--active {
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.25);
      color: var(--dream-text-primary);
      box-shadow: inset 0 0 6px rgba(255,255,255,0.03), 0 0 1px rgba(255,255,255,0.12);
    }
  }
}

/* Panel transition */
.switcher-panel-enter-active,
.switcher-panel-leave-active {
  transition: all 0.25s ease;
}

.switcher-panel-enter-from,
.switcher-panel-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}
</style>
