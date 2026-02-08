<template>
  <span
    :class="[
      'd-glass-badge',
      `d-glass-badge--${variant}`,
      `d-glass-badge--${size}`,
      { 'd-glass-badge--dot': dot }
    ]"
    :style="glassVars"
  >
    <span v-if="dot" class="d-glass-badge__dot" />
    <slot />
  </span>
</template>

<script setup lang="ts">
/**
 * DGlassBadge - 玻璃拟态徽章/标签组件
 * @author buchi
 * @since 2026-02-08
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassBadge' })

interface Props extends GlassCustomProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  dot: false,
})

const { glassVars } = useGlassStyle(props)
</script>

<style scoped lang="scss">
.d-glass-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--dream-space-xs);
  backdrop-filter: blur(12px) saturate(1.1);
  -webkit-backdrop-filter: blur(12px) saturate(1.1);
  background: var(--_glass-bg, var(--dream-bg-primary));
  border: 1px solid var(--_glass-border, var(--dream-border-default));
  border-radius: var(--dream-radius-full);
  color: var(--dream-text-primary);
  font-weight: var(--dream-font-medium);
  transition: all var(--dream-transition-base);
  white-space: nowrap;

  /* 光晕 */
  box-shadow:
    inset 0 0 8px rgba(255, 255, 255, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.12)),
    0 0 8px rgba(255, 255, 255, 0.02);

  &--sm { padding: 2px 10px; font-size: var(--dream-text-xs); }
  &--md { padding: 4px 14px; font-size: var(--dream-text-sm); }
  &--lg { padding: 6px 18px; font-size: var(--dream-text-base); }

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
    box-shadow: 0 0 6px currentColor;
  }

  &--primary {
    border-color: rgba(var(--dream-color-primary-rgb), 0.20);
    color: var(--dream-color-primary);
    box-shadow:
      inset 0 0 10px rgba(var(--dream-color-primary-rgb), 0.03),
      0 0 1px var(--_glass-glow, rgba(var(--dream-color-primary-rgb), 0.25)),
      0 0 8px rgba(var(--dream-color-primary-rgb), 0.06);
  }

  &--success {
    border-color: rgba(var(--dream-color-success-rgb), 0.20);
    color: var(--dream-color-success);
    box-shadow:
      inset 0 0 10px rgba(var(--dream-color-success-rgb), 0.03),
      0 0 1px var(--_glass-glow, rgba(var(--dream-color-success-rgb), 0.25)),
      0 0 8px rgba(var(--dream-color-success-rgb), 0.06);
  }

  &--warning {
    border-color: rgba(var(--dream-color-warning-rgb), 0.20);
    color: var(--dream-color-warning);
    box-shadow:
      inset 0 0 10px rgba(var(--dream-color-warning-rgb), 0.03),
      0 0 1px var(--_glass-glow, rgba(var(--dream-color-warning-rgb), 0.25)),
      0 0 8px rgba(var(--dream-color-warning-rgb), 0.06);
  }

  &--danger {
    border-color: rgba(var(--dream-color-danger-rgb), 0.20);
    color: var(--dream-color-danger);
    box-shadow:
      inset 0 0 10px rgba(var(--dream-color-danger-rgb), 0.03),
      0 0 1px var(--_glass-glow, rgba(var(--dream-color-danger-rgb), 0.25)),
      0 0 8px rgba(var(--dream-color-danger-rgb), 0.06);
  }

  &--info {
    border-color: rgba(var(--dream-color-info-rgb), 0.20);
    color: var(--dream-color-info);
    box-shadow:
      inset 0 0 10px rgba(var(--dream-color-info-rgb), 0.03),
      0 0 1px var(--_glass-glow, rgba(var(--dream-color-info-rgb), 0.25)),
      0 0 8px rgba(var(--dream-color-info-rgb), 0.06);
  }
}
</style>
