/**
 * Dream UI - 应用入口
 * @author buchi
 * @since 2026-02-08
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/global.scss'

const app = createApp(App)
app.use(router)
app.mount('#app')
