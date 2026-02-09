<template>
  <div
    :class="['d-mobile-navbar', { 'd-mobile-navbar--fixed': fixed, 'd-mobile-navbar--border': border }]"
    :style="[glassVars, fixed ? { paddingTop: 'var(--dream-safe-top)' } : {}]"
  >
    <div class="d-mobile-navbar__content">
      <div class="d-mobile-navbar__left" @click="$emit('click-left', $event)">
        <slot name="left">
          <span v-if="leftArrow" class="d-mobile-navbar__arrow">&#8249;</span>
          <span v-if="leftText" class="d-mobile-navbar__left-text">{{ leftText }}</span>
        </slot>
      </div>
      <div class="d-mobile-navbar__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="d-mobile-navbar__right" @click="$emit('click-right', $event)">
        <slot name="right">
          <span v-if="rightText" class="d-mobile-navbar__right-text">{{ rightText }}</span>
        </slot>
      </div>
    </div>
  </div>
  <!-- 占位，防止 fixed 定位遮挡内容 -->
  <div v-if="fixed && placeholder" class="d-mobile-navbar__placeholder" />
</template>

<script setup lang="ts">
/**
 * DMobileNavBar - 移动端顶部导航栏
 * 支持返回按钮、标题、右侧操作区
 * @author buchi
 * @since 2026-02-09
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileNavBar' })

interface Props extends GlassCustomProps {
  /** 标题 */
  title?: string
  /** 左侧文字 */
  leftText?: string
  /** 右侧文字 */
  rightText?: string
  /** 显示左侧返回箭头 */
  leftArrow?: boolean
  /** 固定在顶部 */
  fixed?: boolean
  /** 固定时是否显示占位 */
  placeholder?: boolean
  /** 显示底部边框 */
  border?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  leftText: '',
  rightText: '',
  leftArrow: false,
  fixed: false,
  placeholder: false,
  border: true,
})

const { glassVars } = useGlassStyle(props)

defineEmits<{
  'click-left': [event: MouseEvent]
  'click-right': [event: MouseEvent]
}>()
</script>

<style scoped lang="scss">
.d-mobile-navbar {
  position: relative;
  backdrop-filter: blur(40px) saturate(1.2);
  -webkit-backdrop-filter: blur(40px) saturate(1.2);
  background: var(--_glass-bg, rgba(255, 255, 255, 0.08));
  z-index: var(--dream-z-sticky);

  &--fixed {
    position: sticky;
    top: 0;
  }

  &--border {
    border-bottom: 1px solid var(--_glass-border, rgba(255, 255, 255, 0.10));
    box-shadow:
      inset 0 -1px 0 rgba(255, 255, 255, 0.05),
      inset 0 0 30px rgba(255, 255, 255, 0.02),
      0 0 1px rgba(255, 255, 255, 0.10),
      0 4px 30px rgba(0, 0, 0, 0.20);
  }

  &__content {
    display: flex;
    align-items: center;
    height: var(--dream-mobile-navbar-height);
    padding: 0 var(--dream-mobile-padding);
  }

  &__left,
  &__right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    min-width: 48px;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:active {
      opacity: var(--dream-mobile-active-opacity);
    }
  }

  &__left {
    justify-content: flex-start;
  }

  &__right {
    justify-content: flex-end;
  }

  &__arrow {
    font-size: 24px;
    color: var(--dream-text-primary);
    line-height: 1;
    margin-right: 2px;
  }

  &__left-text,
  &__right-text {
    font-size: var(--dream-mobile-text-base);
    color: var(--dream-color-primary);
  }

  &__title {
    flex: 1;
    text-align: center;
    font-size: var(--dream-mobile-text-lg);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 var(--dream-space-sm);
  }

  &__placeholder {
    height: var(--dream-mobile-navbar-height);
    // 加上安全区域高度
    padding-top: var(--dream-safe-top);
  }
}
</style>
