/**
 * useGlassStyle - 玻璃拟态组件通用样式自定义
 *
 * 所有 Dream UI 组件均支持通过 Props 自定义：
 * - bgOpacity:   背景透明度 (0-1, 越大越不透明)
 * - borderColor: 边框颜色
 * - glowColor:   光晕颜色
 *
 * 原理：在组件根元素上设置 CSS 自定义属性，组件 CSS 用 var() 引用
 *
 * @author buchi
 * @since 2026-02-08
 */
import { computed, type CSSProperties } from 'vue'

export interface GlassCustomProps {
  /** 背景透明度 0~1，越大越不透明 */
  bgOpacity?: number
  /** 自定义边框颜色 */
  borderColor?: string
  /** 自定义光晕颜色 */
  glowColor?: string
}

/**
 * 将 glass 自定义 props 转换为 CSS 变量对象，绑定到组件根元素 :style
 */
export function useGlassStyle(props: GlassCustomProps) {
  const glassVars = computed<CSSProperties>(() => {
    const vars: Record<string, string> = {}

    if (props.bgOpacity !== undefined) {
      vars['--_glass-bg'] = `rgba(255, 255, 255, ${props.bgOpacity})`
    }

    if (props.borderColor) {
      vars['--_glass-border'] = props.borderColor
    }

    if (props.glowColor) {
      vars['--_glass-glow'] = props.glowColor
    }

    return vars as CSSProperties
  })

  return { glassVars }
}
