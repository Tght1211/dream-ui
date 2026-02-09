<template>
  <div v-if="loading" class="d-mobile-skeleton" :class="{ 'd-mobile-skeleton--animate': animate }">
    <!-- 头像 -->
    <div
      v-if="avatar"
      :class="[
        'd-mobile-skeleton__avatar',
        `d-mobile-skeleton__avatar--${avatarShape}`,
        `d-mobile-skeleton__avatar--${avatarSize}`
      ]"
    />
    <!-- 内容行 -->
    <div class="d-mobile-skeleton__content">
      <div v-if="title" class="d-mobile-skeleton__title" />
      <div
        v-for="i in row"
        :key="i"
        class="d-mobile-skeleton__row"
        :style="{ width: getRowWidth(i) }"
      />
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
/**
 * DMobileSkeleton - 移动端骨架屏
 * 内容加载占位，玻璃拟态风格
 * @author buchi
 * @since 2026-02-09
 */
defineOptions({ name: 'DMobileSkeleton' })

interface Props {
  /** 是否加载中 */
  loading?: boolean
  /** 显示头像占位 */
  avatar?: boolean
  /** 头像形状 */
  avatarShape?: 'circle' | 'square'
  /** 头像大小 */
  avatarSize?: 'sm' | 'md' | 'lg'
  /** 显示标题占位 */
  title?: boolean
  /** 行数 */
  row?: number
  /** 行宽 */
  rowWidth?: (string | number)[]
  /** 动画 */
  animate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: true,
  avatar: false,
  avatarShape: 'circle',
  avatarSize: 'md',
  title: false,
  row: 3,
  rowWidth: () => [],
  animate: true,
})

const getRowWidth = (index: number): string => {
  const width = props.rowWidth[index - 1]
  if (width) {
    return typeof width === 'number' ? `${width}px` : width
  }
  // 最后一行默认 60% 宽度
  if (index === props.row) return '60%'
  return '100%'
}
</script>

<style scoped lang="scss">
.d-mobile-skeleton {
  display: flex;
  gap: 16px;
  padding: var(--dream-mobile-padding);

  &__avatar {
    flex-shrink: 0;
    background: var(--dream-bg-secondary);
    border: 1px solid rgba(255, 255, 255, 0.10);
    box-shadow:
      inset 0 0 8px rgba(255, 255, 255, 0.02),
      0 0 1px rgba(255, 255, 255, 0.10);

    &--circle {
      border-radius: 50%;
    }
    &--square {
      border-radius: var(--dream-radius-sm);
    }

    &--sm {
      width: 32px;
      height: 32px;
    }
    &--md {
      width: 48px;
      height: 48px;
    }
    &--lg {
      width: 64px;
      height: 64px;
    }
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__title {
    width: 40%;
    height: 18px;
    background: var(--dream-bg-secondary);
    border-radius: var(--dream-radius-sm);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow:
      inset 0 0 6px rgba(255, 255, 255, 0.02),
      0 0 1px rgba(255, 255, 255, 0.08);
  }

  &__row {
    height: 14px;
    background: var(--dream-bg-secondary);
    border-radius: var(--dream-radius-sm);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow:
      inset 0 0 6px rgba(255, 255, 255, 0.02),
      0 0 1px rgba(255, 255, 255, 0.08);
  }

  /* 闪烁动画 */
  &--animate {
    .d-mobile-skeleton__avatar,
    .d-mobile-skeleton__title,
    .d-mobile-skeleton__row {
      animation: skeleton-shimmer 1.5s infinite ease-in-out;
      background: linear-gradient(
        90deg,
        var(--dream-bg-secondary) 25%,
        var(--dream-bg-elevated) 50%,
        var(--dream-bg-secondary) 75%
      );
      background-size: 200% 100%;
    }
  }
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
