<template>
  <div class="doc-page">
    <h1>DreamVeil 梦幻蒙版</h1>
    <p>灵感来自日漫和 P5R 的白色透明蒙版效果，为画面增添梦幻通透感</p>

    <DemoBlock
      description="实时控制：当前页面的蒙版就是 DDreamVeil 组件渲染的，试试在下方开关和切换强度"
      :code="code0"
    >
      <div class="demo-veil-control">
        <div class="control-row">
          <span class="control-label">蒙版开关</span>
          <DGlassSwitch v-model="veilEnabled" />
        </div>
        <div class="control-row">
          <span class="control-label">光斑粒子</span>
          <DGlassSwitch v-model="veilParticles" :disabled="!veilEnabled" />
        </div>
        <div class="control-row">
          <span class="control-label">蒙版强度</span>
          <div class="intensity-btns">
            <DGlassButton
              v-for="lvl in intensityLevels"
              :key="lvl.id"
              :variant="veilIntensity === lvl.id ? 'default' : 'ghost'"
              size="sm"
              :disabled="!veilEnabled"
              @click="setVeilIntensity(lvl.id)"
            >
              {{ lvl.label }}
            </DGlassButton>
          </div>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      description="强度选项"
      :code="code1"
    >
      <div class="demo-veil-intensity">
        <DGlassCard>
          <div style="padding: 20px; text-align: center;">
            <h3 style="margin: 0 0 8px;">subtle</h3>
            <p style="margin: 0; color: var(--dream-text-secondary); font-size: 0.875rem;">轻微蒙版效果</p>
          </div>
        </DGlassCard>
        <DGlassCard>
          <div style="padding: 20px; text-align: center;">
            <h3 style="margin: 0 0 8px;">medium</h3>
            <p style="margin: 0; color: var(--dream-text-secondary); font-size: 0.875rem;">中等蒙版效果（默认）</p>
          </div>
        </DGlassCard>
        <DGlassCard>
          <div style="padding: 20px; text-align: center;">
            <h3 style="margin: 0 0 8px;">strong</h3>
            <p style="margin: 0; color: var(--dream-text-secondary); font-size: 0.875rem;">强烈蒙版效果</p>
          </div>
        </DGlassCard>
      </div>
    </DemoBlock>

    <DemoBlock
      description="粒子效果"
      :code="code2"
    >
      <div class="demo-veil-particles">
        <p>DreamVeil 支持可选的漂浮光斑粒子效果，通过 <code>particles</code> 属性控制。</p>
        <p>当启用时，会在画面中显示缓慢漂浮的光斑粒子，增强梦幻感。</p>
      </div>
    </DemoBlock>

    <DemoBlock
      description="搭配 useBackground composable 全局控制"
      :code="code3"
    >
      <div class="demo-veil-particles">
        <p>在 App.vue 中使用 <code>useBackground()</code> 的 <code>veilEnabled</code>、<code>veilIntensity</code>、<code>veilParticles</code> 可实现全局控制。</p>
        <p>BackgroundSwitcher 面板底部也集成了蒙版控制，用户无需写代码即可调节。</p>
      </div>
    </DemoBlock>

    <ApiTable
      title="Props"
      :columns="['参数', '说明', '类型', '可选值', '默认值']"
      :rows="propsRows"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * DreamVeil 梦幻蒙版文档
 * @author buchi
 * @since 2026-02-08
 */
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassCard, DGlassSwitch, DGlassButton } from '../../components/dream-ui'
import { useBackground, type VeilIntensity } from '../../composables/useBackground'

const { veilEnabled, veilIntensity, veilParticles, setVeilIntensity } = useBackground()

const intensityLevels: { id: VeilIntensity; label: string }[] = [
  { id: 'subtle', label: '轻柔' },
  { id: 'medium', label: '标准' },
  { id: 'strong', label: '浓郁' },
]

const code0 = `<template>
  <!-- App.vue 中全局使用 -->
  <DDreamVeil
    v-if="veilEnabled"
    :intensity="veilIntensity"
    :particles="veilParticles"
  />
</template>

<script setup>
import { DDreamVeil } from '@tght_1211/dream-ui'
import { useBackground } from '@tght_1211/dream-ui'

const {
  veilEnabled,
  veilIntensity,
  veilParticles,
  toggleVeil,
  setVeilIntensity,
  toggleVeilParticles,
} = useBackground()
<\/script>`

const code1 = `<template>
  <DDreamVeil intensity="subtle" />
  <DDreamVeil intensity="medium" />
  <DDreamVeil intensity="strong" />
</template>

<script setup>
import { DDreamVeil } from '@tght_1211/dream-ui'
<\/script>`

const code2 = `<template>
  <!-- 启用粒子效果 -->
  <DDreamVeil :particles="true" />

  <!-- 禁用粒子效果 -->
  <DDreamVeil :particles="false" />
</template>

<script setup>
import { DDreamVeil } from '@tght_1211/dream-ui'
<\/script>`

const code3 = `// useBackground() 返回的蒙版相关 API
const {
  veilEnabled,          // Ref<boolean> 蒙版开关
  veilIntensity,        // Ref<'subtle'|'medium'|'strong'> 蒙版强度
  veilParticles,        // Ref<boolean> 光斑粒子开关
  toggleVeil,           // () => void 切换蒙版开关
  setVeilIntensity,     // (val) => void 设置强度
  toggleVeilParticles,  // () => void 切换光斑粒子
} = useBackground()`

const propsRows = [
  {
    参数: 'intensity',
    说明: '蒙版强度',
    类型: 'string',
    可选值: 'subtle | medium | strong',
    默认值: 'medium'
  },
  {
    参数: 'particles',
    说明: '是否显示漂浮光斑粒子',
    类型: 'boolean',
    可选值: '-',
    默认值: 'true'
  }
]
</script>

<style scoped lang="scss">
.doc-page {
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  > p {
    color: var(--dream-text-secondary);
    margin-bottom: 32px;
  }
}

.demo-veil-control {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.control-label {
  font-size: 14px;
  color: var(--dream-text-secondary);
  min-width: 72px;
}

.intensity-btns {
  display: flex;
  gap: 8px;
}

.demo-veil-intensity {
  display: flex;
  gap: var(--dream-space-lg);
  flex-wrap: wrap;
}

.demo-veil-particles {
  p {
    color: var(--dream-text-secondary);
    line-height: 1.6;
    margin-bottom: var(--dream-space-md);

    code {
      background: rgba(255, 255, 255, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: var(--dream-font-mono);
      font-size: 0.875em;
    }
  }
}
</style>
