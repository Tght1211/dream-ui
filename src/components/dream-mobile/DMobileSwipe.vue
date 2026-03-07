<template>
  <div
    class="d-mobile-swipe"
    ref="rootRef"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div
      class="d-mobile-swipe__track"
      :style="{
        width: `${count * 100}%`,
        transform: `translateX(${trackOffset}px)`,
        transition: dragging ? 'none' : `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }"
    >
      <slot />
    </div>
    <!-- 指示器 -->
    <div v-if="showIndicators && count > 1" class="d-mobile-swipe__indicators">
      <span
        v-for="i in count"
        :key="i"
        :class="[
          'd-mobile-swipe__indicator',
          { 'd-mobile-swipe__indicator--active': activeIndex === i - 1 }
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileSwipe - 移动端轮播图
 * 支持手势滑动、自动播放
 * @author buchi
 * @since 2026-02-09
 */
import { ref, computed, onMounted, onBeforeUnmount, useSlots, watch } from 'vue'

defineOptions({ name: 'DMobileSwipe' })

interface Props {
  /** 自动播放间隔（ms），0 不自动播放 */
  autoplay?: number
  /** 动画时长（ms） */
  duration?: number
  /** 初始索引 */
  initialSwipe?: number
  /** 是否循环 */
  loop?: boolean
  /** 显示指示器 */
  showIndicators?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: 3000,
  duration: 500,
  initialSwipe: 0,
  loop: true,
  showIndicators: true,
})

const emit = defineEmits<{
  change: [index: number]
}>()

const slots = useSlots()
const rootRef = ref<HTMLElement>()
const activeIndex = ref(props.initialSwipe)
const dragging = ref(false)
const trackOffset = ref(0)

let startX = 0
let startOffset = 0
let autoplayTimer: ReturnType<typeof setInterval> | null = null

const count = computed(() => {
  const defaultSlot = slots.default?.()
  return defaultSlot?.length ?? 0
})

const slideWidth = computed(() => rootRef.value?.offsetWidth ?? 0)

const goTo = (index: number) => {
  let target = index
  if (props.loop) {
    target = ((index % count.value) + count.value) % count.value
  } else {
    target = Math.max(0, Math.min(count.value - 1, index))
  }
  activeIndex.value = target
  trackOffset.value = -target * slideWidth.value
  emit('change', target)
}

const next = () => goTo(activeIndex.value + 1)
const prev = () => goTo(activeIndex.value - 1)

// 自动播放
const startAutoplay = () => {
  stopAutoplay()
  if (props.autoplay > 0 && count.value > 1) {
    autoplayTimer = setInterval(next, props.autoplay)
  }
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

// Touch
const onTouchStart = (e: TouchEvent) => {
  stopAutoplay()
  dragging.value = true
  startX = e.touches[0]!.clientX
  startOffset = trackOffset.value
}

const onTouchMove = (e: TouchEvent) => {
  if (!dragging.value) return
  const deltaX = e.touches[0]!.clientX - startX
  trackOffset.value = startOffset + deltaX
}

const onTouchEnd = () => {
  if (!dragging.value) return
  dragging.value = false
  const delta = trackOffset.value - startOffset
  const threshold = slideWidth.value * 0.2

  if (Math.abs(delta) > threshold) {
    if (delta < 0) {
      next()
    } else {
      prev()
    }
  } else {
    goTo(activeIndex.value)
  }

  startAutoplay()
}

watch(() => props.autoplay, startAutoplay)

onMounted(() => {
  goTo(props.initialSwipe)
  startAutoplay()
})

onBeforeUnmount(stopAutoplay)

defineExpose({ next, prev, goTo })
</script>

<style scoped lang="scss">
.d-mobile-swipe {
  position: relative;
  overflow: hidden;
  touch-action: pan-y;

  &__track {
    display: flex;
    height: 100%;
  }

  :deep(.d-mobile-swipe__item) {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
  }

  &__indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
  }

  &__indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.08);
    transition: all 0.3s;

    &--active {
      width: 18px;
      border-radius: 3px;
      background: var(--dream-color-primary);
      border-color: transparent;
      box-shadow:
        0 0 8px var(--dream-color-primary-glow),
        0 0 4px rgba(255, 255, 255, 0.15);
    }
  }
}
</style>
