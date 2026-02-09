<template>
  <div
    :class="[
      'd-mobile-switch',
      { 'd-mobile-switch--on': modelValue, 'd-mobile-switch--disabled': disabled, 'd-mobile-switch--loading': loading }
    ]"
    :style="[glassVars, switchStyle]"
    @click="toggle"
  >
    <div class="d-mobile-switch__node">
      <svg v-if="loading" class="d-mobile-switch__loading" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="50 20" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileSwitch - 移动端开关切换
 * @author buchi
 * @since 2026-02-09
 */
import { computed } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileSwitch' })

interface Props extends GlassCustomProps {
  modelValue?: boolean
  disabled?: boolean
  loading?: boolean
  activeColor?: string
  inactiveColor?: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  loading: false,
  activeColor: '',
  inactiveColor: '',
  size: 28,
})

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
  change: [val: boolean]
}>()

const { glassVars } = useGlassStyle(props)

const switchStyle = computed(() => ({
  '--switch-size': `${props.size}px`,
  ...(props.modelValue && props.activeColor ? { '--switch-active-bg': props.activeColor } : {}),
  ...(!props.modelValue && props.inactiveColor ? { '--switch-inactive-bg': props.inactiveColor } : {}),
}))

const toggle = () => {
  if (props.disabled || props.loading) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<style scoped lang="scss">
.d-mobile-switch {
  display: inline-flex;
  align-items: center;
  width: calc(var(--switch-size, 28px) * 1.85);
  height: var(--switch-size, 28px);
  border-radius: calc(var(--switch-size, 28px) / 2);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
  -webkit-tap-highlight-color: transparent;
  position: relative;

  backdrop-filter: blur(16px) saturate(1.1);
  -webkit-backdrop-filter: blur(16px) saturate(1.1);
  background: var(--switch-inactive-bg, rgba(255, 255, 255, 0.08));
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    inset 0 0 10px rgba(255, 255, 255, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 1px rgba(255, 255, 255, 0.10),
    0 2px 8px rgba(0, 0, 0, 0.15);

  &--on {
    background: var(--switch-active-bg, var(--dream-color-primary, rgba(96, 165, 250, 0.5)));
    border-color: rgba(255, 255, 255, 0.20);
    box-shadow:
      inset 0 0 12px rgba(255, 255, 255, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.12),
      0 0 1px rgba(255, 255, 255, 0.18),
      0 0 12px rgba(96, 165, 250, 0.20),
      0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &--disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &__node {
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(var(--switch-size, 28px) - 4px);
    height: calc(var(--switch-size, 28px) - 4px);
    border-radius: 50%;
    transition: transform 0.3s cubic-bezier(0.3, 1.05, 0.4, 1.05);
    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(255, 255, 255, 0.90);
    box-shadow:
      0 0 1px rgba(255, 255, 255, 0.30),
      0 2px 6px rgba(0, 0, 0, 0.20);
  }

  &--on &__node {
    transform: translateX(calc(var(--switch-size, 28px) * 0.85));
  }

  &__loading {
    width: 60%;
    height: 60%;
    color: var(--dream-color-primary, rgba(96, 165, 250, 0.8));
    animation: switch-spin 0.8s linear infinite;
  }
}

@keyframes switch-spin {
  to { transform: rotate(360deg); }
}
</style>
