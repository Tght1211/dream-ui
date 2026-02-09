<template>
  <DMobilePopup
    :model-value="modelValue"
    position="bottom"
    round
    :close-on-click-overlay="closeOnClickOverlay"
    @update:model-value="$emit('update:modelValue', $event)"
    @close="$emit('close')"
  >
    <div class="d-mobile-action-sheet" :style="glassVars">
      <!-- 标题/描述 -->
      <div v-if="title || description" class="d-mobile-action-sheet__header">
        <div v-if="title" class="d-mobile-action-sheet__title">{{ title }}</div>
        <div v-if="description" class="d-mobile-action-sheet__desc">{{ description }}</div>
      </div>
      <!-- 选项列表 -->
      <div class="d-mobile-action-sheet__list">
        <div
          v-for="(action, index) in actions"
          :key="index"
          :class="[
            'd-mobile-action-sheet__item',
            {
              'd-mobile-action-sheet__item--disabled': action.disabled,
              'd-mobile-action-sheet__item--danger': action.color === 'danger',
            }
          ]"
          @click="handleSelect(action, index)"
        >
          <span v-if="action.loading" class="d-mobile-action-sheet__loading" />
          <span v-else>{{ action.name }}</span>
          <span v-if="action.subname" class="d-mobile-action-sheet__subname">{{ action.subname }}</span>
        </div>
      </div>
      <!-- 取消按钮 -->
      <div v-if="cancelText" class="d-mobile-action-sheet__gap" />
      <div v-if="cancelText" class="d-mobile-action-sheet__cancel" @click="handleCancel">
        {{ cancelText }}
      </div>
    </div>
  </DMobilePopup>
</template>

<script setup lang="ts">
/**
 * DMobileActionSheet - 移动端底部动作面板
 * 从底部弹出的操作菜单，玻璃拟态风格
 * @author buchi
 * @since 2026-02-09
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'
import DMobilePopup from './DMobilePopup.vue'

defineOptions({ name: 'DMobileActionSheet' })

export interface ActionSheetAction {
  /** 选项名称 */
  name: string
  /** 副标题 */
  subname?: string
  /** 颜色 */
  color?: 'default' | 'danger'
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
}

interface Props extends GlassCustomProps {
  /** 是否显示 */
  modelValue?: boolean
  /** 标题 */
  title?: string
  /** 描述 */
  description?: string
  /** 操作列表 */
  actions?: ActionSheetAction[]
  /** 取消按钮文字 */
  cancelText?: string
  /** 点击遮罩关闭 */
  closeOnClickOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  description: '',
  actions: () => [],
  cancelText: '取消',
  closeOnClickOverlay: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  select: [action: ActionSheetAction, index: number]
  cancel: []
  close: []
}>()

const { glassVars } = useGlassStyle(props)

const handleSelect = (action: ActionSheetAction, index: number) => {
  if (action.disabled || action.loading) return
  emit('select', action, index)
  emit('update:modelValue', false)
}

const handleCancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.d-mobile-action-sheet {
  &__header {
    padding: 16px var(--dream-mobile-padding) 12px;
    text-align: center;
    border-bottom: 1px solid var(--dream-border-default);
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  &__title {
    font-size: var(--dream-mobile-text-lg);
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
  }

  &__desc {
    margin-top: 4px;
    font-size: var(--dream-mobile-text-sm);
    color: var(--dream-text-tertiary);
  }

  &__list {
    padding: 0;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 14px var(--dream-mobile-padding);
    font-size: var(--dream-mobile-text-lg);
    color: var(--dream-text-primary);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: background var(--dream-mobile-transition-fast);

    &:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 1px 0 rgba(255, 255, 255, 0.03);
    }

    &:active {
      background: var(--dream-mobile-touch-highlight);
    }

    &--disabled {
      color: var(--dream-text-disabled);
      cursor: not-allowed;

      &:active {
        background: transparent;
      }
    }

    &--danger {
      color: var(--dream-color-danger);
    }
  }

  &__subname {
    margin-top: 4px;
    font-size: var(--dream-mobile-text-sm);
    color: var(--dream-text-tertiary);
  }

  &__loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.12);
    border-top-color: var(--dream-color-primary);
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
    box-shadow: 0 0 8px var(--dream-color-primary-glow);
  }

  &__gap {
    height: 8px;
    background: rgba(255, 255, 255, 0.02);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      inset 0 -1px 0 rgba(255, 255, 255, 0.06);
  }

  &__cancel {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px var(--dream-mobile-padding);
    font-size: var(--dream-mobile-text-lg);
    color: var(--dream-text-secondary);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:active {
      background: var(--dream-mobile-touch-highlight);
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
