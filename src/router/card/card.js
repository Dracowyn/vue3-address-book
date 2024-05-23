const Card = [
	// 联系人详情
	{
		path: '/card/info/:id',
		name: 'CardInfo',
		component: () => import('@/views/card/Info.vue'),
		meta: {
			title: '联系人详情',
			auto: true,
		}
	},
	// 编辑联系人
	{
		path: '/card/edit/:id',
		name: 'CardEdit',
		component: () => import('@/views/card/Edit.vue'),
		meta: {
			title: '编辑联系人',
			auto: true,
		}
	},
	// 添加联系人
	{
		path: '/card/add',
		name: 'CardAdd',
		component: () => import('@/views/card/Add.vue'),
		meta: {
			title: '添加联系人',
			auto: true,
		}
	},
]

export default Card
