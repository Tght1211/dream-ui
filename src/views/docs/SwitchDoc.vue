<template>
  <div class="doc-page">
    <h1>Switch 开关</h1>
    <p>玻璃拟态开关组件</p>

    <!-- 基础用法 -->
    <DemoBlock
      description="基础用法"
      :code="code1"
    >
      <DGlassSwitch v-model="switchValue1">
        开启通知
      </DGlassSwitch>
    </DemoBlock>

    <!-- 尺寸 -->
    <DemoBlock
      description="尺寸"
      :code="code2"
    >
      <div class="demo-switches">
        <DGlassSwitch v-model="switchValue2" size="sm">
          Small
        </DGlassSwitch>
        <DGlassSwitch v-model="switchValue3" size="md">
          Medium
        </DGlassSwitch>
        <DGlassSwitch v-model="switchValue4" size="lg">
          Large
        </DGlassSwitch>
      </div>
    </DemoBlock>

    <!-- 禁用 -->
    <DemoBlock
      description="禁用"
      :code="code3"
    >
      <div class="demo-switches">
        <DGlassSwitch v-model="switchValue5" disabled>
          禁用（关闭）
        </DGlassSwitch>
        <DGlassSwitch v-model="switchValue6" disabled>
          禁用（开启）
        </DGlassSwitch>
      </div>
    </DemoBlock>

    <!-- API Table -->
    <ApiTable
      title="Props"
      :columns="['参数', '说明', '类型', '可选值', '默认值']"
      :rows="propsRows"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * Switch 开关文档
 * @author buchi
 * @since 2026-02-08
 */
import { ref } from 'vue'
import DemoBlock from '../../components/site/DemoBlock.vue'
import ApiTable from '../../components/site/ApiTable.vue'
import { DGlassSwitch } from '../../components/dream-ui'

const switchValue1 = ref(false)
const switchValue2 = ref(false)
const switchValue3 = ref(false)
const switchValue4 = ref(false)
const switchValue5 = ref(false)
const switchValue6 = ref(true)

const code1 = `<template>
  <DGlassSwitch v-model="switchValue">
    开启通知
  </DGlassSwitch>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassSwitch } from '../../components/dream-ui'

const switchValue = ref(false)
<\/script>`

const code2 = `<template>
  <div class="demo-switches">
    <DGlassSwitch v-model="switchValue1" size="sm">
      Small
    </DGlassSwitch>
    <DGlassSwitch v-model="switchValue2" size="md">
      Medium
    </DGlassSwitch>
    <DGlassSwitch v-model="switchValue3" size="lg">
      Large
    </DGlassSwitch>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassSwitch } from '../../components/dream-ui'

const switchValue1 = ref(false)
const switchValue2 = ref(false)
const switchValue3 = ref(false)
<\/script>`

const code3 = `<template>
  <div class="demo-switches">
    <DGlassSwitch v-model="switchValue1" disabled>
      禁用（关闭）
    </DGlassSwitch>
    <DGlassSwitch v-model="switchValue2" disabled>
      禁用（开启）
    </DGlassSwitch>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DGlassSwitch } from '../../components/dream-ui'

const switchValue1 = ref(false)
const switchValue2 = ref(true)
<\/script>`

const propsRows = [
  {
    参数: 'modelValue',
    说明: '绑定值',
    类型: 'boolean',
    可选值: '-',
    默认值: 'false'
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

.demo-switches {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dream-space-md);
  align-items: center;
}
</style>
