<template>
  <label
    :class="[
      'd-glass-switch',
      `d-glass-switch--${size}`,
      {
        'd-glass-switch--checked': modelValue,
        'd-glass-switch--disabled': disabled,
      }
    ]"
  >
    <input
      type="checkbox"
      class="d-glass-switch__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="toggle"
    />
    <span class="d-glass-switch__track">
      <span class="d-glass-switch__thumb" />
    </span>
    <span v-if="$slots.default" class="d-glass-switch__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
/**
 * DGlassSwitch - 玻璃拟态开关组件
 * @author buchi
 * @since 2026-02-08
 */
defineOptions({ name: 'DGlassSwitch' })

interface Props {
  modelValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  size: 'md',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style scoped lang="scss">
.d-glass-switch {
  display: inline-flex;
  align-items: center;
  gap: var(--dream-space-sm);
  cursor: pointer;
  user-select: none;

  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  &__track {
    position: relative;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background: var(--dream-bg-primary);
    border: 1px solid var(--dream-border-default);
    border-radius: var(--dream-radius-full);
    transition: all var(--dream-transition-base);

    box-shadow:
      inset 0 0 8px rgba(255, 255, 255, 0.02),
      0 0 1px rgba(255, 255, 255, 0.10),
      0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    background: rgba(255, 255, 255, 0.50);
    border-radius: 50%;
    transition: all var(--dream-transition-base);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }

  &__label {
    font-size: var(--dream-text-sm);
    color: var(--dream-text-secondary);
  }

  /* Sizes */
  &--sm .d-glass-switch__track { width: 36px; height: 20px; }
  &--sm .d-glass-switch__thumb { width: 14px; height: 14px; }
  &--md .d-glass-switch__track { width: 44px; height: 24px; }
  &--md .d-glass-switch__thumb { width: 18px; height: 18px; }
  &--lg .d-glass-switch__track { width: 52px; height: 28px; }
  &--lg .d-glass-switch__thumb { width: 22px; height: 22px; }

  /* Checked — 白色光晕变亮 */
  &--checked .d-glass-switch__track {
    background: rgba(255, 255, 255, 0.10);
    border-color: rgba(255, 255, 255, 0.30);
    box-shadow:
      inset 0 0 12px rgba(255, 255, 255, 0.05),
      0 0 1px rgba(255, 255, 255, 0.25),
      0 0 12px rgba(255, 255, 255, 0.06);
  }

  &--checked .d-glass-switch__thumb {
    background: rgba(255, 255, 255, 0.85);
    box-shadow:
      0 0 8px rgba(255, 255, 255, 0.30),
      0 1px 4px rgba(0, 0, 0, 0.2);
  }

  &--checked.d-glass-switch--sm .d-glass-switch__thumb { transform: translateX(16px); }
  &--checked.d-glass-switch--md .d-glass-switch__thumb { transform: translateX(20px); }
  &--checked.d-glass-switch--lg .d-glass-switch__thumb { transform: translateX(24px); }

  &--disabled { opacity: 0.35; cursor: not-allowed; }
}
</style>
