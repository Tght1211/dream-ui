<template>
  <div
    :class="[
      'd-mobile-grid-card',
      { 'd-mobile-grid-card--pressing': pressing }
    ]"
    :style="glassVars"
    v-bind="touchHandlers"
    @click="$emit('click')"
  >
    <!-- 可选标题 -->
    <div v-if="title || $slots.header" class="d-mobile-grid-card__header">
      <slot name="header">
        <span class="d-mobile-grid-card__title">{{ title }}</span>
      </slot>
    </div>

    <!-- 智能图片网格 -->
    <div class="d-mobile-grid-card__body" :class="contentSizeClass">
      <template v-if="items.length > 0">
        <div class="d-mobile-grid-card__grid" :class="gridClass">
          <div
            v-for="(item, index) in displayItems"
            :key="getItemKey(item, index)"
            :class="[
              'd-mobile-grid-card__item',
              getItemClass(index),
            ]"
            :style="{ animationDelay: `${index * 60}ms` }"
            @click.stop="$emit('item-click', item, index)"
          >
            <slot name="item" :item="item" :index="index" :featured="isFeatured(index)">
              <img
                v-if="getItemImage(item)"
                :src="getItemImage(item)"
                :alt="getItemLabel(item)"
                class="d-mobile-grid-card__img"
              />
              <div v-else class="d-mobile-grid-card__placeholder">
                <span>{{ getItemLabel(item).charAt(0) }}</span>
              </div>
              <!-- 名称浮层 -->
              <div class="d-mobile-grid-card__overlay">
                <span class="d-mobile-grid-card__name">{{ getItemLabel(item) }}</span>
              </div>
            </slot>
          </div>
          <!-- 更多 -->
          <div
            v-if="items.length > maxDisplay"
            class="d-mobile-grid-card__item d-mobile-grid-card__more"
            @click.stop="$emit('show-more')"
          >
            <span class="d-mobile-grid-card__more-num">+{{ items.length - maxDisplay }}</span>
            <span class="d-mobile-grid-card__more-text">{{ moreText }}</span>
          </div>
        </div>
      </template>
      <!-- 空状态 -->
      <div v-else class="d-mobile-grid-card__empty">
        <slot name="empty">
          <span class="d-mobile-grid-card__empty-text">{{ emptyText }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileGridCard - 移动端智能图片网格组件
 * Apple 风格多图智能排列：首图放大、动态列数、入场动画
 * 核心逻辑来源：rat-chronicles WardrobeBox
 * @author buchi
 * @since 2026-02-09
 */
import { computed } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'
import { useTouchFeedback } from '../../composables/useTouchFeedback'

defineOptions({ name: 'DMobileGridCard' })

export interface GridCardItem {
  /** 唯一标识 */
  id?: string | number
  /** 名称 */
  label?: string
  /** 图片地址 */
  image?: string
  /** 透传给插槽 */
  [key: string]: unknown
}

interface Props extends GlassCustomProps {
  /** 可选标题 */
  title?: string
  /** 数据列表 */
  items?: GridCardItem[]
  /** 最大展示项数 */
  maxDisplay?: number
  /** 更多按钮文字 */
  moreText?: string
  /** 空状态文字 */
  emptyText?: string
  /** 项目 key 字段名 */
  itemKey?: string
  /** 项目 label 字段名 */
  itemLabelField?: string
  /** 项目 image 字段名 */
  itemImageField?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  items: () => [],
  maxDisplay: 15,
  moreText: '更多',
  emptyText: '暂无内容',
  itemKey: 'id',
  itemLabelField: 'label',
  itemImageField: 'image',
})

defineEmits<{
  click: []
  'item-click': [item: GridCardItem, index: number]
  'show-more': []
}>()

const { glassVars } = useGlassStyle(props)
const { pressing, touchHandlers } = useTouchFeedback()

const displayItems = computed(() => props.items.slice(0, props.maxDisplay))

// ========== 智能网格逻辑（对齐 WardrobeBox） ==========

/** 网格列数 + 居中 */
const gridClass = computed(() => {
  const len = props.items.length
  if (len === 1) return 'd-mobile-grid-card__grid--cols-1'
  if (len === 2) return 'd-mobile-grid-card__grid--cols-2'
  if (len === 3) return 'd-mobile-grid-card__grid--cols-3'
  return 'd-mobile-grid-card__grid--cols-4'
})

/** 首图是否放大（4 件及以上） */
const isFeatured = (index: number) => index === 0 && props.items.length >= 4

/** 网格项布局类 */
const getItemClass = (index: number) => isFeatured(index) ? 'd-mobile-grid-card__item--featured' : ''

