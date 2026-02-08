<template>
  <div class="doc-page">
    <h1 class="doc-page__title">Button 按钮</h1>
    <p class="doc-page__desc">玻璃拟态按钮，支持多种变体、尺寸和状态</p>

    <!-- 基础用法 -->
    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-buttons">
        <DGlassButton variant="default">Default</DGlassButton>
        <DGlassButton variant="primary">Primary</DGlassButton>
        <DGlassButton variant="success">Success</DGlassButton>
        <DGlassButton variant="warning">Warning</DGlassButton>
        <DGlassButton variant="danger">Danger</DGlassButton>
        <DGlassButton variant="info">Info</DGlassButton>
        <DGlassButton variant="ghost">Ghost</DGlassButton>
      </div>
    </DemoBlock>

    <!-- 尺寸 -->
    <DemoBlock
      description="尺寸"
      :code="code2"
    >
      <div class="demo-buttons">
        <DGlassButton size="sm">Small</DGlassButton>
        <DGlassButton size="md">Medium</DGlassButton>
        <DGlassButton size="lg">Large</DGlassButton>
      </div>
    </DemoBlock>

    <!-- 状态 -->
    <DemoBlock
      description="状态"
      :code="code3"
    >
      <div class="demo-buttons">
        <DGlassButton :loading="true">Loading</DGlassButton>
        <DGlassButton disabled>Disabled</DGlassButton>
        <DGlassButton outline>Outline</DGlassButton>
        <DGlassButton block>Block Button</DGlassButton>
      </div>
    </DemoBlock>

    <!-- API Table -->
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
 * Button 按钮文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassButton } from '../../components/dream-ui'

const code1 = `<template>
  <div class="demo-buttons">
    <DGlassButton variant="default">Default</DGlassButton>
    <DGlassButton variant="primary">Primary</DGlassButton>
    <DGlassButton variant="success">Success</DGlassButton>
    <DGlassButton variant="warning">Warning</DGlassButton>
    <DGlassButton variant="danger">Danger</DGlassButton>
    <DGlassButton variant="info">Info</DGlassButton>
    <DGlassButton variant="ghost">Ghost</DGlassButton>
  </div>
</template>`

const code2 = `<template>
  <div class="demo-buttons">
    <DGlassButton size="sm">Small</DGlassButton>
    <DGlassButton size="md">Medium</DGlassButton>
    <DGlassButton size="lg">Large</DGlassButton>
  </div>
</template>`

const code3 = `<template>
  <div class="demo-buttons">
    <DGlassButton :loading="true">Loading</DGlassButton>
    <DGlassButton disabled>Disabled</DGlassButton>
    <DGlassButton outline>Outline</DGlassButton>
    <DGlassButton block>Block Button</DGlassButton>
  </div>
</template>`

const propsRows = [
  {
    参数: 'variant',
    说明: '按钮变体',
    类型: 'string',
    可选值: 'default | primary | success | warning | danger | info | ghost',
    默认值: 'default'
  },
  {
    参数: 'size',
    说明: '按钮尺寸',
    类型: 'string',
    可选值: 'sm | md | lg',
    默认值: 'md'
  },
  {
    参数: 'block',
    说明: '是否为块级按钮',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
  },
  {
    参数: 'loading',
    说明: '是否加载中',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
  },
  {
    参数: 'disabled',
    说明: '是否禁用',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
  },
  {
    参数: 'iconOnly',
    说明: '是否为图标按钮',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
  },
  {
    参数: 'outline',
    说明: '是否为轮廓按钮',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
  }
]

const eventsRows = [
  {
    事件名: 'click',
    说明: '点击事件',
    回调参数: 'event: MouseEvent'
  }
]
</script>

<style scoped lang="scss">
.doc-page {
  padding: var(--dream-space-2xl);

  &__title {
    font-size: var(--dream-text-3xl);
    font-weight: var(--dream-font-bold);
    color: var(--dream-text-primary);
    margin: 0 0 var(--dream-space-md);
  }

  &__desc {
    font-size: var(--dream-text-base);
    color: var(--dream-text-secondary);
    margin: 0 0 var(--dream-space-2xl);
    line-height: 1.6;
  }
}

.demo-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dream-space-md);
  align-items: center;
}
</style>
