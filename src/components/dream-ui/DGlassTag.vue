<template>
  <span
    v-if="visible"
    :class="['d-glass-tag', `d-glass-tag--${variant}`, `d-glass-tag--${size}`]"
    :style="glassVars"
  >
    <slot />
    <button v-if="closable" class="d-glass-tag__close" @click="onClose">✕</button>
  </span>
</template>

<script setup lang="ts">
/**
 * DGlassTag - 玻璃拟态可关闭标签
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassTag' })

interface Props extends GlassCustomProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  closable: false,
})

const { glassVars } = useGlassStyle(props)

const emit = defineEmits<{ close: [] }>()
const visible = ref(true)

const onClose = () => {
  visible.value = false
  emit('close')
}
</script>

<style scoped lang="scss">
.d-glass-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(10px);
  background: var(--_glass-bg, var(--dream-bg-primary));
  border: 1px solid var(--_glass-border, var(--dream-border-default));
  border-radius: var(--dream-radius-sm);
  color: var(--dream-text-primary);
  font-weight: var(--dream-font-medium);
  transition: all var(--dream-transition-fast);
  box-shadow:
    inset 0 0 8px rgba(255,255,255,0.02),
    0 0 1px var(--_glass-glow, rgba(255,255,255,0.10));

  &--sm { padding: 2px 8px; font-size: var(--dream-text-xs); }
  &--md { padding: 4px 10px; font-size: var(--dream-text-xs); }
  &--lg { padding: 6px 14px; font-size: var(--dream-text-sm); }

  &--primary { border-color: rgba(var(--dream-color-primary-rgb),0.25); color: var(--dream-color-primary); }
  &--success { border-color: rgba(var(--dream-color-success-rgb),0.25); color: var(--dream-color-success); }
  &--warning { border-color: rgba(var(--dream-color-warning-rgb),0.25); color: var(--dream-color-warning); }
  &--danger  { border-color: rgba(var(--dream-color-danger-rgb),0.25);  color: var(--dream-color-danger); }
  &--info    { border-color: rgba(var(--dream-color-info-rgb),0.25);    color: var(--dream-color-info); }

  &__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    font-size: 9px;
    border: none;
    background: transparent;
    color: inherit;
    opacity: 0.5;
    cursor: pointer;
    border-radius: 50%;
    transition: all var(--dream-transition-fast);
    padding: 0;

    &:hover { opacity: 1; background: rgba(255,255,255,0.08); }
  }
}
</style>
