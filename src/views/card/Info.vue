<script setup>
import {onMounted, ref} from "vue";

import router from "@/router/index.js";
import card from "@/api/card.js";
import {useCookies} from "vue3-cookies";
import {showConfirmDialog, showNotify, showToast} from "vant";

// 获取cookie
const {cookies} = useCookies();
// 读取cookie
let userInfo = JSON.stringify(cookies.get('business'));
// 转换为对象
userInfo = JSON.parse(userInfo);

// 获取通讯录ID
const cardId = router.currentRoute.value.params.id;
// 名片信息
const cardInfo = ref({});

// 获取名片信息
const getCardInfo = async () => {
	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
		card_id: cardId,
	}

	const result = await card.info(data);

	console.log(result);

	if (result.code === 1) {
		// 更新名片信息
		cardInfo.value = result.data;
	} else {
		// 提示
		showNotify({
			type: 'danger',
			message: result.msg,
			duration: 1500,
			// 关闭后跳转到首页
			onClose: () => {
				router.push('/');
			}
		});

	}
};

// 确认删除联系人提示
const confirmDelete = () => {
	showConfirmDialog({
		title: '删除联系人',
		message: '确定要删除该联系人吗？',
		confirmButtonText: '删除',
		overlay: true,
		// 确认删除
		onConfirm: () => {
			deleteCard();
		}
	});
};

// 删除联系人
const deleteCard = async () => {
	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
		card_id: cardId,
	}

	const result = await card.del(data);

	console.log(result);

	if (result.code === 1) {
		// 提示
		showNotify({
			type: 'success',
			message: result.msg,
			duration: 1500,
			// 关闭后跳转到首页
			onClose: () => {
				router.push('/');
			}
		});
	} else {
		// 提示
		showNotify({
			type: 'danger',
			message: result.msg,
			duration: 1500,
		});
	}
};


onMounted(() => {
	getCardInfo();
})

</script>

<template>
	<van-nav-bar
		title="联系人详情"
		left-text="返回"
		right-text="编辑"
		left-arrow
		@click-left="() => router.back()"
		@click-right="() => router.push(`/card/edit/` + cardId)"
	/>
	<van-cell-group>
		<van-cell title="昵称" :value="cardInfo.nickname"/>
		<van-cell title="手机号" :value="cardInfo.mobile"/>
		<van-cell title="性别" :value="cardInfo.gender_text"/>
		<van-cell title="地区" :value="cardInfo.region_text"/>
		<van-cell title="分类" :value="cardInfo.type_text"/>
		<van-cell title="备注" :label="cardInfo.remark"/>
	</van-cell-group>

	<div style="margin: 16px;">
		<van-button round block type="danger">
			删除联系人
		</van-button>
	</div>
</template>

<style scoped lang="scss">
</style>
