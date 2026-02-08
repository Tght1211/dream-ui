<template>
  <div class="doc-page">
    <h1>Panel 面板</h1>
    <p>玻璃拟态面板组件，用于展示内容区域</p>

    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-panel">
        <DGlassPanel title="面板标题" :bordered="true">
          <p>这是面板的内容区域，可以放置任何内容。</p>
          <p>支持多行文本和HTML元素。</p>
        </DGlassPanel>
      </div>
    </DemoBlock>

    <DemoBlock
      description="带额外操作"
      :code="code2"
    >
      <div class="demo-panel">
        <DGlassPanel title="面板标题" :bordered="true">
          <template #extra>
            <DGlassButton size="sm" variant="ghost">更多</DGlassButton>
          </template>
          <p>这是带额外操作按钮的面板。</p>
        </DGlassPanel>
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
 * Panel 面板文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassPanel, DGlassButton } from '../../components/dream-ui'

const code1 = `<template>
  <div class="demo-panel">
    <DGlassPanel title="面板标题" :bordered="true">
      <p>这是面板的内容区域，可以放置任何内容。</p>
      <p>支持多行文本和HTML元素。</p>
    </DGlassPanel>
  </div>
</template>`

const code2 = `<template>
  <div class="demo-panel">
    <DGlassPanel title="面板标题" :bordered="true">
      <template #extra>
        <DGlassButton size="sm" variant="ghost">更多</DGlassButton>
      </template>
      <p>这是带额外操作按钮的面板。</p>
    </DGlassPanel>
  </div>
</template>`

const propsRows = [
  {
    参数: 'title',
    说明: '面板标题',
    类型: 'string',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'bordered',
    说明: '是否显示边框',
    类型: 'boolean',
    可选值: '-',
    默认值: 'true'
  }
]

const slotsRows = [
  {
    插槽名: 'default',
    说明: '面板内容'
  },
  {
    插槽名: 'extra',
    说明: '标题栏右侧额外内容'
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

.demo-panel {
  width: 100%;
}
</style>
