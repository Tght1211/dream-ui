<template>
  <div class="d-glass-collapse" :style="glassVars">
    <div
      v-for="(item, i) in items"
      :key="i"
      :class="['d-glass-collapse__item', { 'd-glass-collapse__item--open': openKeys.includes(i) }]"
    >
      <button class="d-glass-collapse__header" @click="toggle(i)">
        <span class="d-glass-collapse__title">{{ item.title }}</span>
        <span class="d-glass-collapse__arrow">▾</span>
      </button>
      <Transition name="collapse">
        <div v-if="openKeys.includes(i)" class="d-glass-collapse__body">
          <div class="d-glass-collapse__content">{{ item.content }}</div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassCollapse - 玻璃拟态折叠面板
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassCollapse' })

interface CollapseItem {
  title: string
  content: string
}

interface Props extends GlassCustomProps {
  items: CollapseItem[]
  accordion?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  accordion: false,
})

const { glassVars } = useGlassStyle(props)

const openKeys = ref<number[]>([])

const toggle = (idx: number) => {
  if (openKeys.value.includes(idx)) {
    openKeys.value = openKeys.value.filter(k => k !== idx)
  } else {
    openKeys.value = props.accordion ? [idx] : [...openKeys.value, idx]
  }
}
</script>

<style scoped lang="scss">
.d-glass-collapse {
  border: 1px solid var(--_glass-border, var(--dream-border-default));
  border-radius: var(--dream-radius-lg);
  overflow: hidden;
  backdrop-filter: blur(20px);
  background: var(--_glass-bg, var(--dream-bg-primary));
  box-shadow:
    inset 0 0 15px rgba(255,255,255,0.03),
    0 0 1px var(--_glass-glow, rgba(255,255,255,0.12));

  &__item {
    border-bottom: 1px solid rgba(255,255,255,0.06);
    &:last-child { border-bottom: none; }
  }

  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--dream-space-lg) var(--dream-space-xl);
    background: transparent;
    border: none;
    color: var(--dream-text-primary);
    font-size: var(--dream-text-sm);
    font-weight: var(--dream-font-medium);
    cursor: pointer;
    transition: all var(--dream-transition-fast);

    &:hover { background: rgba(255,255,255,0.03); }
  }

  &__arrow {
    font-size: 12px;
    color: var(--dream-text-tertiary);
    transition: transform var(--dream-transition-fast);
  }

  &__item--open .d-glass-collapse__arrow {
    transform: rotate(180deg);
  }

  &__body {
    overflow: hidden;
  }

  &__content {
    padding: 0 var(--dream-space-xl) var(--dream-space-lg);
    font-size: var(--dream-text-sm);
    color: var(--dream-text-secondary);
    line-height: 1.7;
  }
}

.collapse-enter-active, .collapse-leave-active {
  transition: all 0.25s ease;
  max-height: 300px;
}
.collapse-enter-from, .collapse-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
