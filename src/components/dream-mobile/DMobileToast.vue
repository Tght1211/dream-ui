<template>
  <Teleport to="body">
    <Transition name="d-mobile-toast">
      <div
        v-if="visible"
        :class="['d-mobile-toast', `d-mobile-toast--${position}`]"
        :style="{ zIndex }"
      >
        <div class="d-mobile-toast__content">
          <span v-if="type === 'loading'" class="d-mobile-toast__loading" />
          <span v-else-if="type === 'success'" class="d-mobile-toast__icon d-mobile-toast__icon--success">&#10003;</span>
          <span v-else-if="type === 'fail'" class="d-mobile-toast__icon d-mobile-toast__icon--fail">&#10007;</span>
          <span class="d-mobile-toast__text">{{ message }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
/**
 * DMobileToast - 移动端轻提示
 * 居中短暂显示提示信息
 * @author buchi
 * @since 2026-02-09
 */
import { ref, watch, onUnmounted } from 'vue'

defineOptions({ name: 'DMobileToast' })

interface Props {
  /** 是否显示 */
  modelValue?: boolean
  /** 提示文字 */
  message?: string
  /** 类型 */
  type?: 'text' | 'success' | 'fail' | 'loading'
  /** 位置 */
  position?: 'top' | 'center' | 'bottom'
  /** 显示时长（ms），0 则不自动关闭 */
  duration?: number
  /** z-index */
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  message: '',
  type: 'text',
  position: 'center',
  duration: 2000,
  zIndex: 700,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const visible = ref(props.modelValue)
let timer: ReturnType<typeof setTimeout> | null = null

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

const startTimer = () => {
  clearTimer()
  if (props.duration > 0 && props.type !== 'loading') {
    timer = setTimeout(() => {
      visible.value = false
      emit('update:modelValue', false)
      emit('close')
    }, props.duration)
  }
}

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    startTimer()
  } else {
    clearTimer()
  }
})

onUnmounted(clearTimer)
</script>

<style scoped lang="scss">
.d-mobile-toast {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;

  &--top {
    top: 15%;
  }

  &--center {
    top: 45%;
  }

  &--bottom {
    bottom: 15%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 88px;
    max-width: 70vw;
    padding: 14px 18px;
    backdrop-filter: blur(40px) saturate(1.2);
    -webkit-backdrop-filter: blur(40px) saturate(1.2);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.20);
    border-radius: var(--dream-radius-md);
    box-shadow:
      inset 0 0 30px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.18),
      0 0 2px 0 rgba(255, 255, 255, 0.25),
      0 0 20px rgba(255, 255, 255, 0.06),
      0 0 60px rgba(255, 255, 255, 0.03),
      0 12px 40px rgba(0, 0, 0, 0.25);
    pointer-events: auto;
  }

  &__icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border-radius: 50%;

    &--success {
      color: var(--dream-color-success);
      text-shadow: 0 0 8px var(--dream-color-success-glow);
    }

    &--fail {
      color: var(--dream-color-danger);
      text-shadow: 0 0 8px var(--dream-color-danger-glow);
    }
  }

  &__loading {
    width: 30px;
    height: 30px;
    border: 3px solid rgba(255, 255, 255, 0.12);
    border-top-color: var(--dream-color-primary);
    border-radius: 50%;
    animation: toast-spin 0.8s linear infinite;
    box-shadow: 0 0 10px var(--dream-color-primary-glow);
  }

  &__text {
    font-size: var(--dream-mobile-text-base);
    color: var(--dream-text-primary);
    text-align: center;
    line-height: 1.4;
    word-break: break-word;
  }
}

@keyframes toast-spin {
  to { transform: rotate(360deg); }
}

/* 过渡动画 */
.d-mobile-toast-enter-active,
.d-mobile-toast-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.d-mobile-toast-enter-from,
.d-mobile-toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) scale(0.85);
}
</style>
