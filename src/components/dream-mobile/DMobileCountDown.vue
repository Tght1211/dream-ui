<template>
  <div class="d-mobile-countdown" :style="glassVars">
    <slot :current="current" :formatted="formatted">
      <span class="d-mobile-countdown__text">{{ formatted }}</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileCountDown - 移动端倒计时
 * 支持自定义格式和插槽
 * @author buchi
 * @since 2026-02-09
 */
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileCountDown' })

interface Props extends GlassCustomProps {
  /** 倒计时时长（毫秒） */
  time?: number
  /** 格式化字符串 */
  format?: string
  /** 是否自动开始 */
  autoStart?: boolean
  /** 是否毫秒级渲染 */
  millisecond?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  time: 0,
  format: 'HH:mm:ss',
  autoStart: true,
  millisecond: false,
})

const emit = defineEmits<{
  finish: []
  change: [current: TimeData]
}>()

export interface TimeData {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  total: number
}

const { glassVars } = useGlassStyle(props)

const remain = ref(props.time)
let timer: ReturnType<typeof setInterval> | null = null
let endTime = 0

const current = computed<TimeData>(() => {
  const total = Math.max(0, remain.value)
  const days = Math.floor(total / 86400000)
  const hours = Math.floor((total % 86400000) / 3600000)
  const minutes = Math.floor((total % 3600000) / 60000)
  const seconds = Math.floor((total % 60000) / 1000)
  const milliseconds = total % 1000
  return { days, hours, minutes, seconds, milliseconds, total }
})

const padZero = (n: number, len = 2) => String(n).padStart(len, '0')

const formatted = computed(() => {
  const { days, hours, minutes, seconds, milliseconds } = current.value
  let result = props.format
  result = result.replace('DD', padZero(days))
  result = result.replace('HH', padZero(hours))
  result = result.replace('mm', padZero(minutes))
  result = result.replace('ss', padZero(seconds))
  result = result.replace('SSS', padZero(milliseconds, 3))
  return result
})

const tick = () => {
  remain.value = Math.max(0, endTime - Date.now())
  emit('change', current.value)

  if (remain.value <= 0) {
    pause()
    emit('finish')
  }
}

const start = () => {
  if (timer) return
  endTime = Date.now() + remain.value
  const interval = props.millisecond ? 30 : 1000
  timer = setInterval(tick, interval)
}

const pause = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const reset = (newTime?: number) => {
  pause()
  remain.value = newTime ?? props.time
  if (props.autoStart) start()
}

watch(() => props.time, (val) => {
  reset(val)
})

onMounted(() => {
  if (props.autoStart && remain.value > 0) start()
})

onBeforeUnmount(pause)

defineExpose({ start, pause, reset })
</script>

<style scoped lang="scss">
.d-mobile-countdown {
  display: inline-flex;
  align-items: center;

  &__text {
    font-size: var(--dream-mobile-text-base);
    font-weight: var(--dream-font-medium);
    color: var(--dream-text-primary);
    font-variant-numeric: tabular-nums;
  }
}
</style>
