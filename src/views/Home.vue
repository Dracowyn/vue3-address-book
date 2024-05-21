<script setup>
import {ref} from "vue";
import router from "@/router/index.js";
import address from "@/api/card.js";
import {useCookies} from "vue3-cookies";

const fieldValue = ref('');
const showPicker = ref(false);
const search = ref('');

// 通讯录列表数据
const list = ref([]);
// 列表总数
const listCount = ref(0);
// 页码
const page = ref(1);
// 是否正在加载
const loading = ref(false);
// 是否加载完成
const finished = ref(false);

// 激活的底部导航栏标签
const active = ref('index');

// 获取cookie
const {cookies} = useCookies();
// 读取cookie
let userInfo = JSON.stringify(cookies.get('business'));
// 转换为对象
userInfo = JSON.parse(userInfo);

console.log(userInfo)

// 分类选择器数据
const columns = [
	{text: '杭州', value: 'Hangzhou'},
	{text: '宁波', value: 'Ningbo'},
	{text: '温州', value: 'Wenzhou'},
	{text: '绍兴', value: 'Shaoxing'},
	{text: '湖州', value: 'Huzhou'},
];

// 确认选择分类
const onConfirm = ({selectedOptions}) => {
	showPicker.value = false;
	fieldValue.value = selectedOptions[0].text;
};

// 加载通讯录列表
const onLoad = async () => {
	// 封装请求参数
	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
		page: page.value,
		limit: 10,
	}

	// 发起请求
	const result = await address.index(data);

	if (result.code === 1) {
		// 更新列表数据
		list.value.push(...result.data.list);

		// 更新列表总数
		listCount.value = result.data.count;

		// 加载状态结束
		loading.value = false;

		// 更新页面
		page.value++;
	} else {
		console.log(result);
	}

	// 如果列表数据大于等于列表总数，说明列表到底了
	if (list.value.length >= listCount.value) {
		finished.value = true;
	}

};

// 新增通讯录按钮
const onAdd = () => {
	router.push('/address/add');
};

</script>

<template>
	<!-- 导航栏 -->
	<van-nav-bar
		title="通讯录"
		right-text="新增"
		@clickRight="onAdd"
		fixed
	>
	</van-nav-bar>

	<!-- 选择器（分类选择） -->
	<van-field
		v-model="fieldValue"
		is-link
		readonly
		label="分类"
		placeholder="选择分类"
		@click="showPicker = true"
		style="margin-top: 46px"
	/>
	<van-popup v-model:show="showPicker" round position="bottom">
		<van-picker
			:columns="columns"
			@cancel="showPicker = false"
			@confirm="onConfirm"
		/>
	</van-popup>

	<!-- 搜索-->
	<van-search v-model="search" placeholder="请输入搜索关键词"/>

	<!-- 通讯录列表 -->
	<van-list
		v-model:loading="loading"
		:finished="finished"
		finished-text="没有更多了"
		@load="onLoad"
	>
		<!-- 滑动单元格 -->
		<van-swipe-cell v-for="item in list">
			<!-- 单元格内容 -->
			<van-cell :key="item.id" :title="item.nickname" :label="item.mobile"/>
			<!-- 右侧操作 -->
			<template #right>
				<van-button square type="primary" style="height: 100%">编辑</van-button>
				<van-button square type="danger" style="height: 100%">删除</van-button>
			</template>
		</van-swipe-cell>
	</van-list>

	<van-tabbar v-model="active">
		<van-tabbar-item icon="wap-home-o" name="index" to="/">主页</van-tabbar-item>
		<van-tabbar-item icon="list-switch" name="type" to="/type">分类</van-tabbar-item>
		<van-tabbar-item icon="user-circle-o" name="my" to="/my">我的</van-tabbar-item>
	</van-tabbar>
</template>

<style scoped lang="scss">

</style>
