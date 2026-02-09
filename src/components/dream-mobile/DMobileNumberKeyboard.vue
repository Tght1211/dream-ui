<template>
  <Teleport to="body">
    <Transition name="d-mobile-keyboard">
      <div
        v-if="modelValue"
        class="d-mobile-number-keyboard"
        :style="{ zIndex }"
      >
        <div v-if="title || showClose" class="d-mobile-number-keyboard__header">
          <span class="d-mobile-number-keyboard__title">{{ title }}</span>
          <span v-if="showClose" class="d-mobile-number-keyboard__close" @click="close">完成</span>
        </div>
        <div class="d-mobile-number-keyboard__body">
          <div
            v-for="key in keys"
            :key="key.text"
            :class="[
              'd-mobile-number-keyboard__key',
              {
                'd-mobile-number-keyboard__key--large': key.wider,
                'd-mobile-number-keyboard__key--confirm': key.type === 'confirm',
                'd-mobile-number-keyboard__key--delete': key.type === 'delete',
              }
            ]"
            @touchstart.prevent="handlePress(key)"
          >
            <span v-if="key.type === 'delete'">&#9003;</span>
            <span v-else-if="key.type === 'confirm'">{{ confirmText }}</span>
            <span v-else>{{ key.text }}</span>
          </div>
        </div>
        <div class="d-mobile-number-keyboard__safe-area" />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
/**
 * DMobileNumberKeyboard - 移动端数字键盘
 * 玻璃拟态风格的虚拟数字键盘
 * @author buchi
 * @since 2026-02-09
 */
import { computed } from 'vue'

defineOptions({ name: 'DMobileNumberKeyboard' })

interface KeyConfig {
  text: string
  type?: 'number' | 'delete' | 'extra' | 'confirm'
  wider?: boolean
}

interface Props {
  /** 是否显示 */
  modelValue?: boolean
  /** 标题 */
  title?: string
  /** 额外按键（左下角） */
  extraKey?: string
  /** 显示关闭按钮 */
  showClose?: boolean
  /** 确认按钮文字 */
  confirmText?: string
  /** z-index */
  zIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  extraKey: '',
  showClose: true,
  confirmText: '',
  zIndex: 500,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  input: [key: string]
  delete: []
  confirm: []
  close: []
}>()

const keys = computed<KeyConfig[]>(() => {
  const baseKeys: KeyConfig[] = [
    { text: '1' }, { text: '2' }, { text: '3' },
    { text: '4' }, { text: '5' }, { text: '6' },
    { text: '7' }, { text: '8' }, { text: '9' },
  ]

  if (props.confirmText) {
    // 带确认按钮布局
    baseKeys.push(
      { text: props.extraKey || '', type: 'extra' },
      { text: '0' },
      { text: '', type: 'delete' },
      { text: props.confirmText, type: 'confirm' },
    )
  } else {
    baseKeys.push(
      { text: props.extraKey || '', type: 'extra', wider: !props.extraKey },
      { text: '0', wider: !props.extraKey },
      { text: '', type: 'delete' },
    )
  }

  return baseKeys
})

const handlePress = (key: KeyConfig) => {
  if (key.type === 'delete') {
    emit('delete')
  } else if (key.type === 'confirm') {
    emit('confirm')
    close()
  } else if (key.type === 'extra' && !key.text) {
    // 空按键，不响应
    return
  } else {
    emit('input', key.text)
  }
}

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style scoped lang="scss">
.d-mobile-number-keyboard {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(40px) saturate(1.2);
  -webkit-backdrop-filter: blur(40px) saturate(1.2);
  background: rgba(255, 255, 255, 0.06);
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    inset 0 0 30px rgba(255, 255, 255, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 0 2px 0 rgba(255, 255, 255, 0.20),
    0 0 20px rgba(255, 255, 255, 0.06),
    0 -8px 30px rgba(0, 0, 0, 0.15);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px var(--dream-mobile-padding);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  &__title {
    font-size: var(--dream-mobile-text-base);
    color: var(--dream-text-secondary);
  }

  &__close {
    font-size: var(--dream-mobile-text-base);
    color: var(--dream-color-primary);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:active {
      opacity: var(--dream-mobile-active-opacity);
    }
  }

  &__body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    padding: 6px;
  }

  &__key {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    font-size: 22px;
    font-weight: var(--dream-font-medium);
    color: var(--dream-text-primary);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    background: var(--dream-bg-secondary);
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: var(--dream-radius-sm);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: all 0.1s ease;
    user-select: none;
    box-shadow:
      inset 0 0 8px rgba(255, 255, 255, 0.02),
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 0 1px 0 rgba(255, 255, 255, 0.10),
      0 2px 8px rgba(0, 0, 0, 0.12);

    &:active {
      background: var(--dream-bg-elevated);
      transform: scale(0.96);
      box-shadow:
        inset 0 0 12px rgba(255, 255, 255, 0.04),
        inset 0 1px 0 rgba(255, 255, 255, 0.12),
        0 0 1px 0 rgba(255, 255, 255, 0.20);
    }

    &--large {
      grid-column: span 2;
    }

    &--delete {
      font-size: 24px;
    }

    &--confirm {
      grid-row: span 2;
      background: rgba(var(--dream-color-primary-rgb), 0.15);
      border-color: rgba(var(--dream-color-primary-rgb), 0.25);
      color: var(--dream-color-primary);
      font-size: var(--dream-mobile-text-lg);
      box-shadow:
        inset 0 0 12px rgba(var(--dream-color-primary-rgb), 0.05),
        0 0 1px rgba(var(--dream-color-primary-rgb), 0.20),
        0 0 12px rgba(var(--dream-color-primary-rgb), 0.08),
        0 2px 8px rgba(0, 0, 0, 0.12);

      &:active {
        background: rgba(var(--dream-color-primary-rgb), 0.25);
      }
    }
  }

  &__safe-area {
    height: var(--dream-safe-bottom);
  }
}

/* 过渡动画 */
.d-mobile-keyboard-enter-active,
.d-mobile-keyboard-leave-active {
  transition: transform var(--dream-mobile-transition);
}
.d-mobile-keyboard-enter-from,
.d-mobile-keyboard-leave-to {
  transform: translateY(100%);
}
</style>
