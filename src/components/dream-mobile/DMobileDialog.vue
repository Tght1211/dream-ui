<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div v-if="modelValue" class="d-mobile-dialog-overlay" @click.self="onOverlayClick">
        <div class="d-mobile-dialog" :style="glassVars">
          <div v-if="title" class="d-mobile-dialog__header">
            <span class="d-mobile-dialog__title">{{ title }}</span>
          </div>
          <div class="d-mobile-dialog__body">
            <slot>
              <p class="d-mobile-dialog__message" :style="{ textAlign: messageAlign }">{{ message }}</p>
            </slot>
          </div>
          <div class="d-mobile-dialog__footer">
            <button
              v-if="showCancelButton"
              class="d-mobile-dialog__btn d-mobile-dialog__btn--cancel"
              @click="onCancel"
            >{{ cancelText }}</button>
            <button
              class="d-mobile-dialog__btn d-mobile-dialog__btn--confirm"
              @click="onConfirm"
            >{{ confirmText }}</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
/**
 * DMobileDialog - 移动端对话框
 * @author buchi
 * @since 2026-02-09
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileDialog' })

interface Props extends GlassCustomProps {
  modelValue?: boolean
  title?: string
  message?: string
  messageAlign?: 'left' | 'center' | 'right'
  showCancelButton?: boolean
  confirmText?: string
  cancelText?: string
  closeOnOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  message: '',
  messageAlign: 'center',
  showCancelButton: false,
  confirmText: '确认',
  cancelText: '取消',
  closeOnOverlay: false,
})

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
  confirm: []
  cancel: []
}>()

const { glassVars } = useGlassStyle(props)

const close = () => emit('update:modelValue', false)
const onConfirm = () => { emit('confirm'); close() }
const onCancel = () => { emit('cancel'); close() }
const onOverlayClick = () => { if (props.closeOnOverlay) close() }
</script>

<style scoped lang="scss">
.d-mobile-dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.50);
  backdrop-filter: blur(4px);
}

.d-mobile-dialog {
  width: 85%;
  max-width: 320px;
  border-radius: var(--dream-radius-xl);
  overflow: hidden;

  backdrop-filter: blur(40px) saturate(1.2);
  -webkit-backdrop-filter: blur(40px) saturate(1.2);
  background: var(--_glass-bg, rgba(255, 255, 255, 0.06));
  border: 1px solid var(--_glass-border, rgba(255, 255, 255, 0.18));
  box-shadow:
    inset 0 0 30px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 0 1px 0 rgba(255, 255, 255, 0.20),
    0 0 20px rgba(255, 255, 255, 0.04),
    0 0 50px rgba(255, 255, 255, 0.02),
    0 20px 60px rgba(0, 0, 0, 0.35);

  &__header {
    padding: 24px 24px 0;
    text-align: center;
  }

  &__title {
    font-size: var(--dream-mobile-text-lg);
    font-weight: var(--dream-font-bold);
    color: var(--dream-text-primary);
  }

  &__body {
    padding: 16px 24px 24px;
  }

  &__message {
    font-size: var(--dream-mobile-text-base);
    color: var(--dream-text-secondary);
    line-height: 1.6;
    margin: 0;
  }

  &__footer {
    display: flex;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  &__btn {
    flex: 1;
    padding: 14px;
    font-size: var(--dream-mobile-text-base);
    background: none;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    -webkit-tap-highlight-color: transparent;

    &:active {
      background: rgba(255, 255, 255, 0.06);
    }

    &--cancel {
      color: var(--dream-text-tertiary);
      border-right: 1px solid rgba(255, 255, 255, 0.08);
    }

    &--confirm {
      color: var(--dream-color-primary, rgba(96, 165, 250, 0.9));
      font-weight: var(--dream-font-semibold);
    }
  }
}

/* 动画 */
.dialog-fade-enter-active { transition: all 0.3s ease; }
.dialog-fade-leave-active { transition: all 0.2s ease; }
.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
  .d-mobile-dialog { transform: scale(0.9); }
}
</style>
