<template>
  <div class="doc-page">
    <h1>Empty 空状态</h1>
    <p>玻璃拟态空状态组件，用于展示空数据或占位内容</p>

    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-empty">
        <DGlassEmpty />
      </div>
    </DemoBlock>

    <DemoBlock
      description="自定义图标和描述"
      :code="code2"
    >
      <div class="demo-empty">
        <DGlassEmpty icon="📦" description="暂无数据，请稍后再试" />
      </div>
    </DemoBlock>

    <DemoBlock
      description="带操作按钮"
      :code="code3"
    >
      <div class="demo-empty">
        <DGlassEmpty icon="🔍" description="没有找到相关内容">
          <DGlassButton variant="primary">刷新</DGlassButton>
        </DGlassEmpty>
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
 * Empty 空状态文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassEmpty, DGlassButton } from '../../components/dream-ui'

const code1 = `<template>
  <DGlassEmpty />
</template>

<script setup lang="ts">
import { DGlassEmpty } from '../../components/dream-ui'
<\/script>`

const code2 = `<template>
  <DGlassEmpty icon="📦" description="暂无数据，请稍后再试" />
</template>

<script setup lang="ts">
import { DGlassEmpty } from '../../components/dream-ui'
<\/script>`

const code3 = `<template>
  <DGlassEmpty icon="🔍" description="没有找到相关内容">
    <DGlassButton variant="primary">刷新</DGlassButton>
  </DGlassEmpty>
</template>

<script setup lang="ts">
import { DGlassEmpty, DGlassButton } from '../../components/dream-ui'
<\/script>`

const propsRows = [
  {
    参数: 'icon',
    说明: '图标',
    类型: 'string',
    可选值: '-',
    默认值: "'📭'"
  },
  {
    参数: 'description',
    说明: '描述文本',
    类型: 'string',
    可选值: '-',
    默认值: "'暂无数据'"
  }
]

const slotsRows = [
  {
    插槽名: 'default',
    说明: '操作按钮区域'
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

.demo-empty {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
