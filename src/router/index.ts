/**
 * Dream UI - 路由配置
 * @author buchi
 * @since 2026-02-08
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomePage.vue'),
    },
    {
      path: '/components',
      name: 'Components',
      component: () => import('../views/ComponentsPage.vue'),
      children: [
        { path: '', redirect: '/components/button' },
        // 基础
        { path: 'button', component: () => import('../views/docs/ButtonDoc.vue') },
        { path: 'card', component: () => import('../views/docs/CardDoc.vue') },
        { path: 'panel', component: () => import('../views/docs/PanelDoc.vue') },
        { path: 'divider', component: () => import('../views/docs/DividerDoc.vue') },
        // 表单
        { path: 'input', component: () => import('../views/docs/InputDoc.vue') },
        { path: 'textarea', component: () => import('../views/docs/TextareaDoc.vue') },
        { path: 'select', component: () => import('../views/docs/SelectDoc.vue') },
        { path: 'switch', component: () => import('../views/docs/SwitchDoc.vue') },
        { path: 'slider', component: () => import('../views/docs/SliderDoc.vue') },
        // 数据展示
        { path: 'badge', component: () => import('../views/docs/BadgeDoc.vue') },
        { path: 'tag', component: () => import('../views/docs/TagDoc.vue') },
        { path: 'avatar', component: () => import('../views/docs/AvatarDoc.vue') },
        { path: 'progress', component: () => import('../views/docs/ProgressDoc.vue') },
        { path: 'widget', component: () => import('../views/docs/WidgetDoc.vue') },
        { path: 'tabs', component: () => import('../views/docs/TabsDoc.vue') },
        { path: 'timeline', component: () => import('../views/docs/TimelineDoc.vue') },
        { path: 'collapse', component: () => import('../views/docs/CollapseDoc.vue') },
        { path: 'loading', component: () => import('../views/docs/LoadingDoc.vue') },
        { path: 'empty', component: () => import('../views/docs/EmptyDoc.vue') },
        // 反馈
        { path: 'alert', component: () => import('../views/docs/AlertDoc.vue') },
        { path: 'dialog', component: () => import('../views/docs/DialogDoc.vue') },
        { path: 'drawer', component: () => import('../views/docs/DrawerDoc.vue') },
        { path: 'notification', component: () => import('../views/docs/NotificationDoc.vue') },
        { path: 'tooltip', component: () => import('../views/docs/TooltipDoc.vue') },
        { path: 'popover', component: () => import('../views/docs/PopoverDoc.vue') },
        // 导航
        { path: 'breadcrumb', component: () => import('../views/docs/BreadcrumbDoc.vue') },
        // 特效
        { path: 'background-layer', component: () => import('../views/docs/BackgroundLayerDoc.vue') },
        { path: 'background-switcher', component: () => import('../views/docs/BackgroundSwitcherDoc.vue') },
        { path: 'dream-veil', component: () => import('../views/docs/DreamVeilDoc.vue') },
        { path: 'bloom-veil', component: () => import('../views/docs/BloomVeilDoc.vue') },
      ],
    },
    {
      path: '/guide',
      name: 'Guide',
      component: () => import('../views/GuidePage.vue'),
    },
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
