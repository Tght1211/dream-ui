<template>
  <div class="doc-page">
    <h1>Breadcrumb 面包屑</h1>
    <p>玻璃拟态面包屑导航组件，用于显示当前页面路径</p>

    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-breadcrumb">
        <DGlassBreadcrumb :items="breadcrumbItems" @navigate="handleNavigate" />
      </div>
    </DemoBlock>

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
 * Breadcrumb 面包屑文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassBreadcrumb } from '../../components/dream-ui'

const breadcrumbItems = ref([
  { label: '首页', href: '/' },
  { label: '组件', href: '/components' },
  { label: 'Breadcrumb' }
])

const handleNavigate = (item: { label: string; href?: string }) => {
  console.log('Navigate to:', item)
}

const code1 = `<template>
  <DGlassBreadcrumb :items="items" @navigate="handleNavigate" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassBreadcrumb } from '../../components/dream-ui'

const items = ref([
  { label: '首页', href: '/' },
  { label: '组件', href: '/components' },
  { label: 'Breadcrumb' }
])

const handleNavigate = (item) => {
  console.log('Navigate to:', item)
}
<\/script>`

const propsRows = [
  {
    参数: 'items',
    说明: '面包屑数据',
    类型: 'BreadcrumbItem[]',
    可选值: '-',
    默认值: '[]'
  },
  {
    参数: 'separator',
    说明: '分隔符',
    类型: 'string',
    可选值: '-',
    默认值: "'/'"
  }
]

const eventsRows = [
  {
    事件名: 'navigate',
    说明: '点击链接时触发',
    回调参数: 'item: BreadcrumbItem'
  }
]
</script>

<style scoped lang="scss">
.doc-page {
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

.demo-breadcrumb {
  display: flex;
  align-items: center;
}
</style>
