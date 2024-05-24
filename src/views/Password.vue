<script setup>
import {ref} from "vue";
import router from "@/router/index.js";
import {useUserStore} from "@/store/userStore.js";
import {showNotify} from "vant";
import business from "@/api/business.js";

const userStore = useUserStore();
const userInfo = userStore.getUserInfo;

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const onSubmit = async () => {
	if (newPassword.value !== confirmPassword.value) {
		showNotify({
			type: 'warning',
			message: '两次密码不一致',
			duration: 1500,
		})
		return;
	}

	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
		old_password: oldPassword.value,
		new_password: newPassword.value,
	}

	const result = await business.password(data);

	if (result.code === 1) {
		showNotify({
			type: 'success',
			message: '修改成功',
			duration: 1500,
			onClose: () => {
				userStore.clearUserInfo()
				router.push('/login')
			}
		})
	} else {
		showNotify({
			type: 'warning',
			message: result.msg,
			duration: 1500,
		})
	}
};
</script>

<template>
	<van-nav-bar
		title="修改密码"
		left-text="返回"
		left-arrow
		@click-left="router.back()"
	>
	</van-nav-bar>

	<van-form
		ref="form"
		@submit="onSubmit"
	>
		<van-field
			v-model="oldPassword"
			label="旧密码"
			type="password"
			placeholder="请输入旧密码"
			:rules="[{ required: true, message: '请输入旧密码' }]"
		/>
		<van-field
			v-model="newPassword"
			label="新密码"
			type="password"
			placeholder="请输入新密码"
			:rules="[{ required: true, message: '请输入新密码' }]"
		/>
		<van-field
			v-model="confirmPassword"
			label="确认密码"
			type="password"
			placeholder="请再次输入新密码"
			:rules="[{ required: true, message: '请再次输入新密码' }]"
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
