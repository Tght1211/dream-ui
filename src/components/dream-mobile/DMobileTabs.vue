<template>
  <div class="d-mobile-tabs" :style="glassVars">
    <!-- Tab 头部 -->
    <div class="d-mobile-tabs__header" ref="headerRef">
      <div
        v-for="(tab, idx) in tabs"
        :key="tab.name"
        :class="['d-mobile-tabs__tab', { 'd-mobile-tabs__tab--active': modelValue === tab.name }]"
        @click="switchTab(tab.name, idx)"
      >
        <span v-if="tab.icon" class="d-mobile-tabs__icon">{{ tab.icon }}</span>
        <span class="d-mobile-tabs__label">{{ tab.title }}</span>
        <span v-if="tab.badge" class="d-mobile-tabs__badge">{{ tab.badge }}</span>
      </div>
      <!-- 底部滑动指示器 -->
      <div class="d-mobile-tabs__indicator" :style="indicatorStyle" />
    </div>
    <!-- Tab 内容 -->
    <div v-if="$slots.default" class="d-mobile-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileTabs - 移动端标签页
 * @author buchi
 * @since 2026-02-09
 */
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileTabs' })

export interface TabItem {
  name: string
  title: string
  icon?: string
  badge?: string | number
}

interface Props extends GlassCustomProps {
  modelValue?: string
  tabs?: TabItem[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  tabs: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [name: string]
  change: [name: string]
}>()

const { glassVars } = useGlassStyle(props)
const headerRef = ref<HTMLElement>()
const indicatorLeft = ref(0)
const indicatorWidth = ref(0)

const indicatorStyle = computed(() => ({
  width: `${indicatorWidth.value}px`,
  transform: `translateX(${indicatorLeft.value}px)`,
}))

const updateIndicator = () => {
  if (!headerRef.value) return
  const activeIdx = props.tabs.findIndex(t => t.name === props.modelValue)
  if (activeIdx < 0) return
  const tabs = headerRef.value.querySelectorAll('.d-mobile-tabs__tab')
  const el = tabs[activeIdx] as HTMLElement
  if (!el) return
  indicatorLeft.value = el.offsetLeft + (el.offsetWidth - 24) / 2
  indicatorWidth.value = 24
}

const switchTab = (name: string, _idx: number) => {
  emit('update:modelValue', name)
  emit('change', name)
}

watch(() => props.modelValue, () => nextTick(updateIndicator))
onMounted(() => { nextTick(updateIndicator) })
</script>

<style scoped lang="scss">
.d-mobile-tabs {
  &__header {
    display: flex;
    position: relative;
    backdrop-filter: blur(20px) saturate(1.1);
    -webkit-backdrop-filter: blur(20px) saturate(1.1);
    background: var(--_glass-bg, rgba(255, 255, 255, 0.03));
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow:
      inset 0 -1px 0 rgba(255, 255, 255, 0.04),
      0 0 1px rgba(255, 255, 255, 0.08);
  }

  &__tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 12px 8px;
    font-size: var(--dream-mobile-text-base);
    color: var(--dream-text-tertiary);
    cursor: pointer;
    transition: color 0.25s ease;
    -webkit-tap-highlight-color: transparent;
    position: relative;

    &--active {
      color: var(--dream-text-primary);
      font-weight: var(--dream-font-semibold);
    }

    &:active {
      opacity: var(--dream-mobile-active-opacity);
    }
  }

  &__icon {
    font-size: 16px;
  }

  &__badge {
    font-size: 10px;
    min-width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 8px;
    background: var(--dream-color-primary, rgba(96, 165, 250, 0.6));
    color: var(--dream-text-primary);
    padding: 0 4px;
  }

  &__indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    border-radius: 1.5px;
    background: rgba(255, 255, 255, 0.70);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.30);
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &__content {
    padding: 16px;
  }
}
</style>
