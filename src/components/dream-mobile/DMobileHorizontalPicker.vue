<template>
  <div class="d-mobile-hpicker" :style="[glassVars, { height: `${height}px` }]">
    <!-- 滑块轨道 -->
    <div
      ref="trackRef"
      class="d-mobile-hpicker__track"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseEnd"
      @mouseleave="onMouseEnd"
    >
      <!-- 无限循环项目 -->
      <div
        v-for="(item, index) in infiniteItems"
        :key="`hp-${index}`"
        :class="[
          'd-mobile-hpicker__item',
          { 'd-mobile-hpicker__item--selected': index === virtualSelectedIndex }
        ]"
        :data-index="index"
        @click="handleItemClick(index)"
      >
        <slot name="item" :item="item" :index="index" :active="index === virtualSelectedIndex">
          <div class="d-mobile-hpicker__item-content">
            <div class="d-mobile-hpicker__label">{{ getLabel(item) }}</div>
            <div v-if="getExtra(item)" class="d-mobile-hpicker__extra">{{ getExtra(item) }}</div>
          </div>
        </slot>
      </div>
    </div>
    <!-- 中心指示线 -->
    <div v-if="showIndicator" class="d-mobile-hpicker__indicator" />
    <!-- 左右渐变遮罩 -->
    <div v-if="showMask" class="d-mobile-hpicker__mask d-mobile-hpicker__mask--left" />
    <div v-if="showMask" class="d-mobile-hpicker__mask d-mobile-hpicker__mask--right" />
  </div>
</template>

<script setup lang="ts">
/**
 * DMobileHorizontalPicker - 移动端水平无限循环滑块选择器
 * iOS 风格水平滚轮，支持无限循环、物理惯性动画、触摸/鼠标手势
 * 灵感来源：rat-chronicles 项目中的分类滑块选择器
 * @author buchi
 * @since 2026-02-09
 */
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobileHorizontalPicker' })

export interface HPickerOption {
  /** 显示文字 */
  label: string
  /** 值 */
  value: string | number
  /** 额外说明（如数量） */
  extra?: string | number
}

interface Props extends GlassCustomProps {
  /** 当前选中值 */
  modelValue?: string | number
  /** 选项列表（字符串数组或对象数组） */
  options?: (string | HPickerOption)[]
  /** 容器高度 */
  height?: number
  /** 显示中心指示线 */
  showIndicator?: boolean
  /** 显示左右遮罩 */
  showMask?: boolean
  /** 摩擦系数 (0-1)，越小减速越快 */
  friction?: number
  /** 惯性倍数 */
  inertiaMultiplier?: number
  /** 最小速度阈值 */
  minVelocity?: number
  /** 吸附动画时长（ms） */
  snapDuration?: number
  /** 禁用 */
  disabled?: boolean
  /** 默认选中索引 */
  defaultIndex?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  options: () => [],
  height: 60,
  showIndicator: false,
  showMask: true,
  friction: 0.92,
  inertiaMultiplier: 4,
  minVelocity: 0.1,
  snapDuration: 250,
  disabled: false,
  defaultIndex: 0,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number, index: number]
}>()

const { glassVars } = useGlassStyle(props)

// ========== Refs ==========
const trackRef = ref<HTMLElement>()
const infiniteItems = ref<(string | HPickerOption)[]>([])
const virtualSelectedIndex = ref(0)
const realSelectedIndex = ref(0)
const containerWidth = ref(0)
const centerPosition = ref(0)

// 拖动状态
const isDragging = ref(false)
const lastX = ref(0)
const lastTime = ref(0)
const velocityVal = ref(0)

// 物理动画
let animationId: number | null = null
let isAnimating = false

// ========== 工具函数 ==========

/** 获取选项的文字 */
const getLabel = (item: string | HPickerOption): string => {
  return typeof item === 'string' ? item : item.label
}

/** 获取选项的附加信息 */
const getExtra = (item: string | HPickerOption): string | number | undefined => {
  return typeof item === 'string' ? undefined : item.extra
}

/** 获取选项的值 */
const getValue = (item: string | HPickerOption): string | number => {
  return typeof item === 'string' ? item : item.value
}

/** 通过值查找在原始 options 中的索引 */
const findIndexByValue = (value: string | number | undefined): number => {
  if (value === undefined) return 0
  return props.options.findIndex(opt => getValue(opt) === value)
}

// ========== 核心逻辑 ==========

