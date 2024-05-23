<script setup>
import {ref} from "vue";
import type from "@/api/type.js";
import router from "@/router/index.js";
import {showConfirmDialog, showNotify} from "vant";

import {useUserStore} from "@/store/userStore.js";

const userStore = useUserStore();
const userInfo = userStore.getUserInfo;

const typeList = ref([])
const page = ref(1)
const limit = ref(10)
const search = ref('')
const listCount = ref(0)

const loading = ref(false);
const finished = ref(false);

const active = ref('type');

// 获取分类列表
const getTypeList = async () => {
	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
		page: page.value,
		limit: limit.value,
		search: search.value,
	}

	const result = await type.index(data);

	console.log(result);

	if (result.code === 1) {
		typeList.value.push(...result.data.list)
		listCount.value = result.data.count;
		loading.value = false;
	}

	if (typeList.value.length >= listCount.value) {
		finished.value = true;
	} else {
		page.value++;
	}

};

const searchType = () => {
	typeList.value = [];
	listCount.value = 0;
	page.value = 1;
	loading.value = true;
	finished.value = false;
	getTypeList();
}

const onDelete = async (id) => {
	showConfirmDialog({
		title: '删除分类',
		message: '确定要删除该分类吗？',
		confirmButtonText: '删除',
		overlay: true,
		// 确认删除
	}).then(() => {
		deleteType(id);
	}).catch(() => {
		console.log('取消删除');
	});
}

const deleteType = async (id) => {
	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
		type_id: id,
	}

	const result = await type.del(data);

	console.log(result);

	if (result.code === 1) {
		typeList.value = typeList.value.filter(item => item.id !== id);

		showNotify({
			type: 'success',
			message: result.msg,
			duration: 1500,
		});
	} else {
		showNotify({
			type: 'danger',
			message: result.msg,
			duration: 1500,
		});
	}
}

</script>

<template>
	<van-nav-bar
		title="分类"
		right-text="新增"
		@click-right="() => router.push('/type/add')"
	/>

	<van-search
		v-model="search"
		placeholder="搜索分类"
		@search="searchType"
	/>

	<van-list
		v-model:loading="loading"
		:finished="finished"
		finished-text="没有更多了"
		@load="getTypeList"
	>

		<!-- 滑动单元格 -->
		<van-swipe-cell v-for="item in typeList">
			<!-- 单元格内容 -->
			<van-cell :key="item.id" :title="item.name" @click="() => router.push(`/type/info/${item.id}`)"/>
			<!-- 右侧操作 -->
			<template #right>
				<van-button square type="primary" style="height: 100%"
							@click="() => router.push(`/type/edit/${item.id}`)">编辑
				</van-button>
				<van-button square type="danger" style="height: 100%"
							@click="onDelete(item.id)">删除
				</van-button>
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
