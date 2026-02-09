<template>
  <div class="d-mobile-collapse" :style="glassVars">
    <div
      v-for="(item, idx) in items"
      :key="item.name"
      :class="['d-mobile-collapse__item', { 'd-mobile-collapse__item--open': openSet.has(item.name) }]"
    >
      <div class="d-mobile-collapse__header" @click="toggle(item.name)">
        <span v-if="item.icon" class="d-mobile-collapse__icon">{{ item.icon }}</span>
        <span class="d-mobile-collapse__title">{{ item.title }}</span>
        <span class="d-mobile-collapse__value">{{ item.value || '' }}</span>
        <span class="d-mobile-collapse__arrow">&#8250;</span>
      </div>
      <Transition name="collapse-slide">
        <div v-show="openSet.has(item.name)" class="d-mobile-collapse__body">
          <div class="d-mobile-collapse__content">
            <slot :name="item.name" :item="item" :index="idx">
              {{ item.content || '' }}
            </slot>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileCollapse - 移动端折叠面板
 * @author buchi
 * @since 2026-02-09
 */
import { ref, watch } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileCollapse' })

export interface CollapseItem {
  name: string
  title: string
  content?: string
  icon?: string
  value?: string
}

interface Props extends GlassCustomProps {
  modelValue?: string[]
  items?: CollapseItem[]
  accordion?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  items: () => [],
  accordion: false,
})

const emit = defineEmits<{
  'update:modelValue': [names: string[]]
  change: [names: string[]]
}>()

const { glassVars } = useGlassStyle(props)
const openSet = ref<Set<string>>(new Set(props.modelValue))

watch(() => props.modelValue, (val) => { openSet.value = new Set(val) }, { deep: true })

const toggle = (name: string) => {
  const s = new Set(openSet.value)
  if (s.has(name)) {
    s.delete(name)
  } else {
    if (props.accordion) s.clear()
    s.add(name)
  }
  openSet.value = s
  const arr = Array.from(s)
  emit('update:modelValue', arr)
  emit('change', arr)
}
</script>

<style scoped lang="scss">
.d-mobile-collapse {
  backdrop-filter: blur(20px) saturate(1.1);
  -webkit-backdrop-filter: blur(20px) saturate(1.1);
  background: var(--_glass-bg, rgba(255, 255, 255, 0.03));
  border: 1px solid var(--_glass-border, rgba(255, 255, 255, 0.12));
  border-radius: var(--dream-radius-lg);
  overflow: hidden;
  box-shadow:
    inset 0 0 16px rgba(255, 255, 255, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.10),
    0 0 1px rgba(255, 255, 255, 0.10),
    0 4px 20px rgba(0, 0, 0, 0.18);

  &__item {
    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    &--open > .d-mobile-collapse__header .d-mobile-collapse__arrow {
      transform: rotate(90deg);
    }
  }

  &__header {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: background 0.2s;

    &:active {
      background: rgba(255, 255, 255, 0.04);
    }
  }

  &__icon {
    margin-right: 8px;
    font-size: 16px;
  }

  &__title {
    flex: 1;
    font-size: var(--dream-mobile-text-base);
    color: var(--dream-text-primary);
  }

  &__value {
    font-size: var(--dream-mobile-text-sm);
    color: var(--dream-text-tertiary);
    margin-right: 4px;
  }

  &__arrow {
    font-size: 16px;
    color: var(--dream-text-tertiary);
    transition: transform 0.3s ease;
  }

  &__body {
    overflow: hidden;
  }

  &__content {
    padding: 0 16px 14px;
    font-size: var(--dream-mobile-text-sm);
    color: var(--dream-text-secondary);
    line-height: 1.6;
  }
}

/* 展开/折叠动画 */
.collapse-slide-enter-active,
.collapse-slide-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
}
.collapse-slide-enter-from,
.collapse-slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
