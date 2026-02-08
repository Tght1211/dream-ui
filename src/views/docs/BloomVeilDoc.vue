<template>
  <div class="doc-page">
    <h1>BloomVeil 黑柔镜</h1>
    <p>模拟摄影中的 Black Pro-Mist 黑柔镜效果，让画面中高亮区域产生柔和的光晕扩散（halation），暗区基本不受影响。
      与 DreamVeil 的整体白色蒙版不同，BloomVeil 只作用于亮的部分。</p>

    <DemoBlock
      description="实时控制：当前页面上的 BloomVeil 效果由全局状态管理，试试在下方开关和切换强度"
      :code="code0"
    >
      <div class="demo-bloom-control">
        <div class="control-row">
          <span class="control-label">黑柔镜开关</span>
          <DGlassSwitch v-model="bloomEnabled" />
        </div>
        <div class="control-row">
          <span class="control-label">效果强度</span>
          <div class="intensity-btns">
            <DGlassButton
              v-for="lvl in intensityLevels"
              :key="lvl.id"
              :variant="bloomIntensity === lvl.id ? 'default' : 'ghost'"
              size="sm"
              :disabled="!bloomEnabled"
              @click="setBloomIntensity(lvl.id)"
            >
              {{ lvl.label }}
            </DGlassButton>
          </div>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock
      description="基础用法：直接放在根节点即可，会自动覆盖全屏并作用于底层内容"
      :code="code1"
    >
      <div class="demo-preview-cards">
        <DGlassCard>
          <div style="padding: 20px; text-align: center;">
            <h3 style="margin: 0 0 8px;">subtle</h3>
            <p style="margin: 0; color: var(--dream-text-secondary); font-size: 0.875rem;">轻微，仅高光微微发散</p>
          </div>
        </DGlassCard>
        <DGlassCard>
          <div style="padding: 20px; text-align: center;">
            <h3 style="margin: 0 0 8px;">medium</h3>
            <p style="margin: 0; color: var(--dream-text-secondary); font-size: 0.875rem;">标准，高光柔和扩散（默认）</p>
          </div>
        </DGlassCard>
        <DGlassCard>
          <div style="padding: 20px; text-align: center;">
            <h3 style="margin: 0 0 8px;">strong</h3>
            <p style="margin: 0; color: var(--dream-text-secondary); font-size: 0.875rem;">强烈，高光大范围柔光扩散</p>
          </div>
        </DGlassCard>
      </div>
    </DemoBlock>

    <DemoBlock
      description="结合 useBackground 在全局控制 BloomVeil"
      :code="code2"
    >
      <p style="color: var(--dream-text-secondary); font-size: 0.875rem;">
        通过 <code>useBackground()</code> 可在项目任意位置控制 BloomVeil 的开关和强度。
        请查看右下角背景切换器中的 "黑柔镜 BloomVeil" 面板。
      </p>
    </DemoBlock>

    <h2>原理说明</h2>
    <DGlassCard>
      <div style="padding: 20px; line-height: 1.8;">
        <p style="margin: 0 0 12px;"><strong>黑柔镜 vs 梦幻蒙版</strong></p>
        <ul style="margin: 0; padding-left: 20px; color: var(--dream-text-secondary);">
          <li><strong>DreamVeil（梦幻蒙版）</strong>：整体加白色半透明覆盖 + 光斑粒子，效果类似日漫 / P5R 的画面滤镜</li>
          <li><strong>BloomVeil（黑柔镜）</strong>：只让亮区扩散，暗区不受影响。原理是 <code>backdrop-filter: blur() brightness()</code> +
            <code>mix-blend-mode: screen</code>，只对高亮像素叠加柔光</li>
        </ul>
        <p style="margin: 12px 0 0; color: var(--dream-text-tertiary); font-size: 0.8125rem;">
          两者可以同时使用，产生更丰富的视觉效果
        </p>
      </div>
    </DGlassCard>

    <h2>API</h2>
    <ApiTable title="DBloomVeil Props" :rows="apiProps" />

    <h2>useBackground() 相关</h2>
    <ApiTable title="Bloom 相关返回值" :rows="apiUseBackground" />
  </div>
</template>

<script setup lang="ts">
/**
 * @author buchi
 * @since 2026-02-08
 */
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassSwitch, DGlassButton, DGlassCard } from '../../components/dream-ui'
import { useBackground, type BloomIntensity } from '../../composables/useBackground'

const { bloomEnabled, bloomIntensity, setBloomIntensity } = useBackground()

const intensityLevels: { id: BloomIntensity; label: string }[] = [
  { id: 'subtle', label: '轻微' },
  { id: 'medium', label: '标准' },
  { id: 'strong', label: '强烈' },
]

const code0 = `<template>
  <div>
    <DGlassSwitch v-model="bloomEnabled" />
    <DGlassButton
      v-for="lvl in ['subtle', 'medium', 'strong']"
      :key="lvl"
      :variant="bloomIntensity === lvl ? 'default' : 'ghost'"
      @click="setBloomIntensity(lvl)"
    >
      {{ lvl }}
    </DGlassButton>
  </div>
</template>

<script setup>
import { useBackground } from 'dream-ui'
const { bloomEnabled, bloomIntensity, setBloomIntensity } = useBackground()
<\\/script>`

const code1 = `<template>
  <div id="app">
    <!-- 背景层 -->
    <DBackgroundLayer bg-id="neon" />
    <!-- 黑柔镜：亮区高光扩散 -->
    <DBloomVeil intensity="medium" />
    <!-- 你的内容 -->
    <router-view />
  </div>
</template>

<script setup>
import { DBackgroundLayer, DBloomVeil } from 'dream-ui'
<\\/script>`

const code2 = `<script setup>
import { useBackground } from 'dream-ui'

const {
  bloomEnabled,    // Ref<boolean> - 黑柔镜开关
  bloomIntensity,  // Ref<BloomIntensity> - 效果强度
  toggleBloom,     // () => void - 切换开关
  setBloomIntensity, // (val) => void - 设置强度
} = useBackground()

// 开启黑柔镜
bloomEnabled.value = true

// 设置为强烈
setBloomIntensity('strong')
<\\/script>`

const apiProps = [
  { name: 'intensity', desc: '效果强度', type: "'subtle' | 'medium' | 'strong'", default: "'medium'" },
]

const apiUseBackground = [
  { name: 'bloomEnabled', desc: '黑柔镜是否开启', type: 'Ref<boolean>', default: 'false' },
  { name: 'bloomIntensity', desc: '效果强度', type: "Ref<BloomIntensity>", default: "'medium'" },
  { name: 'toggleBloom()', desc: '切换开关', type: '() => void', default: '—' },
  { name: 'setBloomIntensity(val)', desc: '设置效果强度', type: '(val: BloomIntensity) => void', default: '—' },
]
</script>

<style scoped lang="scss">
.demo-bloom-control {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.control-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.control-label {
  color: var(--dream-text-secondary);
  font-size: 0.875rem;
  min-width: 90px;
}
.intensity-btns {
  display: flex;
  gap: 8px;
}
.demo-preview-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
@media (max-width: 640px) {
  .demo-preview-cards { grid-template-columns: 1fr; }
}
</style>
