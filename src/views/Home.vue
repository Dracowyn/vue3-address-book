<script setup>
import {onMounted, ref} from "vue";
import router from "@/router/index.js";
import card from "@/api/card.js";
import type from "@/api/type.js";
import {showConfirmDialog, showToast} from "vant";
import {useUserStore} from "@/store/userStore.js";

// 分类选择数据
const fieldValue = ref('');
// 是否显示选择器
const showPicker = ref(false);

// 搜索关键词
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

// 分类选择数据
const typeList = ref([
	{text: '全部', value: 0},
]);
// 分类ID
const typeId = ref(0);

// 激活的底部导航栏标签
const active = ref('index');

const userStore = useUserStore();
const userInfo = userStore.getUserInfo;

console.log(userInfo)

// 获取分类列表
const getTypeList = async () => {
	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
	}

	const result = await type.all(data);

	console.log(result);

	if (result.code === 1) {
		// 转换数据格式并更新
		typeList.value.push(...result.data.map(item => {
			return {
				text: item.name,
				value: item.id,
			}
		}));
	} else {
		console.log(result);
	}
};

// 确认选择分类
const onConfirm = ({selectedOptions}) => {
	showPicker.value = false;
	fieldValue.value = selectedOptions[0].text;
	typeId.value = selectedOptions[0].value;
	console.log(fieldValue.value)
	console.log(selectedOptions[0].value)

	// 更新列表数据
	list.value = [];
	listCount.value = 0;
	page.value = 1;
	loading.value = true;
	finished.value = false;

	// 重新加载通讯录列表
	onLoad();
};

// 搜索关键词
const onSearch = () => {
	// 更新列表数据
	list.value = [];
	listCount.value = 0;
	page.value = 1;
	loading.value = true;
	finished.value = false;

	// 重新加载通讯录列表
	onLoad();
};

// 加载通讯录列表
const onLoad = async () => {
	// 封装请求参数
	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
		page: page.value,
		limit: 10,
		type_id: typeId.value,
		search: search.value,
	}

	// 发起请求
	const result = await card.index(data);

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

// 删除通讯录
const onDelete = async (id) => {
	// 弹出确认框
	showConfirmDialog({
		title: '删除提示',
		message: '确定要删除该联系人吗？',
		confirmButtonText: '删除',
		cancelButtonText: '取消',
	}).then(() => {
		// 确认删除
		onConfirmDelete(id);
	}).catch(() => {
		// 取消删除
		console.log('取消删除');
	});
};

// 确认删除
const onConfirmDelete = async (id) => {
	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
		card_id: id,
	}

	console.log(data)

	const result = await card.del(data);

	if (result.code === 1) {
		// 提示
		showToast({
			type: 'success',
			message: '删除成功',
			duration: 1500,
			onClose: () => {
				// 更新列表数据
				list.value = [];
				listCount.value = 0;
				page.value = 1;
				loading.value = true;
				finished.value = false;
				// 重新加载通讯录列表
				onLoad();
			}
		});
	} else {
		console.log(result);
	}
};

// 通讯录详情
const onDetail = (id) => {
	router.push(`/card/info/${id}`);
};
// 编辑通讯录按钮
const onEdit = (id) => {
	router.push(`/card/edit/${id}`);
};

onMounted(() => {
	getTypeList();
});

// 新增通讯录按钮
const onAdd = () => {
	router.push('/card/add');
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
			:columns="typeList"
			@cancel="showPicker = false"
			@confirm="onConfirm"
		/>
	</van-popup>

	<!-- 搜索-->
	<van-search
		v-model="search"
		@search="onSearch"
		placeholder="请输入搜索关键词"
		show-action
	>
		<template #action>
			<div @click="onSearch">搜索</div>
		</template>
	</van-search>

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
			<van-cell :key="item.id" :title="item.nickname" :label="item.mobile" @click="onDetail(item.id)"/>
			<!-- 右侧操作 -->
			<template #right>
				<van-button square type="primary" style="height: 100%" @click="onEdit(item.id)">编辑</van-button>
				<van-button square type="danger" style="height: 100%" @click="onDelete(item.id)">删除</van-button>
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
