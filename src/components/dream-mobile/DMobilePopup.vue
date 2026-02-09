<template>
  <Teleport to="body">
    <Transition name="d-mobile-overlay">
      <div
        v-if="modelValue"
        class="d-mobile-popup__overlay"
        :style="{ zIndex }"
        @click="handleOverlayClick"
      />
    </Transition>
    <Transition :name="transitionName">
      <div
        v-if="modelValue"
        :class="[
          'd-mobile-popup',
          `d-mobile-popup--${position}`,
          { 'd-mobile-popup--round': round }
        ]"
        :style="[glassVars, { zIndex: zIndex + 1 }]"
      >
        <div v-if="closeable" class="d-mobile-popup__close" @click="close">&#10005;</div>
        <slot />
        <div v-if="safeBottom && position === 'bottom'" class="d-mobile-popup__safe-area" />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
/**
 * DMobilePopup - 移动端弹出层
 * 支持上/下/左/右/居中弹出，玻璃拟态背景
 * @author buchi
 * @since 2026-02-09
 */
import { computed } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobilePopup' })

interface Props extends GlassCustomProps {
  /** 是否显示 */
  modelValue?: boolean
  /** 弹出位置 */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  /** 圆角 */
  round?: boolean
  /** 显示关闭按钮 */
  closeable?: boolean
  /** 点击遮罩关闭 */
  closeOnClickOverlay?: boolean
  /** z-index */
  zIndex?: number
  /** 底部安全区域 */
  safeBottom?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  position: 'bottom',
  round: true,
  closeable: false,
  closeOnClickOverlay: true,
  zIndex: 400,
  safeBottom: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const { glassVars } = useGlassStyle(props)

const transitionName = computed(() => {
  const map: Record<string, string> = {
    top: 'd-mobile-popup-top',
    bottom: 'd-mobile-popup-bottom',
    left: 'd-mobile-popup-left',
    right: 'd-mobile-popup-right',
    center: 'd-mobile-popup-center',
  }
  return map[props.position]
})

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnClickOverlay) {
    close()
  }
}
</script>

<style scoped lang="scss">
.d-mobile-popup {
  position: fixed;
  backdrop-filter: blur(40px) saturate(1.2);
  -webkit-backdrop-filter: blur(40px) saturate(1.2);
  background: var(--_glass-bg, rgba(255, 255, 255, 0.06));
  border: 1px solid var(--_glass-border, rgba(255, 255, 255, 0.18));
  box-shadow:
    inset 0 0 30px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    0 0 2px 0 var(--_glass-glow, rgba(255, 255, 255, 0.25)),
    0 0 20px rgba(255, 255, 255, 0.06),
    0 0 60px rgba(255, 255, 255, 0.03),
    0 20px 60px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &--bottom {
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 80vh;
    border-bottom: none;
    border-left: none;
    border-right: none;
  }

  &--top {
    top: 0;
    left: 0;
    right: 0;
    max-height: 80vh;
    border-top: none;
    border-left: none;
    border-right: none;
  }

  &--left {
    top: 0;
    bottom: 0;
    left: 0;
    max-width: 80vw;
    border-left: none;
  }

  &--right {
    top: 0;
    bottom: 0;
    right: 0;
    max-width: 80vw;
    border-right: none;
  }

  &--center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: calc(100vw - 48px);
    max-height: 80vh;
    border-radius: var(--dream-radius-lg);
  }

  &--round {
    &.d-mobile-popup--bottom {
      border-radius: var(--dream-radius-lg) var(--dream-radius-lg) 0 0;
    }
    &.d-mobile-popup--top {
      border-radius: 0 0 var(--dream-radius-lg) var(--dream-radius-lg);
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--dream-bg-overlay);
    backdrop-filter: blur(2px);
  }

  &__close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: var(--dream-text-tertiary);
    cursor: pointer;
    border-radius: 50%;
    -webkit-tap-highlight-color: transparent;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all var(--dream-mobile-transition-fast);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.04);

    &:active {
      background: rgba(255, 255, 255, 0.10);
      border-color: rgba(255, 255, 255, 0.15);
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.08);
    }
  }

  &__safe-area {
    height: var(--dream-safe-bottom);
  }
}

/* ========== 过渡动画 ========== */
.d-mobile-overlay-enter-active,
.d-mobile-overlay-leave-active {
  transition: opacity var(--dream-mobile-transition);
}
.d-mobile-overlay-enter-from,
.d-mobile-overlay-leave-to {
  opacity: 0;
}

.d-mobile-popup-bottom-enter-active,
.d-mobile-popup-bottom-leave-active {
  transition: transform var(--dream-mobile-transition);
}
.d-mobile-popup-bottom-enter-from,
.d-mobile-popup-bottom-leave-to {
  transform: translateY(100%);
}

.d-mobile-popup-top-enter-active,
.d-mobile-popup-top-leave-active {
  transition: transform var(--dream-mobile-transition);
}
.d-mobile-popup-top-enter-from,
.d-mobile-popup-top-leave-to {
  transform: translateY(-100%);
}

.d-mobile-popup-left-enter-active,
.d-mobile-popup-left-leave-active {
  transition: transform var(--dream-mobile-transition);
}
.d-mobile-popup-left-enter-from,
.d-mobile-popup-left-leave-to {
  transform: translateX(-100%);
}

.d-mobile-popup-right-enter-active,
.d-mobile-popup-right-leave-active {
  transition: transform var(--dream-mobile-transition);
}
.d-mobile-popup-right-enter-from,
.d-mobile-popup-right-leave-to {
  transform: translateX(100%);
}

.d-mobile-popup-center-enter-active,
.d-mobile-popup-center-leave-active {
  transition: all var(--dream-mobile-transition);
}
.d-mobile-popup-center-enter-from,
.d-mobile-popup-center-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.85);
}
</style>
