<template>
  <div :class="['d-bloom-veil', `d-bloom-veil--${intensity}`]">
    <!--
      黑柔镜原理（改进版）：
      不依赖不稳定的 mix-blend-mode: screen，
      而是用 backdrop-filter 的 blur + brightness 直接让底层亮区扩散溢出。
      多层叠加：近距小模糊高亮度（锐利高光扩散）+ 远距大模糊（柔和光晕）。
    -->
    <!-- 第1层：近距高光 — 小模糊 + 高亮度，让亮的部分"溢出"到周围 -->
    <div class="d-bloom-veil__sharp" />
    <!-- 第2层：中距柔光 — 中模糊 + 中等提亮 -->
    <div class="d-bloom-veil__glow" />
    <!-- 第3层：远距光晕 — 大模糊，低提亮，整体氛围 -->
    <div class="d-bloom-veil__spread" />
  </div>
</template>

<script setup lang="ts">
/**
 * DBloomVeil - 黑柔镜（Black Pro-Mist）效果
 *
 * 模拟摄影中的 Tiffen Black Pro-Mist 滤镜：
 * 让画面中高亮区域产生柔和的光晕扩散（halation），暗区变化极小。
 *
 * @author buchi
 * @since 2026-02-08
 */
defineOptions({ name: 'DBloomVeil' })

interface Props {
  /** 效果强度 */
  intensity?: 'subtle' | 'medium' | 'strong'
}

withDefaults(defineProps<Props>(), {
  intensity: 'medium',
})
</script>

<style scoped lang="scss">
.d-bloom-veil {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;

  /*
   * 三层叠加策略：
   * sharp  = 小模糊 + 极高亮度 → 高光边缘锐利扩散
   * glow   = 中模糊 + 高亮度 → 主要的柔光晕染
   * spread = 大模糊 + 微提亮 → 远距离氛围光
   */

  &__sharp {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(8px) brightness(1.8) saturate(1.2);
    -webkit-backdrop-filter: blur(8px) brightness(1.8) saturate(1.2);
    background: rgba(255, 255, 255, 0.01);
    opacity: 0.25;
  }

  &__glow {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(40px) brightness(1.5) saturate(1.15);
    -webkit-backdrop-filter: blur(40px) brightness(1.5) saturate(1.15);
    background: rgba(255, 255, 255, 0.02);
    opacity: 0.4;
  }

  &__spread {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(120px) brightness(1.2);
    -webkit-backdrop-filter: blur(120px) brightness(1.2);
    background: rgba(255, 255, 255, 0.01);
    opacity: 0.3;
  }

  /* ===== subtle ===== */
  &--subtle {
    .d-bloom-veil__sharp {
      backdrop-filter: blur(6px) brightness(1.5) saturate(1.1);
      -webkit-backdrop-filter: blur(6px) brightness(1.5) saturate(1.1);
      opacity: 0.15;
    }
    .d-bloom-veil__glow {
      backdrop-filter: blur(30px) brightness(1.3) saturate(1.1);
      -webkit-backdrop-filter: blur(30px) brightness(1.3) saturate(1.1);
      opacity: 0.2;
    }
    .d-bloom-veil__spread {
      backdrop-filter: blur(80px) brightness(1.1);
      -webkit-backdrop-filter: blur(80px) brightness(1.1);
      opacity: 0.15;
    }
  }

  /* ===== medium ===== */
  &--medium {
    .d-bloom-veil__sharp {
      backdrop-filter: blur(8px) brightness(1.8) saturate(1.2);
      -webkit-backdrop-filter: blur(8px) brightness(1.8) saturate(1.2);
      opacity: 0.25;
    }
    .d-bloom-veil__glow {
      backdrop-filter: blur(40px) brightness(1.5) saturate(1.15);
      -webkit-backdrop-filter: blur(40px) brightness(1.5) saturate(1.15);
      opacity: 0.4;
    }
    .d-bloom-veil__spread {
      backdrop-filter: blur(120px) brightness(1.2);
      -webkit-backdrop-filter: blur(120px) brightness(1.2);
      opacity: 0.3;
    }
  }

  /* ===== strong ===== */
  &--strong {
    .d-bloom-veil__sharp {
      backdrop-filter: blur(12px) brightness(2.2) saturate(1.3);
      -webkit-backdrop-filter: blur(12px) brightness(2.2) saturate(1.3);
      opacity: 0.35;
    }
    .d-bloom-veil__glow {
      backdrop-filter: blur(60px) brightness(1.8) saturate(1.2);
      -webkit-backdrop-filter: blur(60px) brightness(1.8) saturate(1.2);
      opacity: 0.55;
    }
    .d-bloom-veil__spread {
      backdrop-filter: blur(160px) brightness(1.35);
      -webkit-backdrop-filter: blur(160px) brightness(1.35);
      opacity: 0.4;
    }
  }
}
</style>
