<template>
  <div class="d-mobile-cell-group" :style="glassVars">
    <div v-if="title || $slots.title" class="d-mobile-cell-group__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="d-mobile-cell-group__body" :class="{ 'd-mobile-cell-group__body--inset': inset }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileCellGroup - 移动端单元格分组
 * 为 Cell 提供玻璃拟态容器和分组标题
 * @author buchi
 * @since 2026-02-09
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileCellGroup' })

interface Props extends GlassCustomProps {
  /** 分组标题 */
  title?: string
  /** 内嵌模式（带圆角和间距） */
  inset?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  inset: false,
})

const { glassVars } = useGlassStyle(props)
</script>

<style scoped lang="scss">
.d-mobile-cell-group {
  &__title {
    padding: 16px var(--dream-mobile-padding) 8px;
    color: var(--dream-text-tertiary);
    font-size: var(--dream-mobile-text-sm);
  }

  &__body {
    backdrop-filter: blur(24px) saturate(1.1);
    -webkit-backdrop-filter: blur(24px) saturate(1.1);
    background: var(--_glass-bg, var(--dream-bg-primary));
    border-top: 1px solid var(--_glass-border, var(--dream-border-default));
    border-bottom: 1px solid var(--_glass-border, var(--dream-border-default));
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.12),
      0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.20)),
      0 0 15px rgba(255, 255, 255, 0.04),
      0 4px 16px rgba(0, 0, 0, 0.15);

    &--inset {
      margin: 0 var(--dream-mobile-padding);
      border-radius: var(--dream-radius-md);
      border: 1px solid var(--_glass-border, var(--dream-border-default));
      overflow: hidden;
    }

    /* 最后一个 cell 去掉底部分割线 */
    :deep(.d-mobile-cell:last-child::after) {
      display: none;
    }
  }
}
</style>
