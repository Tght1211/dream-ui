<template>
  <div class="doc-page">
    <h1>Tooltip 工具提示</h1>
    <p>玻璃拟态工具提示组件，用于显示额外的信息</p>

    <DemoBlock
      description="不同位置"
      :code="code1"
    >
      <div class="demo-tooltips">
        <DGlassTooltip content="这是顶部提示" placement="top">
          <DGlassButton>Top</DGlassButton>
        </DGlassTooltip>
        <DGlassTooltip content="这是底部提示" placement="bottom">
          <DGlassButton>Bottom</DGlassButton>
        </DGlassTooltip>
        <DGlassTooltip content="这是左侧提示" placement="left">
          <DGlassButton>Left</DGlassButton>
        </DGlassTooltip>
        <DGlassTooltip content="这是右侧提示" placement="right">
          <DGlassButton>Right</DGlassButton>
        </DGlassTooltip>
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
 * Tooltip 工具提示文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassTooltip, DGlassButton } from '../../components/dream-ui'

const code1 = `<template>
  <div class="demo-tooltips">
    <DGlassTooltip content="这是顶部提示" placement="top">
      <DGlassButton>Top</DGlassButton>
    </DGlassTooltip>
    <DGlassTooltip content="这是底部提示" placement="bottom">
      <DGlassButton>Bottom</DGlassButton>
    </DGlassTooltip>
    <DGlassTooltip content="这是左侧提示" placement="left">
      <DGlassButton>Left</DGlassButton>
    </DGlassTooltip>
    <DGlassTooltip content="这是右侧提示" placement="right">
      <DGlassButton>Right</DGlassButton>
    </DGlassTooltip>
  </div>
</template>

<script setup lang="ts">
import { DGlassTooltip, DGlassButton } from '../../components/dream-ui'
<\/script>`

const propsRows = [
  {
    参数: 'content',
    说明: '提示内容',
    类型: 'string',
    可选值: '-',
    默认值: '-'
  },
  {
    参数: 'placement',
    说明: '提示位置',
    类型: 'string',
    可选值: 'top | bottom | left | right',
    默认值: 'top'
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

.demo-tooltips {
  display: flex;
  gap: var(--dream-space-lg);
  flex-wrap: wrap;
  align-items: center;
}
</style>
