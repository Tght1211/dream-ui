/**
 * Dream UI - 库模式构建配置
 * 产出：ESM + UMD + CSS
 * @author buchi
 * @since 2026-02-08
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DreamUI',
      fileName: (format) => `dream-ui.${format}.js`,
    },
    rollupOptions: {
      // vue 不打包进库，由使用方提供
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
        // 将组件样式抽取为单独 CSS 文件
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'dream-ui.css'
          return assetInfo.name ?? 'asset'
        },
      },
    },
    // 产出目录
    outDir: 'dist-lib',
    // 清空产出目录
    emptyOutDir: true,
    // 生成 sourcemap 便于调试
    sourcemap: true,
    // CSS 抽取为独立文件
    cssCodeSplit: false,
  },
})