/** 获取项目中心位置 */
function getItemCenterPosition(index: number): number {
  const items = trackRef.value?.children
  if (!items || index >= items.length || !items[index]) return 0

  let totalWidth = 0
  for (let i = 0; i < index; i++) {
    const el = items[i] as HTMLElement
    if (el?.offsetWidth) totalWidth += el.offsetWidth
  }
  const current = items[index] as HTMLElement
  return current?.offsetWidth ? totalWidth + current.offsetWidth / 2 : totalWidth
}

/** 获取当前 transform X 偏移 */
function getCurrentOffset(): number {
  if (!trackRef.value) return 0
  const style = getComputedStyle(trackRef.value)
  const matrix = new DOMMatrix(style.transform)
  return matrix.m41
}

/** 设置 transform X 偏移 */
function setOffset(offset: number) {
  if (!trackRef.value) return
  trackRef.value.style.transform = `translateX(${offset}px)`
}

/** 滚动到指定虚拟索引 */
function scrollToVirtualIndex(vIndex: number, animate = true) {
  if (!trackRef.value || vIndex < 0 || vIndex >= infiniteItems.value.length) return
  if (props.options.length === 0) return

  const itemCenter = getItemCenterPosition(vIndex)
  const targetOffset = centerPosition.value - itemCenter

  if (animate) {
    trackRef.value.style.transition = `transform ${props.snapDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1.0)`
    setOffset(targetOffset)
  } else {
    trackRef.value.style.transition = 'none'
    setOffset(targetOffset)
  }

  virtualSelectedIndex.value = vIndex
  const newRealIndex = vIndex % props.options.length
  realSelectedIndex.value = newRealIndex

  // 发出事件
  const selectedOption = props.options[newRealIndex]
  if (selectedOption !== undefined) {
    const val = getValue(selectedOption)
    emit('update:modelValue', val)
    emit('change', val, newRealIndex)
  }
}

/** 检查并重置位置（实现无限循环） */
function checkAndResetPosition() {
  const len = props.options.length
  if (len === 0) return

  if (virtualSelectedIndex.value < len && virtualSelectedIndex.value >= len / 2) {
    scrollToVirtualIndex(virtualSelectedIndex.value + len, false)
  } else if (virtualSelectedIndex.value >= len * 2 && virtualSelectedIndex.value < len * 2 + len / 2) {
    scrollToVirtualIndex(virtualSelectedIndex.value - len, false)
  }
}

/** 拖动中的边界检测与重置 */
function checkBoundaryDuringDrag() {
  const offset = getCurrentOffset()
  const len = props.options.length
  const items = trackRef.value?.children
  if (!items || items.length === 0) return

  let groupWidth = 0
  for (let i = 0; i < len && i < items.length; i++) {
    const el = items[i] as HTMLElement
    if (el?.offsetWidth) groupWidth += el.offsetWidth
  }
  if (groupWidth === 0) return

  const displayCenter = -offset + centerPosition.value

  if (displayCenter < groupWidth * 0.3) {
    setOffset(offset - groupWidth)
    if (virtualSelectedIndex.value < len) virtualSelectedIndex.value += len
  } else if (displayCenter > groupWidth * 2.7) {
    setOffset(offset + groupWidth)
    if (virtualSelectedIndex.value >= len * 2) virtualSelectedIndex.value -= len
  }
}

/** 查找最近的项目 */
function findClosestItem(offset: number): number {
  let closest = virtualSelectedIndex.value
  let minDist = Infinity
  const start = Math.max(0, virtualSelectedIndex.value - 3)
  const end = Math.min(infiniteItems.value.length - 1, virtualSelectedIndex.value + 3)

  for (let i = start; i <= end; i++) {
    if (i < 0 || i >= infiniteItems.value.length) continue
    const pos = getItemCenterPosition(i) + offset
    const dist = Math.abs(centerPosition.value - pos)
    if (dist < minDist) {
      minDist = dist
      closest = i
    }
  }
  return closest
}

/** 拖动中实时更新选中状态 */
function updateSelectionDuringDrag(offset: number) {
  let closest = virtualSelectedIndex.value
  let minDist = Infinity
  const start = Math.max(0, virtualSelectedIndex.value - 4)
  const end = Math.min(infiniteItems.value.length - 1, virtualSelectedIndex.value + 4)

  for (let i = start; i <= end; i++) {
    if (i < 0 || i >= infiniteItems.value.length) continue
    const pos = getItemCenterPosition(i) + offset
    const dist = Math.abs(centerPosition.value - pos)
    if (dist < minDist) {
      minDist = dist
      closest = i
    }
  }

  if (closest !== virtualSelectedIndex.value) {
    virtualSelectedIndex.value = closest
    realSelectedIndex.value = closest % props.options.length
  }
}

