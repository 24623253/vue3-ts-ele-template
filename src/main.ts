import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/index.scss' // global css
import { setupStore } from '@/store';
import './permission' // 权限控制
// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
import elementIcons from '@/components/SvgIcon/svgicon.js'

const app = createApp(App)
setupStore(app);
app.use(router)
app.use(elementIcons)
app.component('svg-icon', SvgIcon)
app.use(ElementPlus)
app.mount('#app')
