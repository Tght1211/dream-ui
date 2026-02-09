<template>
  <Transition name="d-mobile-backtop">
    <div
      v-show="visible"
      :class="['d-mobile-backtop', { 'd-mobile-backtop--pressing': pressing }]"
      :style="[glassVars, positionStyle]"
      v-bind="touchHandlers"
      @click="scrollToTop"
    >
      <slot>
        <span class="d-mobile-backtop__icon">&#8679;</span>
      </slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
/**
 * DMobileBackTop - 移动端返回顶部
 * 当页面滚动到一定距离时显示
 * @author buchi
 * @since 2026-02-09
 */
import { ref, computed, onMounted, onBeforeUnmount, type CSSProperties } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'
import { useTouchFeedback } from '../../composables/useTouchFeedback'

defineOptions({ name: 'DMobileBackTop' })

interface Props extends GlassCustomProps {
  /** 滚动距离阈值 */
  visibilityHeight?: number
  /** 距底部位置 */
  bottom?: number
  /** 距右侧位置 */
  right?: number
  /** z-index */
  zIndex?: number
  /** 滚动目标（选择器或元素） */
  target?: string
}

const props = withDefaults(defineProps<Props>(), {
  visibilityHeight: 200,
  bottom: 80,
  right: 16,
  zIndex: 100,
  target: '',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const { glassVars } = useGlassStyle(props)
const { pressing, touchHandlers } = useTouchFeedback()

const visible = ref(false)
let scrollTarget: HTMLElement | Window = window

const positionStyle = computed<CSSProperties>(() => ({
  right: `${props.right}px`,
  bottom: `${props.bottom}px`,
  zIndex: props.zIndex,
}))

const handleScroll = () => {
  const scrollTop = scrollTarget instanceof Window
    ? document.documentElement.scrollTop || document.body.scrollTop
    : scrollTarget.scrollTop
  visible.value = scrollTop >= props.visibilityHeight
}

const scrollToTop = (e: MouseEvent) => {
  const target = scrollTarget instanceof Window ? document.documentElement : scrollTarget
  target.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  emit('click', e)
}

onMounted(() => {
  if (props.target) {
    const el = document.querySelector(props.target)
    if (el) scrollTarget = el as HTMLElement
  }
  (scrollTarget as HTMLElement | Window).addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  (scrollTarget as HTMLElement | Window).removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.d-mobile-backtop {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  backdrop-filter: blur(24px) saturate(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.1);
  background: var(--_glass-bg, var(--dream-bg-secondary));
  border: 1px solid var(--_glass-border, var(--dream-border-default));
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: all var(--dream-mobile-transition-fast);
  box-shadow:
    inset 0 0 15px rgba(255, 255, 255, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.20)),
    0 0 15px rgba(255, 255, 255, 0.04),
    0 0 30px rgba(255, 255, 255, 0.02),
    0 4px 20px rgba(0, 0, 0, 0.20);

  &--pressing {
    transform: scale(0.92);
    background: var(--dream-bg-elevated);
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 0 1px 0 rgba(255, 255, 255, 0.30),
      0 0 12px rgba(255, 255, 255, 0.06);
  }

  &__icon {
    font-size: 22px;
    color: var(--dream-text-primary);
    line-height: 1;
  }
}

.d-mobile-backtop-enter-active,
.d-mobile-backtop-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.d-mobile-backtop-enter-from,
.d-mobile-backtop-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
