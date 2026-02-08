<template>
  <div :class="['d-glass-widget', `d-glass-widget--${variant}`]">
    <div v-if="icon || title" class="d-glass-widget__header">
      <span v-if="icon" class="d-glass-widget__icon">{{ icon }}</span>
      <div class="d-glass-widget__meta">
        <h4 v-if="title" class="d-glass-widget__title">{{ title }}</h4>
        <p v-if="subtitle" class="d-glass-widget__subtitle">{{ subtitle }}</p>
      </div>
    </div>
    <div class="d-glass-widget__content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="d-glass-widget__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassWidget - 玻璃拟态小组件容器
 * 参考VR界面中的心率/步数/卡路里等状态卡片
 * @author buchi
 * @since 2026-02-08
 */
defineOptions({ name: 'DGlassWidget' })

interface Props {
  title?: string
  subtitle?: string
  icon?: string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  icon: '',
  variant: 'default',
})
</script>

<style scoped lang="scss">
.d-glass-widget {
  backdrop-filter: blur(24px) saturate(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.1);
  background: var(--dream-bg-primary);
  border: 1px solid var(--dream-border-default);
  border-radius: var(--dream-radius-lg);
  transition: all var(--dream-transition-base);
  padding: var(--dream-space-lg);

  /* 核心：强白色边框光晕 */
  box-shadow:
    inset 0 0 20px rgba(255, 255, 255, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 0 1px 0 rgba(255, 255, 255, 0.20),
    0 0 15px rgba(255, 255, 255, 0.04),
    0 0 30px rgba(255, 255, 255, 0.02),
    0 8px 32px rgba(0, 0, 0, 0.25);

  &:hover {
    border-color: var(--dream-border-hover);
    box-shadow:
      inset 0 0 25px rgba(255, 255, 255, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.18),
      0 0 1px 0 rgba(255, 255, 255, 0.30),
      0 0 20px rgba(255, 255, 255, 0.07),
      0 0 45px rgba(255, 255, 255, 0.03),
      0 10px 36px rgba(0, 0, 0, 0.28);
  }

  &__header {
    display: flex;
    align-items: center;
    gap: var(--dream-space-md);
    margin-bottom: var(--dream-space-md);
  }

  &__icon {
    font-size: 22px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--dream-radius-full);
    flex-shrink: 0;
    /* 图标有自己的玻璃圆形背景+发光 */
    background: var(--dream-bg-secondary);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow:
      inset 0 0 10px rgba(255, 255, 255, 0.03),
      0 0 1px rgba(255, 255, 255, 0.10),
      0 0 10px rgba(255, 255, 255, 0.02);
  }

  &__meta {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: var(--dream-text-base);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
    margin: 0;
  }

  &__subtitle {
    font-size: var(--dream-text-xs);
    color: var(--dream-text-tertiary);
    margin: 2px 0 0;
  }

  &__content {
    color: var(--dream-text-secondary);
    font-size: var(--dream-text-sm);
  }

  &__footer {
    margin-top: var(--dream-space-md);
    padding-top: var(--dream-space-md);
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  // 主题色变体 — 只影响图标背景的发光色
  &--primary .d-glass-widget__icon {
    background: rgba(var(--dream-color-primary-rgb), 0.10);
    border-color: rgba(var(--dream-color-primary-rgb), 0.20);
    box-shadow:
      inset 0 0 10px rgba(var(--dream-color-primary-rgb), 0.05),
      0 0 1px rgba(var(--dream-color-primary-rgb), 0.20),
      0 0 12px rgba(var(--dream-color-primary-rgb), 0.08);
  }

  &--success .d-glass-widget__icon {
    background: rgba(var(--dream-color-success-rgb), 0.10);
    border-color: rgba(var(--dream-color-success-rgb), 0.20);
    box-shadow:
      inset 0 0 10px rgba(var(--dream-color-success-rgb), 0.05),
      0 0 1px rgba(var(--dream-color-success-rgb), 0.20),
      0 0 12px rgba(var(--dream-color-success-rgb), 0.08);
  }

  &--warning .d-glass-widget__icon {
    background: rgba(var(--dream-color-warning-rgb), 0.10);
    border-color: rgba(var(--dream-color-warning-rgb), 0.20);
    box-shadow:
      inset 0 0 10px rgba(var(--dream-color-warning-rgb), 0.05),
      0 0 1px rgba(var(--dream-color-warning-rgb), 0.20),
      0 0 12px rgba(var(--dream-color-warning-rgb), 0.08);
  }

  &--danger .d-glass-widget__icon {
    background: rgba(var(--dream-color-danger-rgb), 0.10);
    border-color: rgba(var(--dream-color-danger-rgb), 0.20);
    box-shadow:
      inset 0 0 10px rgba(var(--dream-color-danger-rgb), 0.05),
      0 0 1px rgba(var(--dream-color-danger-rgb), 0.20),
      0 0 12px rgba(var(--dream-color-danger-rgb), 0.08);
  }

  &--info .d-glass-widget__icon {
    background: rgba(var(--dream-color-info-rgb), 0.10);
    border-color: rgba(var(--dream-color-info-rgb), 0.20);
    box-shadow:
      inset 0 0 10px rgba(var(--dream-color-info-rgb), 0.05),
      0 0 1px rgba(var(--dream-color-info-rgb), 0.20),
      0 0 12px rgba(var(--dream-color-info-rgb), 0.08);
  }
}
</style>
