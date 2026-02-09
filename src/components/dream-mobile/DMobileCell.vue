<template>
  <div
    :class="[
      'd-mobile-cell',
      {
        'd-mobile-cell--clickable': clickable || isLink,
        'd-mobile-cell--center': center,
        'd-mobile-cell--large': large,
        'd-mobile-cell--pressing': pressing,
      }
    ]"
    :style="glassVars"
    v-bind="clickable || isLink ? touchHandlers : {}"
    @click="handleClick"
  >
    <div v-if="$slots.icon || icon" class="d-mobile-cell__icon">
      <slot name="icon">
        <span>{{ icon }}</span>
      </slot>
    </div>
    <div class="d-mobile-cell__body">
      <div class="d-mobile-cell__title">
        <slot name="title">{{ title }}</slot>
        <div v-if="label" class="d-mobile-cell__label">{{ label }}</div>
      </div>
      <div class="d-mobile-cell__value">
        <slot>{{ value }}</slot>
      </div>
    </div>
    <div v-if="isLink" class="d-mobile-cell__arrow">&#8250;</div>
    <div v-if="$slots.extra" class="d-mobile-cell__extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileCell - 移动端单元格组件
 * 移动端列表最核心的布局组件
 * @author buchi
 * @since 2026-02-09
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'
import { useTouchFeedback } from '../../composables/useTouchFeedback'

defineOptions({ name: 'DMobileCell' })

interface Props extends GlassCustomProps {
  /** 左侧标题 */
  title?: string
  /** 右侧内容 */
  value?: string
  /** 标题下方描述 */
  label?: string
  /** 左侧图标 */
  icon?: string
  /** 是否为链接样式（显示箭头） */
  isLink?: boolean
  /** 是否可点击 */
  clickable?: boolean
  /** 内容垂直居中 */
  center?: boolean
  /** 大尺寸 */
  large?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  value: '',
  label: '',
  icon: '',
  isLink: false,
  clickable: false,
  center: false,
  large: false,
})

const { glassVars } = useGlassStyle(props)
const { pressing, touchHandlers } = useTouchFeedback()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (e: MouseEvent) => {
  if (props.clickable || props.isLink) {
    emit('click', e)
  }
}
</script>

<style scoped lang="scss">
.d-mobile-cell {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 12px var(--dream-mobile-padding);
  background: var(--_glass-bg, transparent);
  transition: background var(--dream-mobile-transition-fast);

  /* 底部分割线 - 白色边光 */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: var(--dream-mobile-padding);
    right: 0;
    height: 1px;
    background: var(--dream-border-default);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.04);
  }

  &--clickable,
  &--center {
    align-items: center;
  }

  &--clickable {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  &--pressing {
    background: var(--dream-mobile-touch-highlight);
  }

  &--large {
    padding-top: 16px;
    padding-bottom: 16px;

    .d-mobile-cell__title {
      font-size: var(--dream-mobile-text-lg);
    }
  }

  &__icon {
    flex-shrink: 0;
    margin-right: var(--dream-mobile-padding-xs);
    font-size: 20px;
    color: var(--dream-text-secondary);
    display: flex;
    align-items: center;
  }

  &__body {
    flex: 1;
    display: flex;
    align-items: center;
    min-width: 0;
  }

  &__title {
    flex: 1;
    color: var(--dream-text-primary);
    font-size: var(--dream-mobile-text-base);
    line-height: 1.4;
    min-width: 0;
  }

  &__label {
    margin-top: 4px;
    color: var(--dream-text-tertiary);
    font-size: var(--dream-mobile-text-sm);
    line-height: 1.3;
  }

  &__value {
    flex-shrink: 0;
    color: var(--dream-text-secondary);
    font-size: var(--dream-mobile-text-base);
    text-align: right;
    max-width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__arrow {
    flex-shrink: 0;
    margin-left: 4px;
    color: var(--dream-text-tertiary);
    font-size: 18px;
    line-height: 1;
  }

  &__extra {
    flex-shrink: 0;
    margin-left: var(--dream-space-sm);
  }
}
</style>
