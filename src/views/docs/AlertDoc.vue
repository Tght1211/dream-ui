<template>
  <div class="doc-page">
    <h1>Alert 警告提示</h1>
    <p>玻璃拟态警告提示组件，用于显示重要信息</p>

    <DemoBlock
      description="不同类型"
      :code="code1"
    >
      <div class="demo-alerts">
        <DGlassAlert type="info" title="提示信息">
          这是一条信息提示
        </DGlassAlert>
        <DGlassAlert type="success" title="成功提示">
          操作成功完成
        </DGlassAlert>
        <DGlassAlert type="warning" title="警告提示">
          请注意相关事项
        </DGlassAlert>
        <DGlassAlert type="danger" title="错误提示">
          操作失败，请重试
        </DGlassAlert>
      </div>
    </DemoBlock>

    <DemoBlock
      description="可关闭的提示"
      :code="code2"
    >
      <div class="demo-alerts">
        <DGlassAlert type="info" title="可关闭提示" :closable="true">
          点击右上角关闭按钮可以关闭此提示
        </DGlassAlert>
        <DGlassAlert type="success" :closable="true">
          没有标题的可关闭提示
        </DGlassAlert>
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
 * Alert 警告提示文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassAlert } from '../../components/dream-ui'

const code1 = `<template>
  <div class="demo-alerts">
    <DGlassAlert type="info" title="提示信息">
      这是一条信息提示
    </DGlassAlert>
    <DGlassAlert type="success" title="成功提示">
      操作成功完成
    </DGlassAlert>
    <DGlassAlert type="warning" title="警告提示">
      请注意相关事项
    </DGlassAlert>
    <DGlassAlert type="danger" title="错误提示">
      操作失败，请重试
    </DGlassAlert>
  </div>
</template>`

const code2 = `<template>
  <div class="demo-alerts">
    <DGlassAlert type="info" title="可关闭提示" :closable="true">
      点击右上角关闭按钮可以关闭此提示
    </DGlassAlert>
    <DGlassAlert type="success" :closable="true">
      没有标题的可关闭提示
    </DGlassAlert>
  </div>
</template>`

const propsRows = [
  {
    参数: 'type',
    说明: '提示类型',
    类型: 'string',
    可选值: 'info | success | warning | danger',
    默认值: 'info'
  },
  {
    参数: 'title',
    说明: '提示标题',
    类型: 'string',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'closable',
    说明: '是否显示关闭按钮',
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

.demo-alerts {
  display: flex;
  flex-direction: column;
  gap: var(--dream-space-md);
}
</style>
