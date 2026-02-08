<template>
  <div class="doc-page">
    <h1>Textarea 文本域</h1>
    <p>玻璃拟态多行文本输入框组件</p>

    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-textareas">
        <DGlassTextarea
          v-model="textareaValue1"
          label="留言"
          placeholder="请输入留言内容"
          :rows="4"
        />
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
 * Textarea 文本域文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassTextarea } from '../../components/dream-ui'

const textareaValue1 = ref('')

const code1 = `<template>
  <DGlassTextarea
    v-model="textareaValue"
    label="留言"
    placeholder="请输入留言内容"
    :rows="4"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassTextarea } from '../../components/dream-ui'

const textareaValue = ref('')
<\/script>`

const propsRows = [
  {
    参数: 'modelValue',
    说明: '绑定值',
    类型: 'string',
    可选值: '-',
    默认值: "''"
  },
  {
    参数: 'placeholder',
    说明: '占位文本',
    类型: 'string',
    可选值: '-',
    默认值: "''"
  },
  {
    参数: 'label',
    说明: '标签文本',
    类型: 'string',
    可选值: '-',
    默认值: "''"
  },
  {
    参数: 'rows',
    说明: '行数',
    类型: 'number',
    可选值: '-',
    默认值: '4'
  },
  {
    参数: 'disabled',
    说明: '是否禁用',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
  },
  {
    参数: 'readonly',
    说明: '是否只读',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
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

.demo-textareas {
  display: flex;
  flex-direction: column;
  gap: var(--dream-space-lg);
  max-width: 500px;
}
</style>
