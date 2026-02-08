<template>
  <div
    :class="[
      'd-glass-avatar',
      `d-glass-avatar--${size}`,
      `d-glass-avatar--${variant}`,
    ]"
  >
    <img v-if="src" :src="src" :alt="alt" class="d-glass-avatar__img" />
    <span v-else class="d-glass-avatar__fallback">{{ initials }}</span>
    <span v-if="status" :class="['d-glass-avatar__status', `d-glass-avatar__status--${status}`]" />
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassAvatar - 玻璃拟态头像组件
 * @author buchi
 * @since 2026-02-08
 */
import { computed } from 'vue'

defineOptions({ name: 'DGlassAvatar' })

interface Props {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'primary' | 'success' | 'info'
  status?: 'online' | 'offline' | 'busy' | ''
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  alt: '',
  name: '',
  size: 'md',
  variant: 'default',
  status: '',
})

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script>

<style scoped lang="scss">
.d-glass-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--dream-radius-full);
  backdrop-filter: blur(12px) saturate(1.1);
  -webkit-backdrop-filter: blur(12px) saturate(1.1);
  background: var(--dream-bg-secondary);
  border: 1.5px solid var(--dream-border-default);
  overflow: hidden;
  flex-shrink: 0;
  transition: all var(--dream-transition-base);

  /* 白色光晕 */
  box-shadow:
    inset 0 0 10px rgba(255, 255, 255, 0.03),
    0 0 1px rgba(255, 255, 255, 0.15),
    0 0 10px rgba(255, 255, 255, 0.03);

  &--sm { width: 32px; height: 32px; font-size: var(--dream-text-xs); }
  &--md { width: 40px; height: 40px; font-size: var(--dream-text-sm); }
  &--lg { width: 52px; height: 52px; font-size: var(--dream-text-lg); }
  &--xl { width: 72px; height: 72px; font-size: var(--dream-text-2xl); }

  &--primary {
    border-color: rgba(var(--dream-color-primary-rgb), 0.30);
    box-shadow:
      inset 0 0 10px rgba(var(--dream-color-primary-rgb), 0.04),
      0 0 1px rgba(var(--dream-color-primary-rgb), 0.25),
      0 0 12px rgba(var(--dream-color-primary-rgb), 0.08);
  }

  &--success {
    border-color: rgba(var(--dream-color-success-rgb), 0.30);
    box-shadow:
      inset 0 0 10px rgba(var(--dream-color-success-rgb), 0.04),
      0 0 1px rgba(var(--dream-color-success-rgb), 0.25),
      0 0 12px rgba(var(--dream-color-success-rgb), 0.08);
  }

  &--info {
    border-color: rgba(var(--dream-color-info-rgb), 0.30);
    box-shadow:
      inset 0 0 10px rgba(var(--dream-color-info-rgb), 0.04),
      0 0 1px rgba(var(--dream-color-info-rgb), 0.25),
      0 0 12px rgba(var(--dream-color-info-rgb), 0.08);
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__fallback {
    color: var(--dream-text-secondary);
    font-weight: var(--dream-font-semibold);
    user-select: none;
  }

  &__status {
    position: absolute;
    bottom: 1px;
    right: 1px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid rgba(10, 12, 16, 0.9);

    &--online {
      background: var(--dream-color-success);
      box-shadow: 0 0 6px rgba(var(--dream-color-success-rgb), 0.5);
    }
    &--offline { background: var(--dream-text-tertiary); }
    &--busy {
      background: var(--dream-color-danger);
      box-shadow: 0 0 6px rgba(var(--dream-color-danger-rgb), 0.5);
    }
  }
}
</style>
