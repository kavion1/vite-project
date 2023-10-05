import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
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


app.use(router)
app.mount('#app')

