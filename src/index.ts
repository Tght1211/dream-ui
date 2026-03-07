/**
 * Dream UI - npm 库入口
 * 提供按需导入和全量安装两种方式
 * @author buchi
 * @since 2026-02-08
 */
import './styles/variables.scss'
import './styles/mobile-variables.scss'
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
export { default as DBloomVeil } from './components/dream-ui/DBloomVeil.vue'

// ========== 移动端（H5）组件 ==========
// 导航
export { default as DMobileNavBar } from './components/dream-mobile/DMobileNavBar.vue'
export { default as DMobileTabBar } from './components/dream-mobile/DMobileTabBar.vue'
export { default as DMobileTabs } from './components/dream-mobile/DMobileTabs.vue'
// 基础
export { default as DMobileCell } from './components/dream-mobile/DMobileCell.vue'
export { default as DMobileCellGroup } from './components/dream-mobile/DMobileCellGroup.vue'
export { default as DMobileTag } from './components/dream-mobile/DMobileTag.vue'
export { default as DMobileDivider } from './components/dream-mobile/DMobileDivider.vue'
export { default as DMobileEmpty } from './components/dream-mobile/DMobileEmpty.vue'
export { default as DMobileLoading } from './components/dream-mobile/DMobileLoading.vue'
// 表单
export { default as DMobileField } from './components/dream-mobile/DMobileField.vue'
export { default as DMobileSwitch } from './components/dream-mobile/DMobileSwitch.vue'
export { default as DMobileSearchBar } from './components/dream-mobile/DMobileSearchBar.vue'
export { default as DMobileStepper } from './components/dream-mobile/DMobileStepper.vue'
export { default as DMobileNumberKeyboard } from './components/dream-mobile/DMobileNumberKeyboard.vue'
export { default as DMobilePasswordInput } from './components/dream-mobile/DMobilePasswordInput.vue'
export { default as DMobilePicker } from './components/dream-mobile/DMobilePicker.vue'
// 操作反馈
export { default as DMobilePopup } from './components/dream-mobile/DMobilePopup.vue'
export { default as DMobileDialog } from './components/dream-mobile/DMobileDialog.vue'
export { default as DMobileActionSheet } from './components/dream-mobile/DMobileActionSheet.vue'
export { default as DMobileToast } from './components/dream-mobile/DMobileToast.vue'
export { default as DMobileSwipeCell } from './components/dream-mobile/DMobileSwipeCell.vue'
// 展示
export { default as DMobileProgress } from './components/dream-mobile/DMobileProgress.vue'
export { default as DMobileCollapse } from './components/dream-mobile/DMobileCollapse.vue'
export { default as DMobileNoticeBar } from './components/dream-mobile/DMobileNoticeBar.vue'
export { default as DMobileSwipe } from './components/dream-mobile/DMobileSwipe.vue'
export { default as DMobileCountDown } from './components/dream-mobile/DMobileCountDown.vue'
export { default as DMobileImagePreview } from './components/dream-mobile/DMobileImagePreview.vue'
export { default as DMobileSkeleton } from './components/dream-mobile/DMobileSkeleton.vue'
export { default as DMobileGridCard } from './components/dream-mobile/DMobileGridCard.vue'
export { default as DMobileHorizontalPicker } from './components/dream-mobile/DMobileHorizontalPicker.vue'
// 手势交互
export { default as DMobilePullRefresh } from './components/dream-mobile/DMobilePullRefresh.vue'
export { default as DMobileBackTop } from './components/dream-mobile/DMobileBackTop.vue'

// Composables
export { useBackground } from './composables/useBackground'
export type { BgOption, VeilIntensity, BloomIntensity } from './composables/useBackground'
export { useGlassStyle } from './composables/useGlassStyle'
export type { GlassCustomProps } from './composables/useGlassStyle'
export { useTouchFeedback } from './composables/useTouchFeedback'
export { useZIndex } from './composables/useZIndex'

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
import DBloomVeil from './components/dream-ui/DBloomVeil.vue'

