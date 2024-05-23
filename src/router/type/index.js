// 引入当前目录的所有js文件
const ModuleFiles = import.meta.glob('./*.js', {eager: true});

// 路由集合
const RouterList = [];

// 提取每个对象下的值 同步获取
Object.values(ModuleFiles).map(async (mod) => {
	if (mod.default) {
		RouterList.push(...mod.default);
	}
});

// 定义父组件
const layout = {
	template: `<router-view></router-view>`
}

// 导出接口
export default [
	{
		// 父路由
		path: '/type',
		component: layout,
		// 子路由分组
		children: RouterList
	}
];
