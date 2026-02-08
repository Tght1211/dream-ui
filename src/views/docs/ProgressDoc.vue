<template>
  <div class="doc-page">
    <h1>Progress 进度条</h1>
    <p>玻璃拟态进度条组件，支持多种变体和百分比显示</p>

    <DemoBlock
      description="不同变体和百分比"
      :code="code1"
    >
      <div class="demo-progress">
        <DGlassProgress :percentage="30" variant="primary" label="上传中" :show-value="true" />
        <DGlassProgress :percentage="60" variant="success" label="处理中" :show-value="true" />
        <DGlassProgress :percentage="80" variant="warning" label="即将完成" :show-value="true" />
        <DGlassProgress :percentage="100" variant="danger" label="完成" :show-value="true" />
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
 * Progress 进度条文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassProgress } from '../../components/dream-ui'

const code1 = `<template>
  <div class="demo-progress">
    <DGlassProgress :percentage="30" variant="primary" label="上传中" :show-value="true" />
    <DGlassProgress :percentage="60" variant="success" label="处理中" :show-value="true" />
    <DGlassProgress :percentage="80" variant="warning" label="即将完成" :show-value="true" />
    <DGlassProgress :percentage="100" variant="danger" label="完成" :show-value="true" />
  </div>
</template>`

const propsRows = [
  {
    参数: 'percentage',
    说明: '进度百分比',
    类型: 'number',
    可选值: '0-100',
    默认值: '0'
  },
  {
    参数: 'variant',
    说明: '进度条变体',
    类型: 'string',
    可选值: 'default | primary | success | warning | danger | info',
    默认值: 'primary'
  },
  {
    参数: 'label',
    说明: '进度条标签文本',
    类型: 'string',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'showValue',
    说明: '是否显示百分比数值',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
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

.demo-progress {
  display: flex;
  flex-direction: column;
  gap: var(--dream-space-lg);
  width: 100%;
}
</style>
