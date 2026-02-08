<template>
  <Teleport to="body">
    <Transition name="drawer-overlay">
      <div v-if="modelValue" class="d-glass-drawer-overlay" @click.self="closeOnOverlay && close()" />
    </Transition>
    <Transition :name="`drawer-slide-${placement}`">
      <div
        v-if="modelValue"
        :class="['d-glass-drawer', `d-glass-drawer--${placement}`, `d-glass-drawer--${size}`]"
        :style="glassVars"
      >
        <div class="d-glass-drawer__header">
          <h3 class="d-glass-drawer__title">{{ title }}</h3>
          <button v-if="closable" class="d-glass-drawer__close" @click="close">✕</button>
        </div>
        <div class="d-glass-drawer__body"><slot /></div>
        <div v-if="$slots.footer" class="d-glass-drawer__footer"><slot name="footer" /></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
/**
 * DGlassDrawer - 玻璃拟态抽屉
 * @author buchi
 * @since 2026-02-08
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassDrawer' })

interface Props extends GlassCustomProps {
  modelValue: boolean
  title?: string
  placement?: 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
  closeOnOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  placement: 'right',
  size: 'md',
  closable: true,
  closeOnOverlay: true,
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const close = () => emit('update:modelValue', false)

const { glassVars } = useGlassStyle(props)
</script>

<style lang="scss">
.d-glass-drawer-overlay {
  position: fixed; inset: 0; z-index: 998;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
.drawer-overlay-enter-active, .drawer-overlay-leave-active { transition: opacity 0.3s ease; }
.drawer-overlay-enter-from, .drawer-overlay-leave-to { opacity: 0; }

.d-glass-drawer {
  position: fixed; top: 0; bottom: 0; z-index: 999;
  display: flex; flex-direction: column;
  backdrop-filter: blur(30px) saturate(1.2);
  -webkit-backdrop-filter: blur(30px) saturate(1.2);
  background: var(--_glass-bg, rgba(255, 255, 255, 0.06));
  border: 1px solid var(--_glass-border, rgba(255, 255, 255, 0.12));
  box-shadow:
    inset 0 0 20px rgba(255,255,255,0.03),
    inset 0 1px 0 rgba(255,255,255,0.10),
    0 0 1px var(--_glass-glow, rgba(255,255,255,0.18)),
    0 0 30px rgba(255,255,255,0.03),
    0 8px 32px rgba(0,0,0,0.40);

  &--right { right: 0; border-radius: var(--dream-radius-lg) 0 0 var(--dream-radius-lg); border-right: none; }
  &--left  { left: 0;  border-radius: 0 var(--dream-radius-lg) var(--dream-radius-lg) 0; border-left: none; }
  &--sm { width: 280px; }
  &--md { width: 400px; }
  &--lg { width: 560px; }

  &__header {
    display: flex; align-items: center; justify-content: space-between;
    padding: var(--dream-space-xl);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  &__title { font-size: var(--dream-text-lg); font-weight: 600; color: var(--dream-text-primary); margin: 0; }
  &__close {
    color: var(--dream-text-tertiary); font-size: 14px; padding: 4px 8px;
    border-radius: var(--dream-radius-sm); background: transparent; border: none; cursor: pointer;
    transition: all 0.15s ease;
    &:hover { color: var(--dream-text-primary); background: rgba(255,255,255,0.06); }
  }
  &__body { flex: 1; overflow-y: auto; padding: var(--dream-space-xl); }
  &__footer {
    display: flex; justify-content: flex-end; gap: var(--dream-space-md);
    padding: var(--dream-space-lg) var(--dream-space-xl);
    border-top: 1px solid rgba(255,255,255,0.06);
  }
}

.drawer-slide-right-enter-active, .drawer-slide-right-leave-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.drawer-slide-right-enter-from, .drawer-slide-right-leave-to { transform: translateX(100%); }
.drawer-slide-left-enter-active, .drawer-slide-left-leave-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.drawer-slide-left-enter-from, .drawer-slide-left-leave-to { transform: translateX(-100%); }
</style>
