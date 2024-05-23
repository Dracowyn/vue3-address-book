const Type = [
	// 分类首页
	{
		path: '/type',
		name: 'TypeIndex',
		component: () => import('@/views/type/Index.vue'),
		meta: {
			title: '分类',
			auto: true,
		}
	},
	// 分类详情
	{
		path: '/type/info/:id',
		name: 'TypeInfo',
		component: () => import('@/views/type/Info.vue'),
		meta: {
			title: '分类详情',
			auto: true,
		}
	},
	// 添加分类
	{
		path: '/type/add',
		name: 'TypeAdd',
		component: () => import('@/views/type/Add.vue'),
		meta: {
			title: '添加分类',
			auto: true,
		}
	},
	// 编辑分类
	{
		path: '/type/edit/:id',
		name: 'TypeEdit',
		component: () => import('@/views/type/Edit.vue'),
		meta: {
			title: '编辑分类',
			auto: true,
		}
	},
]

export default Type
