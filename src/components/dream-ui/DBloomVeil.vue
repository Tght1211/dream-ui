<template>
  <div :class="['d-bloom-veil', `d-bloom-veil--${intensity}`]">
    <!-- 核心 bloom 层：backdrop-filter 模糊 + 提亮，screen 混合只让亮区扩散 -->
    <div class="d-bloom-veil__glow" />
    <!-- 第二层：更大范围更柔和的扩散 -->
    <div class="d-bloom-veil__spread" />
  </div>
</template>

<script setup lang="ts">
/**
 * DBloomVeil - 黑柔镜（Black Pro-Mist）效果
 *
 * 原理：对背景执行 大幅模糊 + 提亮 后以 screen 模式混合，
 * 亮区产生柔和的光晕扩散（halation），暗区基本不受影响。
 * 类比摄影中的黑柔镜 / Tiffen Black Pro-Mist 滤镜效果。
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

  /* ===== 核心 bloom 层 ===== */
  &__glow {
    position: absolute;
    inset: 0;
    /* 对底层内容做大范围模糊 + 提亮，亮区变成大面积柔光 */
    backdrop-filter: blur(30px) brightness(1.4);
    -webkit-backdrop-filter: blur(30px) brightness(1.4);
    /* screen 混合模式：只叠加亮区，暗区不受影响 */
    mix-blend-mode: screen;
    opacity: 0.35;
  }

  /* ===== 更大范围柔和扩散 ===== */
  &__spread {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(80px) brightness(1.2);
    -webkit-backdrop-filter: blur(80px) brightness(1.2);
    mix-blend-mode: screen;
    opacity: 0.15;
  }

  /* ===== 强度级别 ===== */
  &--subtle {
    .d-bloom-veil__glow {
      backdrop-filter: blur(20px) brightness(1.25);
      -webkit-backdrop-filter: blur(20px) brightness(1.25);
      opacity: 0.2;
    }
    .d-bloom-veil__spread {
      backdrop-filter: blur(60px) brightness(1.1);
      -webkit-backdrop-filter: blur(60px) brightness(1.1);
      opacity: 0.08;
    }
  }

  &--medium {
    .d-bloom-veil__glow {
      backdrop-filter: blur(30px) brightness(1.4);
      -webkit-backdrop-filter: blur(30px) brightness(1.4);
      opacity: 0.35;
    }
    .d-bloom-veil__spread {
      backdrop-filter: blur(80px) brightness(1.2);
      -webkit-backdrop-filter: blur(80px) brightness(1.2);
      opacity: 0.15;
    }
  }

  &--strong {
    .d-bloom-veil__glow {
      backdrop-filter: blur(40px) brightness(1.6);
      -webkit-backdrop-filter: blur(40px) brightness(1.6);
      opacity: 0.5;
    }
    .d-bloom-veil__spread {
      backdrop-filter: blur(100px) brightness(1.35);
      -webkit-backdrop-filter: blur(100px) brightness(1.35);
      opacity: 0.25;
    }
  }
}
</style>
