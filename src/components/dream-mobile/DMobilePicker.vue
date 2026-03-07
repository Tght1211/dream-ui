<template>
  <DMobilePopup
    :model-value="modelValue"
    position="bottom"
    round
    :close-on-click-overlay="closeOnClickOverlay"
    @update:model-value="$emit('update:modelValue', $event)"
    @close="$emit('close')"
  >
    <div class="d-mobile-picker" :style="glassVars">
      <!-- 顶部操作栏 -->
      <div class="d-mobile-picker__toolbar">
        <span class="d-mobile-picker__cancel" @click="handleCancel">{{ cancelText }}</span>
        <span class="d-mobile-picker__title">{{ title }}</span>
        <span class="d-mobile-picker__confirm" @click="handleConfirm">{{ confirmText }}</span>
      </div>
      <!-- 滚轮区域 -->
      <div class="d-mobile-picker__columns">
        <div
          v-for="(column, colIndex) in normalizedColumns"
          :key="colIndex"
          ref="columnRefs"
          class="d-mobile-picker__column"
          @touchstart="onTouchStart(colIndex, $event)"
          @touchmove="onTouchMove(colIndex, $event)"
          @touchend="onTouchEnd(colIndex)"
        >
          <div
            class="d-mobile-picker__list"
            :style="{ transform: `translateY(${offsets[colIndex]}px)` }"
          >
            <div
              v-for="(option, optIndex) in column"
              :key="optIndex"
              :class="[
                'd-mobile-picker__option',
                { 'd-mobile-picker__option--selected': selectedIndexes[colIndex] === optIndex }
              ]"
            >
              {{ typeof option === 'string' ? option : option.text }}
            </div>
          </div>
        </div>
        <!-- 选中指示器 -->
        <div class="d-mobile-picker__indicator" />
        <div class="d-mobile-picker__mask d-mobile-picker__mask--top" />
        <div class="d-mobile-picker__mask d-mobile-picker__mask--bottom" />
      </div>
    </div>
  </DMobilePopup>
</template>

<script setup lang="ts">
/**
 * DMobilePicker - 移动端滚轮选择器
 * 仿 iOS 原生滚轮，玻璃拟态风格
 * @author buchi
 * @since 2026-02-09
 */
import { ref, computed, watch } from 'vue'
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'
import DMobilePopup from './DMobilePopup.vue'

defineOptions({ name: 'DMobilePicker' })

export interface PickerOption {
  text: string
  value: string | number
  children?: PickerOption[]
}

interface Props extends GlassCustomProps {
  /** 是否显示 */
  modelValue?: boolean
  /** 标题 */
  title?: string
  /** 列数据 */
  columns?: (string[] | PickerOption[])[]
  /** 取消文字 */
  cancelText?: string
  /** 确认文字 */
  confirmText?: string
  /** 点击遮罩关闭 */
  closeOnClickOverlay?: boolean
  /** 默认选中索引 */
  defaultIndex?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  columns: () => [],
  cancelText: '取消',
  confirmText: '确认',
  closeOnClickOverlay: true,
  defaultIndex: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: [values: (string | PickerOption)[], indexes: number[]]
  cancel: []
  close: []
  change: [values: (string | PickerOption)[], indexes: number[]]
}>()

const { glassVars } = useGlassStyle(props)

const OPTION_HEIGHT = 44
const VISIBLE_COUNT = 5
const HALF_COUNT = Math.floor(VISIBLE_COUNT / 2)

// 规范化 columns（统一为二维数组）
const normalizedColumns = computed(() => {
  if (props.columns.length === 0) return []
  // 如果第一个元素是字符串数组，说明只有一列
  if (typeof props.columns[0]?.[0] === 'string' || typeof props.columns[0]?.[0] === 'undefined') {
    return props.columns
  }
  return props.columns
})

// 选中索引
const selectedIndexes = ref<number[]>([])
// 滚轮偏移
const offsets = ref<number[]>([])

