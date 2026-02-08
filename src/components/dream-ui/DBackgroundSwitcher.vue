<template>
  <div :class="['d-bg-switcher', { 'd-bg-switcher--open': isOpen }]">
    <!-- 触发按钮 -->
    <button class="d-bg-switcher__trigger" @click="isOpen = !isOpen" title="外观设置">
      <span class="d-bg-switcher__trigger-icon">
        <span class="trigger-dot" :style="{ background: currentColor }" />
      </span>
    </button>

    <!-- 面板 -->
    <Transition name="switcher-panel">
      <div v-if="isOpen" class="d-bg-switcher__panel">
        <!-- 顶部 tab：背景 / 蒙版 -->
        <div class="d-bg-switcher__tabs">
          <button
            :class="['d-bg-switcher__tab', { 'd-bg-switcher__tab--active': activeTab === 'bg' }]"
            @click="activeTab = 'bg'"
          >
            背景
          </button>
          <button
            :class="['d-bg-switcher__tab', { 'd-bg-switcher__tab--active': activeTab === 'veil' }]"
            @click="activeTab = 'veil'"
          >
            蒙版
          </button>
          <button class="d-bg-switcher__tab-close" @click="isOpen = false">✕</button>
        </div>

        <!-- ======== 背景面板 ======== -->
        <div v-show="activeTab === 'bg'" class="d-bg-switcher__body">
          <div v-for="group in bgGroups" :key="group.category" class="d-bg-switcher__section">
            <span class="d-bg-switcher__section-title">{{ group.title }}</span>
            <div class="d-bg-switcher__bg-list">
              <button
                v-for="opt in group.items"
                :key="opt.id"
                :class="['d-bg-switcher__bg-item', { 'd-bg-switcher__bg-item--active': currentBg === opt.id }]"
                @click="setBg(opt.id)"
              >
                <span class="d-bg-switcher__bg-dot" :style="{ background: opt.color }" />
                <span class="d-bg-switcher__bg-name">{{ opt.label }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ======== 蒙版面板 ======== -->
        <div v-show="activeTab === 'veil'" class="d-bg-switcher__body">
          <!-- 梦幻蒙版 -->
          <div class="d-bg-switcher__section">
            <div class="d-bg-switcher__section-header">
              <span class="d-bg-switcher__section-title">梦幻蒙版</span>
              <button
                :class="['d-bg-switcher__switch', { 'd-bg-switcher__switch--on': veilEnabled }]"
                @click="toggleVeil"
              >
                {{ veilEnabled ? 'ON' : 'OFF' }}
              </button>
            </div>
            <p class="d-bg-switcher__desc">日漫 / P5R 风格白色柔光覆盖</p>
            <Transition name="veil-detail">
              <div v-if="veilEnabled" class="d-bg-switcher__controls">
                <div class="d-bg-switcher__control-row">
                  <span class="d-bg-switcher__control-label">强度</span>
                  <div class="d-bg-switcher__btn-group">
                    <button
                      v-for="lvl in intensityLevels"
                      :key="lvl.id"
                      :class="['d-bg-switcher__btn', { 'd-bg-switcher__btn--active': veilIntensity === lvl.id }]"
                      @click="setVeilIntensity(lvl.id)"
                    >
                      {{ lvl.label }}
                    </button>
                  </div>
                </div>
                <div class="d-bg-switcher__control-row">
                  <span class="d-bg-switcher__control-label">光斑粒子</span>
                  <button
                    :class="['d-bg-switcher__switch d-bg-switcher__switch--sm', { 'd-bg-switcher__switch--on': veilParticles }]"
                    @click="toggleVeilParticles"
                  >
                    {{ veilParticles ? 'ON' : 'OFF' }}
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <div class="d-bg-switcher__separator" />

          <!-- 黑柔镜 -->
          <div class="d-bg-switcher__section">
            <div class="d-bg-switcher__section-header">
              <span class="d-bg-switcher__section-title">黑柔镜</span>
              <button
                :class="['d-bg-switcher__switch', { 'd-bg-switcher__switch--on': bloomEnabled }]"
                @click="toggleBloom"
              >
                {{ bloomEnabled ? 'ON' : 'OFF' }}
              </button>
            </div>
            <p class="d-bg-switcher__desc">Black Pro-Mist 高光扩散滤镜</p>
            <Transition name="veil-detail">
              <div v-if="bloomEnabled" class="d-bg-switcher__controls">
                <div class="d-bg-switcher__control-row">
                  <span class="d-bg-switcher__control-label">强度</span>
                  <div class="d-bg-switcher__btn-group">
                    <button
                      v-for="lvl in intensityLevels"
                      :key="lvl.id"
                      :class="['d-bg-switcher__btn', { 'd-bg-switcher__btn--active': bloomIntensity === lvl.id }]"
                      @click="setBloomIntensity(lvl.id)"
                    >
                      {{ lvl.label }}
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
/**
 * DBackgroundSwitcher - 背景 & 蒙版切换器
 * @author buchi
 * @since 2026-02-08
 */
import { ref, computed } from 'vue'
import { useBackground, type VeilIntensity, type BloomIntensity } from '../../composables/useBackground'

defineOptions({ name: 'DBackgroundSwitcher' })

const {
  currentBg, bgOptions, setBg,
  veilEnabled, veilIntensity, veilParticles,
  toggleVeil, setVeilIntensity, toggleVeilParticles,
  bloomEnabled, bloomIntensity, toggleBloom, setBloomIntensity,
} = useBackground()

const isOpen = ref(false)
const activeTab = ref<'bg' | 'veil'>('bg')

/** 当前背景对应的颜色（用于触发按钮色块） */
const currentColor = computed(() => {
  const opt = bgOptions.find(o => o.id === currentBg.value)
  return opt?.color ?? '#a855f7'
})

/** 按分类分组 */
const bgGroups = computed(() => [
  { category: 'animated', title: '动态', items: bgOptions.filter(o => o.category === 'animated') },
  { category: 'gradient', title: '渐变', items: bgOptions.filter(o => o.category === 'gradient') },
  { category: 'pattern', title: '图案', items: bgOptions.filter(o => o.category === 'pattern') },
  { category: 'solid', title: '纯色', items: bgOptions.filter(o => o.category === 'solid') },
])

const intensityLevels: { id: VeilIntensity; label: string }[] = [
  { id: 'subtle', label: '轻' },
  { id: 'medium', label: '中' },
  { id: 'strong', label: '强' },
]
</script>

<style scoped lang="scss">
.d-bg-switcher {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 150;

  /* ===== 触发按钮 ===== */
  &__trigger {
    width: 44px;
    height: 44px;
    border-radius: var(--dream-radius-full);
    backdrop-filter: blur(24px) saturate(1.2);
    -webkit-backdrop-filter: blur(24px) saturate(1.2);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.20);
    cursor: pointer;
    transition: all var(--dream-transition-base);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    box-shadow:
      inset 0 0 12px rgba(255, 255, 255, 0.04),
      0 0 1px rgba(255, 255, 255, 0.20),
      0 0 12px rgba(255, 255, 255, 0.04),
      0 4px 16px rgba(0, 0, 0, 0.25);

    &:hover {
      border-color: rgba(255, 255, 255, 0.35);
      transform: scale(1.08);
      box-shadow:
        inset 0 0 16px rgba(255, 255, 255, 0.06),
        0 0 1px rgba(255, 255, 255, 0.35),
        0 0 16px rgba(255, 255, 255, 0.08),
        0 6px 20px rgba(0, 0, 0, 0.3);
    }
  }

  &__trigger-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .trigger-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.4);
    transition: background 0.3s ease;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.15);
  }

  /* ===== 面板（毛玻璃） ===== */
  &__panel {
    position: absolute;
    bottom: 56px;
    right: 0;
    width: 300px;
    max-height: 70vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(40px) saturate(1.2);
    -webkit-backdrop-filter: blur(40px) saturate(1.2);
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--dream-radius-lg);

    box-shadow:
      inset 0 0 30px rgba(255, 255, 255, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.12),
      0 0 1px rgba(255, 255, 255, 0.20),
      0 0 20px rgba(255, 255, 255, 0.04),
      0 16px 48px rgba(0, 0, 0, 0.35);
  }

  /* ===== 顶部 Tab ===== */
  &__tabs {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 6px 6px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    flex-shrink: 0;
  }

  &__tab {
    flex: 1;
    padding: 10px 0;
    font-size: 13px;
    font-weight: 500;
    color: var(--dream-text-tertiary);
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all var(--dream-transition-fast);
    text-align: center;

    &:hover {
      color: var(--dream-text-secondary);
    }

    &--active {
      color: var(--dream-text-primary);
      border-bottom-color: rgba(255, 255, 255, 0.5);
    }
  }

  &__tab-close {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--dream-radius-sm);
    color: var(--dream-text-tertiary);
    font-size: 11px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all var(--dream-transition-fast);
    margin-left: 2px;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      color: var(--dream-text-primary);
    }
  }

  /* ===== 面板内容区 ===== */
  &__body {
    padding: 12px;
    overflow-y: auto;
    flex: 1;
  }

  &__section {
    margin-bottom: 14px;
    &:last-child { margin-bottom: 0; }
  }

  &__section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  &__section-title {
    font-size: 11px;
    font-weight: 600;
    color: var(--dream-text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    display: block;
    margin-bottom: 8px;
  }

  &__section-header &__section-title {
    margin-bottom: 0;
  }

  &__desc {
    margin: 0 0 10px;
    font-size: 11px;
    color: var(--dream-text-tertiary);
    opacity: 0.7;
    line-height: 1.5;
  }

  &__separator {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
    margin: 14px 0;
  }

  /* ===== 背景选项列表（色块 + 文字） ===== */
  &__bg-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__bg-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 10px;
    border-radius: var(--dream-radius-sm);
    background: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all var(--dream-transition-fast);
    color: var(--dream-text-secondary);
    font-size: 12.5px;
    text-align: left;

    &:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.08);
      color: var(--dream-text-primary);
    }

    &--active {
      background: rgba(255, 255, 255, 0.10);
      border-color: rgba(255, 255, 255, 0.22);
      color: var(--dream-text-primary);
      box-shadow:
        inset 0 0 8px rgba(255, 255, 255, 0.03),
        0 0 1px rgba(255, 255, 255, 0.12);
    }
  }

  &__bg-dot {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  }

  &__bg-name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ===== 蒙版控制 ===== */
  &__controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }

  &__control-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__control-label {
    font-size: 12px;
    color: var(--dream-text-secondary);
  }

  /* ON/OFF 开关按钮 */
  &__switch {
    padding: 4px 14px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    border-radius: var(--dream-radius-full);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.10);
    color: var(--dream-text-tertiary);
    cursor: pointer;
    transition: all var(--dream-transition-fast);

    &:hover {
      border-color: rgba(255, 255, 255, 0.18);
      color: var(--dream-text-secondary);
    }

    &--on {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.30);
      color: var(--dream-text-primary);
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.08);
    }

    &--sm {
      padding: 3px 10px;
      font-size: 10px;
    }
  }

  /* 强度按钮组 */
  &__btn-group {
    display: flex;
    gap: 4px;
  }

  &__btn {
    padding: 4px 14px;
    font-size: 11px;
    border-radius: var(--dream-radius-full);
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--dream-text-tertiary);
    cursor: pointer;
    transition: all var(--dream-transition-fast);

    &:hover {
      color: var(--dream-text-secondary);
      border-color: rgba(255, 255, 255, 0.15);
    }

    &--active {
      background: rgba(255, 255, 255, 0.10);
      border-color: rgba(255, 255, 255, 0.28);
      color: var(--dream-text-primary);
      box-shadow: 0 0 6px rgba(255, 255, 255, 0.06);
    }
  }
}

/* ===== Transitions ===== */
.switcher-panel-enter-active,
.switcher-panel-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.switcher-panel-enter-from,
.switcher-panel-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.96);
}

.veil-detail-enter-active,
.veil-detail-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.veil-detail-enter-from,
.veil-detail-leave-to {
  opacity: 0;
  max-height: 0;
}

.veil-detail-enter-to,
.veil-detail-leave-from {
  max-height: 100px;
}
</style>
