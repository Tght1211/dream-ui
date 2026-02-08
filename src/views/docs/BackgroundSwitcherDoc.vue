<template>
  <div class="doc-page">
    <h1>BackgroundSwitcher 背景切换器</h1>
    <p>浮动式背景切换面板，集成背景选择和梦幻蒙版控制，点击右下角 🎨 按钮即可体验</p>

    <DemoBlock
      description="页面右下角的 🎨 按钮就是该组件，点击展开可切换背景、开关蒙版、调整蒙版强度"
      :code="code1"
    >
      <div class="demo-desc-card">
        <DGlassCard>
          <div class="demo-desc-inner">
            <p>👉 点击页面右下角 <strong>🎨</strong> 按钮打开面板</p>
            <p>面板功能：</p>
            <ul>
              <li>选择动态/渐变/图案/纯色背景</li>
              <li>开关梦幻蒙版 (DreamVeil)</li>
              <li>切换蒙版强度：轻柔 / 标准 / 浓郁</li>
              <li>开关漂浮光斑粒子</li>
            </ul>
          </div>
        </DGlassCard>
      </div>
    </DemoBlock>

    <DemoBlock
      description="搭配 useBackground composable 使用，可在代码中控制"
      :code="code2"
    >
      <div class="demo-row">
        <DGlassButton @click="setBg('liquid')">切换到液体</DGlassButton>
        <DGlassButton @click="setBg('neon')">切换到霓虹</DGlassButton>
        <DGlassButton @click="setBg('aurora')">切换到极光</DGlassButton>
        <DGlassButton @click="toggleVeil">
          {{ veilEnabled ? '关闭蒙版' : '开启蒙版' }}
        </DGlassButton>
      </div>
    </DemoBlock>

    <ApiTable
      title="useBackground() 返回值"
      :columns="['属性/方法', '说明', '类型']"
      :rows="apiRows"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * BackgroundSwitcher 文档
 * @author buchi
 * @since 2026-02-08
 */
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassCard, DGlassButton } from '../../components/dream-ui'
import { useBackground } from '../../composables/useBackground'

const { setBg, veilEnabled, toggleVeil } = useBackground()

const code1 = `<template>
  <!-- 放在 App.vue 中，浮动在右下角 -->
  <DBackgroundSwitcher />
</template>`

const code2 = `<template>
  <DGlassButton @click="setBg('neon')">切换到霓虹</DGlassButton>
  <DGlassButton @click="toggleVeil">
    {{ veilEnabled ? '关闭蒙版' : '开启蒙版' }}
  </DGlassButton>
</template>

<script setup>
import { useBackground } from 'dream-ui'
const { setBg, veilEnabled, toggleVeil } = useBackground()
<\/script>`

const apiRows = [
  { '属性/方法': 'currentBg', '说明': '当前背景 ID', '类型': 'Ref<string>' },
  { '属性/方法': 'bgOptions', '说明': '所有可用背景选项', '类型': 'BgOption[]' },
  { '属性/方法': 'setBg(id)', '说明': '设置背景 ID', '类型': '(id: string) => void' },
  { '属性/方法': 'veilEnabled', '说明': '蒙版是否开启', '类型': 'Ref<boolean>' },
  { '属性/方法': 'veilIntensity', '说明': '蒙版强度', '类型': "Ref<'subtle'|'medium'|'strong'>" },
  { '属性/方法': 'veilParticles', '说明': '蒙版光斑粒子是否开启', '类型': 'Ref<boolean>' },
  { '属性/方法': 'toggleVeil()', '说明': '切换蒙版开关', '类型': '() => void' },
  { '属性/方法': 'setVeilIntensity(val)', '说明': '设置蒙版强度', '类型': "(val: VeilIntensity) => void" },
  { '属性/方法': 'toggleVeilParticles()', '说明': '切换光斑粒子开关', '类型': '() => void' },
]
</script>

<style scoped lang="scss">
.doc-page h1 { font-size: 2rem; font-weight: 700; margin-bottom: 8px; }
.doc-page > p { color: var(--dream-text-secondary); margin-bottom: 32px; }

.demo-desc-inner {
  p { color: var(--dream-text-secondary); font-size: 14px; line-height: 1.7; margin: 0 0 8px; }
  ul { margin: 0; padding-left: 20px; }
  li { color: var(--dream-text-secondary); font-size: 13px; line-height: 1.8; }
  strong { color: var(--dream-text-primary); }
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
