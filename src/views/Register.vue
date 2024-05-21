<script setup>
import {ref} from "vue";
import router from "@/router/index.js";
import {showNotify, showToast} from "vant";
import business from "@/api/business.js";


const mobile = ref('');
const password = ref('');
const confirmPassword = ref('');

const onSubmit = async (values) => {
	// 校验两次输入密码是否一致
	if (password.value !== confirmPassword.value) {
		showToast('两次输入密码不一致');
		return
	}

	// 校验手机号格式
	if (!/^1[3456789]\d{9}$/.test(mobile.value)) {
		showToast('手机号格式错误');
		return
	}

	console.log('submit', values);

	// 封装请求参数
	const data = {
		mobile: mobile.value,
		password: password.value
	};

	const result = await business.register(data);

	console.log(result);

	if (result.code === 1) {
		showNotify({
			type: 'success',
			message: '注册成功',
			duration: 1500,
			// 注册成功之后跳转到登录页面
			onClose: () => {
				router.push('/login');
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

// 返回
const onBack = () => {
	router.go(-1);
};
</script>

<template>
	<van-nav-bar
		title="注册"
		left-text="返回"
		left-arrow
		@click-left="onBack"
	/>
	<div id="main">
		<van-image
			round
			width="8rem"
			height="8rem"
			src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
		/>
		<van-form @submit="onSubmit">
			<van-cell title="注册账号" size="large" style="text-align: center"/>
			<van-cell-group inset>
				<van-field
					v-model="mobile"
					name="手机号"
					label="手机号"
					placeholder="手机号"
					:rules="[{ required: true, message: '请填写手机号' }]"
				/>
				<van-field
					v-model="password"
					type="password"
					name="密码"
					label="密码"
					placeholder="密码"
					:rules="[{ required: true, message: '请填写密码' }]"
				/>
				<van-field
					v-model="confirmPassword"
					type="password"
					name="确认密码"
					label="确认密码"
					placeholder="确认密码"
					:rules="[{ required: true, message: '请填写确认密码' }]"
				/>
			</van-cell-group>

			<router-link to="/login">
				<van-cell center title="已有账号？去登录"/>
			</router-link>

			<div style="margin: 10px;">
				<van-button round block type="primary" native-type="submit">
					提交
				</van-button>
			</div>
		</van-form>
	</div>
</template>

<style scoped lang="scss">
#main {
	display: flex;
	height: calc(100vh - 46px);
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.van-image {
		margin-bottom: 20px;
	}
}
</style>
