<script setup>
import {onMounted, ref} from "vue";
import {useCookies} from "vue3-cookies";
import type from "@/api/type.js";
import router from "@/router/index.js";
import {showConfirmDialog, showNotify} from "vant";


// 获取cookie
const {cookies} = useCookies();
// 读取cookie
let userInfo = JSON.stringify(cookies.get('business'));
// 转换为对象
userInfo = JSON.parse(userInfo);

console.log(userInfo)

const typeId = router.currentRoute.value.params.id;
const typeInfo = ref({})

const getTypeInfo = async () => {
	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
		type_id: typeId,
	}

	const result = await type.info(data)

	console.log(result)

	if (result.code === 1) {
		typeInfo.value = result.data
	}
}

const onDelete = () => {
	showConfirmDialog({
		title: '删除分类',
		message: '确定要删除该分类吗？',
		confirmButtonText: '删除',
		overlay: true,
	}).then(() => {
		deleteType()
	}).catch(() => {
		// on cancel
	})
}

const deleteType = async () => {
	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
		type_id: typeId,
	}

	const result = await type.del(data)

	console.log(result)

	if (result.code === 1) {
		showNotify({
			type: 'success',
			message: result.msg,
			duration: 1500,
			onClose: () => {
				router.push('/type')
			}
		})
	} else {
		showNotify({
			type: 'danger',
			message: result.msg,
			duration: 1500,
		})
	}
}

onMounted(() => {
	getTypeInfo()
})

</script>

<template>
	<van-nav-bar
		title="分类详情"
		left-text="返回"
		left-arrow
		@click-left="() => router.back()"
		right-text="编辑"
		@click-right="() => router.push('/type/edit/' + typeId)"
	/>

	<van-cell-group>
		<van-cell title="分类ID" :value="typeInfo.id"/>
		<van-cell title="分类名称" :value="typeInfo.name"/>
	</van-cell-group>

	<div style="margin: 16px;">
		<van-button round block type="danger">
			删除分类
		</van-button>
	</div>

</template>

<style scoped lang="scss">
</style>
