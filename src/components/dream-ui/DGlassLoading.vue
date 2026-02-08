<template>
  <div :class="['d-glass-loading', `d-glass-loading--${size}`]" :style="glassVars">
    <div v-if="type === 'spinner'" class="d-glass-loading__spinner">
      <div v-for="n in 3" :key="n" class="d-glass-loading__dot" />
    </div>
    <div v-else-if="type === 'skeleton'" class="d-glass-loading__skeleton">
      <div v-for="n in lines" :key="n" class="d-glass-loading__line" :style="{ width: n === lines ? '60%' : '100%' }" />
    </div>
    <div v-else class="d-glass-loading__ring" />
    <span v-if="text" class="d-glass-loading__text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassLoading - 玻璃拟态加载/骨架屏
 * @author buchi
 * @since 2026-02-08
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassLoading' })

interface Props extends GlassCustomProps {
  type?: 'ring' | 'spinner' | 'skeleton'
  size?: 'sm' | 'md' | 'lg'
  text?: string
  lines?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'ring',
  size: 'md',
  text: '',
  lines: 3,
})

const { glassVars } = useGlassStyle(props)
</script>

<style scoped lang="scss">
.d-glass-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dream-space-md);

  &__text {
    font-size: var(--dream-text-sm);
    color: var(--dream-text-tertiary);
  }

  /* Ring */
  &__ring {
    border: 2px solid rgba(255,255,255,0.10);
    border-top-color: rgba(255,255,255,0.60);
    border-radius: 50%;
    animation: ring-spin 0.8s linear infinite;
    box-shadow: 0 0 10px rgba(255,255,255,0.05);
  }

  &--sm .d-glass-loading__ring { width: 20px; height: 20px; }
  &--md .d-glass-loading__ring { width: 32px; height: 32px; }
  &--lg .d-glass-loading__ring { width: 44px; height: 44px; }

  /* Spinner dots */
  &__spinner {
    display: flex;
    gap: 6px;
  }

  &__dot {
    border-radius: 50%;
    background: rgba(255,255,255,0.50);
    animation: dot-bounce 1.2s ease-in-out infinite;
    box-shadow: 0 0 6px rgba(255,255,255,0.15);

    &:nth-child(2) { animation-delay: 0.15s; }
    &:nth-child(3) { animation-delay: 0.3s; }
  }

  &--sm .d-glass-loading__dot { width: 6px; height: 6px; }
  &--md .d-glass-loading__dot { width: 8px; height: 8px; }
  &--lg .d-glass-loading__dot { width: 10px; height: 10px; }

  /* Skeleton */
  &__skeleton {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--dream-space-sm);
  }

  &__line {
    height: 12px;
    border-radius: var(--dream-radius-sm);
    background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
    background-size: 200% 100%;
    animation: skeleton-shimmer 1.5s ease-in-out infinite;
  }
}

@keyframes ring-spin { to { transform: rotate(360deg); } }

@keyframes dot-bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
  40% { transform: scale(1); opacity: 1; }
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
