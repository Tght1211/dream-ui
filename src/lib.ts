/**
 * Dream UI - npm 库入口
 * 提供按需导入和全量安装两种方式
 * @author buchi
 * @since 2026-02-08
 */
import type { App, Plugin } from 'vue'

// ========== 按需导出所有组件 ==========
// 基础
export { default as DGlassButton } from './components/dream-ui/DGlassButton.vue'
export { default as DGlassCard } from './components/dream-ui/DGlassCard.vue'
export { default as DGlassPanel } from './components/dream-ui/DGlassPanel.vue'
export { default as DGlassDivider } from './components/dream-ui/DGlassDivider.vue'
// 表单
export { default as DGlassInput } from './components/dream-ui/DGlassInput.vue'
export { default as DGlassTextarea } from './components/dream-ui/DGlassTextarea.vue'
export { default as DGlassSelect } from './components/dream-ui/DGlassSelect.vue'
export { default as DGlassSwitch } from './components/dream-ui/DGlassSwitch.vue'
export { default as DGlassSlider } from './components/dream-ui/DGlassSlider.vue'
// 数据展示
export { default as DGlassBadge } from './components/dream-ui/DGlassBadge.vue'
export { default as DGlassTag } from './components/dream-ui/DGlassTag.vue'
export { default as DGlassAvatar } from './components/dream-ui/DGlassAvatar.vue'
export { default as DGlassProgress } from './components/dream-ui/DGlassProgress.vue'
export { default as DGlassWidget } from './components/dream-ui/DGlassWidget.vue'
export { default as DGlassTimeline } from './components/dream-ui/DGlassTimeline.vue'
export { default as DGlassCollapse } from './components/dream-ui/DGlassCollapse.vue'
export { default as DGlassTabs } from './components/dream-ui/DGlassTabs.vue'
export { default as DGlassLoading } from './components/dream-ui/DGlassLoading.vue'
export { default as DGlassEmpty } from './components/dream-ui/DGlassEmpty.vue'
// 反馈
export { default as DGlassDialog } from './components/dream-ui/DGlassDialog.vue'
export { default as DGlassDrawer } from './components/dream-ui/DGlassDrawer.vue'
export { default as DGlassNotification } from './components/dream-ui/DGlassNotification.vue'
export { default as DGlassAlert } from './components/dream-ui/DGlassAlert.vue'
export { default as DGlassTooltip } from './components/dream-ui/DGlassTooltip.vue'
export { default as DGlassPopover } from './components/dream-ui/DGlassPopover.vue'
// 导航
export { default as DGlassNavbar } from './components/dream-ui/DGlassNavbar.vue'
export { default as DGlassBreadcrumb } from './components/dream-ui/DGlassBreadcrumb.vue'
// 背景 & 特效
export { default as DBackgroundLayer } from './components/dream-ui/DBackgroundLayer.vue'
export { default as DBackgroundSwitcher } from './components/dream-ui/DBackgroundSwitcher.vue'
export { default as DDreamVeil } from './components/dream-ui/DDreamVeil.vue'

// Composables
export { useBackground } from './composables/useBackground'
export type { BgOption, VeilIntensity } from './composables/useBackground'
export { useGlassStyle } from './composables/useGlassStyle'
export type { GlassCustomProps } from './composables/useGlassStyle'

// ========== 组件列表（用于全局注册） ==========
import DGlassButton from './components/dream-ui/DGlassButton.vue'
import DGlassCard from './components/dream-ui/DGlassCard.vue'
import DGlassPanel from './components/dream-ui/DGlassPanel.vue'
import DGlassDivider from './components/dream-ui/DGlassDivider.vue'
import DGlassInput from './components/dream-ui/DGlassInput.vue'
import DGlassTextarea from './components/dream-ui/DGlassTextarea.vue'
import DGlassSelect from './components/dream-ui/DGlassSelect.vue'
import DGlassSwitch from './components/dream-ui/DGlassSwitch.vue'
import DGlassSlider from './components/dream-ui/DGlassSlider.vue'
import DGlassBadge from './components/dream-ui/DGlassBadge.vue'
import DGlassTag from './components/dream-ui/DGlassTag.vue'
import DGlassAvatar from './components/dream-ui/DGlassAvatar.vue'
import DGlassProgress from './components/dream-ui/DGlassProgress.vue'
import DGlassWidget from './components/dream-ui/DGlassWidget.vue'
import DGlassTimeline from './components/dream-ui/DGlassTimeline.vue'
import DGlassCollapse from './components/dream-ui/DGlassCollapse.vue'
import DGlassTabs from './components/dream-ui/DGlassTabs.vue'
import DGlassLoading from './components/dream-ui/DGlassLoading.vue'
import DGlassEmpty from './components/dream-ui/DGlassEmpty.vue'
import DGlassDialog from './components/dream-ui/DGlassDialog.vue'
import DGlassDrawer from './components/dream-ui/DGlassDrawer.vue'
import DGlassNotification from './components/dream-ui/DGlassNotification.vue'
import DGlassAlert from './components/dream-ui/DGlassAlert.vue'
import DGlassTooltip from './components/dream-ui/DGlassTooltip.vue'
import DGlassPopover from './components/dream-ui/DGlassPopover.vue'
import DGlassNavbar from './components/dream-ui/DGlassNavbar.vue'
import DGlassBreadcrumb from './components/dream-ui/DGlassBreadcrumb.vue'
import DBackgroundLayer from './components/dream-ui/DBackgroundLayer.vue'
import DBackgroundSwitcher from './components/dream-ui/DBackgroundSwitcher.vue'
import DDreamVeil from './components/dream-ui/DDreamVeil.vue'

const components = [
  DGlassButton, DGlassCard, DGlassPanel, DGlassDivider,
  DGlassInput, DGlassTextarea, DGlassSelect, DGlassSwitch, DGlassSlider,
  DGlassBadge, DGlassTag, DGlassAvatar, DGlassProgress, DGlassWidget,
  DGlassTimeline, DGlassCollapse, DGlassTabs, DGlassLoading, DGlassEmpty,
  DGlassDialog, DGlassDrawer, DGlassNotification, DGlassAlert,
  DGlassTooltip, DGlassPopover,
  DGlassNavbar, DGlassBreadcrumb,
  DBackgroundLayer, DBackgroundSwitcher, DDreamVeil,
]

// ========== Vue 插件：app.use(DreamUI) 全局注册所有组件 ==========
const DreamUI: Plugin = {
  install(app: App) {
    components.forEach((component) => {
      if (component.name) {
        app.component(component.name, component)
      }
    })
  },
}

export default DreamUI
