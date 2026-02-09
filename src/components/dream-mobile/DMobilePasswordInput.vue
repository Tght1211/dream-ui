<template>
  <div class="d-mobile-password-input" :style="glassVars">
    <div v-if="info || errorInfo" class="d-mobile-password-input__info" :class="{ 'd-mobile-password-input__info--error': errorInfo }">
      {{ errorInfo || info }}
    </div>
    <div class="d-mobile-password-input__security" @click="$emit('focus')">
      <div
        v-for="(_, index) in length"
        :key="index"
        :class="[
          'd-mobile-password-input__item',
          {
            'd-mobile-password-input__item--focus': index === value.length && focused,
            'd-mobile-password-input__item--filled': index < value.length,
          }
        ]"
      >
        <template v-if="index < value.length">
          <span v-if="mask" class="d-mobile-password-input__dot" />
          <span v-else class="d-mobile-password-input__char">{{ value[index] }}</span>
        </template>
        <span v-if="index === value.length && focused" class="d-mobile-password-input__cursor" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DMobilePasswordInput - 移动端密码输入框
 * 格子密码输入，常用于验证码/支付密码
 * @author buchi
 * @since 2026-02-09
 */
import { useGlassStyle, type GlassCustomProps } from '../../composables/useGlassStyle'

defineOptions({ name: 'DMobilePasswordInput' })

interface Props extends GlassCustomProps {
  /** 输入值 */
  value?: string
  /** 密码长度 */
  length?: number
  /** 是否隐藏内容 */
  mask?: boolean
  /** 是否聚焦 */
  focused?: boolean
  /** 提示信息 */
  info?: string
  /** 错误提示 */
  errorInfo?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  length: 6,
  mask: true,
  focused: false,
  info: '',
  errorInfo: '',
})

defineEmits<{
  focus: []
}>()

const { glassVars } = useGlassStyle(props)
</script>

<style scoped lang="scss">
.d-mobile-password-input {
  padding: 0 var(--dream-mobile-padding);

  &__info {
    margin-bottom: 12px;
    font-size: var(--dream-mobile-text-sm);
    color: var(--dream-text-tertiary);
    text-align: center;

    &--error {
      color: var(--dream-color-danger);
    }
  }

  &__security {
    display: flex;
    gap: 8px;
    cursor: pointer;
  }

  &__item {
    flex: 1;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(20px) saturate(1.1);
    -webkit-backdrop-filter: blur(20px) saturate(1.1);
    background: var(--_glass-bg, var(--dream-bg-primary));
    border: 1px solid var(--_glass-border, var(--dream-border-default));
    border-radius: var(--dream-radius-sm);
    transition: all var(--dream-mobile-transition-fast);
    box-shadow:
      inset 0 0 12px rgba(255, 255, 255, 0.03),
      inset 0 1px 0 rgba(255, 255, 255, 0.10),
      0 0 1px 0 var(--_glass-glow, rgba(255, 255, 255, 0.15)),
      0 0 10px rgba(255, 255, 255, 0.03),
      0 4px 12px rgba(0, 0, 0, 0.15);

    &--focus {
      border-color: var(--dream-color-primary);
      box-shadow:
        inset 0 0 15px rgba(var(--dream-color-primary-rgb), 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.12),
        0 0 1px rgba(var(--dream-color-primary-rgb), 0.25),
        0 0 12px rgba(var(--dream-color-primary-rgb), 0.10),
        0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &--filled {
      border-color: var(--dream-border-hover);
      box-shadow:
        inset 0 0 12px rgba(255, 255, 255, 0.04),
        inset 0 1px 0 rgba(255, 255, 255, 0.12),
        0 0 1px 0 rgba(255, 255, 255, 0.20),
        0 0 10px rgba(255, 255, 255, 0.04),
        0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }

  &__dot {
    width: 12px;
    height: 12px;
    background: var(--dream-text-primary);
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.2);
  }

  &__char {
    font-size: 22px;
    font-weight: var(--dream-font-semibold);
    color: var(--dream-text-primary);
  }

  &__cursor {
    width: 1px;
    height: 22px;
    background: var(--dream-color-primary);
    animation: cursor-blink 1s step-end infinite;
    box-shadow: 0 0 4px var(--dream-color-primary-glow);
  }
}

@keyframes cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
