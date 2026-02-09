/**
 * useZIndex - 动态 z-index 计算
 *
 * 解决 Teleport 弹出层（Select 下拉框、Popover 等）在高层级容器
 * （Drawer、Dialog）中被遮挡的问题。
 *
 * 原理：从触发元素向上遍历 DOM 祖先链，收集所有堆叠上下文的
 * z-index，取最大值后 +1，确保弹出层始终浮于父容器之上。
 *
 * @author buchi
 * @since 2026-02-09
 */
import { type Ref } from 'vue'

/** 默认基础层级（页面根级别弹出时的兜底值） */
const BASE_Z_INDEX = 100

/**
 * 从指定元素向上遍历，获取祖先链中最高的 z-index
 * 只考虑产生了堆叠上下文的祖先（position 非 static 且 z-index 为数字）
 */
function getMaxAncestorZIndex(el: HTMLElement): number {
  let maxZ = 0
  let current: HTMLElement | null = el.parentElement

  while (current && current !== document.documentElement) {
    const style = getComputedStyle(current)
    const position = style.position
    const zIndex = style.zIndex

    // 只有建立了堆叠上下文的元素才有意义
    // position 为 fixed/absolute/relative/sticky 且 z-index 不是 auto
    if (
      position !== 'static' &&
      zIndex !== 'auto' &&
      zIndex !== ''
    ) {
      const z = parseInt(zIndex, 10)
      if (!isNaN(z) && z > maxZ) {
        maxZ = z
      }
    }

    // 某些 CSS 属性也会创建堆叠上下文（transform, opacity<1, filter 等）
    // 这些元素虽然可能没有显式 z-index，但其内部子元素的 z-index 是相对的
    // 对于我们的场景（Teleport 到 body），关键是找到最高的显式 z-index
    current = current.parentElement
  }

  return maxZ
}

/**
 * 根据触发元素动态计算弹出层应使用的 z-index
 *
 * @param triggerRef - 触发元素的 ref
 * @returns getZIndex() 函数，调用时实时计算并返回 z-index 数值
 *
 * @example
 * ```ts
 * const triggerRef = ref<HTMLElement>()
 * const { getZIndex } = useZIndex(triggerRef)
 *
 * // 在需要定位弹出层时调用
 * dropdownStyle.value = {
 *   position: 'fixed',
 *   top: '100px',
 *   zIndex: getZIndex(),
 * }
 * ```
 */
export function useZIndex(triggerRef: Ref<HTMLElement | undefined | null>) {
  const getZIndex = (): number => {
    if (!triggerRef.value) return BASE_Z_INDEX

    const ancestorZ = getMaxAncestorZIndex(triggerRef.value)

    // 在祖先最高层级的基础上 +1，确保浮于其上
    // 如果祖先链中没有显式 z-index（ancestorZ === 0），使用基础值
    return Math.max(ancestorZ + 1, BASE_Z_INDEX)
  }

  return { getZIndex }
}
