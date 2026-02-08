<template>
  <div class="doc-page">
    <h1>Select 选择器</h1>
    <p>玻璃拟态下拉选择器</p>

    <!-- 基础用法 -->
    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <DGlassSelect
        v-model="selectValue1"
        label="城市"
        :options="options1"
      />
    </DemoBlock>

    <!-- 尺寸 -->
    <DemoBlock
      description="尺寸"
      :code="code2"
    >
      <div class="demo-selects">
        <DGlassSelect
          v-model="selectValue2"
          size="sm"
          label="Small"
          :options="options1"
        />
        <DGlassSelect
          v-model="selectValue3"
          size="md"
          label="Medium"
          :options="options1"
        />
        <DGlassSelect
          v-model="selectValue4"
          size="lg"
          label="Large"
          :options="options1"
        />
      </div>
    </DemoBlock>

    <!-- 禁用 -->
    <DemoBlock
      description="禁用"
      :code="code3"
    >
      <DGlassSelect
        v-model="selectValue5"
        label="城市"
        :options="options1"
        disabled
      />
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
 * Select 选择器文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassSelect } from '../../components/dream-ui'

const selectValue1 = ref('')
const selectValue2 = ref('')
const selectValue3 = ref('')
const selectValue4 = ref('')
const selectValue5 = ref('')

const options1 = [
  { label: '广州', value: 'gz' },
  { label: '深圳', value: 'sz' },
  { label: '上海', value: 'sh' }
]

const code1 = `<template>
  <DGlassSelect
    v-model="selectValue"
    label="城市"
    :options="options"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassSelect } from '../../components/dream-ui'

const selectValue = ref('')

const options = [
  { label: '广州', value: 'gz' },
  { label: '深圳', value: 'sz' },
  { label: '上海', value: 'sh' }
]
<\/script>`

const code2 = `<template>
  <div class="demo-selects">
    <DGlassSelect
      v-model="selectValue1"
      size="sm"
      label="Small"
      :options="options"
    />
    <DGlassSelect
      v-model="selectValue2"
      size="md"
      label="Medium"
      :options="options"
    />
    <DGlassSelect
      v-model="selectValue3"
      size="lg"
      label="Large"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassSelect } from '../../components/dream-ui'

const selectValue1 = ref('')
const selectValue2 = ref('')
const selectValue3 = ref('')

const options = [
  { label: '广州', value: 'gz' },
  { label: '深圳', value: 'sz' },
  { label: '上海', value: 'sh' }
]
<\/script>`

const code3 = `<template>
  <DGlassSelect
    v-model="selectValue"
    label="城市"
    :options="options"
    disabled
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassSelect } from '../../components/dream-ui'

const selectValue = ref('')

const options = [
  { label: '广州', value: 'gz' },
  { label: '深圳', value: 'sz' },
  { label: '上海', value: 'sh' }
]
<\/script>`

const propsRows = [
  {
    参数: 'modelValue',
    说明: '绑定值',
    类型: 'string | number',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'options',
    说明: '选项数据',
    类型: 'Array<{label: string, value: string | number}>',
    可选值: '-',
    默认值: '[]'
  },
  {
    参数: 'placeholder',
    说明: '输入框占位文本',
    类型: 'string',
    可选值: '-',
    默认值: '请选择'
  },
  {
    参数: 'label',
    说明: '标签文本',
    类型: 'string',
    可选值: '-',
    默认值: ''
  },
  {
    参数: 'size',
    说明: '尺寸',
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
  }
]

const eventsRows = [
  {
    事件名: 'update:modelValue',
    说明: '选中值发生变化时触发',
    回调参数: 'value: string | number'
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

.demo-selects {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dream-space-md);
  align-items: flex-start;
}
</style>
