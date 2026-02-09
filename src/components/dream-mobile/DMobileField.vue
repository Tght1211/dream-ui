<template>
  <div
    :class="[
      'd-mobile-field',
      `d-mobile-field--${type}`,
      { 'd-mobile-field--disabled': disabled, 'd-mobile-field--error': error, 'd-mobile-field--focused': focused }
    ]"
    :style="glassVars"
  >
    <label v-if="label" class="d-mobile-field__label" :style="labelStyle">{{ label }}</label>
    <div class="d-mobile-field__body">
      <slot name="prefix">
        <span v-if="prefixIcon" class="d-mobile-field__icon d-mobile-field__icon--prefix">{{ prefixIcon }}</span>
      </slot>
      <textarea
        v-if="type === 'textarea'"
        ref="inputRef"
        class="d-mobile-field__input d-mobile-field__textarea"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :maxlength="maxlength"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <input
        v-else
        ref="inputRef"
        class="d-mobile-field__input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />
      <span
        v-if="clearable && modelValue && focused"
        class="d-mobile-field__clear"
        @touchstart.prevent="onClear"
        @mousedown.prevent="onClear"
      >✕</span>
      <slot name="suffix">
        <span v-if="suffixIcon" class="d-mobile-field__icon d-mobile-field__icon--suffix">{{ suffixIcon }}</span>
      </slot>
    </div>
    <div v-if="error && errorMessage" class="d-mobile-field__error">{{ errorMessage }}</div>
    <div v-if="maxlength && showWordLimit" class="d-mobile-field__limit">
      {{ String(modelValue || '').length }} / {{ maxlength }}
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileField - 移动端输入框
 * @author buchi
 * @since 2026-02-09
 */
import { ref, computed } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileField' })

interface Props extends GlassCustomProps {
  modelValue?: string | number
  label?: string
  labelWidth?: string
  type?: 'text' | 'password' | 'number' | 'tel' | 'textarea'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  maxlength?: number
  showWordLimit?: boolean
  error?: boolean
  errorMessage?: string
  prefixIcon?: string
  suffixIcon?: string
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  labelWidth: '88px',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  clearable: false,
  maxlength: undefined,
  showWordLimit: false,
  error: false,
  errorMessage: '',
  prefixIcon: '',
  suffixIcon: '',
  rows: 3,
})

const emit = defineEmits<{
  'update:modelValue': [val: string]
  focus: [e: FocusEvent]
  blur: [e: FocusEvent]
  clear: []
}>()

const { glassVars } = useGlassStyle(props)
const inputRef = ref<HTMLInputElement | HTMLTextAreaElement>()
const focused = ref(false)

const labelStyle = computed(() => props.label ? { width: props.labelWidth } : {})

const onInput = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)
const onFocus = (e: FocusEvent) => { focused.value = true; emit('focus', e) }
const onBlur = (e: FocusEvent) => { focused.value = false; emit('blur', e) }
const onClear = () => { emit('update:modelValue', ''); emit('clear') }

defineExpose({ focus: () => inputRef.value?.focus(), blur: () => inputRef.value?.blur() })
</script>

<style scoped lang="scss">
.d-mobile-field {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 12px 16px;
  background: var(--_glass-bg, rgba(255, 255, 255, 0.03));
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.2s ease;

  &--focused {
    background: rgba(255, 255, 255, 0.05);
  }

  &--error {
    .d-mobile-field__input {
      color: rgba(248, 113, 113, 0.9);
    }
  }

  &--disabled {
    opacity: 0.45;
    pointer-events: none;
  }

  &__label {
    flex-shrink: 0;
    font-size: var(--dream-mobile-text-base);
    color: var(--dream-text-primary);
    line-height: 24px;
    padding-right: 12px;
  }

  &__body {
    flex: 1;
    display: flex;
    align-items: center;
    min-width: 0;
    position: relative;
  }

  &__input {
    flex: 1;
    min-width: 0;
    background: transparent;
    border: none;
    outline: none;
    font-size: var(--dream-mobile-text-base);
    color: var(--dream-text-primary);
    line-height: 24px;
    caret-color: var(--dream-color-primary);

    &::placeholder {
      color: var(--dream-text-tertiary);
    }
  }

  &__textarea {
    resize: none;
    width: 100%;
    line-height: 1.5;
  }

  &__clear {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: var(--dream-text-tertiary);
    cursor: pointer;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.10);
    margin-left: 6px;
    transition: all 0.2s;

    &:active {
      background: rgba(255, 255, 255, 0.18);
    }
  }

  &__icon {
    flex-shrink: 0;
    font-size: 16px;
    color: var(--dream-text-tertiary);

    &--prefix { margin-right: 8px; }
    &--suffix { margin-left: 8px; }
  }

  &__error {
    width: 100%;
    font-size: var(--dream-mobile-text-xs);
    color: rgba(248, 113, 113, 0.9);
    margin-top: 4px;
    padding-left: 0;
  }

  &__limit {
    width: 100%;
    font-size: var(--dream-mobile-text-xs);
    color: var(--dream-text-tertiary);
    text-align: right;
    margin-top: 4px;
  }
}
</style>
