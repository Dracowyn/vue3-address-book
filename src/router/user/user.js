// 登录、注册
const User = [
	// 登录
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
		meta: {
			title: '登录',
			auto: false,
		}
	},

	// 注册
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue'),
		meta: {
			title: '注册',
			auto: false,
		}
	},

	// 我的
	{
		path: '/my',
		name: 'My',
		component: () => import('@/views/My.vue'),
		meta: {
			title: '我的',
			auto: true,
		}
	},
]

export default User