// ========== 移动端组件 import ==========
import DMobileNavBar from './components/dream-mobile/DMobileNavBar.vue'
import DMobileTabBar from './components/dream-mobile/DMobileTabBar.vue'
import DMobileTabs from './components/dream-mobile/DMobileTabs.vue'
import DMobileCell from './components/dream-mobile/DMobileCell.vue'
import DMobileCellGroup from './components/dream-mobile/DMobileCellGroup.vue'
import DMobileTag from './components/dream-mobile/DMobileTag.vue'
import DMobileDivider from './components/dream-mobile/DMobileDivider.vue'
import DMobileEmpty from './components/dream-mobile/DMobileEmpty.vue'
import DMobileLoading from './components/dream-mobile/DMobileLoading.vue'
import DMobileField from './components/dream-mobile/DMobileField.vue'
import DMobileSwitch_M from './components/dream-mobile/DMobileSwitch.vue'
import DMobileSearchBar from './components/dream-mobile/DMobileSearchBar.vue'
import DMobileStepper from './components/dream-mobile/DMobileStepper.vue'
import DMobileNumberKeyboard from './components/dream-mobile/DMobileNumberKeyboard.vue'
import DMobilePasswordInput from './components/dream-mobile/DMobilePasswordInput.vue'
import DMobilePicker from './components/dream-mobile/DMobilePicker.vue'
import DMobilePopup from './components/dream-mobile/DMobilePopup.vue'
import DMobileDialog from './components/dream-mobile/DMobileDialog.vue'
import DMobileActionSheet from './components/dream-mobile/DMobileActionSheet.vue'
import DMobileToast from './components/dream-mobile/DMobileToast.vue'
import DMobileSwipeCell from './components/dream-mobile/DMobileSwipeCell.vue'
import DMobileProgress from './components/dream-mobile/DMobileProgress.vue'
import DMobileCollapse from './components/dream-mobile/DMobileCollapse.vue'
import DMobileNoticeBar from './components/dream-mobile/DMobileNoticeBar.vue'
import DMobileSwipe from './components/dream-mobile/DMobileSwipe.vue'
import DMobileCountDown from './components/dream-mobile/DMobileCountDown.vue'
import DMobileImagePreview from './components/dream-mobile/DMobileImagePreview.vue'
import DMobileSkeleton from './components/dream-mobile/DMobileSkeleton.vue'
import DMobileGridCard from './components/dream-mobile/DMobileGridCard.vue'
import DMobileHorizontalPicker from './components/dream-mobile/DMobileHorizontalPicker.vue'
import DMobilePullRefresh from './components/dream-mobile/DMobilePullRefresh.vue'
import DMobileBackTop from './components/dream-mobile/DMobileBackTop.vue'

const components = [
  // PC 端组件
  DGlassButton, DGlassCard, DGlassPanel, DGlassDivider,
  DGlassInput, DGlassTextarea, DGlassSelect, DGlassSwitch, DGlassSlider,
  DGlassBadge, DGlassTag, DGlassAvatar, DGlassProgress, DGlassWidget,
  DGlassTimeline, DGlassCollapse, DGlassTabs, DGlassLoading, DGlassEmpty,
  DGlassDialog, DGlassDrawer, DGlassNotification, DGlassAlert,
  DGlassTooltip, DGlassPopover,
  DGlassNavbar, DGlassBreadcrumb,
  DBackgroundLayer, DBackgroundSwitcher, DDreamVeil, DBloomVeil,
  // 移动端（H5）组件
  DMobileNavBar, DMobileTabBar, DMobileTabs,
  DMobileCell, DMobileCellGroup, DMobileTag, DMobileDivider, DMobileEmpty, DMobileLoading,
  DMobileField, DMobileSwitch_M, DMobileSearchBar, DMobileStepper,
  DMobileNumberKeyboard, DMobilePasswordInput, DMobilePicker,
  DMobilePopup, DMobileDialog, DMobileActionSheet, DMobileToast, DMobileSwipeCell,
  DMobileProgress, DMobileCollapse, DMobileNoticeBar, DMobileSwipe,
  DMobileCountDown, DMobileImagePreview, DMobileSkeleton,
  DMobileGridCard, DMobileHorizontalPicker,
  DMobilePullRefresh, DMobileBackTop,
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
