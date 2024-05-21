import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

// Vant
import 'vant/lib/index.css'
import Vant, {showNotify} from 'vant'


import {useCookies} from "vue3-cookies";
import business from "@/api/business.js";

const app = createApp(App)

app.use(router)

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
		// 获取cookie
		const {cookies} = useCookies();
		// 读取cookie
		let userInfo = JSON.stringify(cookies.get('business'));
		// 转换为对象
		userInfo = JSON.parse(userInfo);

		if (!userInfo) {
			showNotify({
				type: 'danger',
				message: '请先登录',
				duration: 1500,
			});
			next('/login');
			return;
		}

		// 获取ID和手机号
		const id = userInfo.id;
		const mobile = userInfo.mobile;

		// 封装数据
		const data = {
			id: id,
			mobile: mobile
		}

		// 发送请求
		const result = await business.check(data);

		console.log(result);

		// 如果返回的code为0，说明登录失效
		if (result.code === 0) {
			showNotify({
				type: 'danger',
				message: result.msg,
				duration: 1500,
			});
			next('/login');
			return
		}

		// 如果登录有效，放行
		next()
	} else {
		// 如果不需要登录，直接放行
		next()
	}

})
