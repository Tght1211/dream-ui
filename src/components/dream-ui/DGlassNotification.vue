<template>
  <Transition name="dream-notification">
    <div
      v-if="visible"
      :class="['d-glass-notification', `d-glass-notification--${type}`]"
    >
      <span class="d-glass-notification__icon">{{ iconMap[type] }}</span>
      <div class="d-glass-notification__content">
        <h4 v-if="title" class="d-glass-notification__title">{{ title }}</h4>
        <p class="d-glass-notification__message">
          <slot>{{ message }}</slot>
        </p>
      </div>
      <button v-if="closable" class="d-glass-notification__close" @click="close">✕</button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
/**
 * DGlassNotification - 玻璃拟态通知组件
 * @author buchi
 * @since 2026-02-08
 */
import { ref, onMounted, onUnmounted } from 'vue'

defineOptions({ name: 'DGlassNotification' })

interface Props {
  type?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
  message?: string
  closable?: boolean
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  title: '',
  message: '',
  closable: true,
  duration: 4000,
})

const emit = defineEmits<{
  close: []
}>()

const iconMap: Record<string, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  danger: '✕',
}

const visible = ref(true)
let timer: ReturnType<typeof setTimeout> | null = null

const close = () => {
  visible.value = false
  emit('close')
}

onMounted(() => {
  if (props.duration > 0) {
    timer = setTimeout(close, props.duration)
  }
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style scoped lang="scss">
.d-glass-notification {
  display: flex;
  align-items: flex-start;
  gap: var(--dream-space-md);
  backdrop-filter: blur(30px) saturate(1.2);
  -webkit-backdrop-filter: blur(30px) saturate(1.2);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--dream-border-default);
  border-radius: var(--dream-radius-lg);
  padding: var(--dream-space-lg) var(--dream-space-xl);
  max-width: 420px;
  width: 100%;

  /* 强白色光晕边框 */
  box-shadow:
    inset 0 0 20px rgba(255, 255, 255, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 0 1px 0 rgba(255, 255, 255, 0.20),
    0 0 15px rgba(255, 255, 255, 0.05),
    0 0 40px rgba(255, 255, 255, 0.02),
    0 12px 40px rgba(0, 0, 0, 0.25);

  &__icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--dream-radius-full);
    font-size: 13px;
    font-weight: bold;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.10);
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: var(--dream-text-base);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
    margin: 0 0 4px;
  }

  &__message {
    font-size: var(--dream-text-sm);
    color: var(--dream-text-secondary);
    margin: 0;
    line-height: 1.5;
  }

  &__close {
    font-size: 12px;
    color: var(--dream-text-tertiary);
    background: transparent;
    border: none;
    padding: 4px;
    cursor: pointer;
    transition: color var(--dream-transition-fast);
    flex-shrink: 0;

    &:hover {
      color: var(--dream-text-primary);
    }
  }

  /* Variants — 只影响图标的发光色 */
  &--info .d-glass-notification__icon {
    background: rgba(var(--dream-color-info-rgb), 0.12);
    border-color: rgba(var(--dream-color-info-rgb), 0.20);
    color: var(--dream-color-info);
    box-shadow: 0 0 8px rgba(var(--dream-color-info-rgb), 0.10);
  }

  &--success .d-glass-notification__icon {
    background: rgba(var(--dream-color-success-rgb), 0.12);
    border-color: rgba(var(--dream-color-success-rgb), 0.20);
    color: var(--dream-color-success);
    box-shadow: 0 0 8px rgba(var(--dream-color-success-rgb), 0.10);
  }

  &--warning .d-glass-notification__icon {
    background: rgba(var(--dream-color-warning-rgb), 0.12);
    border-color: rgba(var(--dream-color-warning-rgb), 0.20);
    color: var(--dream-color-warning);
    box-shadow: 0 0 8px rgba(var(--dream-color-warning-rgb), 0.10);
  }

  &--danger .d-glass-notification__icon {
    background: rgba(var(--dream-color-danger-rgb), 0.12);
    border-color: rgba(var(--dream-color-danger-rgb), 0.20);
    color: var(--dream-color-danger);
    box-shadow: 0 0 8px rgba(var(--dream-color-danger-rgb), 0.10);
  }
}

/* Transition */
.dream-notification-enter-active,
.dream-notification-leave-active {
  transition: all 0.35s ease;
}

.dream-notification-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}

.dream-notification-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}
</style>
