<template>
  <div :class="['d-glass-divider', `d-glass-divider--${direction}`, `d-glass-divider--${variant}`]">
    <span v-if="$slots.default" class="d-glass-divider__text">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassDivider - 玻璃拟态分割线
 * @author buchi
 * @since 2026-02-08
 */
defineOptions({ name: 'DGlassDivider' })

interface Props {
  direction?: 'horizontal' | 'vertical'
  variant?: 'default' | 'light' | 'glow'
}

withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  variant: 'default',
})
</script>

<style scoped lang="scss">
.d-glass-divider {
  &--horizontal {
    display: flex;
    align-items: center;
    width: 100%;
    margin: var(--dream-space-lg) 0;

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
    }
  }

  &--vertical {
    display: inline-flex;
    width: 1px;
    align-self: stretch;
    min-height: 20px;
    margin: 0 var(--dream-space-md);
  }

  /* Variants */
  &--default {
    &::before, &::after { background: rgba(255, 255, 255, 0.10); }
    &.d-glass-divider--vertical { background: rgba(255, 255, 255, 0.10); }
  }

  &--light {
    &::before, &::after { background: rgba(255, 255, 255, 0.05); }
    &.d-glass-divider--vertical { background: rgba(255, 255, 255, 0.05); }
  }

  &--glow {
    &::before, &::after {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      height: 1px;
      box-shadow: 0 0 8px rgba(255,255,255,0.06);
    }
    &.d-glass-divider--vertical {
      background: linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent);
      box-shadow: 0 0 8px rgba(255,255,255,0.06);
    }
  }

  &__text {
    padding: 0 var(--dream-space-lg);
    font-size: var(--dream-text-xs);
    color: var(--dream-text-tertiary);
    white-space: nowrap;
  }
}
</style>
