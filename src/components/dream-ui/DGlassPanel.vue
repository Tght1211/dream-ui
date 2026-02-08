<template>
  <div :class="['d-glass-panel', { 'd-glass-panel--bordered': bordered }]" :style="glassVars">
    <div v-if="title" class="d-glass-panel__header">
      <h3 class="d-glass-panel__title">{{ title }}</h3>
      <div v-if="$slots.extra" class="d-glass-panel__extra">
        <slot name="extra" />
      </div>
    </div>
    <div class="d-glass-panel__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassPanel - 玻璃拟态面板组件
 * @author buchi
 * @since 2026-02-08
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassPanel' })

interface Props extends GlassCustomProps {
  title?: string
  bordered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  bordered: true,
})

const { glassVars } = useGlassStyle(props)
</script>

<style scoped lang="scss">
.d-glass-panel {
  backdrop-filter: blur(24px) saturate(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.1);
  background: var(--_glass-bg, var(--dream-bg-primary));
  border-radius: var(--dream-radius-lg);
  transition: all var(--dream-transition-base);

  /* 白色光晕边框 */
  box-shadow:
    inset 0 0 20px rgba(255, 255, 255, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.15)),
    0 0 15px rgba(255, 255, 255, 0.03),
    0 8px 32px rgba(0, 0, 0, 0.20);

  &--bordered {
    border: 1px solid var(--_glass-border, var(--dream-border-default));
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--dream-space-lg) var(--dream-space-xl);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  &__title {
    font-size: var(--dream-text-lg);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
    margin: 0;
  }

  &__extra {
    display: flex;
    align-items: center;
    gap: var(--dream-space-sm);
  }

  &__body {
    padding: var(--dream-space-xl);
  }
}
</style>
