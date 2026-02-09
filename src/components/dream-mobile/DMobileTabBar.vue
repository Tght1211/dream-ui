<template>
  <div
    :class="['d-mobile-tabbar', { 'd-mobile-tabbar--fixed': fixed, 'd-mobile-tabbar--border': border }]"
    :style="glassVars"
  >
    <div class="d-mobile-tabbar__content">
      <div
        v-for="(item, index) in items"
        :key="item.key ?? index"
        :class="['d-mobile-tabbar__item', { 'd-mobile-tabbar__item--active': modelValue === (item.key ?? index) }]"
        @click="handleClick(item.key ?? index)"
      >
        <div class="d-mobile-tabbar__icon">
          <slot :name="`icon-${item.key ?? index}`" :active="modelValue === (item.key ?? index)">
            <span v-if="item.icon" class="d-mobile-tabbar__icon-text">{{ item.icon }}</span>
          </slot>
          <span
            v-if="item.badge"
            class="d-mobile-tabbar__badge"
          >{{ typeof item.badge === 'boolean' ? '' : item.badge }}</span>
        </div>
        <span class="d-mobile-tabbar__label">{{ item.label }}</span>
      </div>
    </div>
    <div class="d-mobile-tabbar__safe-area" />
  </div>
  <!-- 占位 -->
  <div v-if="fixed && placeholder" class="d-mobile-tabbar__placeholder" />
</template>

<script setup lang="ts">
/**
 * DMobileTabBar - 移动端底部标签栏
 * 支持图标、徽章、自定义插槽
 * @author buchi
 * @since 2026-02-09
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileTabBar' })

export interface TabBarItem {
  /** 唯一标识 */
  key?: string | number
  /** 标签文字 */
  label: string
  /** 图标（emoji 或文本） */
  icon?: string
  /** 徽章（true=圆点，数字=数字徽章） */
  badge?: boolean | number | string
}

interface Props extends GlassCustomProps {
  /** 当前选中项 */
  modelValue?: string | number
  /** 标签项配置 */
  items?: TabBarItem[]
  /** 固定在底部 */
  fixed?: boolean
  /** 固定时显示占位 */
  placeholder?: boolean
  /** 显示顶部边框 */
  border?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  items: () => [],
  fixed: true,
  placeholder: true,
  border: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const { glassVars } = useGlassStyle(props)

const handleClick = (key: string | number) => {
  emit('update:modelValue', key)
  emit('change', key)
}
</script>

<style scoped lang="scss">
.d-mobile-tabbar {
  position: relative;
  backdrop-filter: blur(40px) saturate(1.2);
  -webkit-backdrop-filter: blur(40px) saturate(1.2);
  background: var(--_glass-bg, var(--dream-bg-primary));
  z-index: var(--dream-z-sticky);

  &--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &--border {
    border-top: 1px solid var(--_glass-border, var(--dream-border-default));
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.18)),
      0 0 15px rgba(255, 255, 255, 0.04),
      0 -4px 20px rgba(0, 0, 0, 0.15);
  }

  &__content {
    display: flex;
    align-items: center;
    height: var(--dream-mobile-tabbar-height);
  }

  &__safe-area {
    height: var(--dream-safe-bottom);
  }

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: all var(--dream-mobile-transition-fast);
    position: relative;

    &:active {
      opacity: var(--dream-mobile-active-opacity);
    }

    &--active {
      .d-mobile-tabbar__icon {
        color: var(--dream-color-primary);
        filter: drop-shadow(0 0 6px var(--dream-color-primary-glow));
      }

      .d-mobile-tabbar__label {
        color: var(--dream-color-primary);
      }
    }
  }

  &__icon {
    position: relative;
    font-size: 22px;
    line-height: 1;
    color: var(--dream-text-secondary);
    transition: all var(--dream-mobile-transition-fast);
    margin-bottom: 2px;
  }

  &__icon-text {
    display: block;
  }

  &__badge {
    position: absolute;
    top: -4px;
    right: -10px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    font-size: 10px;
    line-height: 16px;
    text-align: center;
    color: var(--dream-text-primary);
    background: var(--dream-color-danger);
    border-radius: var(--dream-radius-full);
    box-shadow: 0 0 8px var(--dream-color-danger-glow);

    &:empty {
      min-width: 8px;
      height: 8px;
      padding: 0;
    }
  }

  &__label {
    font-size: var(--dream-mobile-text-xs);
    color: var(--dream-text-tertiary);
    transition: color var(--dream-mobile-transition-fast);
  }

  &__placeholder {
    height: calc(var(--dream-mobile-tabbar-height) + var(--dream-safe-bottom));
  }
}
</style>
