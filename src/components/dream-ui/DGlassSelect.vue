<template>
  <div
    ref="selectRef"
    :class="[
      'd-glass-select',
      `d-glass-select--${size}`,
      {
        'd-glass-select--open': isOpen,
        'd-glass-select--disabled': disabled,
      }
    ]"
  >
    <label v-if="label" class="d-glass-select__label">{{ label }}</label>
    <div class="d-glass-select__trigger" @click="toggleOpen">
      <span :class="['d-glass-select__value', { 'd-glass-select__placeholder': !selectedLabel }]">
        {{ selectedLabel || placeholder }}
      </span>
      <span class="d-glass-select__arrow">▾</span>
    </div>
    <Transition name="dream-dropdown">
      <div v-if="isOpen" class="d-glass-select__dropdown">
        <div
          v-for="opt in options"
          :key="opt.value"
          :class="['d-glass-select__option', { 'd-glass-select__option--active': opt.value === modelValue }]"
          @click="selectOption(opt)"
        >
          {{ opt.label }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassSelect - 玻璃拟态下拉选择组件
 * @author buchi
 * @since 2026-02-08
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'

defineOptions({ name: 'DGlassSelect' })

interface Option {
  label: string
  value: string | number
}

interface Props {
  modelValue?: string | number
  options?: Option[]
  placeholder?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: () => [],
  placeholder: '请选择',
  label: '',
  size: 'md',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const isOpen = ref(false)
const selectRef = ref<HTMLElement>()

const selectedLabel = computed(() => {
  const found = props.options.find(o => o.value === props.modelValue)
  return found?.label || ''
})

const toggleOpen = () => {
  if (!props.disabled) isOpen.value = !isOpen.value
}

const selectOption = (opt: Option) => {
  emit('update:modelValue', opt.value)
  isOpen.value = false
}

const onClickOutside = (e: MouseEvent) => {
  if (selectRef.value && !selectRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped lang="scss">
.d-glass-select {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--dream-space-sm);

  &__label {
    font-size: var(--dream-text-sm);
    font-weight: var(--dream-font-medium);
    color: var(--dream-text-secondary);
  }

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(20px) saturate(1.1);
    -webkit-backdrop-filter: blur(20px) saturate(1.1);
    background: var(--dream-bg-primary);
    border: 1px solid var(--dream-border-default);
    border-radius: var(--dream-radius-md);
    cursor: pointer;
    transition: all var(--dream-transition-base);
    color: var(--dream-text-primary);

    box-shadow:
      inset 0 0 12px rgba(255, 255, 255, 0.02),
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 0 1px 0 rgba(255, 255, 255, 0.12),
      0 0 10px rgba(255, 255, 255, 0.02),
      0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &--open .d-glass-select__trigger {
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 0 1px 0 rgba(255, 255, 255, 0.30),
      0 0 15px rgba(255, 255, 255, 0.06),
      0 4px 16px rgba(0, 0, 0, 0.20);
  }

  &__trigger:hover {
    border-color: var(--dream-border-hover);
  }

  &__value { flex: 1; }
  &__placeholder { color: var(--dream-text-tertiary); }

  &__arrow {
    color: var(--dream-text-tertiary);
    transition: transform var(--dream-transition-fast);
    font-size: 14px;
  }

  &--open .d-glass-select__arrow {
    transform: rotate(180deg);
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: var(--dream-space-xs);
    z-index: var(--dream-z-dropdown);
    backdrop-filter: blur(40px) saturate(1.2);
    -webkit-backdrop-filter: blur(40px) saturate(1.2);
    background: rgba(10, 12, 16, 0.92);
    border: 1px solid var(--dream-border-default);
    border-radius: var(--dream-radius-md);
    padding: var(--dream-space-xs);
    max-height: 240px;
    overflow-y: auto;

    /* 下拉菜单也要光晕 */
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.10),
      0 0 1px 0 rgba(255, 255, 255, 0.18),
      0 0 15px rgba(255, 255, 255, 0.04),
      0 12px 40px rgba(0, 0, 0, 0.35);
  }

  &__option {
    padding: 8px 14px;
    border-radius: var(--dream-radius-sm);
    cursor: pointer;
    transition: all var(--dream-transition-fast);
    color: var(--dream-text-secondary);
    font-size: var(--dream-text-sm);

    &:hover {
      background: var(--dream-bg-secondary);
      color: var(--dream-text-primary);
    }

    &--active {
      background: var(--dream-bg-elevated);
      color: var(--dream-text-primary);
    }
  }

  /* Sizes */
  &--sm .d-glass-select__trigger {
    padding: 6px 12px; font-size: var(--dream-text-sm);
    border-radius: var(--dream-radius-sm);
  }
  &--md .d-glass-select__trigger { padding: 10px 14px; font-size: var(--dream-text-base); }
  &--lg .d-glass-select__trigger {
    padding: 14px 18px; font-size: var(--dream-text-lg);
    border-radius: var(--dream-radius-lg);
  }

  &--disabled { opacity: 0.35; pointer-events: none; }
}

.dream-dropdown-enter-active,
.dream-dropdown-leave-active { transition: all 0.2s ease; }
.dream-dropdown-enter-from,
.dream-dropdown-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
