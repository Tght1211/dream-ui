<template>
  <div class="doc-page">
    <h1>Tabs 标签页</h1>
    <p>玻璃拟态标签页组件，用于内容切换</p>

    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-tabs">
        <DGlassTabs v-model="activeTab" :tabs="tabs">
          <div v-if="activeTab === 'tab1'">
            <p>这是选项一的内容</p>
          </div>
          <div v-if="activeTab === 'tab2'">
            <p>这是选项二的内容</p>
          </div>
          <div v-if="activeTab === 'tab3'">
            <p>这是选项三的内容</p>
          </div>
        </DGlassTabs>
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
 * Tabs 标签页文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassTabs } from '../../components/dream-ui'

const activeTab = ref('tab1')
const tabs = [
  { key: 'tab1', label: '选项一' },
  { key: 'tab2', label: '选项二' },
  { key: 'tab3', label: '选项三' }
]

const code1 = `<template>
  <div class="demo-tabs">
    <DGlassTabs v-model="activeTab" :tabs="tabs">
      <div v-if="activeTab === 'tab1'">
        <p>这是选项一的内容</p>
      </div>
      <div v-if="activeTab === 'tab2'">
        <p>这是选项二的内容</p>
      </div>
      <div v-if="activeTab === 'tab3'">
        <p>这是选项三的内容</p>
      </div>
    </DGlassTabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassTabs } from '../../components/dream-ui'

const activeTab = ref('tab1')
const tabs = [
  { key: 'tab1', label: '选项一' },
  { key: 'tab2', label: '选项二' },
  { key: 'tab3', label: '选项三' }
]
<\/script>`

const propsRows = [
  {
    参数: 'modelValue',
    说明: '当前激活的标签 key',
    类型: 'string',
    可选值: '-',
    默认值: '-'
  },
  {
    参数: 'tabs',
    说明: '标签项数组，每个项包含 key 和 label',
    类型: 'Array<{key: string, label: string}>',
    可选值: '-',
    默认值: '[]'
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

.demo-tabs {
  width: 100%;
}
</style>
