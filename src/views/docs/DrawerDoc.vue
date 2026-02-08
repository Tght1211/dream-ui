<template>
  <div class="doc-page">
    <h1>Drawer 抽屉</h1>
    <p>玻璃拟态抽屉组件，用于从侧边滑出显示内容</p>

    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-drawer">
        <DGlassButton @click="drawerVisible = true">打开抽屉</DGlassButton>
        <DGlassDrawer
          v-model="drawerVisible"
          title="抽屉标题"
          placement="right"
          size="md"
          :closable="true"
          :close-on-overlay="true"
        >
          <p>这是抽屉的内容区域，可以放置任何内容。</p>
          <p>支持多行文本和HTML元素。</p>
          <template #footer>
            <DGlassButton variant="ghost" @click="drawerVisible = false">取消</DGlassButton>
            <DGlassButton variant="primary" @click="drawerVisible = false">确认</DGlassButton>
          </template>
        </DGlassDrawer>
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
 * Drawer 抽屉文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassDrawer, DGlassButton } from '../../components/dream-ui'

const drawerVisible = ref(false)

const code1 = `<template>
  <div class="demo-drawer">
    <DGlassButton @click="drawerVisible = true">打开抽屉</DGlassButton>
    <DGlassDrawer
      v-model="drawerVisible"
      title="抽屉标题"
      placement="right"
      size="md"
      :closable="true"
      :close-on-overlay="true"
    >
      <p>这是抽屉的内容区域，可以放置任何内容。</p>
      <p>支持多行文本和HTML元素。</p>
      <template #footer>
        <DGlassButton variant="ghost" @click="drawerVisible = false">取消</DGlassButton>
        <DGlassButton variant="primary" @click="drawerVisible = false">确认</DGlassButton>
      </template>
    </DGlassDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassDrawer, DGlassButton } from '../../components/dream-ui'

const drawerVisible = ref(false)
<\/script>`

const propsRows = [
  {
    参数: 'modelValue',
    说明: '是否显示抽屉',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
  },
  {
    参数: 'title',
    说明: '抽屉标题',
    类型: 'string',
    可选值: '-',
    默认值: "''"
  },
  {
    参数: 'placement',
    说明: '抽屉位置',
    类型: 'string',
    可选值: 'left | right',
    默认值: 'right'
  },
  {
    参数: 'size',
    说明: '抽屉尺寸',
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
    说明: '抽屉内容'
  },
  {
    插槽名: 'footer',
    说明: '抽屉底部操作区'
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

.demo-drawer {
  display: flex;
  align-items: center;
}
</style>
