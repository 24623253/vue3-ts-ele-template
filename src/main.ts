import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/index.scss' // global css
import { setupStore } from '@/store';


const app = createApp(App)
setupStore(app);
app.use(router)
app.use(ElementPlus)
app.mount('#app')
// createApp(App).mount('#app')
