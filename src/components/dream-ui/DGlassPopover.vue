<template>
  <div class="d-glass-popover" ref="popRef" :style="glassVars">
    <div ref="triggerRef" class="d-glass-popover__trigger" @click="toggle">
      <slot name="trigger" />
    </div>

    <Teleport to="body">
      <Transition name="pop-fade">
        <div v-if="visible" ref="contentRef" class="d-glass-popover__content" :style="popoverStyle">
          <h4 v-if="title" class="d-glass-popover__title">{{ title }}</h4>
          <div class="d-glass-popover__body"><slot /></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
/**
 * DGlassPopover - 玻璃拟态弹出框
 * @author buchi
 * @since 2026-02-08
 */
import { ref, watch, nextTick, onMounted, onUnmounted, type CSSProperties } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DGlassPopover' })

interface Props extends GlassCustomProps {
  title?: string
  placement?: 'top' | 'bottom'
}

const props = withDefaults(defineProps<Props>(), { title: '', placement: 'bottom' })

const { glassVars } = useGlassStyle(props)

const visible = ref(false)
const popRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const popoverStyle = ref<CSSProperties>({})

const updatePosition = () => {
  if (!triggerRef.value) return
  const rect = triggerRef.value.getBoundingClientRect()
  if (props.placement === 'bottom') {
    popoverStyle.value = { position: 'fixed', top: `${rect.bottom + 8}px`, left: `${rect.left}px`, zIndex: 100 }
  } else {
    popoverStyle.value = { position: 'fixed', bottom: `${window.innerHeight - rect.top + 8}px`, left: `${rect.left}px`, zIndex: 100 }
  }
}

const toggle = () => { visible.value = !visible.value }

watch(visible, async (val) => { if (val) { await nextTick(); updatePosition() } })

const onClickOutside = (e: MouseEvent) => {
  const target = e.target as Node
  if (popRef.value && !popRef.value.contains(target) && (!contentRef.value || !contentRef.value.contains(target))) {
    visible.value = false
  }
}
const onScrollResize = () => { if (visible.value) updatePosition() }

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  window.addEventListener('scroll', onScrollResize, true)
  window.addEventListener('resize', onScrollResize)
})
onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('scroll', onScrollResize, true)
  window.removeEventListener('resize', onScrollResize)
})
</script>

<style scoped lang="scss">
.d-glass-popover {
  position: relative;
  display: inline-flex;
  &__trigger { cursor: pointer; }
}
</style>

<style lang="scss">
.d-glass-popover__content {
  min-width: 200px;
  padding: var(--dream-space-lg);
  backdrop-filter: blur(30px) saturate(1.2);
  -webkit-backdrop-filter: blur(30px) saturate(1.2);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--dream-radius-lg);
  box-shadow:
    inset 0 0 15px rgba(255,255,255,0.03),
    inset 0 1px 0 rgba(255,255,255,0.10),
    0 0 1px rgba(255,255,255,0.18),
    0 0 15px rgba(255,255,255,0.04),
    0 8px 32px rgba(0,0,0,0.30);
}

.d-glass-popover__title {
  font-size: var(--dream-text-sm);
  font-weight: 600;
  color: var(--dream-text-primary);
  margin: 0 0 var(--dream-space-sm);
  padding-bottom: var(--dream-space-sm);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.d-glass-popover__body {
  font-size: var(--dream-text-sm);
  color: var(--dream-text-secondary);
  line-height: 1.6;
}

.pop-fade-enter-active, .pop-fade-leave-active { transition: all 0.2s ease; }
.pop-fade-enter-from, .pop-fade-leave-to { opacity: 0; transform: translateY(4px); }
</style>
