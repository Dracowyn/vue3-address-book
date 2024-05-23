import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

// Vant
import 'vant/lib/index.css'
import Vant, {showNotify} from 'vant'

import {createPinia} from "pinia";
import {useUserStore} from "@/store/userStore.js";

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(Vant)
app.mount('#app')

// 全局路由守卫
app.router = router
// 路由守卫
app.router.beforeEach( async (to, from, next) => {
	// 通过meta字段控制是否需要登录，true为需要登录，false为不需要登录，默认为true
	const auto = to.meta.auto === undefined ? true : to.meta.auto
	// 如果需要登录
	if (auto) {
		const userStore = useUserStore();
		const userInfo = userStore.getUserInfo;

		if (!userInfo) {
			showNotify({
				type: 'danger',
				message: '请先登录',
				duration: 1500,
			});
			next('/login');
			return;
		}

		// 如果登录有效，放行
		next()
	} else {
		// 如果不需要登录，直接放行
		next()
	}

})
