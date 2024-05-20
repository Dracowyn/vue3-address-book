import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vant
import 'vant/lib/index.css'
import Vant from 'vant'

const app = createApp(App)

app.use(router)

app.use(Vant)

app.mount('#app')
