<template>
  <nav class="d-glass-navbar">
    <div class="d-glass-navbar__inner">
      <div class="d-glass-navbar__brand">
        <slot name="brand" />
      </div>
      <div class="d-glass-navbar__center">
        <slot name="center" />
      </div>
      <div class="d-glass-navbar__actions">
        <slot name="actions" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
/**
 * DGlassNavbar - 玻璃拟态导航栏组件
 * @author buchi
 * @since 2026-02-08
 */
defineOptions({ name: 'DGlassNavbar' })
</script>

<style scoped lang="scss">
.d-glass-navbar {
  position: sticky;
  top: 0;
  z-index: var(--dream-z-sticky);
  backdrop-filter: blur(30px) saturate(1.1);
  -webkit-backdrop-filter: blur(30px) saturate(1.1);
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow:
    inset 0 -1px 0 rgba(255, 255, 255, 0.05),
    inset 0 0 30px rgba(255, 255, 255, 0.02),
    0 0 1px rgba(255, 255, 255, 0.10),
    0 4px 30px rgba(0, 0, 0, 0.20);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--dream-space-md) var(--dream-space-xl);
    min-height: 64px;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: var(--dream-space-md);
    font-size: var(--dream-text-xl);
    font-weight: var(--dream-font-bold);
  }

  &__center {
    display: flex;
    align-items: center;
    gap: var(--dream-space-xs);
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--dream-space-sm);
  }
}
</style>
