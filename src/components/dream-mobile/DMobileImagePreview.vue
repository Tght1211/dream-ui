<template>
  <Teleport to="body">
    <Transition name="d-mobile-image-preview">
      <div
        v-if="modelValue"
        class="d-mobile-image-preview"
        :style="{ zIndex }"
        @click="handleClose"
      >
        <!-- 索引指示器 -->
        <div v-if="showIndex && images.length > 1" class="d-mobile-image-preview__index">
          {{ activeIndex + 1 }} / {{ images.length }}
        </div>
        <!-- 图片容器 -->
        <div
          class="d-mobile-image-preview__track"
          :style="{
            transform: `translateX(${trackOffset}px)`,
            transition: dragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <div
            v-for="(src, index) in images"
            :key="index"
            class="d-mobile-image-preview__item"
          >
            <img
              :src="src"
              class="d-mobile-image-preview__image"
              @click.stop
            />
          </div>
        </div>
        <!-- 关闭按钮 -->
        <div v-if="closeable" class="d-mobile-image-preview__close" @click.stop="handleClose">
          &#10005;
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
/**
 * DMobileImagePreview - 移动端图片预览
 * 全屏图片预览，支持左右滑动切换
 * @author buchi
 * @since 2026-02-09
 */
import { ref, computed, watch } from 'vue'

defineOptions({ name: 'DMobileImagePreview' })

interface Props {
  /** 是否显示 */
  modelValue?: boolean
  /** 图片列表 */
  images?: string[]
  /** 起始索引 */
  startPosition?: number
  /** 显示索引 */
  showIndex?: boolean
  /** 显示关闭按钮 */
  closeable?: boolean
  /** 点击关闭 */
  closeOnClick?: boolean
  /** z-index */
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  images: () => [],
  startPosition: 0,
  showIndex: true,
  closeable: true,
  closeOnClick: true,
  zIndex: 800,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [index: number]
  close: []
}>()

const activeIndex = ref(props.startPosition)
const dragging = ref(false)
const trackOffset = ref(0)

let startX = 0
let startOffset = 0

const slideWidth = computed(() => window.innerWidth)

watch(() => props.modelValue, (val) => {
  if (val) {
    activeIndex.value = props.startPosition
    trackOffset.value = -props.startPosition * slideWidth.value
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const goTo = (index: number) => {
  const target = Math.max(0, Math.min(props.images.length - 1, index))
  activeIndex.value = target
  trackOffset.value = -target * slideWidth.value
  emit('change', target)
}

const onTouchStart = (e: TouchEvent) => {
  dragging.value = true
  startX = e.touches[0].clientX
  startOffset = trackOffset.value
}

const onTouchMove = (e: TouchEvent) => {
  if (!dragging.value) return
  const delta = e.touches[0].clientX - startX
  trackOffset.value = startOffset + delta
}

const onTouchEnd = () => {
  if (!dragging.value) return
  dragging.value = false
  const delta = trackOffset.value - startOffset
  const threshold = slideWidth.value * 0.2

  if (Math.abs(delta) > threshold) {
    if (delta < 0) {
      goTo(activeIndex.value + 1)
    } else {
      goTo(activeIndex.value - 1)
    }
  } else {
    goTo(activeIndex.value)
  }
}

const handleClose = () => {
  if (props.closeOnClick) {
    emit('update:modelValue', false)
    emit('close')
  }
}
</script>

<style scoped lang="scss">
.d-mobile-image-preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;

  &__index {
    position: absolute;
    top: var(--dream-safe-top, 0);
    left: 50%;
    transform: translateX(-50%);
    padding: 8px 16px;
    font-size: var(--dream-mobile-text-base);
    color: rgba(255, 255, 255, 0.7);
    z-index: 1;
  }

  &__track {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
  }

  &__item {
    flex-shrink: 0;
    width: 100vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    user-select: none;
    -webkit-user-drag: none;
  }

  &__close {
    position: absolute;
    top: calc(var(--dream-safe-top, 0px) + 12px);
    right: 16px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--dream-text-primary);
    backdrop-filter: blur(20px) saturate(1.1);
    -webkit-backdrop-filter: blur(20px) saturate(1.1);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
    -webkit-tap-highlight-color: transparent;
    box-shadow:
      inset 0 0 10px rgba(255, 255, 255, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.10),
      0 0 1px 0 rgba(255, 255, 255, 0.15),
      0 0 10px rgba(255, 255, 255, 0.03),
      0 4px 12px rgba(0, 0, 0, 0.20);

    &:active {
      background: rgba(255, 255, 255, 0.12);
      box-shadow:
        inset 0 0 15px rgba(255, 255, 255, 0.05),
        0 0 1px 0 rgba(255, 255, 255, 0.25),
        0 0 12px rgba(255, 255, 255, 0.06);
    }
  }
}

.d-mobile-image-preview-enter-active,
.d-mobile-image-preview-leave-active {
  transition: opacity 0.3s;
}
.d-mobile-image-preview-enter-from,
.d-mobile-image-preview-leave-to {
  opacity: 0;
}
</style>
