import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import {
  ElButton,
  ElHeader,
  ElMain,
  ElFooter,
  ElForm,
  ElFormItem,
  ElInput,
  ElCard,
  ElMenu,
  ElSubMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElContainer,
  ElAside,
} from 'element-plus'


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElButton)
  .use(ElHeader)
  .use(ElMain)
  .use(ElFooter)
  .use(ElForm)
  .use(ElFormItem)
  .use(ElInput)
  .use(ElCard)
  .use(ElMenu)
  .use(ElSubMenu)
  .use(ElMenuItemGroup)
  .use(ElMenuItem)
  .use(ElContainer)
  .use(ElAside)

app.use(router)
app.mount('#app')

