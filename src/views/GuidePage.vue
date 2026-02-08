<template>
  <div class="guide-page">
    <h1 class="page-title">设计指南</h1>
    <p class="page-desc">Dream UI 的核心设计语言源于 AR/VR 空间界面，以下是关键设计要素。</p>

    <!-- 色彩 -->
    <DGlassPanel title="色彩体系">
      <div class="color-section">
        <h4 class="sub-title">主题色</h4>
        <div class="color-grid">
          <div v-for="color in themeColors" :key="color.name" class="color-swatch">
            <div class="color-swatch__preview" :style="{ background: color.value }" />
            <span class="color-swatch__name">{{ color.name }}</span>
            <span class="color-swatch__value">{{ color.value }}</span>
          </div>
        </div>

        <h4 class="sub-title" style="margin-top: 32px;">文字色</h4>
        <div class="color-grid">
          <div v-for="color in textColors" :key="color.name" class="color-swatch">
            <div class="color-swatch__preview" :style="{ background: color.value }" />
            <span class="color-swatch__name">{{ color.name }}</span>
            <span class="color-swatch__value">{{ color.css }}</span>
          </div>
        </div>
      </div>
    </DGlassPanel>

    <!-- 毛玻璃效果 -->
    <DGlassPanel title="毛玻璃效果" style="margin-top: 24px;">
      <p class="guide-text">每个组件必须包含 backdrop-filter 属性来实现毛玻璃穿透效果：</p>
      <DGlassCard>
        <pre class="code-block">backdrop-filter: blur(20px) saturate(1.2);
-webkit-backdrop-filter: blur(20px) saturate(1.2);
background: rgba(255, 255, 255, 0.08);</pre>
      </DGlassCard>
      <div class="blur-demo" style="margin-top: 24px;">
        <div class="blur-demo__bg">
          <div class="blur-demo__item" style="backdrop-filter: blur(10px); background: rgba(255,255,255,0.08);">
            <span>blur(10px)</span>
            <small>轻度 · 标签/徽章</small>
          </div>
          <div class="blur-demo__item" style="backdrop-filter: blur(20px); background: rgba(255,255,255,0.08);">
            <span>blur(20px)</span>
            <small>标准 · 卡片/面板</small>
          </div>
          <div class="blur-demo__item" style="backdrop-filter: blur(40px); background: rgba(255,255,255,0.08);">
            <span>blur(40px)</span>
            <small>深度 · 对话框</small>
          </div>
        </div>
      </div>
    </DGlassPanel>

    <!-- 光晕边框 -->
    <DGlassPanel title="光晕边框" style="margin-top: 24px;">
      <p class="guide-text">组件的标志性视觉特征——多层 box-shadow 构建的发光边框效果：</p>
      <DGlassCard>
        <pre class="code-block">/* 基础边框 */
border: 1px solid rgba(255, 255, 255, 0.12);

/* 多层光晕 */
box-shadow:
  0 0 1px 0 rgba(255, 255, 255, 0.15) inset,  /* 内发光 */
  0 0 20px 0 rgba(255, 255, 255, 0.03),        /* 外光晕 */
  0 8px 32px rgba(0, 0, 0, 0.2);               /* 投影 */</pre>
      </DGlassCard>

      <div class="glow-demo" style="margin-top: 24px;">
        <DGlassCard variant="primary" hoverable>
          <div class="glow-label">Primary 光晕</div>
        </DGlassCard>
        <DGlassCard variant="success" hoverable>
          <div class="glow-label">Success 光晕</div>
        </DGlassCard>
        <DGlassCard variant="info" hoverable>
          <div class="glow-label">Info 光晕</div>
        </DGlassCard>
        <DGlassCard variant="danger" hoverable>
          <div class="glow-label">Danger 光晕</div>
        </DGlassCard>
      </div>
    </DGlassPanel>

    <!-- 圆角 -->
    <DGlassPanel title="圆角规范" style="margin-top: 24px;">
      <div class="radius-demo">
        <div v-for="r in radiusItems" :key="r.name" class="radius-item">
          <div class="radius-item__box" :style="{ borderRadius: r.value }" />
          <div class="radius-item__info">
            <span class="radius-item__name">{{ r.name }}</span>
            <span class="radius-item__value">{{ r.value }}</span>
          </div>
        </div>
      </div>
    </DGlassPanel>

    <!-- 间距 -->
    <DGlassPanel title="间距系统" style="margin-top: 24px;">
      <div class="spacing-demo">
        <div v-for="s in spacingItems" :key="s.name" class="spacing-item">
          <div class="spacing-item__bar" :style="{ width: s.value }" />
          <span class="spacing-item__label">{{ s.name }} · {{ s.value }}</span>
        </div>
      </div>
    </DGlassPanel>
  </div>
</template>

<script setup lang="ts">
/**
 * @author buchi
 * @since 2026-02-08
 */
import { DGlassPanel, DGlassCard } from '../components/dream-ui'

