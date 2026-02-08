<template>
  <div class="doc-page">
    <h1>Timeline 时间线</h1>
    <p>玻璃拟态时间线组件，用于展示时间顺序的事件</p>

    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-timeline">
        <DGlassTimeline :items="timelineItems" />
      </div>
    </DemoBlock>

    <ApiTable
      title="Props"
      :columns="['参数', '说明', '类型', '可选值', '默认值']"
      :rows="propsRows"
    />
    <ApiTable
      title="TimelineItem 接口"
      :columns="['字段', '说明', '类型', '必填']"
      :rows="itemRows"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * Timeline 时间线文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassTimeline } from '../../components/dream-ui'

const timelineItems = [
  {
    time: '2026-02-08 10:00',
    title: '项目启动',
    desc: '项目正式启动，开始开发工作',
    active: true
  },
  {
    time: '2026-02-08 14:00',
    title: '需求分析',
    desc: '完成需求分析和技术方案设计',
    active: true
  },
  {
    time: '2026-02-08 18:00',
    title: '开发进行中',
    desc: '正在进行功能开发',
    active: false
  },
  {
    time: '2026-02-09 10:00',
    title: '测试阶段',
    desc: '进入测试阶段',
    active: false
  }
]

const code1 = `<template>
  <div class="demo-timeline">
    <DGlassTimeline :items="timelineItems" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassTimeline } from '../../components/dream-ui'

const timelineItems = [
  {
    time: '2026-02-08 10:00',
    title: '项目启动',
    desc: '项目正式启动，开始开发工作',
    active: true
  },
  {
    time: '2026-02-08 14:00',
    title: '需求分析',
    desc: '完成需求分析和技术方案设计',
    active: true
  },
  {
    time: '2026-02-08 18:00',
    title: '开发进行中',
    desc: '正在进行功能开发',
    active: false
  },
  {
    time: '2026-02-09 10:00',
    title: '测试阶段',
    desc: '进入测试阶段',
    active: false
  }
]
<\/script>`

const propsRows = [
  {
    参数: 'items',
    说明: '时间线项数组',
    类型: 'Array<TimelineItem>',
    可选值: '-',
    默认值: '[]'
  }
]

const itemRows = [
  {
    字段: 'time',
    说明: '时间文本',
    类型: 'string',
    必填: '否'
  },
  {
    字段: 'title',
    说明: '标题',
    类型: 'string',
    必填: '否'
  },
  {
    字段: 'desc',
    说明: '描述内容',
    类型: 'string',
    必填: '否'
  },
  {
    字段: 'icon',
    说明: '图标文本',
    类型: 'string',
    必填: '否'
  },
  {
    字段: 'active',
    说明: '是否为激活状态',
    类型: 'boolean',
    必填: '否'
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

.demo-timeline {
  width: 100%;
}
</style>
