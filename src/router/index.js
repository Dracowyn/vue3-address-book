import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
	// history模式，文档：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: () => import('../views/Home.vue'),
			meta: {
				title: '首页',
				auto: true,
			}
		},

		// 联系人详情
		{
			path: '/card/info/:id',
			name: 'CardInfo',
			component: () => import('../views/card/Info.vue'),
			meta: {
				title: '联系人详情',
				auto: true,
			}
		},
		// 编辑联系人
		{
			path: '/card/edit/:id',
			name: 'CardEdit',
			component: () => import('../views/card/Edit.vue'),
			meta: {
				title: '编辑联系人',
				auto: true,
			}
		},
		// 添加联系人
		{
			path: '/card/add',
			name: 'CardAdd',
			component: () => import('../views/card/Add.vue'),
			meta: {
				title: '添加联系人',
				auto: true,
			}
		},

		// 分类
		{
			path: '/type',
			name: 'Type',
			component: () => import('../views/type/Index.vue'),
			meta: {
				title: '分类',
				auto: true,
			}
		},
		// 分类详情
		{
			path: '/type/info/:id',
			name: 'TypeInfo',
			component: () => import('../views/type/Info.vue'),
			meta: {
				title: '分类详情',
				auto: true,
			}
		},
		// 添加分类
		{
			path: '/type/add',
			name: 'TypeAdd',
			component: () => import('../views/type/Add.vue'),
			meta: {
				title: '添加分类',
				auto: true,
			}
		},

		// 登录
		{
			path: '/login',
			name: 'Login',
			component: () => import('../views/Login.vue'),
			meta: {
				title: '登录',
				auto: false,
			}
		},

		// 注册
		{
			path: '/register',
			name: 'Register',
			component: () => import('../views/Register.vue'),
			meta: {
				title: '注册',
				auto: false,
			}
		},

		// 我的
		{
			path: '/my',
			name: 'My',
			component: () => import('../views/My.vue'),
			meta: {
				title: '我的',
				auto: true,
			}
		},

	]
})

export default router