const themeColors = [
  { name: 'Primary', value: '#60a5fa' },
  { name: 'Success', value: '#4ade80' },
  { name: 'Warning', value: '#fbbf24' },
  { name: 'Danger', value: '#f87171' },
  { name: 'Info', value: '#a78bfa' },
]

const textColors = [
  { name: '主文字', value: 'rgba(255,255,255,0.95)', css: '--dream-text-primary' },
  { name: '次要文字', value: 'rgba(255,255,255,0.65)', css: '--dream-text-secondary' },
  { name: '辅助文字', value: 'rgba(255,255,255,0.40)', css: '--dream-text-tertiary' },
  { name: '禁用文字', value: 'rgba(255,255,255,0.25)', css: '--dream-text-disabled' },
]

const radiusItems = [
  { name: 'sm', value: '8px' },
  { name: 'md', value: '12px' },
  { name: 'lg', value: '16px' },
  { name: 'xl', value: '24px' },
  { name: 'full', value: '9999px' },
]

const spacingItems = [
  { name: 'xs', value: '4px' },
  { name: 'sm', value: '8px' },
  { name: 'md', value: '12px' },
  { name: 'lg', value: '16px' },
  { name: 'xl', value: '24px' },
  { name: '2xl', value: '32px' },
  { name: '3xl', value: '48px' },
]
</script>

<style scoped lang="scss">
.guide-page {
  animation: dream-slide-up 0.6s ease;
}

.page-title {
  font-size: var(--dream-text-3xl);
  font-weight: var(--dream-font-bold);
  margin-bottom: var(--dream-space-md);
}

.page-desc {
  font-size: var(--dream-text-lg);
  color: var(--dream-text-secondary);
  margin-bottom: var(--dream-space-3xl);
}

.sub-title {
  font-size: var(--dream-text-base);
  font-weight: var(--dream-font-semibold);
  color: var(--dream-text-primary);
  margin: 0 0 var(--dream-space-md);
}

.guide-text {
  font-size: var(--dream-text-sm);
  color: var(--dream-text-secondary);
  margin-bottom: var(--dream-space-lg);
  line-height: 1.7;
}

/* Colors */
.color-grid {
  display: flex;
  gap: var(--dream-space-lg);
  flex-wrap: wrap;
}

.color-swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  &__preview {
    width: 56px;
    height: 56px;
    border-radius: var(--dream-radius-md);
    border: 1px solid var(--dream-border-default);
  }

  &__name {
    font-size: var(--dream-text-sm);
    font-weight: var(--dream-font-medium);
    color: var(--dream-text-primary);
  }

  &__value {
    font-size: var(--dream-text-xs);
    color: var(--dream-text-tertiary);
    font-family: var(--dream-font-mono);
  }
}

/* Code */
.code-block {
  font-family: var(--dream-font-mono);
  font-size: var(--dream-text-sm);
  color: var(--dream-text-secondary);
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
}

/* Blur demo */
.blur-demo__bg {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--dream-space-lg);
  padding: var(--dream-space-xl);
  border-radius: var(--dream-radius-lg);
  background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.06), rgba(255,255,255,0.03));
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.blur-demo__item {
  padding: var(--dream-space-xl);
  border-radius: var(--dream-radius-md);
  border: 1px solid var(--dream-border-default);
  text-align: center;

  span {
    display: block;
    font-family: var(--dream-font-mono);
    font-size: var(--dream-text-sm);
    color: var(--dream-text-primary);
    margin-bottom: 4px;
  }

  small {
    color: var(--dream-text-tertiary);
    font-size: var(--dream-text-xs);
  }
}

/* Glow demo */
.glow-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--dream-space-lg);
}

.glow-label {
  text-align: center;
  font-size: var(--dream-text-sm);
  font-weight: var(--dream-font-medium);
  padding: var(--dream-space-md) 0;
}

/* Radius */
.radius-demo {
  display: flex;
  gap: var(--dream-space-2xl);
  flex-wrap: wrap;
  align-items: flex-end;
}

.radius-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dream-space-sm);

  &__box {
    width: 64px;
    height: 64px;
    background: var(--dream-bg-secondary);
    border: 1px solid var(--dream-border-hover);
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  &__name {
    font-size: var(--dream-text-sm);
    font-weight: var(--dream-font-medium);
    color: var(--dream-text-primary);
  }

  &__value {
    font-size: var(--dream-text-xs);
    color: var(--dream-text-tertiary);
    font-family: var(--dream-font-mono);
  }
}

/* Spacing */
.spacing-demo {
  display: flex;
  flex-direction: column;
  gap: var(--dream-space-md);
}

.spacing-item {
  display: flex;
  align-items: center;
  gap: var(--dream-space-lg);

  &__bar {
    height: 8px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.50));
    border-radius: var(--dream-radius-full);
    min-width: 4px;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.10);
  }

  &__label {
    font-size: var(--dream-text-sm);
    color: var(--dream-text-secondary);
    font-family: var(--dream-font-mono);
    white-space: nowrap;
  }
}

@keyframes dream-slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
