/**
 * useTouchFeedback - 移动端触摸反馈
 * 提供按压态样式绑定，适配 touch 事件
 * @author buchi
 * @since 2026-02-09
 */
import { ref } from 'vue'

export function useTouchFeedback() {
  const pressing = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null

  const onTouchStart = () => {
    // 延迟一小段时间再激活，避免滚动误触
    timer = setTimeout(() => {
      pressing.value = true
    }, 70)
  }

  const onTouchEnd = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    pressing.value = false
  }

  const onTouchCancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    pressing.value = false
  }

  const touchHandlers = {
    onTouchstart: onTouchStart,
    onTouchend: onTouchEnd,
    onTouchcancel: onTouchCancel,
  }

  return { pressing, touchHandlers }
}
