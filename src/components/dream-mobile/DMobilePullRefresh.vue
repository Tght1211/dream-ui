<template>
  <div class="d-mobile-pull-refresh" ref="rootRef">
    <!-- 下拉提示区域 -->
    <div
      class="d-mobile-pull-refresh__head"
      :style="{ height: `${headHeight}px` }"
    >
      <slot name="pulling" v-if="status === 'pulling'" :distance="distance">
        <span class="d-mobile-pull-refresh__text">{{ pullingText }}</span>
      </slot>
      <slot name="loosing" v-else-if="status === 'loosing'" :distance="distance">
        <span class="d-mobile-pull-refresh__text">{{ loosingText }}</span>
      </slot>
      <slot name="loading" v-else-if="status === 'loading'">
        <span class="d-mobile-pull-refresh__loading">
          <span class="d-mobile-pull-refresh__spinner" />
          <span>{{ loadingText }}</span>
        </span>
      </slot>
      <slot name="success" v-else-if="status === 'success'">
        <span class="d-mobile-pull-refresh__text d-mobile-pull-refresh__text--success">{{ successText }}</span>
      </slot>
    </div>
    <!-- 内容区域 -->
    <div
      class="d-mobile-pull-refresh__track"
      :style="{
        transform: `translateY(${distance}px)`,
        transition: !dragging ? 'transform var(--dream-mobile-transition)' : 'none',
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobilePullRefresh - 移动端下拉刷新
 * 支持下拉触发刷新操作
 * @author buchi
 * @since 2026-02-09
 */
import { ref, watch } from 'vue'

defineOptions({ name: 'DMobilePullRefresh' })

type PullRefreshStatus = 'normal' | 'pulling' | 'loosing' | 'loading' | 'success'

interface Props {
  /** 是否正在刷新 */
  modelValue?: boolean
  /** 下拉提示文字 */
  pullingText?: string
  /** 释放提示文字 */
  loosingText?: string
  /** 加载中文字 */
  loadingText?: string
  /** 成功文字 */
  successText?: string
  /** 成功提示持续时间 */
  successDuration?: number
  /** 触发刷新的下拉距离 */
  pullDistance?: number
  /** 顶部内容高度 */
  headHeight?: number
  /** 禁用 */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  pullingText: '下拉即可刷新...',
  loosingText: '释放即可刷新...',
  loadingText: '加载中...',
  successText: '刷新成功',
  successDuration: 500,
  pullDistance: 50,
  headHeight: 50,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  refresh: []
}>()

const rootRef = ref<HTMLElement>()
const status = ref<PullRefreshStatus>('normal')
const distance = ref(0)
const dragging = ref(false)

let startY = 0
let reachTop = false

const isTouchable = () => {
  return !props.disabled && status.value !== 'loading' && status.value !== 'success'
}

const ease = (d: number) => {
  // 阻尼效果
  const max = props.pullDistance * 2.5
  if (d > max) return max
  if (d > props.pullDistance) {
    return props.pullDistance + (d - props.pullDistance) * 0.4
  }
  return d
}

const checkPosition = () => {
  // 判断是否滚动到顶部
  const el = rootRef.value
  if (!el) return false
  // 检查自身或最近可滚动父元素
  let scrollParent: HTMLElement | null = el
  while (scrollParent) {
    if (scrollParent.scrollTop > 0) return false
    scrollParent = scrollParent.parentElement
  }
  return true
}

const onTouchStart = (e: TouchEvent) => {
  if (!isTouchable()) return
  reachTop = checkPosition()
  startY = e.touches[0]!.clientY
  dragging.value = true
}

const onTouchMove = (e: TouchEvent) => {
  if (!isTouchable() || !dragging.value) return
  if (!reachTop) {
    reachTop = checkPosition()
    if (!reachTop) return
    startY = e.touches[0]!.clientY
  }

  const deltaY = e.touches[0]!.clientY - startY
  if (deltaY <= 0) {
    distance.value = 0
    status.value = 'normal'
    return
  }

  // 阻止默认滚动
  e.preventDefault()
  distance.value = ease(deltaY)
  status.value = distance.value >= props.pullDistance ? 'loosing' : 'pulling'
}

const onTouchEnd = () => {
  dragging.value = false
  if (!isTouchable()) return

  if (status.value === 'loosing') {
    status.value = 'loading'
    distance.value = props.headHeight
    emit('update:modelValue', true)
    emit('refresh')
  } else {
    distance.value = 0
    status.value = 'normal'
  }
}

// 监听 modelValue 变化（外部结束刷新）
watch(() => props.modelValue, (val) => {
  if (!val && status.value === 'loading') {
    status.value = 'success'
    setTimeout(() => {
      distance.value = 0
      status.value = 'normal'
    }, props.successDuration)
  }
})

// 绑定事件（使用 passive: false 以便 preventDefault）
const bindEvents = () => {
  const el = rootRef.value
  if (!el) return
  el.addEventListener('touchstart', onTouchStart as EventListener, { passive: true })
  el.addEventListener('touchmove', onTouchMove as EventListener, { passive: false })
  el.addEventListener('touchend', onTouchEnd as EventListener, { passive: true })
}

const unbindEvents = () => {
  const el = rootRef.value
  if (!el) return
  el.removeEventListener('touchstart', onTouchStart as EventListener)
  el.removeEventListener('touchmove', onTouchMove as EventListener)
  el.removeEventListener('touchend', onTouchEnd as EventListener)
}

import { onMounted, onBeforeUnmount } from 'vue'
onMounted(bindEvents)
onBeforeUnmount(unbindEvents)
</script>

<style scoped lang="scss">
.d-mobile-pull-refresh {
  overflow: hidden;
  user-select: none;

  &__head {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    transform: translateY(-100%);
  }

  &__track {
    position: relative;
  }

  &__text {
    font-size: var(--dream-mobile-text-sm);
    color: var(--dream-text-secondary);
    padding-bottom: 12px;

    &--success {
      color: var(--dream-color-success);
    }
  }

  &__loading {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--dream-mobile-text-sm);
    color: var(--dream-text-secondary);
    padding-bottom: 12px;
  }

  &__spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.12);
    border-top-color: var(--dream-color-primary);
    border-radius: 50%;
    animation: pr-spin 0.8s linear infinite;
    box-shadow:
      0 0 8px var(--dream-color-primary-glow),
      0 0 4px rgba(255, 255, 255, 0.10);
  }
}

@keyframes pr-spin {
  to { transform: rotate(360deg); }
}
</style>
