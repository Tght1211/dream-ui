<template>
  <div class="demo-block">
    <p v-if="description" class="demo-block__desc">{{ description }}</p>
    <!-- 效果展示区 -->
    <div class="demo-block__preview">
      <slot />
    </div>
    <!-- 展开/收起 代码 -->
    <div class="demo-block__actions">
      <button class="demo-block__toggle" @click="showCode = !showCode">
        <span class="demo-block__toggle-icon">{{ showCode ? '▲' : '▼' }}</span>
        {{ showCode ? '隐藏代码' : '显示代码' }}
      </button>
      <button v-if="showCode" class="demo-block__copy" @click="copyCode">
        {{ copied ? '✓ 已复制' : '复制代码' }}
      </button>
    </div>
    <!-- 代码区域 -->
    <Transition name="code-slide">
      <div v-if="showCode" class="demo-block__code">
        <pre><code v-html="highlightedCode" /></pre>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
/**
 * DemoBlock - 组件文档代码展示区域
 * 参考 Element UI 官网的组件展示风格
 * @author buchi
 * @since 2026-02-08
 */
import { ref, computed } from 'vue'

defineOptions({ name: 'DemoBlock' })

interface Props {
  code: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
})

const showCode = ref(false)
const copied = ref(false)

// 简易语法高亮
const highlightedCode = computed(() => {
  let html = escapeHtml(props.code.trim())
  // 字符串
  html = html.replace(/(["'`])(?:(?!\1).)*?\1/g, '<span class="hl-str">$&</span>')
  // 注释
  html = html.replace(/(\/\/.*)/g, '<span class="hl-cmt">$1</span>')
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-cmt">$1</span>')
  html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="hl-cmt">$1</span>')
  // HTML标签
  html = html.replace(/(&lt;\/?)([\w-]+)/g, '$1<span class="hl-tag">$2</span>')
  // 属性名
  html = html.replace(/\s([\w-]+)(=)/g, ' <span class="hl-attr">$1</span>$2')
  // Vue指令
  html = html.replace(/\s(v-[\w.-]+|[@:#][\w.-]+)/g, ' <span class="hl-dir">$1</span>')
  // 关键字
  html = html.replace(/\b(import|export|from|const|let|var|function|return|if|else|interface|type|default|defineProps|defineEmits|withDefaults|ref|computed|defineOptions)\b/g, '<span class="hl-kw">$&</span>')
  // 数字
  html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-num">$&</span>')
  return html
})

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code.trim())
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    // fallback
    const ta = document.createElement('textarea')
    ta.value = props.code.trim()
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
}
</script>

<style scoped lang="scss">
.demo-block {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--dream-radius-lg);
  overflow: hidden;
  margin-bottom: var(--dream-space-xl);
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.02);

  &__desc {
    padding: var(--dream-space-lg) var(--dream-space-xl) 0;
    font-size: var(--dream-text-sm);
    color: var(--dream-text-secondary);
    line-height: 1.6;
    margin: 0;
  }

  &__preview {
    padding: var(--dream-space-xl) var(--dream-space-xl) var(--dream-space-lg);
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--dream-space-lg);
    padding: var(--dream-space-sm) 0;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  &__toggle,
  &__copy {
    font-size: var(--dream-text-xs);
    color: var(--dream-text-tertiary);
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: var(--dream-radius-sm);
    transition: all var(--dream-transition-fast);
    display: inline-flex;
    align-items: center;
    gap: 4px;

    &:hover {
      color: var(--dream-text-primary);
      background: rgba(255, 255, 255, 0.04);
    }
  }

  &__toggle-icon {
    font-size: 10px;
  }

  &__code {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(0, 0, 0, 0.20);
    overflow-x: auto;

    pre {
      margin: 0;
      padding: var(--dream-space-xl);
      font-family: var(--dream-font-mono);
      font-size: 13px;
      line-height: 1.7;
      color: var(--dream-text-secondary);
      tab-size: 2;
    }

    code {
      font-family: inherit;
    }
  }
}

/* 语法高亮 */
:deep(.hl-tag) { color: #7dd3fc; }
:deep(.hl-attr) { color: #c4b5fd; }
:deep(.hl-dir) { color: #86efac; }
:deep(.hl-str) { color: #fca5a5; }
:deep(.hl-kw) { color: #c084fc; }
:deep(.hl-num) { color: #fdba74; }
:deep(.hl-cmt) { color: rgba(255,255,255,0.25); font-style: italic; }

/* 代码展开动画 */
.code-slide-enter-active,
.code-slide-leave-active {
  transition: all 0.25s ease;
  max-height: 600px;
}

.code-slide-enter-from,
.code-slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
