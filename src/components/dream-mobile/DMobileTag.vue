<template>
  <span
    :class="[
      'd-mobile-tag',
      `d-mobile-tag--${type}`,
      `d-mobile-tag--${size}`,
      { 'd-mobile-tag--plain': plain, 'd-mobile-tag--round': round }
    ]"
    :style="[glassVars, customStyle]"
  >
    <slot>{{ text }}</slot>
    <span v-if="closeable" class="d-mobile-tag__close" @click.stop="$emit('close')">✕</span>
  </span>
</template>

<script setup lang="ts">
/**
 * DMobileTag - 移动端标签
 * @author buchi
 * @since 2026-02-09
 */
import { computed } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileTag' })

interface Props extends GlassCustomProps {
  text?: string
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'medium' | 'large'
  plain?: boolean
  round?: boolean
  closeable?: boolean
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  type: 'default',
  size: 'medium',
  plain: false,
  round: false,
  closeable: false,
  color: '',
})

defineEmits<{ close: [] }>()
const { glassVars } = useGlassStyle(props)

const customStyle = computed(() => props.color ? { '--tag-color': props.color } : {})
</script>

<style scoped lang="scss">
$types: (
  default: rgba(255, 255, 255, 0.60),
  primary: rgba(96, 165, 250, 0.70),
  success: rgba(74, 222, 128, 0.70),
  warning: rgba(251, 191, 36, 0.70),
  danger:  rgba(248, 113, 113, 0.70),
);

.d-mobile-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: var(--dream-radius-sm);
  font-weight: var(--dream-font-medium);
  white-space: nowrap;
  transition: all 0.2s ease;

  @each $name, $color in $types {
    &--#{$name} {
      background: rgba($color, 0.12);
      color: var(--tag-color, $color);
      border: 1px solid rgba($color, 0.20);
    }

    &--#{$name}.d-mobile-tag--plain {
      background: transparent;
    }
  }

  &--small {
    font-size: 10px;
    padding: 1px 4px;
  }
  &--medium {
    font-size: 12px;
    padding: 2px 6px;
  }
  &--large {
    font-size: 14px;
    padding: 4px 8px;
  }

  &--round {
    border-radius: 999px;
  }

  &__close {
    font-size: 10px;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
    &:active { opacity: 1; }
  }
}
</style>
