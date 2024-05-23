<script setup>
import {ref} from "vue";
import {useCookies} from "vue3-cookies";
import type from "@/api/type.js";
import router from "@/router/index.js";
import {showNotify} from "vant";

// 获取cookie
const {cookies} = useCookies();
// 读取cookie
let userInfo = JSON.stringify(cookies.get('business'));
// 转换为对象
userInfo = JSON.parse(userInfo);

console.log(userInfo)

const typeName = ref('')

const onSubmit = async () => {
	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
		name: typeName.value,
	}

	const result = await type.add(data)

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
</script>

<template>
	<van-nav-bar
		title="添加分类"
		left-text="返回"
		left-arrow
		@click-left="() => router.back()"
	/>

	<van-form
		ref="form"
		@submit="onSubmit"
	>
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
