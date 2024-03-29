import { createApp } from 'vue'
import pinia from '@/stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import allComponents from '@/components/index'

import App from './App.vue'
import router from './router'
import '@/permission'
import './assets/main.css'
import '@/styles/index.scss'


const app = createApp(App)

// 全局注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(allComponents)
app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.mount('#app')
