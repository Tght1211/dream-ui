<template>
  <div class="d-glass-empty" :style="glassVars">
    <div class="d-glass-empty__icon">{{ icon }}</div>
    <p class="d-glass-empty__desc">{{ description }}</p>
    <div v-if="$slots.default" class="d-glass-empty__action">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassEmpty - 玻璃拟态空状态
 * @author buchi
 * @since 2026-02-08
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassEmpty' })

interface Props extends GlassCustomProps {
  icon?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: '📭',
  description: '暂无数据',
})

const { glassVars } = useGlassStyle(props)
</script>

<style scoped lang="scss">
.d-glass-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--dream-space-3xl) var(--dream-space-xl);
  text-align: center;

  &__icon {
    font-size: 48px;
    margin-bottom: var(--dream-space-lg);
    opacity: 0.6;
    filter: grayscale(0.3);
  }

  &__desc {
    font-size: var(--dream-text-sm);
    color: var(--dream-text-tertiary);
    margin: 0 0 var(--dream-space-lg);
  }
}
</style>
