<template>
  <div class="doc-page">
    <h1>Tag 标签</h1>
    <p>玻璃拟态标签组件</p>

    <!-- 基础用法 -->
    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-tags">
        <DGlassTag variant="default">Default</DGlassTag>
        <DGlassTag variant="primary">Primary</DGlassTag>
        <DGlassTag variant="success">Success</DGlassTag>
        <DGlassTag variant="warning">Warning</DGlassTag>
        <DGlassTag variant="danger">Danger</DGlassTag>
        <DGlassTag variant="info">Info</DGlassTag>
      </div>
    </DemoBlock>

    <!-- 可关闭 -->
    <DemoBlock
      description="可关闭"
      :code="code2"
    >
      <div class="demo-tags">
        <DGlassTag
          v-for="tag in tags"
          :key="tag"
          :variant="tag.variant"
          closable
          @close="handleClose(tag)"
        >
          {{ tag.label }}
        </DGlassTag>
      </div>
    </DemoBlock>

    <!-- 尺寸 -->
    <DemoBlock
      description="尺寸"
      :code="code3"
    >
      <div class="demo-tags">
        <DGlassTag variant="primary" size="sm">Small</DGlassTag>
        <DGlassTag variant="primary" size="md">Medium</DGlassTag>
        <DGlassTag variant="primary" size="lg">Large</DGlassTag>
      </div>
    </DemoBlock>

    <!-- API Table -->
    <ApiTable
      title="Props"
      :columns="['参数', '说明', '类型', '可选值', '默认值']"
      :rows="propsRows"
    />
    <ApiTable
      title="Events"
      :columns="['事件名', '说明', '回调参数']"
      :rows="eventsRows"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * Tag 标签文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassTag } from '../../components/dream-ui'

const tags = ref([
  { label: '标签一', variant: 'default' },
  { label: '标签二', variant: 'primary' },
  { label: '标签三', variant: 'success' },
  { label: '标签四', variant: 'warning' },
  { label: '标签五', variant: 'danger' },
  { label: '标签六', variant: 'info' }
])

const handleClose = (tag: { label: string; variant: string }) => {
  const index = tags.value.findIndex(t => t.label === tag.label)
  if (index > -1) {
    tags.value.splice(index, 1)
  }
}

const code1 = `<template>
  <div class="demo-tags">
    <DGlassTag variant="default">Default</DGlassTag>
    <DGlassTag variant="primary">Primary</DGlassTag>
    <DGlassTag variant="success">Success</DGlassTag>
    <DGlassTag variant="warning">Warning</DGlassTag>
    <DGlassTag variant="danger">Danger</DGlassTag>
    <DGlassTag variant="info">Info</DGlassTag>
  </div>
</template>

<script setup lang="ts">
import { DGlassTag } from '../../components/dream-ui'
<\/script>`

const code2 = `<template>
  <div class="demo-tags">
    <DGlassTag
      v-for="tag in tags"
      :key="tag"
      :variant="tag.variant"
      closable
      @close="handleClose(tag)"
    >
      {{ tag.label }}
    </DGlassTag>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassTag } from '../../components/dream-ui'

const tags = ref([
  { label: '标签一', variant: 'default' },
  { label: '标签二', variant: 'primary' },
  { label: '标签三', variant: 'success' }
])

const handleClose = (tag) => {
  const index = tags.value.findIndex(t => t.label === tag.label)
  if (index > -1) {
    tags.value.splice(index, 1)
  }
}
<\/script>`

const code3 = `<template>
  <div class="demo-tags">
    <DGlassTag variant="primary" size="sm">Small</DGlassTag>
    <DGlassTag variant="primary" size="md">Medium</DGlassTag>
    <DGlassTag variant="primary" size="lg">Large</DGlassTag>
  </div>
</template>

<script setup lang="ts">
import { DGlassTag } from '../../components/dream-ui'
<\/script>`

const propsRows = [
  {
    参数: 'variant',
    说明: '标签变体',
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
    参数: 'closable',
    说明: '是否可关闭',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
  }
]

const eventsRows = [
  {
    事件名: 'close',
    说明: '关闭标签时触发',
    回调参数: '-'
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

.demo-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dream-space-md);
  align-items: center;
}
</style>
