<template>
  <div :class="['d-glass-progress', `d-glass-progress--${variant}`]" :style="glassVars">
    <div v-if="label || showValue" class="d-glass-progress__header">
      <span v-if="label" class="d-glass-progress__label">{{ label }}</span>
      <span v-if="showValue" class="d-glass-progress__value">{{ percentage }}%</span>
    </div>
    <div class="d-glass-progress__track">
      <div
        class="d-glass-progress__bar"
        :style="{ width: `${clampedPercentage}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassProgress - 玻璃拟态进度条组件
 * @author buchi
 * @since 2026-02-08
 */
import { computed } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassProgress' })

interface Props extends GlassCustomProps {
  percentage?: number
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  label?: string
  showValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  percentage: 0,
  variant: 'primary',
  label: '',
  showValue: false,
})

const { glassVars } = useGlassStyle(props)

const clampedPercentage = computed(() => Math.min(100, Math.max(0, props.percentage)))
</script>

<style scoped lang="scss">
.d-glass-progress {
  width: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--dream-space-sm);
  }

  &__label {
    font-size: var(--dream-text-sm);
    color: var(--dream-text-secondary);
  }

  &__value {
    font-size: var(--dream-text-sm);
    color: var(--dream-text-secondary);
    font-weight: var(--dream-font-medium);
    font-variant-numeric: tabular-nums;
  }

  &__track {
    height: 6px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background: var(--_glass-bg, var(--dream-bg-primary));
    border: 1px solid var(--_glass-border, rgba(255, 255, 255, 0.10));
    border-radius: var(--dream-radius-full);
    overflow: hidden;
    box-shadow:
      inset 0 0 4px rgba(255, 255, 255, 0.02),
      0 0 1px var(--_glass-glow, rgba(255, 255, 255, 0.08));
  }

  &__bar {
    height: 100%;
    border-radius: var(--dream-radius-full);
    transition: width var(--dream-transition-slow);
    position: relative;
  }

  /* Variants — 进度条发光 */
  &--primary .d-glass-progress__bar {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.55));
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.20);
  }

  &--success .d-glass-progress__bar {
    background: linear-gradient(90deg, rgba(var(--dream-color-success-rgb), 0.4), rgba(var(--dream-color-success-rgb), 0.7));
    box-shadow: 0 0 10px rgba(var(--dream-color-success-rgb), 0.25);
  }

  &--warning .d-glass-progress__bar {
    background: linear-gradient(90deg, rgba(var(--dream-color-warning-rgb), 0.4), rgba(var(--dream-color-warning-rgb), 0.7));
    box-shadow: 0 0 10px rgba(var(--dream-color-warning-rgb), 0.25);
  }

  &--danger .d-glass-progress__bar {
    background: linear-gradient(90deg, rgba(var(--dream-color-danger-rgb), 0.4), rgba(var(--dream-color-danger-rgb), 0.7));
    box-shadow: 0 0 10px rgba(var(--dream-color-danger-rgb), 0.25);
  }

  &--info .d-glass-progress__bar {
    background: linear-gradient(90deg, rgba(var(--dream-color-info-rgb), 0.4), rgba(var(--dream-color-info-rgb), 0.7));
    box-shadow: 0 0 10px rgba(var(--dream-color-info-rgb), 0.25);
  }

  &--default .d-glass-progress__bar {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.45));
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
  }
}
</style>
