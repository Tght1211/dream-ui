<template>
  <div :class="['d-glass-slider', { 'd-glass-slider--disabled': disabled }]" :style="glassVars">
    <label v-if="label" class="d-glass-slider__label">{{ label }}</label>
    <div class="d-glass-slider__track" ref="trackRef" @mousedown="onMouseDown">
      <div class="d-glass-slider__fill" :style="{ width: percentage + '%' }" />
      <div class="d-glass-slider__thumb" :style="{ left: percentage + '%' }" />
    </div>
    <span v-if="showValue" class="d-glass-slider__value">{{ modelValue }}</span>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassSlider - 玻璃拟态滑块
 * @author buchi
 * @since 2026-02-08
 */
import { computed, ref, onUnmounted } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassSlider' })

interface Props extends GlassCustomProps {
  modelValue: number
  min?: number
  max?: number
  step?: number
  label?: string
  showValue?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  label: '',
  showValue: false,
  disabled: false,
})

const { glassVars } = useGlassStyle(props)

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
const trackRef = ref<HTMLElement | null>(null)

const percentage = computed(() => {
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})

const updateValue = (e: MouseEvent) => {
  if (props.disabled || !trackRef.value) return
  const rect = trackRef.value.getBoundingClientRect()
  let ratio = (e.clientX - rect.left) / rect.width
  ratio = Math.max(0, Math.min(1, ratio))
  let val = props.min + ratio * (props.max - props.min)
  val = Math.round(val / props.step) * props.step
  val = Math.max(props.min, Math.min(props.max, val))
  emit('update:modelValue', val)
}

const onMouseMove = (e: MouseEvent) => updateValue(e)
const onMouseUp = () => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
}

const onMouseDown = (e: MouseEvent) => {
  updateValue(e)
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', onMouseUp)
})
</script>

<style scoped lang="scss">
.d-glass-slider {
  display: flex;
  align-items: center;
  gap: var(--dream-space-md);

  &--disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  &__label {
    font-size: var(--dream-text-sm);
    color: var(--dream-text-secondary);
    white-space: nowrap;
  }

  &__track {
    flex: 1;
    height: 6px;
    position: relative;
    background: var(--_glass-bg, var(--dream-bg-primary));
    border: 1px solid var(--_glass-border, rgba(255,255,255,0.08));
    border-radius: var(--dream-radius-full);
    cursor: pointer;
    backdrop-filter: blur(8px);
  }

  &__fill {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    background: linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0.35));
    border-radius: var(--dream-radius-full);
    box-shadow: 0 0 8px rgba(255,255,255,0.08);
    transition: width 0.05s ease;
  }

  &__thumb {
    position: absolute;
    top: 50%;
    width: 16px; height: 16px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: rgba(255,255,255,0.90);
    border: 2px solid rgba(255,255,255,0.50);
    box-shadow:
      0 0 1px var(--_glass-glow, rgba(255,255,255,0.40)),
      0 0 10px rgba(255,255,255,0.10),
      0 2px 8px rgba(0,0,0,0.20);
    transition: left 0.05s ease, box-shadow var(--dream-transition-fast);
    cursor: grab;

    &:hover {
      box-shadow:
        0 0 1px var(--_glass-glow, rgba(255,255,255,0.60)),
        0 0 15px rgba(255,255,255,0.15),
        0 2px 8px rgba(0,0,0,0.25);
    }
  }

  &__value {
    font-size: var(--dream-text-sm);
    color: var(--dream-text-primary);
    font-variant-numeric: tabular-nums;
    min-width: 2em;
    text-align: right;
  }
}
</style>