// ========== 物理惯性动画 ==========

function animatePhysics() {
  if (!isAnimating) return

  velocityVal.value *= props.friction
  const offset = getCurrentOffset()
  setOffset(offset + velocityVal.value)

  checkBoundaryDuringDrag()
  updateSelectionDuringDrag(getCurrentOffset())

  if (Math.abs(velocityVal.value) < props.minVelocity) {
    isAnimating = false
    const closest = findClosestItem(getCurrentOffset())
    scrollToVirtualIndex(closest)
    checkAndResetPosition()
    return
  }

  animationId = requestAnimationFrame(animatePhysics)
}

function startInertia(initialVelocity: number) {
  if (isAnimating && animationId) cancelAnimationFrame(animationId)
  velocityVal.value = initialVelocity
  isAnimating = true
  animationId = requestAnimationFrame(animatePhysics)
}

function stopAnimation() {
  if (isAnimating && animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  isAnimating = false
}

// ========== Touch 事件 ==========

function onTouchStart(e: TouchEvent) {
  if (props.disabled || !trackRef.value || infiniteItems.value.length === 0) return
  stopAnimation()
  isDragging.value = true
  lastX.value = e.touches[0]!.clientX
  lastTime.value = Date.now()
  velocityVal.value = 0
  trackRef.value.style.transition = 'none'
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging.value) return
  e.preventDefault()

  const x = e.touches[0]!.clientX
  const dx = x - lastX.value
  const now = Date.now()
  const dt = now - lastTime.value

  if (dt > 0) velocityVal.value = dx / (dt / 16.67)

  lastX.value = x
  lastTime.value = now

  setOffset(getCurrentOffset() + dx)
  checkBoundaryDuringDrag()
  updateSelectionDuringDrag(getCurrentOffset())
}

function onTouchEnd() {
  if (!isDragging.value) return
  isDragging.value = false

  if (Math.abs(velocityVal.value) > 0.5) {
    startInertia(velocityVal.value * props.inertiaMultiplier)
  } else {
    const closest = findClosestItem(getCurrentOffset())
    scrollToVirtualIndex(closest)
    checkAndResetPosition()
  }
}

// ========== Mouse 事件 ==========

function onMouseDown(e: MouseEvent) {
  if (props.disabled || !trackRef.value || infiniteItems.value.length === 0) return
  stopAnimation()
  isDragging.value = true
  lastX.value = e.clientX
  lastTime.value = Date.now()
  velocityVal.value = 0
  trackRef.value.style.transition = 'none'
  e.preventDefault()
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return
  e.preventDefault()

  const x = e.clientX
  const dx = x - lastX.value
  const now = Date.now()
  const dt = now - lastTime.value

  if (dt > 0) velocityVal.value = dx / (dt / 16.67)

  lastX.value = x
  lastTime.value = now

  setOffset(getCurrentOffset() + dx)
  checkBoundaryDuringDrag()
  updateSelectionDuringDrag(getCurrentOffset())
}

function onMouseEnd() {
  if (!isDragging.value) return
  isDragging.value = false

  if (Math.abs(velocityVal.value) > 0.5) {
    startInertia(velocityVal.value * props.inertiaMultiplier)
  } else {
    const closest = findClosestItem(getCurrentOffset())
    scrollToVirtualIndex(closest)
    checkAndResetPosition()
  }
}

// ========== 点击选中 ==========

function handleItemClick(index: number) {
  if (props.disabled) return
  stopAnimation()
  scrollToVirtualIndex(index)
}

// ========== 初始化 ==========

function initPicker() {
  if (!trackRef.value || props.options.length === 0) return

  const wrapper = trackRef.value.parentElement
  if (!wrapper) return
  containerWidth.value = wrapper.offsetWidth
  centerPosition.value = containerWidth.value / 2

  // 创建三组数据实现无限循环
  infiniteItems.value = [...props.options, ...props.options, ...props.options]

  nextTick(() => {
    // 找到 modelValue 对应的索引
    let targetRealIndex = props.defaultIndex
    if (props.modelValue !== undefined) {
      const foundIdx = findIndexByValue(props.modelValue)
      if (foundIdx >= 0) targetRealIndex = foundIdx
    }
    // 定位到中间组
    const targetVirtual = props.options.length + targetRealIndex
    virtualSelectedIndex.value = targetVirtual
    realSelectedIndex.value = targetRealIndex
    scrollToVirtualIndex(targetVirtual, false)
  })
}

