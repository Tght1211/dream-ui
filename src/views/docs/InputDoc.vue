<template>
  <div class="doc-page">
    <h1 class="doc-page__title">Input 输入框</h1>
    <p class="doc-page__desc">玻璃拟态输入框，支持多种状态</p>

    <!-- 基础用法 -->
    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-inputs">
        <DGlassInput
          v-model="inputValue1"
          label="用户名"
          placeholder="请输入用户名"
          clearable
        />
      </div>
    </DemoBlock>

    <!-- 状态 -->
    <DemoBlock
      description="状态"
      :code="code2"
    >
      <div class="demo-inputs">
        <DGlassInput
          v-model="inputValue2"
          label="错误状态"
          placeholder="请输入内容"
          error="请输入正确的格式"
        />
        <DGlassInput
          v-model="inputValue3"
          label="禁用状态"
          placeholder="禁用输入"
          disabled
        />
        <DGlassInput
          v-model="inputValue4"
          label="提示信息"
          placeholder="请输入内容"
          hint="这是提示信息"
        />
      </div>
    </DemoBlock>

    <!-- 尺寸 -->
    <DemoBlock
      description="尺寸"
      :code="code3"
    >
      <div class="demo-inputs">
        <DGlassInput
          v-model="inputValue5"
          label="Small"
          placeholder="Small size"
          size="sm"
        />
        <DGlassInput
          v-model="inputValue6"
          label="Medium"
          placeholder="Medium size"
          size="md"
        />
        <DGlassInput
          v-model="inputValue7"
          label="Large"
          placeholder="Large size"
          size="lg"
        />
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
 * Input 输入框文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassInput } from '../../components/dream-ui'

const inputValue1 = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('')
const inputValue4 = ref('')
const inputValue5 = ref('')
const inputValue6 = ref('')
const inputValue7 = ref('')

const code1 = `<template>
  <DGlassInput
    v-model="inputValue"
    label="用户名"
    placeholder="请输入用户名"
    clearable
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassInput } from '../../components/dream-ui'

const inputValue = ref('')
<\/script>`

const code2 = `<template>
  <DGlassInput
    v-model="inputValue"
    label="错误状态"
    placeholder="请输入内容"
    error="请输入正确的格式"
  />
  <DGlassInput
    v-model="inputValue2"
    label="禁用状态"
    placeholder="禁用输入"
    disabled
  />
  <DGlassInput
    v-model="inputValue3"
    label="提示信息"
    placeholder="请输入内容"
    hint="这是提示信息"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassInput } from '../../components/dream-ui'

const inputValue = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('')
<\/script>`

const code3 = `<template>
  <DGlassInput
    v-model="inputValue"
    label="Small"
    placeholder="Small size"
    size="sm"
  />
  <DGlassInput
    v-model="inputValue2"
    label="Medium"
    placeholder="Medium size"
    size="md"
  />
  <DGlassInput
    v-model="inputValue3"
    label="Large"
    placeholder="Large size"
    size="lg"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassInput } from '../../components/dream-ui'

const inputValue = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('')
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
    参数: 'type',
    说明: '输入框类型',
    类型: 'string',
    可选值: 'text | password | number | email 等',
    默认值: 'text'
  },
  {
    参数: 'placeholder',
    说明: '输入框占位文本',
    类型: 'string',
    可选值: '-',
    默认值: "''"
  },
  {
    参数: 'label',
    说明: '输入框标签',
    类型: 'string',
    可选值: '-',
    默认值: "''"
  },
  {
    参数: 'hint',
    说明: '提示信息',
    类型: 'string',
    可选值: '-',
    默认值: "''"
  },
  {
    参数: 'error',
    说明: '错误信息',
    类型: 'string',
    可选值: '-',
    默认值: "''"
  },
  {
    参数: 'size',
    说明: '输入框尺寸',
    类型: 'string',
    可选值: 'sm | md | lg',
    默认值: 'md'
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
  },
  {
    参数: 'clearable',
    说明: '是否显示清除按钮',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
  }
]

const eventsRows = [
  {
    事件名: 'update:modelValue',
    说明: '输入值变化时触发',
    回调参数: 'value: string'
  },
  {
    事件名: 'focus',
    说明: '输入框获得焦点时触发',
    回调参数: 'event: FocusEvent'
  },
  {
    事件名: 'blur',
    说明: '输入框失去焦点时触发',
    回调参数: 'event: FocusEvent'
  },
  {
    事件名: 'clear',
    说明: '点击清除按钮时触发',
    回调参数: '-'
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

.demo-inputs {
  display: flex;
  flex-direction: column;
  gap: var(--dream-space-lg);
  max-width: 400px;
}
</style>
