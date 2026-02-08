<template>
  <Transition name="alert-fade">
    <div v-if="visible" :class="['d-glass-alert', `d-glass-alert--${type}`]">
      <span class="d-glass-alert__icon">{{ iconMap[type] }}</span>
      <div class="d-glass-alert__content">
        <h4 v-if="title" class="d-glass-alert__title">{{ title }}</h4>
        <p class="d-glass-alert__message"><slot /></p>
      </div>
      <button v-if="closable" class="d-glass-alert__close" @click="visible = false">✕</button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
/**
 * DGlassAlert - 玻璃拟态警告提示
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'

defineOptions({ name: 'DGlassAlert' })

interface Props {
  type?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
  closable?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'info',
  title: '',
  closable: false,
})

const iconMap: Record<string, string> = { info: 'ℹ', success: '✓', warning: '⚠', danger: '✕' }
const visible = ref(true)
</script>

<style scoped lang="scss">
.d-glass-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--dream-space-md);
  backdrop-filter: blur(20px) saturate(1.1);
  background: var(--dream-bg-primary);
  border: 1px solid var(--dream-border-default);
  border-radius: var(--dream-radius-lg);
  padding: var(--dream-space-lg) var(--dream-space-xl);
  box-shadow:
    inset 0 0 15px rgba(255,255,255,0.03),
    inset 0 1px 0 rgba(255,255,255,0.08),
    0 0 1px rgba(255,255,255,0.15),
    0 0 12px rgba(255,255,255,0.03),
    0 4px 16px rgba(0,0,0,0.15);

  &__icon {
    width: 24px; height: 24px;
    display: flex; align-items: center; justify-content: center;
    border-radius: var(--dream-radius-full);
    font-size: 12px; font-weight: bold; flex-shrink: 0;
    border: 1px solid rgba(255,255,255,0.10);
  }

  &__content { flex: 1; min-width: 0; }
  &__title { font-size: var(--dream-text-sm); font-weight: var(--dream-font-semibold); color: var(--dream-text-primary); margin: 0 0 4px; }
  &__message { font-size: var(--dream-text-sm); color: var(--dream-text-secondary); margin: 0; line-height: 1.6; }

  &__close {
    font-size: 11px; color: var(--dream-text-tertiary); background: transparent; border: none; cursor: pointer;
    padding: 4px; transition: color var(--dream-transition-fast); flex-shrink: 0;
    &:hover { color: var(--dream-text-primary); }
  }

  &--info .d-glass-alert__icon { background: rgba(var(--dream-color-info-rgb),0.12); color: var(--dream-color-info); box-shadow: 0 0 6px rgba(var(--dream-color-info-rgb),0.10); }
  &--success .d-glass-alert__icon { background: rgba(var(--dream-color-success-rgb),0.12); color: var(--dream-color-success); box-shadow: 0 0 6px rgba(var(--dream-color-success-rgb),0.10); }
  &--warning .d-glass-alert__icon { background: rgba(var(--dream-color-warning-rgb),0.12); color: var(--dream-color-warning); box-shadow: 0 0 6px rgba(var(--dream-color-warning-rgb),0.10); }
  &--danger .d-glass-alert__icon { background: rgba(var(--dream-color-danger-rgb),0.12); color: var(--dream-color-danger); box-shadow: 0 0 6px rgba(var(--dream-color-danger-rgb),0.10); }
}

.alert-fade-leave-active { transition: all 0.3s ease; }
.alert-fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
