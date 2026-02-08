<template>
  <div class="doc-page">
    <h1>Popover 弹出框</h1>
    <p>玻璃拟态弹出框组件，用于显示额外的内容</p>

    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-popover">
        <DGlassPopover title="详细信息" placement="bottom">
          <template #trigger>
            <DGlassButton>点击查看</DGlassButton>
          </template>
          <div>这是弹出框的内容区域，可以放置任何内容。</div>
        </DGlassPopover>
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
 * Popover 弹出框文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassPopover, DGlassButton } from '../../components/dream-ui'

const code1 = `<template>
  <DGlassPopover title="详细信息" placement="bottom">
    <template #trigger>
      <DGlassButton>点击查看</DGlassButton>
    </template>
    <div>这是弹出框的内容区域，可以放置任何内容。</div>
  </DGlassPopover>
</template>

<script setup lang="ts">
import { DGlassPopover, DGlassButton } from '../../components/dream-ui'
<\/script>`

const propsRows = [
  {
    参数: 'title',
    说明: '弹出框标题',
    类型: 'string',
    可选值: '-',
    默认值: "''"
  },
  {
    参数: 'placement',
    说明: '弹出位置',
    类型: 'string',
    可选值: 'top | bottom',
    默认值: 'bottom'
  }
]

const slotsRows = [
  {
    插槽名: 'trigger',
    说明: '触发元素'
  },
  {
    插槽名: 'default',
    说明: '弹出框内容'
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

.demo-popover {
  display: flex;
  align-items: center;
}
</style>
