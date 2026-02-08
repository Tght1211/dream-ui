<template>
  <div
    :class="[
      'd-glass-input',
      `d-glass-input--${size}`,
      {
        'd-glass-input--focused': isFocused,
        'd-glass-input--disabled': disabled,
        'd-glass-input--error': error,
      }
    ]"
    :style="glassVars"
  >
    <label v-if="label" class="d-glass-input__label">{{ label }}</label>
    <div class="d-glass-input__wrapper">
      <span v-if="$slots.prefix" class="d-glass-input__prefix">
        <slot name="prefix" />
      </span>
      <input
        ref="inputRef"
        class="d-glass-input__inner"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <span v-if="$slots.suffix || clearable" class="d-glass-input__suffix">
        <span
          v-if="clearable && modelValue"
          class="d-glass-input__clear"
          @click="onClear"
        >✕</span>
        <slot name="suffix" />
      </span>
    </div>
    <p v-if="error" class="d-glass-input__error">{{ error }}</p>
    <p v-else-if="hint" class="d-glass-input__hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassInput - 玻璃拟态输入框组件
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassInput' })

interface Props extends GlassCustomProps {
  modelValue?: string
  type?: string
  placeholder?: string
  label?: string
  hint?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  label: '',
  hint: '',
  error: '',
  size: 'md',
  disabled: false,
  readonly: false,
  clearable: false,
})

const { glassVars } = useGlassStyle(props)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

const isFocused = ref(false)
const inputRef = ref<HTMLInputElement>()

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

const onFocus = (e: FocusEvent) => {
  isFocused.value = true
  emit('focus', e)
}

const onBlur = (e: FocusEvent) => {
  isFocused.value = false
  emit('blur', e)
}

const onClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

defineExpose({ focus: () => inputRef.value?.focus() })
</script>

<style scoped lang="scss">
.d-glass-input {
  display: flex;
  flex-direction: column;
  gap: var(--dream-space-sm);

  &__label {
    font-size: var(--dream-text-sm);
    font-weight: var(--dream-font-medium);
    color: var(--dream-text-secondary);
  }

  &__wrapper {
    display: flex;
    align-items: center;
    backdrop-filter: blur(20px) saturate(1.1);
    -webkit-backdrop-filter: blur(20px) saturate(1.1);
    background: var(--_glass-bg, var(--dream-bg-primary));
    border: 1px solid var(--_glass-border, var(--dream-border-default));
    border-radius: var(--dream-radius-md);
    transition: all var(--dream-transition-base);
    overflow: hidden;

    /* 白色光晕边框 */
    box-shadow:
      inset 0 0 12px rgba(255, 255, 255, 0.02),
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.12)),
      0 0 10px rgba(255, 255, 255, 0.02),
      0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &--focused .d-glass-input__wrapper {
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.30)),
      0 0 15px rgba(255, 255, 255, 0.06),
      0 0 40px rgba(255, 255, 255, 0.02),
      0 4px 16px rgba(0, 0, 0, 0.20);
  }

  &--error .d-glass-input__wrapper {
    border-color: rgba(var(--dream-color-danger-rgb), 0.40);
    box-shadow:
      inset 0 0 15px rgba(var(--dream-color-danger-rgb), 0.03),
      0 0 1px 0 rgba(var(--dream-color-danger-rgb), 0.30),
      0 0 12px rgba(var(--dream-color-danger-rgb), 0.06),
      0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &--disabled .d-glass-input__wrapper {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &__inner {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: var(--dream-text-primary);
    font-size: var(--dream-text-base);
    width: 100%;

    &::placeholder {
      color: var(--dream-text-tertiary);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__prefix,
  &__suffix {
    display: flex;
    align-items: center;
    color: var(--dream-text-tertiary);
    flex-shrink: 0;
  }

  &__prefix { padding-left: var(--dream-space-md); }
  &__suffix { padding-right: var(--dream-space-md); }

  &__clear {
    cursor: pointer;
    font-size: 12px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all var(--dream-transition-fast);
    opacity: 0.4;

    &:hover {
      opacity: 0.8;
      background: var(--dream-bg-secondary);
    }
  }

  &__error {
    font-size: var(--dream-text-xs);
    color: var(--dream-color-danger);
  }

  &__hint {
    font-size: var(--dream-text-xs);
    color: var(--dream-text-tertiary);
  }

  /* Sizes */
  &--sm .d-glass-input__wrapper { border-radius: var(--dream-radius-sm); }
  &--sm .d-glass-input__inner { padding: 6px 12px; font-size: var(--dream-text-sm); }
  &--md .d-glass-input__inner { padding: 10px 14px; font-size: var(--dream-text-base); }
  &--lg .d-glass-input__wrapper { border-radius: var(--dream-radius-lg); }
  &--lg .d-glass-input__inner { padding: 14px 18px; font-size: var(--dream-text-lg); }
}
</style>
