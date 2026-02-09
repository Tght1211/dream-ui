<template>
  <div
    :class="[
      'd-mobile-divider',
      `d-mobile-divider--${contentPosition}`,
      { 'd-mobile-divider--hairline': hairline, 'd-mobile-divider--dashed': dashed }
    ]"
  >
    <slot>
      <span v-if="text" class="d-mobile-divider__text">{{ text }}</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileDivider - 移动端分隔线
 * @author buchi
 * @since 2026-02-09
 */
defineOptions({ name: 'DMobileDivider' })

interface Props {
  text?: string
  contentPosition?: 'left' | 'center' | 'right'
  hairline?: boolean
  dashed?: boolean
}

withDefaults(defineProps<Props>(), {
  text: '',
  contentPosition: 'center',
  hairline: true,
  dashed: false,
})
</script>

<style scoped lang="scss">
.d-mobile-divider {
  display: flex;
  align-items: center;
  margin: 16px 0;
  font-size: var(--dream-mobile-text-sm);
  color: var(--dream-text-tertiary);

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.10);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.04);
  }

  &--hairline {
    &::before, &::after {
      transform: scaleY(0.5);
    }
  }

  &--dashed {
    &::before, &::after {
      background: none;
      border-top: 1px dashed rgba(255, 255, 255, 0.10);
      height: 0;
    }
  }

  /* 内容位置 */
  &--left::before { max-width: 10%; }
  &--right::after { max-width: 10%; }

  &__text {
    padding: 0 16px;
    white-space: nowrap;
  }
}
</style>
