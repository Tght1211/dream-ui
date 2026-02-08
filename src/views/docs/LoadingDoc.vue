<template>
  <div class="doc-page">
    <h1>Loading 加载</h1>
    <p>玻璃拟态加载组件，支持多种加载动画类型</p>

    <DemoBlock
      description="环形加载 - 不同尺寸"
      :code="code1"
    >
      <div class="demo-loading">
        <DGlassLoading type="ring" size="sm" />
        <DGlassLoading type="ring" size="md" />
        <DGlassLoading type="ring" size="lg" />
      </div>
    </DemoBlock>

    <DemoBlock
      description="点状加载（Spinner）"
      :code="code2"
    >
      <div class="demo-loading">
        <DGlassLoading type="spinner" />
      </div>
    </DemoBlock>

    <DemoBlock
      description="骨架屏加载"
      :code="code3"
    >
      <div class="demo-loading">
        <DGlassLoading type="skeleton" :lines="3" />
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
 * Loading 加载文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassLoading } from '../../components/dream-ui'

const code1 = `<template>
  <div class="demo-loading">
    <DGlassLoading type="ring" size="sm" />
    <DGlassLoading type="ring" size="md" />
    <DGlassLoading type="ring" size="lg" />
  </div>
</template>`

const code2 = `<template>
  <div class="demo-loading">
    <DGlassLoading type="spinner" />
  </div>
</template>`

const code3 = `<template>
  <div class="demo-loading">
    <DGlassLoading type="skeleton" :lines="3" />
  </div>
</template>`

const propsRows = [
  {
    参数: 'type',
    说明: '加载类型',
    类型: 'string',
    可选值: 'ring | spinner | skeleton',
    默认值: 'ring'
  },
  {
    参数: 'size',
    说明: '加载尺寸（仅对 ring 和 spinner 有效）',
    类型: 'string',
    可选值: 'sm | md | lg',
    默认值: 'md'
  },
  {
    参数: 'text',
    说明: '加载文本',
    类型: 'string',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'lines',
    说明: '骨架屏行数（仅对 skeleton 有效）',
    类型: 'number',
    可选值: '-',
    默认值: '3'
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

.demo-loading {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dream-space-xl);
  align-items: center;
  min-height: 100px;
}
</style>
