<template>
  <div class="doc-page">
    <h1>Notification 通知</h1>
    <p>玻璃拟态通知组件，用于显示系统通知消息</p>

    <DemoBlock
      description="不同类型"
      :code="code1"
    >
      <div class="demo-notifications">
        <DGlassNotification type="info" title="信息通知" message="这是一条信息通知" :duration="0" :closable="true" />
        <DGlassNotification type="success" title="成功通知" message="操作成功完成" :duration="0" :closable="true" />
        <DGlassNotification type="warning" title="警告通知" message="请注意相关事项" :duration="0" :closable="true" />
        <DGlassNotification type="danger" title="错误通知" message="操作失败，请重试" :duration="0" :closable="true" />
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
 * Notification 通知文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassNotification } from '../../components/dream-ui'

const code1 = `<template>
  <div class="demo-notifications">
    <DGlassNotification type="info" title="信息通知" message="这是一条信息通知" :duration="0" :closable="true" />
    <DGlassNotification type="success" title="成功通知" message="操作成功完成" :duration="0" :closable="true" />
    <DGlassNotification type="warning" title="警告通知" message="请注意相关事项" :duration="0" :closable="true" />
    <DGlassNotification type="danger" title="错误通知" message="操作失败，请重试" :duration="0" :closable="true" />
  </div>
</template>`

const propsRows = [
  {
    参数: 'type',
    说明: '通知类型',
    类型: 'string',
    可选值: 'info | success | warning | danger',
    默认值: 'info'
  },
  {
    参数: 'title',
    说明: '通知标题',
    类型: 'string',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'message',
    说明: '通知内容',
    类型: 'string',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'closable',
    说明: '是否显示关闭按钮',
    类型: 'boolean',
    可选值: '-',
    默认值: 'true'
  },
  {
    参数: 'duration',
    说明: '自动关闭延迟时间（毫秒），0 表示不自动关闭',
    类型: 'number',
    可选值: '-',
    默认值: '4000'
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

.demo-notifications {
  display: flex;
  flex-direction: column;
  gap: var(--dream-space-md);
  max-width: 420px;
}
</style>
