<script setup>
import {ref} from "vue";
import router from "@/router/index.js";

const fieldValue = ref('');
const showPicker = ref(false);
const search = ref('');

// 通讯录列表数据
const list = ref([]);
// 是否正在加载
const loading = ref(false);
// 是否加载完成
const finished = ref(false);

// 激活的底部导航栏标签
const active = ref('index');

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

// 模拟异步加载数据
const onLoad = () => {
	// 异步更新数据
	// setTimeout 仅做示例，真实场景中一般为 ajax 请求
	setTimeout(() => {
		for (let i = 0; i < 10; i++) {
			list.value.push(list.value.length + 1);
		}

		// 加载状态结束
		loading.value = false;

		// 数据全部加载完成
		if (list.value.length >= 40) {
			finished.value = true;
		}
	}, 1000);
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
			<van-cell :key="item" :title="item" label="描述内容"/>
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
		<van-tabbar-item icon="user-circle-o" name="my" to="/login">我的</van-tabbar-item>
	</van-tabbar>
</template>

<style scoped lang="scss">

</style>
