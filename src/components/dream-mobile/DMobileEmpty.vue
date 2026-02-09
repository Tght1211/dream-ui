<template>
  <div class="d-mobile-empty" :style="glassVars">
    <div class="d-mobile-empty__image">
      <slot name="image">
        <svg viewBox="0 0 64 64" fill="none">
          <rect x="10" y="18" width="44" height="32" rx="4" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
          <path d="M10 40l12-10 8 6 14-12 10 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.25" />
          <circle cx="24" cy="28" r="3" stroke="currentColor" stroke-width="1.5" opacity="0.25" />
        </svg>
      </slot>
    </div>
    <p class="d-mobile-empty__desc">
      <slot>{{ description }}</slot>
    </p>
    <div v-if="$slots.bottom" class="d-mobile-empty__bottom">
      <slot name="bottom" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileEmpty - 移动端空状态
 * @author buchi
 * @since 2026-02-09
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileEmpty' })

interface Props extends GlassCustomProps {
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '暂无数据',
})

const { glassVars } = useGlassStyle(props)
</script>

<style scoped lang="scss">
.d-mobile-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 16px;

  &__image {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    color: var(--dream-text-tertiary);
    opacity: 0.5;
  }

  &__desc {
    font-size: var(--dream-mobile-text-sm);
    color: var(--dream-text-tertiary);
    margin: 0;
    text-align: center;
    line-height: 1.5;
  }

  &__bottom {
    margin-top: 20px;
  }
}
</style>
