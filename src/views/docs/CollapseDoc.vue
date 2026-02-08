<template>
  <div class="doc-page">
    <h1>Collapse 折叠面板</h1>
    <p>玻璃拟态折叠面板组件，用于展示可折叠的内容区域</p>

    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-collapse">
        <DGlassCollapse :items="collapseItems" />
      </div>
    </DemoBlock>

    <DemoBlock
      description="手风琴模式"
      :code="code2"
    >
      <div class="demo-collapse">
        <DGlassCollapse :items="collapseItems" :accordion="true" />
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
 * Collapse 折叠面板文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassCollapse } from '../../components/dream-ui'

const collapseItems = [
  {
    title: '面板一',
    content: '这是面板一的内容，可以包含任何文本或HTML内容。'
  },
  {
    title: '面板二',
    content: '这是面板二的内容，支持多行文本展示。'
  },
  {
    title: '面板三',
    content: '这是面板三的内容，在折叠状态下隐藏，展开时显示。'
  }
]

const code1 = `<template>
  <div class="demo-collapse">
    <DGlassCollapse :items="collapseItems" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassCollapse } from '../../components/dream-ui'

const collapseItems = [
  {
    title: '面板一',
    content: '这是面板一的内容，可以包含任何文本或HTML内容。'
  },
  {
    title: '面板二',
    content: '这是面板二的内容，支持多行文本展示。'
  },
  {
    title: '面板三',
    content: '这是面板三的内容，在折叠状态下隐藏，展开时显示。'
  }
]
<\/script>`

const code2 = `<template>
  <div class="demo-collapse">
    <DGlassCollapse :items="collapseItems" :accordion="true" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassCollapse } from '../../components/dream-ui'

const collapseItems = [
  {
    title: '面板一',
    content: '这是面板一的内容，可以包含任何文本或HTML内容。'
  },
  {
    title: '面板二',
    content: '这是面板二的内容，支持多行文本展示。'
  },
  {
    title: '面板三',
    content: '这是面板三的内容，在折叠状态下隐藏，展开时显示。'
  }
]
<\/script>`

const propsRows = [
  {
    参数: 'items',
    说明: '折叠面板项数组，每个项包含 title 和 content',
    类型: 'Array<{title: string, content: string}>',
    可选值: '-',
    默认值: '[]'
  },
  {
    参数: 'accordion',
    说明: '是否开启手风琴模式（同时只能展开一个面板）',
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

.demo-collapse {
  width: 100%;
}
</style>
