<template>
  <button
    :class="[
      'd-glass-button',
      `d-glass-button--${variant}`,
      `d-glass-button--${size}`,
      {
        'd-glass-button--block': block,
        'd-glass-button--loading': loading,
        'd-glass-button--icon-only': iconOnly,
        'd-glass-button--outline': outline,
      }
    ]"
    :style="glassVars"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="d-glass-button__spinner" />
    <span class="d-glass-button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
/**
 * DGlassButton - 玻璃拟态按钮组件
 * @author buchi
 * @since 2026-02-08
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassButton' })

interface Props extends GlassCustomProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  loading?: boolean
  disabled?: boolean
  iconOnly?: boolean
  outline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  block: false,
  loading: false,
  disabled: false,
  iconOnly: false,
  outline: false,
})

const { glassVars } = useGlassStyle(props)

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped lang="scss">
.d-glass-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--dream-space-sm);
  backdrop-filter: blur(20px) saturate(1.1);
  -webkit-backdrop-filter: blur(20px) saturate(1.1);
  background: var(--_glass-bg, var(--dream-bg-primary));
  border: 1px solid var(--_glass-border, var(--dream-border-default));
  border-radius: var(--dream-radius-md);
  color: var(--dream-text-primary);
  font-weight: var(--dream-font-medium);
  cursor: pointer;
  transition: all var(--dream-transition-base);
  user-select: none;
  white-space: nowrap;

  /* 白色光晕边框 */
  box-shadow:
    inset 0 0 12px rgba(255, 255, 255, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.15)),
    0 0 10px rgba(255, 255, 255, 0.03),
    0 4px 16px rgba(0, 0, 0, 0.20);

  &:hover:not(:disabled) {
    background: var(--dream-bg-secondary);
    border-color: var(--dream-border-hover);
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.18),
      0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.30)),
      0 0 15px rgba(255, 255, 255, 0.06),
      0 0 40px rgba(255, 255, 255, 0.02),
      0 6px 24px rgba(0, 0, 0, 0.25);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    background: var(--dream-bg-elevated);
    transform: translateY(0);
    box-shadow:
      inset 0 0 15px rgba(255, 255, 255, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.20),
      0 0 1px 0 rgba(255, 255, 255, 0.25),
      0 2px 8px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  /* Sizes */
  &--sm {
    padding: 6px 14px;
    font-size: var(--dream-text-sm);
    border-radius: var(--dream-radius-sm);
  }

  &--md {
    padding: 10px 20px;
    font-size: var(--dream-text-base);
  }

  &--lg {
    padding: 14px 28px;
    font-size: var(--dream-text-lg);
    border-radius: var(--dream-radius-lg);
  }

  &--block {
    width: 100%;
  }

  &--icon-only {
    &.d-glass-button--sm { width: 32px; height: 32px; padding: 0; }
    &.d-glass-button--md { width: 40px; height: 40px; padding: 0; }
    &.d-glass-button--lg { width: 48px; height: 48px; padding: 0; }
  }

  /* Variants — 纯白光晕为主，主题色只轻微点缀边框 */
  &--primary {
    border-color: rgba(var(--dream-color-primary-rgb), 0.25);
    box-shadow:
      inset 0 0 15px rgba(var(--dream-color-primary-rgb), 0.04),
      inset 0 1px 0 rgba(var(--dream-color-primary-rgb), 0.15),
      0 0 1px 0 rgba(var(--dream-color-primary-rgb), 0.30),
      0 0 12px rgba(var(--dream-color-primary-rgb), 0.08),
      0 0 30px rgba(var(--dream-color-primary-rgb), 0.03),
      0 4px 16px rgba(0, 0, 0, 0.20);

    &:hover:not(:disabled) {
      border-color: rgba(var(--dream-color-primary-rgb), 0.40);
      box-shadow:
        inset 0 0 20px rgba(var(--dream-color-primary-rgb), 0.06),
        inset 0 1px 0 rgba(var(--dream-color-primary-rgb), 0.25),
        0 0 1px 0 rgba(var(--dream-color-primary-rgb), 0.45),
        0 0 20px rgba(var(--dream-color-primary-rgb), 0.15),
        0 0 50px rgba(var(--dream-color-primary-rgb), 0.05),
        0 6px 24px rgba(0, 0, 0, 0.25);
    }
  }

  &--success {
    border-color: rgba(var(--dream-color-success-rgb), 0.25);
    box-shadow:
      inset 0 0 15px rgba(var(--dream-color-success-rgb), 0.04),
      inset 0 1px 0 rgba(var(--dream-color-success-rgb), 0.15),
      0 0 1px 0 rgba(var(--dream-color-success-rgb), 0.30),
      0 0 12px rgba(var(--dream-color-success-rgb), 0.08),
      0 0 30px rgba(var(--dream-color-success-rgb), 0.03),
      0 4px 16px rgba(0, 0, 0, 0.20);

    &:hover:not(:disabled) {
      border-color: rgba(var(--dream-color-success-rgb), 0.40);
      box-shadow:
        inset 0 0 20px rgba(var(--dream-color-success-rgb), 0.06),
        inset 0 1px 0 rgba(var(--dream-color-success-rgb), 0.25),
        0 0 1px 0 rgba(var(--dream-color-success-rgb), 0.45),
        0 0 20px rgba(var(--dream-color-success-rgb), 0.15),
        0 0 50px rgba(var(--dream-color-success-rgb), 0.05),
        0 6px 24px rgba(0, 0, 0, 0.25);
    }
  }

  &--warning {
    border-color: rgba(var(--dream-color-warning-rgb), 0.25);
    box-shadow:
      inset 0 0 15px rgba(var(--dream-color-warning-rgb), 0.04),
      inset 0 1px 0 rgba(var(--dream-color-warning-rgb), 0.15),
      0 0 1px 0 rgba(var(--dream-color-warning-rgb), 0.30),
      0 0 12px rgba(var(--dream-color-warning-rgb), 0.08),
      0 4px 16px rgba(0, 0, 0, 0.20);

    &:hover:not(:disabled) {
      border-color: rgba(var(--dream-color-warning-rgb), 0.40);
    }
  }

  &--danger {
    border-color: rgba(var(--dream-color-danger-rgb), 0.25);
    box-shadow:
      inset 0 0 15px rgba(var(--dream-color-danger-rgb), 0.04),
      inset 0 1px 0 rgba(var(--dream-color-danger-rgb), 0.15),
      0 0 1px 0 rgba(var(--dream-color-danger-rgb), 0.30),
      0 0 12px rgba(var(--dream-color-danger-rgb), 0.08),
      0 4px 16px rgba(0, 0, 0, 0.20);

    &:hover:not(:disabled) {
      border-color: rgba(var(--dream-color-danger-rgb), 0.40);
    }
  }

  &--info {
    border-color: rgba(var(--dream-color-info-rgb), 0.25);
    box-shadow:
      inset 0 0 15px rgba(var(--dream-color-info-rgb), 0.04),
      inset 0 1px 0 rgba(var(--dream-color-info-rgb), 0.15),
      0 0 1px 0 rgba(var(--dream-color-info-rgb), 0.30),
      0 0 12px rgba(var(--dream-color-info-rgb), 0.08),
      0 4px 16px rgba(0, 0, 0, 0.20);

    &:hover:not(:disabled) {
      border-color: rgba(var(--dream-color-info-rgb), 0.40);
    }
  }

  &--ghost {
    background: transparent;
    border-color: transparent;
    box-shadow: none;

    &:hover:not(:disabled) {
      background: var(--dream-bg-primary);
      border-color: var(--dream-border-default);
      box-shadow:
        inset 0 0 12px rgba(255, 255, 255, 0.03),
        0 0 1px 0 rgba(255, 255, 255, 0.15);
    }
  }

  &--outline {
    background: transparent;

    &:hover:not(:disabled) {
      background: var(--dream-bg-primary);
    }
  }

  /* Loading */
  &--loading {
    .d-glass-button__content {
      opacity: 0.5;
    }
  }

  &__spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-top-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    flex-shrink: 0;
  }

  &__content {
    display: inline-flex;
    align-items: center;
    gap: var(--dream-space-sm);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
