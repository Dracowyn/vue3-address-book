<script setup>
import {ref} from "vue";
import router from "@/router/index.js";
import {showConfirmDialog, showToast} from "vant";
import {useUserStore} from "@/store/userStore.js";

// 激活的底部导航栏标签
const active = ref('my');

const userStore = useUserStore();
const userInfo = userStore.getUserInfo;

console.log(userInfo);

// 获取头像
const getAvatar = () => {
	// 获取头像
	if (userInfo.avatar) {
		return userInfo.avatar;
	} else {
		return 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg';
	}
};


// 退出登录
const logout = () => {
	showConfirmDialog({
		title: '退出登录',
		message: '确定要退出登录吗？',
		confirmButtonText: '退出',
		overlay: true,
		// 确认退出
		onConfirm: () => {
			userStore.clearUserInfo()
			// 提示
			showToast({
				type: 'success',
				message: '退出成功',
				duration: 1500,
				// 关闭后跳转到登录页
				onClose: () => {
					router.push('/login');
				}
			});
		}
	});
};
</script>

<template>
	<van-nav-bar
		title="我的"
		fixed
	>
	</van-nav-bar>

	<div id="avatar">
		<van-image
			style="margin: auto"
			round
			width="8rem"
			height="8rem"
			:src="getAvatar()"
		/>
	</div>

	<!-- 昵称 -->
	<van-cell-group>
		<van-cell title="昵称" :value="userInfo.nickname" v-show="userInfo.nickname"/>
		<van-cell title="昵称" value="未设置" v-show="!userInfo.nickname"/>
		<van-cell title="手机号" :value="userInfo.mobile"/>
	</van-cell-group>

	<van-cell-group>
		<van-cell title="修改资料" is-link to="/profile"/>
		<van-cell title="修改密码" is-link to="/password"/>
		<van-cell title="退出登录" is-link @click="logout"/>
	</van-cell-group>

	<van-tabbar v-model="active">
		<van-tabbar-item icon="wap-home-o" name="index" to="/">主页</van-tabbar-item>
		<van-tabbar-item icon="list-switch" name="type" to="/type">分类</van-tabbar-item>
		<van-tabbar-item icon="user-circle-o" name="my" to="/my">我的</van-tabbar-item>
	</van-tabbar>
</template>

<style scoped lang="scss">
#avatar {
	margin-top: calc(46px + 1rem);
	margin-bottom: 1rem;
	width: 100%;
	display: flex;
}
</style>