/** 内容区高度分级 */
const contentSizeClass = computed(() => {
  const len = props.items.length
  if (len === 0) return 'd-mobile-grid-card__body--empty'
  if (len <= 3) return 'd-mobile-grid-card__body--sm'
  if (len <= 7) return 'd-mobile-grid-card__body--md'
  if (len <= 15) return 'd-mobile-grid-card__body--lg'
  return 'd-mobile-grid-card__body--xl'
})

// ========== 字段读取 ==========

const getItemKey = (item: GridCardItem, index: number): string | number =>
  (item[props.itemKey] as string | number) ?? index

const getItemLabel = (item: GridCardItem): string =>
  (item[props.itemLabelField] as string) || '未命名'

const getItemImage = (item: GridCardItem): string | undefined =>
  item[props.itemImageField] as string | undefined
</script>

<style scoped lang="scss">
.d-mobile-grid-card {
  position: relative;
  backdrop-filter: blur(24px) saturate(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.1);
  background: var(--_glass-bg, rgba(255, 255, 255, 0.04));
  border: 1px solid var(--_glass-border, rgba(255, 255, 255, 0.18));
  border-radius: var(--dream-radius-xl);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow:
    inset 0 0 20px rgba(255, 255, 255, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.20)),
    0 0 15px rgba(255, 255, 255, 0.04),
    0 8px 32px rgba(0, 0, 0, 0.25);

  &--pressing {
    transform: scale(0.98) !important;
    transition-duration: 0.1s !important;
  }

  /* ========== 可选标题 ========== */
  &__header {
    padding: 14px 16px 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  &__title {
    font-size: var(--dream-mobile-text-lg);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
  }

  /* ========== 网格内容区 ========== */
  &__body {
    padding: 12px;

    &--empty { min-height: 120px; }
    &--sm { min-height: 140px; }
    &--md { min-height: 200px; }
    &--lg { min-height: 240px; }
    &--xl { min-height: 260px; }
  }

  &__grid {
    display: grid;
    gap: 6px;

    &--cols-1 { grid-template-columns: 1fr; }
    &--cols-2 { grid-template-columns: repeat(2, 1fr); }
    &--cols-3 { grid-template-columns: repeat(3, 1fr); }
    &--cols-4 { grid-template-columns: repeat(4, 1fr); }

    /* 单项：全宽横幅图片 */
    &--cols-1 .d-mobile-grid-card__item {
      aspect-ratio: 16 / 9;
    }
  }

  /* ========== 网格项 ========== */
  &__item {
    aspect-ratio: 1;
    border-radius: var(--dream-radius-md);
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    backdrop-filter: blur(12px) saturate(1.1);
    -webkit-backdrop-filter: blur(12px) saturate(1.1);
    background: var(--dream-bg-primary);
    border: 1px solid var(--dream-border-default);
    box-shadow:
      inset 0 0 8px rgba(255, 255, 255, 0.02),
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 0 1px rgba(255, 255, 255, 0.10),
      0 2px 8px rgba(0, 0, 0, 0.15);

    &:active {
      transform: scale(0.95);
    }

    /* 首图放大：2 列 2 行 */
    &--featured {
      grid-column: span 2;
      grid-row: span 2;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
  }

  &__item:hover &__img {
    transform: scale(1.08);
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.06) 100%);
    color: var(--dream-text-tertiary);
    font-size: 20px;
    font-weight: var(--dream-font-semibold);

    /* 图片占位图标 */
    &::before {
      content: '';
      width: 28px;
      height: 28px;
      border: 2px solid rgba(255, 255, 255, 0.12);
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.04);
    }
  }

  /* 首图/单项占位符更大 */
  &__item--featured &__placeholder,
  &__grid--cols-1 &__placeholder {
    font-size: 28px;

    &::before {
      width: 40px;
      height: 40px;
    }
  }

  &__overlay {
    position: absolute;
    inset: auto 0 0;
    padding: 6px 8px;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.08), transparent);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &__item:hover &__overlay {
    opacity: 1;
  }

  &__name {
    font-size: 11px;
    color: var(--dream-text-primary);
    font-weight: var(--dream-font-medium);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }

  /* ========== 更多按钮 ========== */
  &__more {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
  }

  &__more-num {
    font-size: var(--dream-mobile-text-lg);
    font-weight: var(--dream-font-bold);
    color: var(--dream-text-secondary);
  }

  &__more-text {
    font-size: var(--dream-mobile-text-xs);
    color: var(--dream-text-tertiary);
    margin-top: 2px;
  }

  /* ========== 空状态 ========== */
  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: inherit;
  }

  &__empty-text {
    font-size: var(--dream-mobile-text-sm);
    color: var(--dream-text-tertiary);
  }
}

/* 入场动画 */
.d-mobile-grid-card__grid > * {
  animation: grid-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@for $i from 1 through 16 {
  .d-mobile-grid-card__grid > *:nth-child(#{$i}) {
    animation-delay: #{($i - 1) * 0.06}s;
  }
}

@keyframes grid-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
