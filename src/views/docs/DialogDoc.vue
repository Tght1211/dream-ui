<template>
  <div class="doc-page">
    <h1>Dialog 对话框</h1>
    <p>玻璃拟态对话框组件，用于显示模态内容</p>

    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-dialog">
        <DGlassButton @click="dialogVisible = true">打开对话框</DGlassButton>
        <DGlassDialog v-model="dialogVisible" title="对话框标题" size="md" :closable="true" :close-on-overlay="true">
          <p>这是对话框的内容区域，可以放置任何内容。</p>
          <template #footer>
            <DGlassButton variant="ghost" @click="dialogVisible = false">取消</DGlassButton>
            <DGlassButton variant="primary" @click="dialogVisible = false">确认</DGlassButton>
          </template>
        </DGlassDialog>
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
 * Dialog 对话框文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassDialog, DGlassButton } from '../../components/dream-ui'

const dialogVisible = ref(false)

const code1 = `<template>
  <div class="demo-dialog">
    <DGlassButton @click="dialogVisible = true">打开对话框</DGlassButton>
    <DGlassDialog v-model="dialogVisible" title="对话框标题" size="md" :closable="true" :close-on-overlay="true">
      <p>这是对话框的内容区域，可以放置任何内容。</p>
      <template #footer>
        <DGlassButton variant="ghost" @click="dialogVisible = false">取消</DGlassButton>
        <DGlassButton variant="primary" @click="dialogVisible = false">确认</DGlassButton>
      </template>
    </DGlassDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassDialog, DGlassButton } from '../../components/dream-ui'

const dialogVisible = ref(false)
<\/script>`

const propsRows = [
  {
    参数: 'modelValue',
    说明: '是否显示对话框',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
  },
  {
    参数: 'title',
    说明: '对话框标题',
    类型: 'string',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'size',
    说明: '对话框尺寸',
    类型: 'string',
    可选值: 'sm | md | lg',
    默认值: 'md'
  },
  {
    参数: 'closable',
    说明: '是否显示关闭按钮',
    类型: 'boolean',
    可选值: '-',
    默认值: 'true'
  },
  {
    参数: 'closeOnOverlay',
    说明: '点击遮罩层是否关闭',
    类型: 'boolean',
    可选值: '-',
    默认值: 'true'
  }
]

const slotsRows = [
  {
    插槽名: 'default',
    说明: '对话框内容'
  },
  {
    插槽名: 'footer',
    说明: '对话框底部操作区'
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

.demo-dialog {
  display: flex;
  align-items: center;
}
</style>
