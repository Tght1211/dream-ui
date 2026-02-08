<template>
  <div :class="['d-bg-layer', `d-bg-layer--${bgId}`]" :key="bgId">
    <!-- 液体流动 -->
    <template v-if="bgId === 'liquid'">
      <div class="d-bg-liquid">
        <div class="d-bg-liquid__blob d-bg-liquid__blob--1" />
        <div class="d-bg-liquid__blob d-bg-liquid__blob--2" />
        <div class="d-bg-liquid__blob d-bg-liquid__blob--3" />
        <div class="d-bg-liquid__blob d-bg-liquid__blob--4" />
        <div class="d-bg-liquid__blob d-bg-liquid__blob--5" />
      </div>
    </template>

    <!-- 极光 -->
    <template v-if="bgId === 'aurora'">
      <div class="d-bg-aurora">
        <div class="d-bg-aurora__wave d-bg-aurora__wave--1" />
        <div class="d-bg-aurora__wave d-bg-aurora__wave--2" />
        <div class="d-bg-aurora__wave d-bg-aurora__wave--3" />
      </div>
    </template>

    <!-- 熔岩 -->
    <template v-if="bgId === 'lava'">
      <div class="d-bg-lava">
        <div class="d-bg-lava__blob d-bg-lava__blob--1" />
        <div class="d-bg-lava__blob d-bg-lava__blob--2" />
        <div class="d-bg-lava__blob d-bg-lava__blob--3" />
        <div class="d-bg-lava__blob d-bg-lava__blob--4" />
      </div>
    </template>

    <!-- 深海 -->
    <template v-if="bgId === 'ocean'">
      <div class="d-bg-ocean">
        <div class="d-bg-ocean__wave d-bg-ocean__wave--1" />
        <div class="d-bg-ocean__wave d-bg-ocean__wave--2" />
        <div class="d-bg-ocean__wave d-bg-ocean__wave--3" />
      </div>
    </template>

    <!-- 霓虹 -->
    <template v-if="bgId === 'neon'">
      <div class="d-bg-neon">
        <div class="d-bg-neon__line d-bg-neon__line--1" />
        <div class="d-bg-neon__line d-bg-neon__line--2" />
        <div class="d-bg-neon__line d-bg-neon__line--3" />
        <div class="d-bg-neon__line d-bg-neon__line--4" />
        <div class="d-bg-neon__orb d-bg-neon__orb--1" />
        <div class="d-bg-neon__orb d-bg-neon__orb--2" />
      </div>
    </template>

    <!-- 白色网格 -->
    <template v-if="bgId === 'grid-white'">
      <div class="d-bg-grid-white" />
    </template>

    <!-- 暗色网格 -->
    <template v-if="bgId === 'grid-dark'">
      <div class="d-bg-grid-dark" />
    </template>

    <!-- 波点 -->
    <template v-if="bgId === 'dots'">
      <div class="d-bg-dots" />
    </template>
  </div>
</template>

<script setup lang="ts">
/**
 * DBackgroundLayer - 多种动态背景效果
 * @author buchi
 * @since 2026-02-08
 */
defineOptions({ name: 'DBackgroundLayer' })

defineProps<{
  bgId: string
}>()
</script>

