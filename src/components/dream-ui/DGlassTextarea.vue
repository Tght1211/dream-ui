<template>
  <div
    :class="[
      'd-glass-textarea',
      {
        'd-glass-textarea--focused': isFocused,
        'd-glass-textarea--disabled': disabled,
        'd-glass-textarea--error': error,
      }
    ]"
    :style="glassVars"
  >
    <label v-if="label" class="d-glass-textarea__label">{{ label }}</label>
    <div class="d-glass-textarea__wrapper">
      <textarea
        ref="textareaRef"
        class="d-glass-textarea__inner"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
    </div>
    <div class="d-glass-textarea__footer">
      <p v-if="error" class="d-glass-textarea__error">{{ error }}</p>
      <p v-else-if="hint" class="d-glass-textarea__hint">{{ hint }}</p>
      <span v-if="showCount" class="d-glass-textarea__count">
        {{ (modelValue || '').length }}<span v-if="maxlength">/{{ maxlength }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassTextarea - 玻璃拟态多行输入框组件
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassTextarea' })

interface Props extends GlassCustomProps {
  modelValue?: string
  placeholder?: string
  label?: string
  hint?: string
  error?: string
  rows?: number
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  showCount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  label: '',
  hint: '',
  error: '',
  rows: 4,
  disabled: false,
  readonly: false,
  maxlength: 0,
  showCount: false,
})

const { glassVars } = useGlassStyle(props)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const isFocused = ref(false)
const textareaRef = ref<HTMLTextAreaElement>()

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}

const onFocus = (e: FocusEvent) => {
  isFocused.value = true
  emit('focus', e)
}

const onBlur = (e: FocusEvent) => {
  isFocused.value = false
  emit('blur', e)
}
</script>

<style scoped lang="scss">
.d-glass-textarea {
  display: flex;
  flex-direction: column;
  gap: var(--dream-space-sm);

  &__label {
    font-size: var(--dream-text-sm);
    font-weight: var(--dream-font-medium);
    color: var(--dream-text-secondary);
  }

  &__wrapper {
    backdrop-filter: blur(20px) saturate(1.1);
    -webkit-backdrop-filter: blur(20px) saturate(1.1);
    background: var(--_glass-bg, var(--dream-bg-primary));
    border: 1px solid var(--_glass-border, var(--dream-border-default));
    border-radius: var(--dream-radius-md);
    transition: all var(--dream-transition-base);
    overflow: hidden;

    box-shadow:
      inset 0 0 12px rgba(255, 255, 255, 0.02),
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.12)),
      0 0 10px rgba(255, 255, 255, 0.02),
      0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &--focused .d-glass-textarea__wrapper {
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.30)),
      0 0 15px rgba(255, 255, 255, 0.06),
      0 4px 16px rgba(0, 0, 0, 0.20);
  }

  &--error .d-glass-textarea__wrapper {
    border-color: rgba(var(--dream-color-danger-rgb), 0.40);
  }

  &--disabled .d-glass-textarea__wrapper {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &__inner {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--dream-text-primary);
    font-size: var(--dream-text-base);
    padding: var(--dream-space-md) var(--dream-space-lg);
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
    line-height: 1.6;

    &::placeholder { color: var(--dream-text-tertiary); }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__error { font-size: var(--dream-text-xs); color: var(--dream-color-danger); margin: 0; }
  &__hint { font-size: var(--dream-text-xs); color: var(--dream-text-tertiary); margin: 0; }
  &__count {
    font-size: var(--dream-text-xs);
    color: var(--dream-text-tertiary);
    margin-left: auto;
    font-variant-numeric: tabular-nums;
  }
}
</style>
