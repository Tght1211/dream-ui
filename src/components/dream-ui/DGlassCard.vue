<template>
  <div
    :class="[
      'd-glass-card',
      `d-glass-card--${variant}`,
      {
        'd-glass-card--hoverable': hoverable,
        'd-glass-card--glow': glow,
      }
    ]"
    :style="glassVars"
  >
    <div v-if="$slots.header" class="d-glass-card__header">
      <slot name="header" />
    </div>
    <div class="d-glass-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="d-glass-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassCard - 玻璃拟态卡片组件
 * 核心特征：强烈的白色边框光晕
 * @author buchi
 * @since 2026-02-08
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassCard' })

interface Props extends GlassCustomProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  hoverable?: boolean
  glow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  hoverable: false,
  glow: false,
})

const { glassVars } = useGlassStyle(props)
</script>

<style scoped lang="scss">
.d-glass-card {
  position: relative;
  backdrop-filter: blur(24px) saturate(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.1);
  background: var(--_glass-bg, var(--dream-bg-primary));
  border: 1px solid var(--_glass-border, var(--dream-border-default));
  border-radius: var(--dream-radius-lg);
  color: var(--dream-text-primary);
  overflow: hidden;
  transition: all var(--dream-transition-base);

  /* 核心光晕效果 — 多层白色发光 */
  box-shadow:
    /* 内发光 - 模拟边缘光线 */
    inset 0 0 20px rgba(255, 255, 255, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    /* 外光晕 - 边缘柔和扩散 */
    0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.20)),
    0 0 15px rgba(255, 255, 255, 0.04),
    0 0 30px rgba(255, 255, 255, 0.02),
    /* 投影 */
    0 8px 32px rgba(0, 0, 0, 0.25);

  &--hoverable {
    cursor: pointer;

    &:hover {
      border-color: var(--dream-border-hover);
      background: var(--dream-bg-secondary);
      box-shadow:
        inset 0 0 30px rgba(255, 255, 255, 0.06),
        inset 0 1px 0 rgba(255, 255, 255, 0.20),
        0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.35)),
        0 0 20px rgba(255, 255, 255, 0.08),
        0 0 50px rgba(255, 255, 255, 0.03),
        0 12px 40px rgba(0, 0, 0, 0.3);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  &--glow {
    animation: dream-glow-pulse 3s ease-in-out infinite;
  }

  // 主题色变体 — 只影响边框光晕色调
  &--primary {
    border-color: rgba(var(--dream-color-primary-rgb), 0.18);
    box-shadow:
      inset 0 0 20px rgba(var(--dream-color-primary-rgb), 0.03),
      inset 0 1px 0 rgba(var(--dream-color-primary-rgb), 0.15),
      0 0 1px 0 rgba(var(--dream-color-primary-rgb), 0.30),
      0 0 15px rgba(var(--dream-color-primary-rgb), 0.06),
      0 0 40px rgba(var(--dream-color-primary-rgb), 0.03),
      0 8px 32px rgba(0, 0, 0, 0.25);

    &.d-glass-card--hoverable:hover {
      border-color: rgba(var(--dream-color-primary-rgb), 0.35);
      box-shadow:
        inset 0 0 30px rgba(var(--dream-color-primary-rgb), 0.05),
        inset 0 1px 0 rgba(var(--dream-color-primary-rgb), 0.25),
        0 0 1px 0 rgba(var(--dream-color-primary-rgb), 0.45),
        0 0 25px rgba(var(--dream-color-primary-rgb), 0.12),
        0 0 60px rgba(var(--dream-color-primary-rgb), 0.05),
        0 12px 40px rgba(0, 0, 0, 0.3);
    }
  }

  &--success {
    border-color: rgba(var(--dream-color-success-rgb), 0.18);
    box-shadow:
      inset 0 0 20px rgba(var(--dream-color-success-rgb), 0.03),
      inset 0 1px 0 rgba(var(--dream-color-success-rgb), 0.15),
      0 0 1px 0 rgba(var(--dream-color-success-rgb), 0.30),
      0 0 15px rgba(var(--dream-color-success-rgb), 0.06),
      0 0 40px rgba(var(--dream-color-success-rgb), 0.03),
      0 8px 32px rgba(0, 0, 0, 0.25);
  }

  &--warning {
    border-color: rgba(var(--dream-color-warning-rgb), 0.18);
    box-shadow:
      inset 0 0 20px rgba(var(--dream-color-warning-rgb), 0.03),
      inset 0 1px 0 rgba(var(--dream-color-warning-rgb), 0.15),
      0 0 1px 0 rgba(var(--dream-color-warning-rgb), 0.30),
      0 0 15px rgba(var(--dream-color-warning-rgb), 0.06),
      0 0 40px rgba(var(--dream-color-warning-rgb), 0.03),
      0 8px 32px rgba(0, 0, 0, 0.25);
  }

  &--danger {
    border-color: rgba(var(--dream-color-danger-rgb), 0.18);
    box-shadow:
      inset 0 0 20px rgba(var(--dream-color-danger-rgb), 0.03),
      inset 0 1px 0 rgba(var(--dream-color-danger-rgb), 0.15),
      0 0 1px 0 rgba(var(--dream-color-danger-rgb), 0.30),
      0 0 15px rgba(var(--dream-color-danger-rgb), 0.06),
      0 0 40px rgba(var(--dream-color-danger-rgb), 0.03),
      0 8px 32px rgba(0, 0, 0, 0.25);
  }

  &--info {
    border-color: rgba(var(--dream-color-info-rgb), 0.18);
    box-shadow:
      inset 0 0 20px rgba(var(--dream-color-info-rgb), 0.03),
      inset 0 1px 0 rgba(var(--dream-color-info-rgb), 0.15),
      0 0 1px 0 rgba(var(--dream-color-info-rgb), 0.30),
      0 0 15px rgba(var(--dream-color-info-rgb), 0.06),
      0 0 40px rgba(var(--dream-color-info-rgb), 0.03),
      0 8px 32px rgba(0, 0, 0, 0.25);
  }

  &__header {
    padding: var(--dream-space-lg) var(--dream-space-xl);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-weight: var(--dream-font-semibold);
    font-size: var(--dream-text-lg);
  }

  &__body {
    padding: var(--dream-space-xl);
  }

  &__footer {
    padding: var(--dream-space-lg) var(--dream-space-xl);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
}

@keyframes dream-glow-pulse {
  0%, 100% {
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.12),
      0 0 1px 0 rgba(255, 255, 255, 0.20),
      0 0 15px rgba(255, 255, 255, 0.04),
      0 0 30px rgba(255, 255, 255, 0.02),
      0 8px 32px rgba(0, 0, 0, 0.25);
  }
  50% {
    box-shadow:
      inset 0 0 30px rgba(255, 255, 255, 0.07),
      inset 0 1px 0 rgba(255, 255, 255, 0.25),
      0 0 2px 0 rgba(255, 255, 255, 0.40),
      0 0 25px rgba(255, 255, 255, 0.10),
      0 0 60px rgba(255, 255, 255, 0.04),
      0 8px 32px rgba(0, 0, 0, 0.25);
  }
}
</style>
