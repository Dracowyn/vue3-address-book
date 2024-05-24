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
	// 修改资料
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('@/views/Profile.vue'),
		meta: {
			title: '修改资料',
			auto: true,
		}
	},
	// 修改密码
	{
		path: '/password',
		name: 'Password',
		component: () => import('@/views/Password.vue'),
		meta: {
			title: '修改密码',
			auto: true,
		}
	},
]

export default User
