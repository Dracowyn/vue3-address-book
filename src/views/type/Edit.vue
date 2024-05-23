<script setup>
import {onMounted, ref} from "vue";
import type from "@/api/type.js";
import router from "@/router/index.js";
import {showNotify} from "vant";

import {useUserStore} from "@/store/userStore.js";

const userStore = useUserStore();
const userInfo = userStore.getUserInfo;

console.log(userInfo)

const typeId = router.currentRoute.value.params.id;
const typeInfo = ref({})
const typeName = ref('')

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
		typeName.value = result.data.name
	}
}

const onSubmit = async () => {
	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
		type_id: typeId,
		name: typeName.value,
	}

	const result = await type.edit(data)

	console.log(result)

	if (result.code === 1) {
		showNotify({
			type: 'success',
			message: result.msg,
			duration: 1500,
			onClose: () => {
				router.back()
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
		title="编辑分类"
		left-text="返回"
		left-arrow
		@click-left="() => router.back()"
	/>

	<van-form
		ref="form"
		@submit="onSubmit"
	>
		<van-field
			v-model="typeInfo.id"
			name="typeId"
			label="分类ID"
			placeholder="请输入分类ID"
			readonly
			required
			disabled
		/>
		<van-field
			v-model="typeName"
			name="typeName"
			label="分类名称"
			placeholder="请输入分类名称"
			required
		/>
		<div style="margin: 16px;">
			<van-button round block type="primary" native-type="submit">
				提交
			</van-button>
		</div>
	</van-form>
</template>

<style scoped lang="scss">

</style>
