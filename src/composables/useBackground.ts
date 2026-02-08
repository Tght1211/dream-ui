/**
 * 背景 + 蒙版 + 黑柔镜 状态管理
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'

export interface BgOption {
  id: string
  label: string
  /** 代表色（用于色块预览） */
  color: string
  /** 背景分类 */
  category: 'animated' | 'gradient' | 'solid' | 'pattern'
}

export const bgOptions: BgOption[] = [
  // 动态背景
  { id: 'liquid', label: '液体流动', color: '#4f46e5', category: 'animated' },
  { id: 'aurora', label: '极光', color: '#06b6d4', category: 'animated' },
  { id: 'lava', label: '熔岩', color: '#dc2626', category: 'animated' },
  { id: 'ocean', label: '深海', color: '#0e7490', category: 'animated' },
  { id: 'neon', label: '霓虹', color: '#a855f7', category: 'animated' },
  // 渐变背景
  { id: 'sunset', label: '日落', color: '#f97316', category: 'gradient' },
  { id: 'forest', label: '森林', color: '#16a34a', category: 'gradient' },
  { id: 'candy', label: '糖果', color: '#ec4899', category: 'gradient' },
  { id: 'midnight', label: '午夜蓝', color: '#1e3a5f', category: 'gradient' },
  { id: 'warm', label: '暖阳', color: '#eab308', category: 'gradient' },
  // 图案
  { id: 'grid-white', label: '白色网格', color: '#e5e7eb', category: 'pattern' },
  { id: 'grid-dark', label: '暗色网格', color: '#374151', category: 'pattern' },
  { id: 'dots', label: '波点', color: '#6b7280', category: 'pattern' },
  // 纯色
  { id: 'pure-dark', label: '纯黑', color: '#111111', category: 'solid' },
  { id: 'pure-blue', label: '纯蓝', color: '#2563eb', category: 'solid' },
  { id: 'pure-purple', label: '纯紫', color: '#7c3aed', category: 'solid' },
  { id: 'pure-green', label: '纯绿', color: '#16a34a', category: 'solid' },
  { id: 'pure-red', label: '纯红', color: '#dc2626', category: 'solid' },
  { id: 'pure-white', label: '纯白', color: '#f5f5f5', category: 'solid' },
]

export type VeilIntensity = 'subtle' | 'medium' | 'strong'
export type BloomIntensity = 'subtle' | 'medium' | 'strong'

// 全局单例状态
const currentBg = ref('neon')
// 梦幻蒙版 (P5R/日漫)
const veilEnabled = ref(true)
const veilIntensity = ref<VeilIntensity>('medium')
const veilParticles = ref(true)
// 黑柔镜 (Bloom)
const bloomEnabled = ref(false)
const bloomIntensity = ref<BloomIntensity>('medium')

export function useBackground() {
  const setBg = (id: string) => { currentBg.value = id }

  const toggleVeil = () => { veilEnabled.value = !veilEnabled.value }
  const setVeilIntensity = (val: VeilIntensity) => { veilIntensity.value = val }
  const toggleVeilParticles = () => { veilParticles.value = !veilParticles.value }

  const toggleBloom = () => { bloomEnabled.value = !bloomEnabled.value }
  const setBloomIntensity = (val: BloomIntensity) => { bloomIntensity.value = val }

  return {
    currentBg,
    bgOptions,
    setBg,
    // 梦幻蒙版
    veilEnabled,
    veilIntensity,
    veilParticles,
    toggleVeil,
    setVeilIntensity,
    toggleVeilParticles,
    // 黑柔镜
    bloomEnabled,
    bloomIntensity,
    toggleBloom,
    setBloomIntensity,
  }
}
