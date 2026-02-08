<template>
  <nav class="d-glass-breadcrumb" :style="glassVars">
    <span
      v-for="(item, i) in items"
      :key="i"
      class="d-glass-breadcrumb__item"
    >
      <a
        v-if="item.href && i < items.length - 1"
        :href="item.href"
        class="d-glass-breadcrumb__link"
        @click.prevent="$emit('navigate', item)"
      >{{ item.label }}</a>
      <span v-else class="d-glass-breadcrumb__current">{{ item.label }}</span>
      <span v-if="i < items.length - 1" class="d-glass-breadcrumb__sep">{{ separator }}</span>
    </span>
  </nav>
</template>

<script setup lang="ts">
/**
 * DGlassBreadcrumb - 玻璃拟态面包屑导航
 * @author buchi
 * @since 2026-02-08
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassBreadcrumb' })

interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props extends GlassCustomProps {
  items: BreadcrumbItem[]
  separator?: string
}

const props = withDefaults(defineProps<Props>(), {
  separator: '/',
})

const { glassVars } = useGlassStyle(props)

defineEmits<{ navigate: [item: BreadcrumbItem] }>()
</script>

<style scoped lang="scss">
.d-glass-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
  font-size: var(--dream-text-sm);

  &__item {
    display: inline-flex;
    align-items: center;
    gap: 2px;
  }

  &__link {
    color: var(--dream-text-secondary);
    text-decoration: none;
    padding: 2px 4px;
    border-radius: var(--dream-radius-sm);
    transition: all var(--dream-transition-fast);

    &:hover {
      color: var(--dream-text-primary);
      background: rgba(255,255,255,0.06);
    }
  }

  &__current {
    color: var(--dream-text-primary);
    font-weight: var(--dream-font-medium);
    padding: 2px 4px;
  }

  &__sep {
    color: var(--dream-text-tertiary);
    margin: 0 4px;
    font-size: 11px;
  }
}
</style>
