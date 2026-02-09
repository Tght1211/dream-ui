<template>
  <div
    v-if="!closed"
    :class="[
      'd-mobile-notice-bar',
      `d-mobile-notice-bar--${mode}`,
      { 'd-mobile-notice-bar--scrollable': scrollable }
    ]"
    :style="glassVars"
    @click="$emit('click', $event)"
  >
    <div v-if="$slots.icon || leftIcon" class="d-mobile-notice-bar__icon">
      <slot name="icon">{{ leftIcon }}</slot>
    </div>
    <div class="d-mobile-notice-bar__content" ref="contentRef">
      <div
        ref="textRef"
        class="d-mobile-notice-bar__text"
        :style="scrollable && needScroll ? scrollStyle : {}"
      >
        <slot>{{ text }}</slot>
      </div>
    </div>
    <div v-if="mode === 'closeable'" class="d-mobile-notice-bar__close" @click.stop="handleClose">&#10005;</div>
    <div v-else-if="mode === 'link'" class="d-mobile-notice-bar__arrow">&#8250;</div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileNoticeBar - 移动端通知栏
 * 滚动公告、消息提示
 * @author buchi
 * @since 2026-02-09
 */
import { ref, onMounted, computed, nextTick, type CSSProperties } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileNoticeBar' })

interface Props extends GlassCustomProps {
  /** 通知文字 */
  text?: string
  /** 模式：可关闭 / 链接 */
  mode?: '' | 'closeable' | 'link'
  /** 是否可滚动 */
  scrollable?: boolean
  /** 左侧图标 */
  leftIcon?: string
  /** 滚动速度（px/s） */
  speed?: number
  /** 滚动间隔 */
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  mode: '',
  scrollable: true,
  leftIcon: '📢',
  speed: 60,
  delay: 1,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  close: []
}>()

const { glassVars } = useGlassStyle(props)

const closed = ref(false)
const contentRef = ref<HTMLElement>()
const textRef = ref<HTMLElement>()
const needScroll = ref(false)
const animationDuration = ref(0)

const scrollStyle = computed<CSSProperties>(() => ({
  animation: `dream-mobile-notice-scroll ${animationDuration.value}s linear ${props.delay}s infinite`,
}))

const checkScroll = async () => {
  await nextTick()
  if (!contentRef.value || !textRef.value) return
  const contentWidth = contentRef.value.offsetWidth
  const textWidth = textRef.value.scrollWidth
  if (textWidth > contentWidth) {
    needScroll.value = true
    animationDuration.value = textWidth / props.speed
  }
}

onMounted(checkScroll)

const handleClose = () => {
  closed.value = true
  emit('close')
}
</script>

<style scoped lang="scss">
.d-mobile-notice-bar {
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 8px var(--dream-mobile-padding);
  backdrop-filter: blur(20px) saturate(1.1);
  -webkit-backdrop-filter: blur(20px) saturate(1.1);
  background: var(--_glass-bg, rgba(var(--dream-color-warning-rgb), 0.06));
  border: 1px solid rgba(var(--dream-color-warning-rgb), 0.15);
  box-shadow:
    inset 0 0 15px rgba(var(--dream-color-warning-rgb), 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 1px 0 var(--_glass-glow, rgba(var(--dream-color-warning-rgb), 0.12)),
    0 0 10px rgba(var(--dream-color-warning-rgb), 0.04),
    0 4px 12px rgba(0, 0, 0, 0.12);

  &__icon {
    flex-shrink: 0;
    margin-right: 8px;
    font-size: 16px;
  }

  &__content {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
  }

  &__text {
    display: inline-block;
    font-size: var(--dream-mobile-text-sm);
    color: var(--dream-color-warning);
  }

  &--scrollable &__content {
    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000 10%,
      #000 90%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0,
      #000 10%,
      #000 90%,
      transparent 100%
    );
  }

  &__close,
  &__arrow {
    flex-shrink: 0;
    margin-left: 8px;
    color: var(--dream-color-warning);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    font-size: 14px;

    &:active {
      opacity: var(--dream-mobile-active-opacity);
    }
  }

  &__arrow {
    font-size: 18px;
  }
}
</style>
