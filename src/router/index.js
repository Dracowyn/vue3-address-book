import {createRouter, createWebHistory} from "vue-router";

// 定义存放路由集合的一个数组
const RouterList = [];

// 引入每个目录下的index.js文件
const ModuleFiles = import.meta.glob("./*/index.js", {eager: true});

// 提取每个对象下的值 同步获取
Object.values(ModuleFiles).map(async (mod) => {
	if (mod.default) {
		RouterList.push(...mod.default);
	}
});


// 把首页组件追加集合里
RouterList.push({
	path: "/",
	name: "Home",
	component: () => import("@/views/Home.vue"),
	meta: {
		title: "通讯录",
		keywords: "通讯录",
		description: "通讯录首页",
	}
});

// 创建路由
const router = createRouter({
	history: createWebHistory(),
	routes: RouterList,
});

// 设置文档标题
router.beforeEach((to, from, next) => {
	// 如果路由有 meta 并且 meta.title 存在，则设置文档标题
	if (to.meta) {
		if (to.meta.title) {
			document.title = to.meta.title;
		}
		if (to.meta.keywords) {
			document.querySelector('meta[name="keywords"]').setAttribute("content", to.meta.keywords)
		}
		if (to.meta.description) {
			document.querySelector('meta[name="description"]').setAttribute("content", to.meta.description)
		}
	}
	next();
});

// 导出路由
export default router;
