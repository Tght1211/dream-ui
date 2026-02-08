<template>
  <div class="doc-page">
    <h1>Avatar 头像</h1>
    <p>玻璃拟态头像组件</p>

    <DemoBlock
      description="基础用法 - 尺寸和状态"
      :code="code1"
    >
      <div class="demo-avatars">
        <DGlassAvatar name="Alice" size="sm" status="online" />
        <DGlassAvatar name="Alice" size="md" status="busy" />
        <DGlassAvatar name="Alice" size="lg" status="offline" />
        <DGlassAvatar name="Alice" size="xl" status="online" />
      </div>
    </DemoBlock>

    <DemoBlock
      description="变体样式"
      :code="code2"
    >
      <div class="demo-avatars">
        <DGlassAvatar name="Alice" variant="default" />
        <DGlassAvatar name="Alice" variant="primary" />
        <DGlassAvatar name="Alice" variant="success" />
        <DGlassAvatar name="Alice" variant="info" />
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
 * Avatar 头像文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassAvatar } from '../../components/dream-ui'

const code1 = `<template>
  <div class="demo-avatars">
    <DGlassAvatar name="Alice" size="sm" status="online" />
    <DGlassAvatar name="Alice" size="md" status="busy" />
    <DGlassAvatar name="Alice" size="lg" status="offline" />
    <DGlassAvatar name="Alice" size="xl" status="online" />
  </div>
</template>`

const code2 = `<template>
  <div class="demo-avatars">
    <DGlassAvatar name="Alice" variant="default" />
    <DGlassAvatar name="Alice" variant="primary" />
    <DGlassAvatar name="Alice" variant="success" />
    <DGlassAvatar name="Alice" variant="info" />
  </div>
</template>`

const propsRows = [
  {
    参数: 'src',
    说明: '头像图片地址',
    类型: 'string',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'alt',
    说明: '图片替代文本',
    类型: 'string',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'name',
    说明: '用户名，用于生成首字母',
    类型: 'string',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'size',
    说明: '头像尺寸',
    类型: 'string',
    可选值: 'sm | md | lg | xl',
    默认值: 'md'
  },
  {
    参数: 'variant',
    说明: '头像变体',
    类型: 'string',
    可选值: 'default | primary | success | info',
    默认值: 'default'
  },
  {
    参数: 'status',
    说明: '在线状态',
    类型: 'string',
    可选值: 'online | busy | offline | ""',
    默认值: ''
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

.demo-avatars {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dream-space-lg);
  align-items: center;
}
</style>
