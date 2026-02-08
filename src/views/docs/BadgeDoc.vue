<template>
  <div class="doc-page">
    <h1>Badge 徽章</h1>
    <p>玻璃拟态徽章组件</p>

    <!-- 基础变体 -->
    <DemoBlock
      description="基础变体"
      :code="code1"
    >
      <div class="demo-badges">
        <DGlassBadge variant="default">Default</DGlassBadge>
        <DGlassBadge variant="primary">Primary</DGlassBadge>
        <DGlassBadge variant="success">Success</DGlassBadge>
        <DGlassBadge variant="warning">Warning</DGlassBadge>
        <DGlassBadge variant="danger">Danger</DGlassBadge>
        <DGlassBadge variant="info">Info</DGlassBadge>
      </div>
    </DemoBlock>

    <!-- 带圆点 -->
    <DemoBlock
      description="带圆点"
      :code="code2"
    >
      <div class="demo-badges">
        <DGlassBadge variant="success" dot>在线</DGlassBadge>
        <DGlassBadge variant="danger" dot>离线</DGlassBadge>
        <DGlassBadge variant="warning" dot>忙碌</DGlassBadge>
      </div>
    </DemoBlock>

    <!-- 尺寸 -->
    <DemoBlock
      description="尺寸"
      :code="code3"
    >
      <div class="demo-badges">
        <DGlassBadge variant="primary" size="sm">Small</DGlassBadge>
        <DGlassBadge variant="primary" size="md">Medium</DGlassBadge>
        <DGlassBadge variant="primary" size="lg">Large</DGlassBadge>
      </div>
    </DemoBlock>

    <!-- API Table -->
    <ApiTable
      title="Props"
      :columns="['参数', '说明', '类型', '可选值', '默认值']"
      :rows="propsRows"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * Badge 徽章文档
 * @author buchi
 * @since 2026-02-08
 */
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassBadge } from '../../components/dream-ui'

const code1 = `<template>
  <div class="demo-badges">
    <DGlassBadge variant="default">Default</DGlassBadge>
    <DGlassBadge variant="primary">Primary</DGlassBadge>
    <DGlassBadge variant="success">Success</DGlassBadge>
    <DGlassBadge variant="warning">Warning</DGlassBadge>
    <DGlassBadge variant="danger">Danger</DGlassBadge>
    <DGlassBadge variant="info">Info</DGlassBadge>
  </div>
</template>

<script setup lang="ts">
import { DGlassBadge } from '../../components/dream-ui'
<\/script>`

const code2 = `<template>
  <div class="demo-badges">
    <DGlassBadge variant="success" dot>在线</DGlassBadge>
    <DGlassBadge variant="danger" dot>离线</DGlassBadge>
    <DGlassBadge variant="warning" dot>忙碌</DGlassBadge>
  </div>
</template>

<script setup lang="ts">
import { DGlassBadge } from '../../components/dream-ui'
<\/script>`

const code3 = `<template>
  <div class="demo-badges">
    <DGlassBadge variant="primary" size="sm">Small</DGlassBadge>
    <DGlassBadge variant="primary" size="md">Medium</DGlassBadge>
    <DGlassBadge variant="primary" size="lg">Large</DGlassBadge>
  </div>
</template>

<script setup lang="ts">
import { DGlassBadge } from '../../components/dream-ui'
<\/script>`

const propsRows = [
  {
    参数: 'variant',
    说明: '徽章变体',
    类型: 'string',
    可选值: 'default | primary | success | warning | danger | info',
    默认值: 'default'
  },
  {
    参数: 'size',
    说明: '尺寸',
    类型: 'string',
    可选值: 'sm | md | lg',
    默认值: 'md'
  },
  {
    参数: 'dot',
    说明: '是否显示为圆点',
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

.demo-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dream-space-md);
  align-items: center;
}
</style>
