<template>
  <div :class="['d-mobile-loading', { 'd-mobile-loading--vertical': vertical }]" :style="glassVars">
    <svg class="d-mobile-loading__spinner" :style="spinnerStyle" viewBox="0 0 30 30">
      <circle
        cx="15" cy="15" r="12"
        fill="none"
        stroke="currentColor"
        :stroke-width="strokeWidth"
        stroke-dasharray="56 20"
        stroke-linecap="round"
      />
    </svg>
    <span v-if="text || $slots.default" class="d-mobile-loading__text">
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileLoading - 移动端加载指示器
 * @author buchi
 * @since 2026-02-09
 */
import { computed } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileLoading' })

interface Props extends GlassCustomProps {
  text?: string
  size?: number
  vertical?: boolean
  color?: string
  strokeWidth?: number
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  size: 24,
  vertical: false,
  color: '',
  strokeWidth: 2.5,
})

const { glassVars } = useGlassStyle(props)

const spinnerStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  ...(props.color ? { color: props.color } : {}),
}))
</script>

<style scoped lang="scss">
.d-mobile-loading {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--dream-text-secondary);

  &--vertical {
    flex-direction: column;
    gap: 6px;
  }

  &__spinner {
    animation: loading-spin 0.8s linear infinite;
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.15));
  }

  &__text {
    font-size: var(--dream-mobile-text-sm);
    color: inherit;
  }
}

@keyframes loading-spin {
  to { transform: rotate(360deg); }
}
</style>
