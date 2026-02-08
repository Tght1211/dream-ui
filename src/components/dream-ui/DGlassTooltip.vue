<template>
  <div class="d-glass-tooltip" @mouseenter="show = true" @mouseleave="show = false">
    <slot />
    <Transition name="tooltip-fade">
      <div v-if="show" :class="['d-glass-tooltip__tip', `d-glass-tooltip__tip--${placement}`]" :style="glassVars">
        {{ content }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassTooltip - 玻璃拟态工具提示
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassTooltip' })

interface Props extends GlassCustomProps {
  content: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top',
})

const { glassVars } = useGlassStyle(props)

const show = ref(false)
</script>

<style scoped lang="scss">
.d-glass-tooltip {
  position: relative;
  display: inline-flex;

  &__tip {
    position: absolute;
    white-space: nowrap;
    padding: 6px 12px;
    font-size: var(--dream-text-xs);
    color: var(--dream-text-primary);
    background: var(--dream-bg-elevated);
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    border: 1px solid var(--dream-border-default);
    border-radius: var(--dream-radius-sm);
    box-shadow:
      inset 0 0 10px rgba(255,255,255,0.03),
      0 0 1px var(--_glass-glow, rgba(255,255,255,0.15)),
      0 4px 16px rgba(0,0,0,0.25);
    z-index: var(--dream-z-popover);
    pointer-events: none;

    &--top    { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
    &--bottom { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
    &--left   { right: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
    &--right  { left: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
  }
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active { transition: all 0.15s ease; }
.tooltip-fade-enter-from,
.tooltip-fade-leave-to { opacity: 0; transform: translateX(-50%) translateY(4px); }
</style>
