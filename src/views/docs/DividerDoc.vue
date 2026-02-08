<template>
  <div class="doc-page">
    <h1>Divider 分割线</h1>
    <p>玻璃拟态分割线组件，用于分隔内容区域</p>

    <DemoBlock
      description="水平分割线"
      :code="code1"
    >
      <div class="demo-divider">
        <p>上方内容</p>
        <DGlassDivider direction="horizontal" />
        <p>下方内容</p>
        <DGlassDivider direction="horizontal" variant="glow">
          <template #default>OR</template>
        </DGlassDivider>
        <p>带文字的分割线</p>
      </div>
    </DemoBlock>

    <DemoBlock
      description="垂直分割线"
      :code="code2"
    >
      <div class="demo-divider-vertical">
        <span>左侧</span>
        <DGlassDivider direction="vertical" />
        <span>中间</span>
        <DGlassDivider direction="vertical" />
        <span>右侧</span>
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
 * Divider 分割线文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassDivider } from '../../components/dream-ui'

const code1 = `<template>
  <div class="demo-divider">
    <p>上方内容</p>
    <DGlassDivider direction="horizontal" />
    <p>下方内容</p>
    <DGlassDivider direction="horizontal" variant="glow">
      <template #default>OR</template>
    </DGlassDivider>
    <p>带文字的分割线</p>
  </div>
</template>`

const code2 = `<template>
  <div class="demo-divider-vertical">
    <span>左侧</span>
    <DGlassDivider direction="vertical" />
    <span>中间</span>
    <DGlassDivider direction="vertical" />
    <span>右侧</span>
  </div>
</template>`

const propsRows = [
  {
    参数: 'direction',
    说明: '分割线方向',
    类型: 'string',
    可选值: 'horizontal | vertical',
    默认值: 'horizontal'
  },
  {
    参数: 'variant',
    说明: '分割线变体',
    类型: 'string',
    可选值: 'default | light | glow',
    默认值: 'default'
  }
]

const slotsRows = [
  {
    插槽名: 'default',
    说明: '分割线中间的文字内容'
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

.demo-divider {
  width: 100%;
}

.demo-divider-vertical {
  display: flex;
  align-items: center;
  gap: var(--dream-space-md);
  height: 40px;
}
</style>
