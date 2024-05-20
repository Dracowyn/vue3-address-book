<script setup>
import {onMounted, ref} from "vue";
import router from "@/router/index.js";
import {showNotify} from "vant";
import business from "@/api/business.js";
import {useCookies} from "vue3-cookies";

const mobile = ref('');
const password = ref('');

// 设置cookie
const {cookies} = useCookies();

// 验证是否登录
const checkLogin = async () => {
	// 读取cookie
	let userInfo = JSON.stringify(cookies.get('business'));
	// 转换为对象
	userInfo = JSON.parse(userInfo);

	console.log(userInfo);

	// 读取userInfo，如果不存在则停止执行后边的代码
	if (!userInfo) {
		return;
	}

	// 验证是否登录

	// 如果无法获取手机号则留空
	const mobile = userInfo.mobile || '';
	const id = userInfo.id || '';

	const data = {
		mobile,
		id,
	}
	let result = await business.check(data);

	console.log(result);

	console.log(result);
	if (result.code === 1) {
		showNotify({
			type: 'success',
			message: '您已经登录',
			duration: 1500,
			// 关闭后跳转到首页
			onClose: () => {
				router.push('/');
			}
		})
	} else {
		showNotify({
			type: 'warning',
			message: '非法登录',
			duration: 1500,
		})
		// 清空cookie
		cookies.remove('business');
	}
}

onMounted(() => {
	checkLogin();
})

// 提交
const onSubmit = async (values) => {
	console.log('submit', values);
	// 校验手机号
	if (!/^1[3456789]\d{9}$/.test(mobile.value)) {
		showNotify({
			type: 'warning',
			message: '手机号格式错误',
			duration: 1500,
		})
		return;
	}

	let data = {
		mobile: mobile.value,
		password: password.value,
	}

	// 发起亲够
	let result = await business.login(data);

	// 打印结果
	console.log(result)

	if (result.code === 1) {
		showNotify({
			type: 'success',
			message: '登录成功',
			duration: 1500,
		})
		// 设置cookie
		cookies.set('business', result.data);

		// 跳转到首页
		await router.push('/');
	} else {
		showNotify({
			type: 'danger',
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
		title="登录"
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
			<van-cell title="登录" size="large" style="text-align: center"/>
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
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.van-image {
		margin-bottom: 20px;
	}
}
</style>