// 监听 options 变化
watch(() => props.options, () => {
  nextTick(initPicker)
}, { deep: true })

// 监听 modelValue 外部变化
watch(() => props.modelValue, (val) => {
  if (val === undefined) return
  const idx = findIndexByValue(val)
  if (idx >= 0 && idx !== realSelectedIndex.value) {
    const targetVirtual = props.options.length + idx
    scrollToVirtualIndex(targetVirtual)
  }
})

onMounted(() => {
  // 延迟初始化确保 DOM 就绪
  setTimeout(initPicker, 50)
})

onBeforeUnmount(stopAnimation)

/** 公开方法：跳转到指定值 */
const scrollTo = (value: string | number) => {
  const idx = findIndexByValue(value)
  if (idx >= 0) {
    scrollToVirtualIndex(props.options.length + idx)
  }
}

/** 公开方法：跳转到指定索引 */
const scrollToIndex = (index: number) => {
  if (index >= 0 && index < props.options.length) {
    scrollToVirtualIndex(props.options.length + index)
  }
}

defineExpose({ scrollTo, scrollToIndex })
</script>

<style scoped lang="scss">
.d-mobile-hpicker {
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(28px) saturate(1.4);
  -webkit-backdrop-filter: blur(28px) saturate(1.4);
  background: var(--_glass-bg, var(--dream-bg-primary));
  border: 1px solid var(--_glass-border, var(--dream-border-default));
  border-radius: var(--dream-radius-lg);
  box-shadow:
    inset 0 0 30px rgba(255, 255, 255, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.14),
    0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.18)),
    0 0 15px rgba(255, 255, 255, 0.04),
    0 0 40px rgba(255, 255, 255, 0.02),
    0 8px 32px rgba(0, 0, 0, 0.20);
  width: 100%;
  max-width: 600px;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    border-color: var(--dream-border-hover);
    box-shadow:
      inset 0 0 40px rgba(255, 255, 255, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.20),
      0 0 1px 0 rgba(255, 255, 255, 0.30),
      0 0 20px rgba(255, 255, 255, 0.06),
      0 0 50px rgba(255, 255, 255, 0.03),
      0 12px 40px rgba(0, 0, 0, 0.25);
  }

  &__track {
    display: flex;
    height: 100%;
    position: relative;
    transition: transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1.0);
  }

  &__item {
    min-width: 80px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    color: var(--dream-text-tertiary);
    font-size: var(--dream-mobile-text-lg);
    font-weight: var(--dream-font-regular);
    text-align: center;
    white-space: nowrap;
    transition: color 0.15s ease, font-weight 0.15s ease;
    position: relative;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    flex-shrink: 0;

    &--selected {
      color: var(--dream-text-primary);
      font-weight: var(--dream-font-semibold);

      /* 选中下划线指示器 */
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 3px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 1.5px;
        transition: all 0.15s ease;
        box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
      }
    }
  }

  &__item-content {
    text-align: center;
  }

  &__label {
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    line-height: 1.3;
  }

  &__extra {
    font-size: var(--dream-mobile-text-xs);
    color: inherit;
    opacity: 0.6;
    font-weight: var(--dream-font-regular);
    margin-top: 2px;
  }

  /* 中心指示线 - 白色发光 */
  &__indicator {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: rgba(255, 255, 255, 0.20);
    pointer-events: none;
    z-index: 2;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.10);
  }

  /* 左右渐变遮罩 - 白色系柔和渐隐 */
  &__mask {
    position: absolute;
    top: 0;
    width: 40px;
    height: 100%;
    z-index: 3;
    pointer-events: none;

    &--left {
      left: 0;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.06) 0%,
        transparent 100%
      );
    }

    &--right {
      right: 0;
      background: linear-gradient(
        to left,
        rgba(255, 255, 255, 0.06) 0%,
        transparent 100%
      );
    }
  }
}

/* 移动端优化 */
@media (max-width: 768px) {
  .d-mobile-hpicker {
    &__item {
      font-size: 16px;
      padding: 0 10px;
    }
  }
}
</style>
