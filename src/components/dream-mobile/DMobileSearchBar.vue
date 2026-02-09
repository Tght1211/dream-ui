<template>
  <div :class="['d-mobile-search-bar', { 'd-mobile-search-bar--focus': isFocus }]" :style="glassVars">
    <div class="d-mobile-search-bar__content">
      <span class="d-mobile-search-bar__icon">&#128269;</span>
      <input
        ref="inputRef"
        class="d-mobile-search-bar__input"
        type="search"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.enter="handleSearch"
      />
      <span
        v-if="modelValue && clearable"
        class="d-mobile-search-bar__clear"
        @click="handleClear"
      >&#10005;</span>
    </div>
    <div v-if="showAction" class="d-mobile-search-bar__action" @click="handleAction">
      <slot name="action">{{ actionText }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileSearchBar - 移动端搜索栏
 * 带玻璃拟态效果的搜索输入框
 * @author buchi
 * @since 2026-02-09
 */
import { ref } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileSearchBar' })

interface Props extends GlassCustomProps {
  /** 搜索值 */
  modelValue?: string
  /** 占位提示 */
  placeholder?: string
  /** 禁用 */
  disabled?: boolean
  /** 可清除 */
  clearable?: boolean
  /** 最大输入长度 */
  maxlength?: number
  /** 显示右侧操作按钮 */
  showAction?: boolean
  /** 操作按钮文字 */
  actionText?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '搜索',
  disabled: false,
  clearable: true,
  maxlength: undefined,
  showAction: false,
  actionText: '搜索',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
  'click-action': []
}>()

const { glassVars } = useGlassStyle(props)
const inputRef = ref<HTMLInputElement>()
const isFocus = ref(false)

const handleInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

const handleFocus = (e: FocusEvent) => {
  isFocus.value = true
  emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  isFocus.value = false
  emit('blur', e)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}

const handleSearch = () => {
  emit('search', props.modelValue)
}

const handleAction = () => {
  emit('search', props.modelValue)
  emit('click-action')
}

defineExpose({ focus: () => inputRef.value?.focus() })
</script>

<style scoped lang="scss">
.d-mobile-search-bar {
  display: flex;
  align-items: center;
  padding: 8px var(--dream-mobile-padding);
  gap: 12px;

  &__content {
    flex: 1;
    display: flex;
    align-items: center;
    height: 36px;
    padding: 0 12px;
    backdrop-filter: blur(24px) saturate(1.1);
    -webkit-backdrop-filter: blur(24px) saturate(1.1);
    background: var(--_glass-bg, var(--dream-bg-primary));
    border: 1px solid var(--_glass-border, var(--dream-border-default));
    border-radius: var(--dream-radius-full);
    transition: all var(--dream-mobile-transition-fast);
    box-shadow:
      inset 0 0 12px rgba(255, 255, 255, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.10),
      0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.15)),
      0 0 10px rgba(255, 255, 255, 0.03),
      0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &--focus &__content {
    border-color: var(--dream-border-hover);
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 0 1px 0 rgba(255, 255, 255, 0.30),
      0 0 15px rgba(255, 255, 255, 0.06),
      0 0 12px rgba(var(--dream-color-primary-rgb), 0.08),
      0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &__icon {
    flex-shrink: 0;
    font-size: 14px;
    margin-right: 6px;
    opacity: 0.5;
  }

  &__input {
    flex: 1;
    width: 0;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--dream-text-primary);
    font-size: var(--dream-mobile-text-base);
    -webkit-appearance: none;

    &::placeholder {
      color: var(--dream-text-tertiary);
    }

    /* 去掉 Safari 搜索框的默认样式 */
    &::-webkit-search-cancel-button,
    &::-webkit-search-decoration {
      display: none;
    }
  }

  &__clear {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: var(--dream-text-tertiary);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: 50%;
    cursor: pointer;
    margin-left: 6px;
    -webkit-tap-highlight-color: transparent;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.06);

    &:active {
      background: rgba(255, 255, 255, 0.15);
    }
  }

  &__action {
    flex-shrink: 0;
    font-size: var(--dream-mobile-text-base);
    color: var(--dream-color-primary);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:active {
      opacity: var(--dream-mobile-active-opacity);
    }
  }
}
</style>
