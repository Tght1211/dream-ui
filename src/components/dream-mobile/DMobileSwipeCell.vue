<template>
  <div class="d-mobile-swipe-cell" ref="rootRef">
    <div
      class="d-mobile-swipe-cell__wrapper"
      :style="{ transform: `translateX(${offset}px)`, transition: dragging ? 'none' : 'transform var(--dream-mobile-transition)' }"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <!-- 左侧操作区 -->
      <div v-if="$slots.left" ref="leftRef" class="d-mobile-swipe-cell__left">
        <slot name="left" />
      </div>
      <!-- 主内容 -->
      <div class="d-mobile-swipe-cell__content">
        <slot />
      </div>
      <!-- 右侧操作区 -->
      <div v-if="$slots.right" ref="rightRef" class="d-mobile-swipe-cell__right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileSwipeCell - 移动端滑动单元格
 * 左滑/右滑显示操作按钮（如删除、收藏等）
 * @author buchi
 * @since 2026-02-09
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineOptions({ name: 'DMobileSwipeCell' })

interface Props {
  /** 禁用滑动 */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  open: [position: 'left' | 'right']
  close: []
}>()

const rootRef = ref<HTMLElement>()
const leftRef = ref<HTMLElement>()
const rightRef = ref<HTMLElement>()
const offset = ref(0)
const dragging = ref(false)

let startX = 0
let startOffset = 0
let leftWidth = 0
let rightWidth = 0

const onTouchStart = (e: TouchEvent) => {
  if (props.disabled) return
  dragging.value = true
  startX = e.touches[0]!.clientX
  startOffset = offset.value
  leftWidth = leftRef.value?.offsetWidth ?? 0
  rightWidth = rightRef.value?.offsetWidth ?? 0
}

const onTouchMove = (e: TouchEvent) => {
  if (!dragging.value || props.disabled) return
  const deltaX = e.touches[0]!.clientX - startX
  let newOffset = startOffset + deltaX

  // 限制滑动范围
  const maxLeft = leftWidth
  const maxRight = -rightWidth
  newOffset = Math.max(maxRight, Math.min(maxLeft, newOffset))

  offset.value = newOffset
}

const onTouchEnd = () => {
  if (!dragging.value) return
  dragging.value = false

  // 判断是否超过阈值（操作区宽度的 30%）
  if (offset.value > 0 && offset.value > leftWidth * 0.3) {
    offset.value = leftWidth
    emit('open', 'left')
  } else if (offset.value < 0 && Math.abs(offset.value) > rightWidth * 0.3) {
    offset.value = -rightWidth
    emit('open', 'right')
  } else {
    offset.value = 0
    emit('close')
  }
}

/** 关闭滑动 */
const close = () => {
  offset.value = 0
}

// 点击外部关闭
const handleDocumentClick = (e: Event) => {
  if (offset.value !== 0 && rootRef.value && !rootRef.value.contains(e.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('touchstart', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('touchstart', handleDocumentClick)
})

defineExpose({ close })
</script>

<style scoped lang="scss">
.d-mobile-swipe-cell {
  position: relative;
  overflow: hidden;

  &__wrapper {
    position: relative;
    display: flex;
    width: 100%;
  }

  &__content {
    flex-shrink: 0;
    width: 100%;
  }

  &__left,
  &__right {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: stretch;
  }

  &__left {
    right: 100%;
  }

  &__right {
    left: 100%;
  }

  /* 操作按钮 - 玻璃态色彩按钮 */
  :deep(.d-mobile-swipe-cell__action) {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    font-size: var(--dream-mobile-text-base);
    color: var(--dream-text-primary);
    white-space: nowrap;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  :deep(.d-mobile-swipe-cell__action--danger) {
    background: rgba(var(--dream-color-danger-rgb, 248, 113, 113), 0.20);
    border-left: 1px solid rgba(var(--dream-color-danger-rgb, 248, 113, 113), 0.25);
    color: var(--dream-color-danger);
    box-shadow:
      inset 0 0 12px rgba(var(--dream-color-danger-rgb, 248, 113, 113), 0.05),
      0 0 8px rgba(var(--dream-color-danger-rgb, 248, 113, 113), 0.10);
  }

  :deep(.d-mobile-swipe-cell__action--primary) {
    background: rgba(var(--dream-color-primary-rgb), 0.20);
    border-left: 1px solid rgba(var(--dream-color-primary-rgb), 0.25);
    color: var(--dream-color-primary);
    box-shadow:
      inset 0 0 12px rgba(var(--dream-color-primary-rgb), 0.05),
      0 0 8px rgba(var(--dream-color-primary-rgb), 0.10);
  }

  :deep(.d-mobile-swipe-cell__action--warning) {
    background: rgba(var(--dream-color-warning-rgb, 251, 191, 36), 0.20);
    border-left: 1px solid rgba(var(--dream-color-warning-rgb, 251, 191, 36), 0.25);
    color: var(--dream-color-warning);
    box-shadow:
      inset 0 0 12px rgba(var(--dream-color-warning-rgb, 251, 191, 36), 0.05),
      0 0 8px rgba(var(--dream-color-warning-rgb, 251, 191, 36), 0.10);
  }
}
</style>
