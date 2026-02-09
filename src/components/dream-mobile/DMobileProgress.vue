<template>
  <div class="d-mobile-progress" :style="glassVars">
    <div class="d-mobile-progress__bar">
      <div class="d-mobile-progress__track">
        <div
          class="d-mobile-progress__portion"
          :style="{ width: `${clampedPercent}%`, background: trackColor || undefined }"
        />
      </div>
      <span v-if="showPivot" class="d-mobile-progress__pivot" :style="{ left: `${clampedPercent}%` }">
        {{ pivotText || `${clampedPercent}%` }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileProgress - 移动端进度条
 * @author buchi
 * @since 2026-02-09
 */
import { computed } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileProgress' })

interface Props extends GlassCustomProps {
  percentage?: number
  showPivot?: boolean
  pivotText?: string
  trackColor?: string
  strokeWidth?: number
  inactive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  percentage: 0,
  showPivot: true,
  pivotText: '',
  trackColor: '',
  strokeWidth: 4,
  inactive: false,
})

const { glassVars } = useGlassStyle(props)
const clampedPercent = computed(() => Math.max(0, Math.min(100, props.percentage)))
</script>

<style scoped lang="scss">
.d-mobile-progress {
  width: 100%;
  padding: 8px 0;

  &__bar {
    position: relative;
    padding-right: 50px;
  }

  &__track {
    height: v-bind('`${strokeWidth}px`');
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
    box-shadow:
      inset 0 0 4px rgba(255, 255, 255, 0.02),
      0 0 1px rgba(255, 255, 255, 0.06);
  }

  &__portion {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(96, 165, 250, 0.5), rgba(96, 165, 250, 0.8));
    transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow:
      0 0 6px rgba(96, 165, 250, 0.30),
      0 0 1px rgba(255, 255, 255, 0.20);
  }

  &__pivot {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 10px;
    color: var(--dream-text-primary);
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 999px;
    padding: 1px 8px;
    white-space: nowrap;
    transition: left 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.08);
  }
}
</style>
