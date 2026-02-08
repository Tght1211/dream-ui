<template>
  <div class="d-glass-timeline">
    <div
      v-for="(item, i) in items"
      :key="i"
      :class="['d-glass-timeline__item', { 'd-glass-timeline__item--active': item.active }]"
    >
      <div class="d-glass-timeline__dot">
        <span v-if="item.icon" class="d-glass-timeline__icon">{{ item.icon }}</span>
      </div>
      <div class="d-glass-timeline__content">
        <span v-if="item.time" class="d-glass-timeline__time">{{ item.time }}</span>
        <h4 v-if="item.title" class="d-glass-timeline__title">{{ item.title }}</h4>
        <p v-if="item.desc" class="d-glass-timeline__desc">{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassTimeline - 玻璃拟态时间线
 * @author buchi
 * @since 2026-02-08
 */
defineOptions({ name: 'DGlassTimeline' })

interface TimelineItem {
  title?: string
  desc?: string
  time?: string
  icon?: string
  active?: boolean
}

defineProps<{ items: TimelineItem[] }>()
</script>

<style scoped lang="scss">
.d-glass-timeline {
  position: relative;
  padding-left: 28px;

  &__item {
    position: relative;
    padding-bottom: var(--dream-space-xl);
    padding-left: var(--dream-space-xl);

    &:last-child { padding-bottom: 0; }

    /* 连线 */
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 12px;
      bottom: 0;
      width: 1px;
      background: rgba(255,255,255,0.08);
    }

    &:last-child::before { display: none; }

    &--active .d-glass-timeline__dot {
      background: rgba(255,255,255,0.15);
      border-color: rgba(255,255,255,0.40);
      box-shadow:
        0 0 1px rgba(255,255,255,0.30),
        0 0 10px rgba(255,255,255,0.08);
    }
  }

  &__dot {
    position: absolute;
    left: -5px;
    top: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--dream-bg-secondary);
    border: 1.5px solid rgba(255,255,255,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    transition: all var(--dream-transition-base);
  }

  &__icon {
    font-size: 6px;
  }

  &__time {
    font-size: var(--dream-text-xs);
    color: var(--dream-text-tertiary);
    font-variant-numeric: tabular-nums;
  }

  &__title {
    font-size: var(--dream-text-sm);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
    margin: 2px 0 4px;
  }

  &__desc {
    font-size: var(--dream-text-sm);
    color: var(--dream-text-secondary);
    margin: 0;
    line-height: 1.6;
  }
}
</style>