// 初始化
const init = () => {
  const cols = normalizedColumns.value
  selectedIndexes.value = cols.map((_, i) => props.defaultIndex[i] ?? 0)
  offsets.value = selectedIndexes.value.map(idx => (HALF_COUNT - idx) * OPTION_HEIGHT)
}

watch(() => props.modelValue, (val) => {
  if (val) init()
}, { immediate: true })

// Touch 处理
let startY = 0
let startOffset = 0
let startTime = 0

const onTouchStart = (colIndex: number, e: TouchEvent) => {
  startY = e.touches[0]!.clientY
  startOffset = offsets.value[colIndex] ?? 0
  startTime = Date.now()
}

const onTouchMove = (colIndex: number, e: TouchEvent) => {
  e.preventDefault()
  const deltaY = e.touches[0]!.clientY - startY
  const count = normalizedColumns.value[colIndex]?.length ?? 0
  const maxOffset = HALF_COUNT * OPTION_HEIGHT
  const minOffset = -(count - 1 - HALF_COUNT) * OPTION_HEIGHT

  let newOffset = startOffset + deltaY
  // 弹性边界
  if (newOffset > maxOffset) {
    newOffset = maxOffset + (newOffset - maxOffset) * 0.3
  } else if (newOffset < minOffset) {
    newOffset = minOffset + (newOffset - minOffset) * 0.3
  }

  offsets.value[colIndex] = newOffset
}

const onTouchEnd = (colIndex: number) => {
  const count = normalizedColumns.value[colIndex]?.length ?? 0
  // 吸附到最近的选项
  let index = HALF_COUNT - Math.round((offsets.value[colIndex] ?? 0) / OPTION_HEIGHT)
  index = Math.max(0, Math.min(count - 1, index))
  selectedIndexes.value[colIndex] = index
  offsets.value[colIndex] = (HALF_COUNT - index) * OPTION_HEIGHT

  emitChange()
}

const emitChange = () => {
  const values = normalizedColumns.value.map((col, i) => col[selectedIndexes.value[i] ?? 0]!)
  emit('change', values, [...selectedIndexes.value])
}

const handleConfirm = () => {
  const values = normalizedColumns.value.map((col, i) => col[selectedIndexes.value[i] ?? 0]!)
  emit('confirm', values, [...selectedIndexes.value])
  emit('update:modelValue', false)
}

const handleCancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.d-mobile-picker {
  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 var(--dream-mobile-padding);
    border-bottom: 1px solid var(--dream-border-default);
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  &__cancel,
  &__confirm {
    font-size: var(--dream-mobile-text-base);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    padding: 8px 0;

    &:active {
      opacity: var(--dream-mobile-active-opacity);
    }
  }

  &__cancel {
    color: var(--dream-text-secondary);
  }

  &__confirm {
    color: var(--dream-color-primary);
  }

  &__title {
    font-size: var(--dream-mobile-text-lg);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
  }

  &__columns {
    position: relative;
    display: flex;
    height: 220px;
    overflow: hidden;
  }

  &__column {
    flex: 1;
    overflow: hidden;
    touch-action: none;
  }

  &__list {
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &__option {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    font-size: var(--dream-mobile-text-lg);
    color: var(--dream-text-secondary);
    transition: all 0.2s;

    &--selected {
      color: var(--dream-text-primary);
      font-weight: var(--dream-font-medium);
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
    }
  }

  &__indicator {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 44px;
    border-top: 1px solid var(--dream-border-default);
    border-bottom: 1px solid var(--dream-border-default);
    pointer-events: none;
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      inset 0 -1px 0 rgba(255, 255, 255, 0.08);
  }

  &__mask {
    position: absolute;
    left: 0;
    right: 0;
    pointer-events: none;

    &--top {
      top: 0;
      height: calc(50% - 22px);
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.04),
        transparent
      );
      backdrop-filter: blur(2px);
    }

    &--bottom {
      bottom: 0;
      height: calc(50% - 22px);
      background: linear-gradient(
        to top,
        rgba(255, 255, 255, 0.04),
        transparent
      );
      backdrop-filter: blur(2px);
    }
  }
}
</style>
