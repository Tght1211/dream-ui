<template>
  <div class="d-glass-tabs" :style="glassVars">
    <div class="d-glass-tabs__header">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['d-glass-tabs__item', { 'd-glass-tabs__item--active': modelValue === tab.key }]"
        @click="$emit('update:modelValue', tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="d-glass-tabs__body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassTabs - 玻璃拟态标签页
 * @author buchi
 * @since 2026-02-08
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassTabs' })

interface TabItem {
  key: string
  label: string
}

interface Props extends GlassCustomProps {
  modelValue: string
  tabs: TabItem[]
}

const props = defineProps<Props>()
defineEmits<{ 'update:modelValue': [value: string] }>()

const { glassVars } = useGlassStyle(props)
</script>

<style scoped lang="scss">
.d-glass-tabs {
  &__header {
    display: flex;
    gap: 2px;
    padding: 3px;
    backdrop-filter: blur(16px);
    background: var(--dream-bg-primary);
    border: 1px solid var(--dream-border-default);
    border-radius: var(--dream-radius-md);
    box-shadow:
      inset 0 0 12px rgba(255,255,255,0.02),
      0 0 1px rgba(255,255,255,0.10);
    width: fit-content;
    margin-bottom: var(--dream-space-lg);
  }

  &__item {
    padding: 8px 18px;
    font-size: var(--dream-text-sm);
    font-weight: var(--dream-font-medium);
    color: var(--dream-text-tertiary);
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--dream-radius-sm);
    cursor: pointer;
    transition: all var(--dream-transition-fast);
    white-space: nowrap;

    &:hover {
      color: var(--dream-text-secondary);
    }

    &--active {
      color: var(--dream-text-primary);
      background: var(--dream-bg-elevated);
      border-color: rgba(255,255,255,0.12);
      box-shadow:
        inset 0 0 10px rgba(255,255,255,0.03),
        0 0 1px rgba(255,255,255,0.15),
        0 0 8px rgba(255,255,255,0.03);
    }
  }

  &__body {
    min-height: 40px;
  }
}
</style>
