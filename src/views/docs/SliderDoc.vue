<template>
  <div class="doc-page">
    <h1>Slider 滑块</h1>
    <p>玻璃拟态滑块组件，用于选择数值范围</p>

    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <div class="demo-sliders">
        <DGlassSlider v-model="sliderValue1" :show-value="true" />
      </div>
    </DemoBlock>

    <DemoBlock
      description="带标签和自定义范围"
      :code="code2"
    >
      <div class="demo-sliders">
        <DGlassSlider
          v-model="sliderValue2"
          label="音量"
          :min="0"
          :max="100"
          :step="5"
          :show-value="true"
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
 * Slider 滑块文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassSlider } from '../../components/dream-ui'

const sliderValue1 = ref(50)
const sliderValue2 = ref(30)

const code1 = `<template>
  <DGlassSlider v-model="sliderValue" :show-value="true" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassSlider } from '../../components/dream-ui'

const sliderValue = ref(50)
<\/script>`

const code2 = `<template>
  <DGlassSlider
    v-model="sliderValue"
    label="音量"
    :min="0"
    :max="100"
    :step="5"
    :show-value="true"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassSlider } from '../../components/dream-ui'

const sliderValue = ref(30)
<\/script>`

const propsRows = [
  {
    参数: 'modelValue',
    说明: '绑定值',
    类型: 'number',
    可选值: '-',
    默认值: '0'
  },
  {
    参数: 'min',
    说明: '最小值',
    类型: 'number',
    可选值: '-',
    默认值: '0'
  },
  {
    参数: 'max',
    说明: '最大值',
    类型: 'number',
    可选值: '-',
    默认值: '100'
  },
  {
    参数: 'step',
    说明: '步长',
    类型: 'number',
    可选值: '-',
    默认值: '1'
  },
  {
    参数: 'label',
    说明: '标签文本',
    类型: 'string',
    可选值: '-',
    默认值: "''"
  },
  {
    参数: 'showValue',
    说明: '是否显示当前值',
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

.demo-sliders {
  display: flex;
  flex-direction: column;
  gap: var(--dream-space-xl);
  max-width: 500px;
}
</style>
