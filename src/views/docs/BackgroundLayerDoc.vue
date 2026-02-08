<template>
  <div class="doc-page">
    <h1>BackgroundLayer 背景层</h1>
    <p>全屏动态/静态背景渲染组件，为 glassmorphism 提供丰富的 backdrop-filter 底色</p>

    <DemoBlock
      description="通过 bg-id 切换不同背景，当前页面背景就是由该组件渲染"
      :code="code1"
    >
      <div class="demo-bg-grid">
        <button
          v-for="bg in previewBgs"
          :key="bg.id"
          :class="['demo-bg-item', { 'demo-bg-item--active': currentBg === bg.id }]"
          @click="setBg(bg.id)"
        >
          <span class="demo-bg-icon">{{ bg.icon }}</span>
          <span class="demo-bg-label">{{ bg.label }}</span>
        </button>
      </div>
      <p class="demo-hint">点击上方按钮可实时切换当前页面背景</p>
    </DemoBlock>

    <DemoBlock
      description="可用的背景 ID 列表"
      :code="code2"
    >
      <div class="demo-bg-tags">
        <span v-for="bg in bgOptions" :key="bg.id" class="demo-bg-tag">
          {{ bg.icon }} {{ bg.id }}
        </span>
      </div>
    </DemoBlock>

    <ApiTable
      title="Props"
      :columns="['参数', '说明', '类型', '默认值']"
      :rows="propsRows"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * BackgroundLayer 文档
 * @author buchi
 * @since 2026-02-08
 */
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { useBackground } from '../../composables/useBackground'

const { currentBg, bgOptions, setBg } = useBackground()

const previewBgs = bgOptions.slice(0, 10)

const code1 = `<template>
  <!-- 放在 App.vue 最顶层 -->
  <DBackgroundLayer bg-id="neon" />

  <!-- 或响应式切换 -->
  <DBackgroundLayer :bg-id="currentBg" />
</template>

<script setup>
import { ref } from 'vue'
import { DBackgroundLayer } from 'dream-ui'

const currentBg = ref('neon')
<\/script>`

const code2 = `// 可选背景 ID
// 动态：liquid, aurora, lava, ocean, neon
// 渐变：sunset, forest, candy, midnight, warm
// 图案：grid-white, grid-dark, dots
// 纯色：pure-dark, pure-blue, pure-purple, pure-green, pure-red, pure-white`

const propsRows = [
  { '参数': 'bgId', '说明': '背景 ID，决定渲染哪种背景', '类型': 'string', '默认值': "'neon'" },
]
</script>

<style scoped lang="scss">
.doc-page h1 { font-size: 2rem; font-weight: 700; margin-bottom: 8px; }
.doc-page > p { color: var(--dream-text-secondary); margin-bottom: 32px; }

.demo-bg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 8px;
}

.demo-bg-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 6px;
  border-radius: var(--dream-radius-md);
  background: transparent;
  border: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
  transition: all 0.15s ease;
  color: var(--dream-text-secondary);
  font-size: 11px;

  &:hover { border-color: rgba(255,255,255,0.18); background: rgba(255,255,255,0.04); }
  &--active {
    border-color: rgba(255,255,255,0.30);
    background: rgba(255,255,255,0.08);
    color: var(--dream-text-primary);
    box-shadow: 0 0 1px rgba(255,255,255,0.15);
  }
}

.demo-bg-icon { font-size: 20px; }
.demo-bg-label { white-space: nowrap; }
.demo-hint { font-size: 12px; color: var(--dream-text-tertiary); margin-top: 12px; }

.demo-bg-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.demo-bg-tag {
  padding: 4px 10px;
  font-size: 12px;
  font-family: var(--dream-font-mono);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--dream-radius-sm);
  color: var(--dream-text-secondary);
}
</style>
