<template>
  <div class="doc-page">
    <h1 class="doc-page__title">Card 卡片</h1>
    <p class="doc-page__desc">玻璃拟态卡片容器，核心组件</p>

    <!-- 基础用法 -->
    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-cards">
        <DGlassCard>
          <p>默认卡片内容</p>
        </DGlassCard>
        <DGlassCard hoverable>
          <p>可悬停卡片（hoverable）</p>
        </DGlassCard>
      </div>
    </DemoBlock>

    <!-- 主题色变体 -->
    <DemoBlock
      description="主题色变体"
      :code="code2"
    >
      <div class="demo-cards">
        <DGlassCard variant="primary" hoverable>
          <p>Primary 卡片</p>
        </DGlassCard>
        <DGlassCard variant="success" hoverable>
          <p>Success 卡片</p>
        </DGlassCard>
        <DGlassCard variant="info" hoverable>
          <p>Info 卡片</p>
        </DGlassCard>
      </div>
    </DemoBlock>

    <!-- 插槽 -->
    <DemoBlock
      description="插槽"
      :code="code3"
    >
      <DGlassCard>
        <template #header>
          卡片标题
        </template>
        <p>这是卡片的主体内容区域</p>
        <p>可以包含任意内容</p>
        <template #footer>
          <div class="demo-card-footer">
            <DGlassButton size="sm">取消</DGlassButton>
            <DGlassButton size="sm" variant="primary">确认</DGlassButton>
          </div>
        </template>
      </DGlassCard>
    </DemoBlock>

    <!-- 光晕脉冲 -->
    <DemoBlock
      description="光晕脉冲"
      :code="code4"
    >
      <DGlassCard glow>
        <p>带有光晕脉冲效果的卡片</p>
      </DGlassCard>
    </DemoBlock>

    <!-- API Table -->
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
 * Card 卡片文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassCard, DGlassButton } from '../../components/dream-ui'

const code1 = `<template>
  <div class="demo-cards">
    <DGlassCard>
      <p>默认卡片内容</p>
    </DGlassCard>
    <DGlassCard hoverable>
      <p>可悬停卡片（hoverable）</p>
    </DGlassCard>
  </div>
</template>`

const code2 = `<template>
  <div class="demo-cards">
    <DGlassCard variant="primary" hoverable>
      <p>Primary 卡片</p>
    </DGlassCard>
    <DGlassCard variant="success" hoverable>
      <p>Success 卡片</p>
    </DGlassCard>
    <DGlassCard variant="info" hoverable>
      <p>Info 卡片</p>
    </DGlassCard>
  </div>
</template>`

const code3 = `<template>
  <DGlassCard>
    <template #header>
      卡片标题
    </template>
    <p>这是卡片的主体内容区域</p>
    <p>可以包含任意内容</p>
    <template #footer>
      <div class="demo-card-footer">
        <DGlassButton size="sm">取消</DGlassButton>
        <DGlassButton size="sm" variant="primary">确认</DGlassButton>
      </div>
    </template>
  </DGlassCard>
</template>`

const code4 = `<template>
  <DGlassCard glow>
    <p>带有光晕脉冲效果的卡片</p>
  </DGlassCard>
</template>`

const propsRows = [
  {
    参数: 'variant',
    说明: '卡片变体',
    类型: 'string',
    可选值: 'default | primary | success | warning | danger | info',
    默认值: 'default'
  },
  {
    参数: 'hoverable',
    说明: '是否可悬停',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
  },
  {
    参数: 'glow',
    说明: '是否启用光晕脉冲动画',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
  }
]

const slotsRows = [
  {
    插槽名: 'header',
    说明: '卡片头部内容'
  },
  {
    插槽名: 'default',
    说明: '卡片主体内容'
  },
  {
    插槽名: 'footer',
    说明: '卡片底部内容'
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

.demo-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--dream-space-lg);
}

.demo-card-footer {
  display: flex;
  gap: var(--dream-space-md);
  justify-content: flex-end;
}
</style>