<style scoped lang="scss">
.d-bg-layer {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;

  /* ========== 静态渐变背景 ========== */
  &--sunset { background: linear-gradient(135deg, #ff6b35 0%, #f7418f 40%, #fc5c7d 70%, #6a82fb 100%); }
  &--forest { background: linear-gradient(135deg, #134e5e 0%, #2e8b57 35%, #71b280 65%, #3a6073 100%); }
  &--candy { background: linear-gradient(135deg, #f093fb 0%, #f5576c 30%, #fad0c4 60%, #4facfe 100%); }
  &--midnight { background: linear-gradient(135deg, #0c1445 0%, #1a237e 30%, #283593 60%, #1565c0 100%); }
  &--warm { background: linear-gradient(135deg, #f6d365 0%, #fda085 40%, #f093fb 80%, #667eea 100%); }

  /* 纯色 */
  &--pure-dark { background: #0a0c10; }
  &--pure-blue { background: #1565c0; }
  &--pure-purple { background: #6a1b9a; }
  &--pure-green { background: #2e7d32; }
  &--pure-red { background: #c62828; }
  &--pure-white { background: #e8e8e8; }
}

/* 纯白背景时文字需要变暗 */
.d-bg-layer--pure-white ~ * {
  --dream-text-primary: rgba(0, 0, 0, 0.85);
}

/* ========== 液体流动 ========== */
.d-bg-liquid {
  position: absolute;
  inset: 0;
  background: #0a0a15;
}

.d-bg-liquid__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.7;
  mix-blend-mode: screen;

  &--1 {
    width: 50vmax;
    height: 50vmax;
    background: radial-gradient(circle, #ff6b6b, #ee5a24);
    top: -15%;
    left: -10%;
    animation: liquid-float-1 18s ease-in-out infinite;
  }

  &--2 {
    width: 45vmax;
    height: 45vmax;
    background: radial-gradient(circle, #4ecdc4, #2ed573);
    top: 40%;
    right: -15%;
    animation: liquid-float-2 22s ease-in-out infinite;
  }

  &--3 {
    width: 40vmax;
    height: 40vmax;
    background: radial-gradient(circle, #a29bfe, #6c5ce7);
    bottom: -20%;
    left: 20%;
    animation: liquid-float-3 20s ease-in-out infinite;
  }

  &--4 {
    width: 35vmax;
    height: 35vmax;
    background: radial-gradient(circle, #fd79a8, #e84393);
    top: 20%;
    left: 40%;
    animation: liquid-float-4 25s ease-in-out infinite;
  }

  &--5 {
    width: 30vmax;
    height: 30vmax;
    background: radial-gradient(circle, #fdcb6e, #f39c12);
    bottom: 10%;
    right: 10%;
    animation: liquid-float-5 16s ease-in-out infinite;
  }
}

@keyframes liquid-float-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(10vw, 8vh) scale(1.1); }
  50% { transform: translate(-5vw, 15vh) scale(0.9); }
  75% { transform: translate(8vw, -5vh) scale(1.05); }
}

@keyframes liquid-float-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-12vw, -6vh) scale(1.08); }
  50% { transform: translate(8vw, -12vh) scale(0.92); }
  75% { transform: translate(-6vw, 8vh) scale(1.05); }
}

@keyframes liquid-float-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(15vw, -10vh) scale(1.12); }
  66% { transform: translate(-10vw, 5vh) scale(0.88); }
}

@keyframes liquid-float-4 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  30% { transform: translate(-8vw, 12vh) scale(1.1); }
  60% { transform: translate(12vw, -8vh) scale(0.9); }
}

@keyframes liquid-float-5 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-15vw, -10vh) scale(1.15); }
}

/* ========== 极光 ========== */
.d-bg-aurora {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, #020111 0%, #0a0e2a 100%);
}

.d-bg-aurora__wave {
  position: absolute;
  width: 200%;
  height: 50%;
  left: -50%;
  filter: blur(60px);
  opacity: 0.5;
  mix-blend-mode: screen;

  &--1 {
    top: 5%;
    background: linear-gradient(90deg, transparent, #00ff87, #60efff, #0061ff, transparent);
    animation: aurora-wave 12s ease-in-out infinite;
  }

  &--2 {
    top: 15%;
    background: linear-gradient(90deg, transparent, #ff61d2, #bf5af2, #5e5ce6, transparent);
    animation: aurora-wave 15s ease-in-out infinite reverse;
    opacity: 0.35;
  }

  &--3 {
    top: 25%;
    background: linear-gradient(90deg, transparent, #30d5c8, #00b4d8, #7209b7, transparent);
    animation: aurora-wave 18s ease-in-out infinite;
    opacity: 0.3;
  }
}

@keyframes aurora-wave {
  0%, 100% { transform: translateX(-10%) skewY(-2deg) scaleY(1); }
  25% { transform: translateX(5%) skewY(1deg) scaleY(1.3); }
  50% { transform: translateX(10%) skewY(-1deg) scaleY(0.8); }
  75% { transform: translateX(-5%) skewY(2deg) scaleY(1.2); }
}

/* ========== 熔岩 ========== */
.d-bg-lava {
  position: absolute;
  inset: 0;
  background: #1a0000;
}

.d-bg-lava__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  mix-blend-mode: screen;

  &--1 {
    width: 45vmax;
    height: 45vmax;
    background: radial-gradient(circle, #ff4500, #cc3700);
    bottom: -20%;
    left: -10%;
    animation: lava-rise-1 14s ease-in-out infinite;
  }

  &--2 {
    width: 35vmax;
    height: 35vmax;
    background: radial-gradient(circle, #ff6347, #dc143c);
    bottom: -15%;
    right: 10%;
    animation: lava-rise-2 18s ease-in-out infinite;
  }

  &--3 {
    width: 30vmax;
    height: 30vmax;
    background: radial-gradient(circle, #ffa500, #ff8c00);
    bottom: 0%;
    left: 30%;
    animation: lava-rise-3 20s ease-in-out infinite;
  }

  &--4 {
    width: 25vmax;
    height: 25vmax;
    background: radial-gradient(circle, #ffdf00, #ffb700);
    top: 20%;
    left: 50%;
    opacity: 0.4;
    animation: lava-rise-4 16s ease-in-out infinite;
  }
}

@keyframes lava-rise-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(5vw, -25vh) scale(1.2); }
}

@keyframes lava-rise-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-8vw, -20vh) scale(1.15); }
}

@keyframes lava-rise-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(10vw, -30vh) scale(1.1); }
}

@keyframes lava-rise-4 {
  0%, 100% { transform: translate(0, 0) scale(0.8); }
  50% { transform: translate(-5vw, 10vh) scale(1.2); }
}

/* ========== 深海 ========== */
.d-bg-ocean {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, #001233 0%, #001845 30%, #023e7d 60%, #002855 100%);
}

.d-bg-ocean__wave {
  position: absolute;
  width: 200%;
  height: 60%;
  left: -50%;
  border-radius: 45%;
  filter: blur(40px);
  opacity: 0.25;

  &--1 {
    top: 50%;
    background: #0077b6;
    animation: ocean-drift 10s ease-in-out infinite;
  }

  &--2 {
    top: 55%;
    background: #00b4d8;
    animation: ocean-drift 14s ease-in-out infinite reverse;
    opacity: 0.18;
  }

  &--3 {
    top: 60%;
    background: #48cae4;
    animation: ocean-drift 18s ease-in-out infinite;
    opacity: 0.12;
  }
}

@keyframes ocean-drift {
  0%, 100% { transform: translateX(-5%) rotate(0deg); }
  50% { transform: translateX(5%) rotate(3deg); }
}

/* ========== 霓虹 ========== */
.d-bg-neon {
  position: absolute;
  inset: 0;
  background: #0a0a12;
}

.d-bg-neon__line {
  position: absolute;
  height: 2px;
  width: 100%;
  filter: blur(1px);

  &--1 {
    top: 20%;
    background: linear-gradient(90deg, transparent 0%, #ff00ff 20%, #00ffff 50%, #ff00ff 80%, transparent 100%);
    animation: neon-scan 8s linear infinite;
    opacity: 0.6;
    box-shadow: 0 0 20px #ff00ff, 0 0 40px #ff00ff;
  }

  &--2 {
    top: 50%;
    background: linear-gradient(90deg, transparent 0%, #00ffff 30%, #ff6b6b 60%, transparent 100%);
    animation: neon-scan 12s linear infinite reverse;
    opacity: 0.4;
    box-shadow: 0 0 15px #00ffff;
  }

  &--3 {
    top: 70%;
    background: linear-gradient(90deg, transparent, #39ff14, transparent);
    animation: neon-scan 10s linear infinite;
    opacity: 0.3;
    box-shadow: 0 0 20px #39ff14;
  }

  &--4 {
    top: 85%;
    background: linear-gradient(90deg, transparent, #ff073a, #ff6ec7, transparent);
    animation: neon-scan 15s linear infinite reverse;
    opacity: 0.25;
    box-shadow: 0 0 15px #ff073a;
  }
}

.d-bg-neon__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);

  &--1 {
    width: 40vmax;
    height: 40vmax;
    background: radial-gradient(circle, rgba(255, 0, 255, 0.2), transparent 70%);
    top: -10%;
    right: -10%;
    animation: liquid-float-1 20s ease-in-out infinite;
  }

  &--2 {
    width: 35vmax;
    height: 35vmax;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.15), transparent 70%);
    bottom: -10%;
    left: -10%;
    animation: liquid-float-2 25s ease-in-out infinite;
  }
}

@keyframes neon-scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* ========== 白色网格 ========== */
.d-bg-grid-white {
  position: absolute;
  inset: 0;
  background-color: #e0e0e0;
  background-image:
    linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* ========== 暗色网格 ========== */
.d-bg-grid-dark {
  position: absolute;
  inset: 0;
  background-color: #111118;
  background-image:
    linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* ========== 波点 ========== */
.d-bg-dots {
  position: absolute;
  inset: 0;
  background-color: #1a1a2e;
  background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 24px 24px;
}
</style>
