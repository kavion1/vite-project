import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'

import {
  ElButton,
} from 'element-plus'

const app = createApp(App);

app.use(ElButton)

app.use(router) 
app.mount('#app')

