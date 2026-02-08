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
        { path: 'button', component: () => import('../views/docs/ButtonDoc.vue') },
        { path: 'card', component: () => import('../views/docs/CardDoc.vue') },
        { path: 'input', component: () => import('../views/docs/InputDoc.vue') },
        { path: 'select', component: () => import('../views/docs/SelectDoc.vue') },
        { path: 'switch', component: () => import('../views/docs/SwitchDoc.vue') },
        { path: 'badge', component: () => import('../views/docs/BadgeDoc.vue') },
        { path: 'tag', component: () => import('../views/docs/TagDoc.vue') },
        { path: 'avatar', component: () => import('../views/docs/AvatarDoc.vue') },
        { path: 'progress', component: () => import('../views/docs/ProgressDoc.vue') },
        { path: 'alert', component: () => import('../views/docs/AlertDoc.vue') },
        { path: 'dialog', component: () => import('../views/docs/DialogDoc.vue') },
        { path: 'notification', component: () => import('../views/docs/NotificationDoc.vue') },
        { path: 'tabs', component: () => import('../views/docs/TabsDoc.vue') },
        { path: 'timeline', component: () => import('../views/docs/TimelineDoc.vue') },
        { path: 'collapse', component: () => import('../views/docs/CollapseDoc.vue') },
        { path: 'loading', component: () => import('../views/docs/LoadingDoc.vue') },
        { path: 'divider', component: () => import('../views/docs/DividerDoc.vue') },
        { path: 'widget', component: () => import('../views/docs/WidgetDoc.vue') },
        { path: 'panel', component: () => import('../views/docs/PanelDoc.vue') },
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
