<template>
  <div :class="['d-dream-veil', `d-dream-veil--${intensity}`]">
    <!-- 主体白色柔光蒙版 -->
    <div class="d-dream-veil__base" />
    <!-- 顶部光晕渐变（日漫逆光效果） -->
    <div class="d-dream-veil__top-bloom" />
    <!-- 四角柔光（P5R风格镜头光晕） -->
    <div class="d-dream-veil__vignette" />
    <!-- 缓慢漂浮的光斑粒子 -->
    <div v-if="particles" class="d-dream-veil__particles">
      <span v-for="n in 6" :key="n" class="d-dream-veil__particle" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DDreamVeil - 梦幻白色蒙版
 * 灵感来自日漫（新海诚/京アニ）的光晕滤镜和 P5R 的白色透明蒙版
 * 为整个画面覆盖一层柔和的白色半透明光晕，营造"dream"般的通透感
 * @author buchi
 * @since 2026-02-08
 */
defineOptions({ name: 'DDreamVeil' })

interface Props {
  /** 蒙版强度 */
  intensity?: 'subtle' | 'medium' | 'strong'
  /** 是否显示漂浮光斑粒子 */
  particles?: boolean
}

withDefaults(defineProps<Props>(), {
  intensity: 'medium',
  particles: true,
})
</script>

<style scoped lang="scss">
.d-dream-veil {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

/* ========== 基础白色柔光蒙版 ========== */
.d-dream-veil__base {
  position: absolute;
  inset: 0;
  /* 均匀的白色半透明层 + 轻微的白色噪点感 */
  background: rgba(255, 255, 255, 0.035);
  /* 给蒙版本身施加极轻微的模糊，让下方背景更"梦幻" */
  backdrop-filter: blur(0.5px) brightness(1.05) saturate(1.05);
  -webkit-backdrop-filter: blur(0.5px) brightness(1.05) saturate(1.05);
}

/* ========== 顶部逆光 bloom（新海诚式天空光晕） ========== */
.d-dream-veil__top-bloom {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 120% 60% at 50% -10%,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.03) 40%,
    transparent 70%
  );
}

/* ========== 四角暗角 + 中心柔光（镜头效果） ========== */
.d-dream-veil__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 70% at 50% 50%,
    rgba(255, 255, 255, 0.03) 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.06) 100%
  );
}

/* ========== 漂浮光斑粒子 ========== */
.d-dream-veil__particles {
  position: absolute;
  inset: 0;
}

.d-dream-veil__particle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent 70%);
  animation: veil-float linear infinite;
  opacity: 0;

  &:nth-child(1) {
    width: 4px; height: 4px;
    left: 15%; top: 30%;
    animation-duration: 12s;
    animation-delay: 0s;
  }
  &:nth-child(2) {
    width: 3px; height: 3px;
    left: 70%; top: 20%;
    animation-duration: 15s;
    animation-delay: 2s;
  }
  &:nth-child(3) {
    width: 5px; height: 5px;
    left: 40%; top: 60%;
    animation-duration: 18s;
    animation-delay: 4s;
  }
  &:nth-child(4) {
    width: 2px; height: 2px;
    left: 85%; top: 50%;
    animation-duration: 10s;
    animation-delay: 1s;
  }
  &:nth-child(5) {
    width: 4px; height: 4px;
    left: 25%; top: 75%;
    animation-duration: 14s;
    animation-delay: 6s;
  }
  &:nth-child(6) {
    width: 3px; height: 3px;
    left: 60%; top: 85%;
    animation-duration: 16s;
    animation-delay: 3s;
  }
}

/* ========== 强度变体 ========== */
.d-dream-veil--subtle {
  .d-dream-veil__base {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(0.3px) brightness(1.02);
    -webkit-backdrop-filter: blur(0.3px) brightness(1.02);
  }
  .d-dream-veil__top-bloom {
    background: radial-gradient(
      ellipse 120% 60% at 50% -10%,
      rgba(255, 255, 255, 0.04) 0%,
      transparent 60%
    );
  }
  .d-dream-veil__particle {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.25), transparent 70%);
  }
}

.d-dream-veil--strong {
  .d-dream-veil__base {
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(1px) brightness(1.08) saturate(1.08);
    -webkit-backdrop-filter: blur(1px) brightness(1.08) saturate(1.08);
  }
  .d-dream-veil__top-bloom {
    background: radial-gradient(
      ellipse 130% 70% at 50% -10%,
      rgba(255, 255, 255, 0.12) 0%,
      rgba(255, 255, 255, 0.05) 40%,
      transparent 70%
    );
  }
  .d-dream-veil__particle {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent 70%);
  }
}

/* ========== 漂浮动画 ========== */
@keyframes veil-float {
  0% {
    opacity: 0;
    transform: translateY(0) translateX(0) scale(0.8);
  }
  15% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
    transform: translateY(-40px) translateX(15px) scale(1.2);
  }
  85% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: translateY(-80px) translateX(-10px) scale(0.6);
  }
}
</style>
