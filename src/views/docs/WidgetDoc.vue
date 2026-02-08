<template>
  <div class="doc-page">
    <h1>Widget 小组件</h1>
    <p>玻璃拟态小组件容器，用于展示统计信息或状态卡片</p>

    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-widgets">
        <DGlassWidget icon="❤" title="心率" subtitle="当前" variant="danger">
          <div style="font-size: 2rem; font-weight: 700; color: var(--dream-text-primary);">72</div>
          <div style="font-size: 0.875rem; color: var(--dream-text-secondary);">bpm</div>
        </DGlassWidget>
        <DGlassWidget icon="👣" title="步数" subtitle="今日" variant="primary">
          <div style="font-size: 2rem; font-weight: 700; color: var(--dream-text-primary);">8,234</div>
          <div style="font-size: 0.875rem; color: var(--dream-text-secondary);">步</div>
        </DGlassWidget>
        <DGlassWidget icon="🔥" title="卡路里" subtitle="消耗" variant="warning">
          <div style="font-size: 2rem; font-weight: 700; color: var(--dream-text-primary);">1,234</div>
          <div style="font-size: 0.875rem; color: var(--dream-text-secondary);">kcal</div>
        </DGlassWidget>
      </div>
    </DemoBlock>

    <ApiTable
      title="Props"
      :columns="['参数', '说明', '类型', '可选值', '默认值']"
      :rows="propsRows"
    />
    <ApiTable
      title="Slots"
      :columns="['插槽名', '说明']"
      :rows="slotsRows"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * Widget 小组件文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassWidget } from '../../components/dream-ui'

const code1 = `<template>
  <div class="demo-widgets">
    <DGlassWidget icon="❤" title="心率" subtitle="当前" variant="danger">
      <div style="font-size: 2rem; font-weight: 700; color: var(--dream-text-primary);">72</div>
      <div style="font-size: 0.875rem; color: var(--dream-text-secondary);">bpm</div>
    </DGlassWidget>
    <DGlassWidget icon="👣" title="步数" subtitle="今日" variant="primary">
      <div style="font-size: 2rem; font-weight: 700; color: var(--dream-text-primary);">8,234</div>
      <div style="font-size: 0.875rem; color: var(--dream-text-secondary);">步</div>
    </DGlassWidget>
    <DGlassWidget icon="🔥" title="卡路里" subtitle="消耗" variant="warning">
      <div style="font-size: 2rem; font-weight: 700; color: var(--dream-text-primary);">1,234</div>
      <div style="font-size: 0.875rem; color: var(--dream-text-secondary);">kcal</div>
    </DGlassWidget>
  </div>
</template>`

const propsRows = [
  {
    参数: 'title',
    说明: '标题',
    类型: 'string',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'subtitle',
    说明: '副标题',
    类型: 'string',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'icon',
    说明: '图标文本',
    类型: 'string',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'variant',
    说明: '组件变体',
    类型: 'string',
    可选值: 'default | primary | success | warning | danger | info',
    默认值: 'default'
  }
]

const slotsRows = [
  {
    插槽名: 'default',
    说明: '组件主要内容'
  },
  {
    插槽名: 'footer',
    说明: '组件底部内容'
  }
]
</script>

<style scoped lang="scss">
.doc-page {
  padding: var(--dream-space-2xl);

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

.demo-widgets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--dream-space-lg);
}
</style>
