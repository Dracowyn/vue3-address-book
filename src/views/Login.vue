<script setup>
import {ref} from "vue";
import router from "@/router/index.js";

const username = ref('');
const password = ref('');
const onSubmit = (values) => {
	console.log('submit', values);
};

// 返回
const onBack = () => {
	router.go(-1);
};
</script>

<template>
	<van-nav-bar
		title="登录"
		left-text="返回"
		left-arrow
		@click-left="onBack"
	/>
	<div id="main">
		<van-form @submit="onSubmit">
			<van-cell title="登录" size="large" style="text-align: center"/>
			<van-cell-group inset>
				<van-field
					v-model="username"
					name="用户名"
					label="用户名"
					placeholder="用户名"
					:rules="[{ required: true, message: '请填写用户名' }]"
				/>
				<van-field
					v-model="password"
					type="password"
					name="密码"
					label="密码"
					placeholder="密码"
					:rules="[{ required: true, message: '请填写密码' }]"
				/>
			</van-cell-group>

			<router-link to="/register">
				<van-cell center title="没有账号？去注册"/>
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

	.van-form {
		margin: auto;
	}
}
</style>
