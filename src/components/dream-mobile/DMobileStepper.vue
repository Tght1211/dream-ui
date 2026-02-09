<template>
  <div
    :class="[
      'd-mobile-stepper',
      `d-mobile-stepper--${theme}`,
      { 'd-mobile-stepper--disabled': disabled }
    ]"
    :style="glassVars"
  >
    <button
      class="d-mobile-stepper__btn d-mobile-stepper__minus"
      :disabled="disabled || currentValue <= min"
      @click="handleChange(-step)"
    >
      &#8722;
    </button>
    <input
      v-if="!disableInput"
      class="d-mobile-stepper__input"
      type="number"
      :value="currentValue"
      :disabled="disabled"
      :min="min"
      :max="max"
      @change="handleInputChange"
    />
    <span v-else class="d-mobile-stepper__value">{{ currentValue }}</span>
    <button
      class="d-mobile-stepper__btn d-mobile-stepper__plus"
      :disabled="disabled || currentValue >= max"
      @click="handleChange(step)"
    >
      &#43;
    </button>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileStepper - 移动端步进器
 * +/- 数量选择控件
 * @author buchi
 * @since 2026-02-09
 */
import { computed } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileStepper' })

interface Props extends GlassCustomProps {
  /** 当前值 */
  modelValue?: number
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 步长 */
  step?: number
  /** 禁用 */
  disabled?: boolean
  /** 禁用输入框 */
  disableInput?: boolean
  /** 主题 */
  theme?: 'default' | 'round'
  /** 小数位数 */
  decimalLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  min: 1,
  max: Infinity,
  step: 1,
  disabled: false,
  disableInput: false,
  theme: 'default',
  decimalLength: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
  overlimit: [type: 'minus' | 'plus']
}>()

const { glassVars } = useGlassStyle(props)

const currentValue = computed(() => props.modelValue)

const clamp = (val: number) => {
  const clamped = Math.max(props.min, Math.min(props.max, val))
  return props.decimalLength !== undefined
    ? Number(clamped.toFixed(props.decimalLength))
    : clamped
}

const handleChange = (delta: number) => {
  const newVal = clamp(currentValue.value + delta)
  if (newVal === currentValue.value) {
    emit('overlimit', delta > 0 ? 'plus' : 'minus')
    return
  }
  emit('update:modelValue', newVal)
  emit('change', newVal)
}

const handleInputChange = (e: Event) => {
  const val = Number((e.target as HTMLInputElement).value)
  if (isNaN(val)) return
  const clamped = clamp(val)
  emit('update:modelValue', clamped)
  emit('change', clamped)
}
</script>

<style scoped lang="scss">
.d-mobile-stepper {
  display: inline-flex;
  align-items: center;

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 18px;
    color: var(--dream-text-primary);
    backdrop-filter: blur(20px) saturate(1.1);
    -webkit-backdrop-filter: blur(20px) saturate(1.1);
    background: var(--_glass-bg, var(--dream-bg-primary));
    border: 1px solid var(--_glass-border, var(--dream-border-default));
    border-radius: var(--dream-radius-sm);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: all var(--dream-mobile-transition-fast);
    box-shadow:
      inset 0 0 12px rgba(255, 255, 255, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.10),
      0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.15)),
      0 0 10px rgba(255, 255, 255, 0.03),
      0 4px 12px rgba(0, 0, 0, 0.15);

    &:active:not(:disabled) {
      background: var(--dream-bg-elevated);
      transform: scale(0.94);
      box-shadow:
        inset 0 0 15px rgba(255, 255, 255, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.15),
        0 0 1px 0 rgba(255, 255, 255, 0.25),
        0 0 12px rgba(255, 255, 255, 0.05);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  &__input {
    width: 40px;
    height: 32px;
    margin: 0 2px;
    border: none;
    outline: none;
    background: rgba(255, 255, 255, 0.03);
    color: var(--dream-text-primary);
    font-size: var(--dream-mobile-text-base);
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      display: none;
    }

    &:disabled {
      opacity: 0.3;
    }
  }

  &__value {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 32px;
    margin: 0 2px;
    font-size: var(--dream-mobile-text-base);
    color: var(--dream-text-primary);
    background: rgba(255, 255, 255, 0.03);
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  /* 圆形主题 */
  &--round {
    .d-mobile-stepper__btn {
      border-radius: 50%;
    }
  }

  &--disabled {
    opacity: 0.35;
    pointer-events: none;
  }
}
</style>
