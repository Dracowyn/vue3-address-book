import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
	// history模式，文档：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('../views/Home.vue')
		},

        // 登录
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
      },

	]
})

export default router
