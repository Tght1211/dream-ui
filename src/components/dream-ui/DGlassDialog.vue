<template>
  <Teleport to="body">
    <Transition name="dream-dialog">
      <div v-if="modelValue" class="d-glass-dialog__overlay" @click.self="onOverlayClick">
        <div :class="['d-glass-dialog', `d-glass-dialog--${size}`]">
          <div class="d-glass-dialog__header">
            <h3 class="d-glass-dialog__title">{{ title }}</h3>
            <button v-if="closable" class="d-glass-dialog__close" @click="close">✕</button>
          </div>
          <div class="d-glass-dialog__body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="d-glass-dialog__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
/**
 * DGlassDialog - 玻璃拟态对话框组件
 * @author buchi
 * @since 2026-02-08
 */
defineOptions({ name: 'DGlassDialog' })

interface Props {
  modelValue?: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
  closeOnOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  size: 'md',
  closable: true,
  closeOnOverlay: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const close = () => emit('update:modelValue', false)
const onOverlayClick = () => {
  if (props.closeOnOverlay) close()
}
</script>

<style scoped lang="scss">
.d-glass-dialog {
  &__overlay {
    position: fixed;
    inset: 0;
    z-index: var(--dream-z-modal);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    padding: var(--dream-space-xl);
  }

  backdrop-filter: blur(40px) saturate(1.2);
  -webkit-backdrop-filter: blur(40px) saturate(1.2);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--dream-radius-xl);
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* 强光晕边框 — 对话框需要最强的光晕 */
  box-shadow:
    inset 0 0 40px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.20),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05),
    0 0 2px 0 rgba(255, 255, 255, 0.30),
    0 0 20px rgba(255, 255, 255, 0.08),
    0 0 60px rgba(255, 255, 255, 0.03),
    0 20px 60px rgba(0, 0, 0, 0.35);

  &--sm { max-width: 400px; }
  &--md { max-width: 560px; }
  &--lg { max-width: 720px; }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--dream-space-xl);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  &__title {
    font-size: var(--dream-text-xl);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
    margin: 0;
  }

  &__close {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--dream-radius-sm);
    color: var(--dream-text-tertiary);
    font-size: 14px;
    transition: all var(--dream-transition-fast);
    background: transparent;
    border: 1px solid transparent;

    &:hover {
      background: var(--dream-bg-secondary);
      border-color: rgba(255, 255, 255, 0.12);
      color: var(--dream-text-primary);
    }
  }

  &__body {
    padding: var(--dream-space-xl);
    overflow-y: auto;
    color: var(--dream-text-secondary);
    line-height: 1.7;
  }

  &__footer {
    padding: var(--dream-space-lg) var(--dream-space-xl);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    justify-content: flex-end;
    gap: var(--dream-space-sm);
  }
}

/* Transition */
.dream-dialog-enter-active,
.dream-dialog-leave-active {
  transition: all 0.3s ease;
}

.dream-dialog-enter-active .d-glass-dialog,
.dream-dialog-leave-active .d-glass-dialog {
  transition: all 0.3s ease;
}

.dream-dialog-enter-from,
.dream-dialog-leave-to {
  opacity: 0;
}

.dream-dialog-enter-from .d-glass-dialog,
.dream-dialog-leave-to .d-glass-dialog {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
