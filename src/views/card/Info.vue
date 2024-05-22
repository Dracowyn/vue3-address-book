<script setup>
import {onMounted, ref} from "vue";

import router from "@/router/index.js";
import card from "@/api/card.js";
import {useCookies} from "vue3-cookies";
import {showToast} from "vant";

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
		showToast({
			type: 'fail',
			message: result.msg,
			duration: 1500,
			// 关闭后跳转到首页
			onClose: () => {
				router.push('/');
			}
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
		left-arrow
		@click-left="() => router.back()"
	>
	</van-nav-bar>
	<van-cell-group>
		<van-cell title="昵称" :value="cardInfo.nickname"/>
		<van-cell title="手机号" :value="cardInfo.mobile"/>
		<van-cell title="性别" :value="cardInfo.gender_text"/>
		<van-cell title="地区" :value="cardInfo.region_text"/>
		<van-cell title="分类" :value="cardInfo.type_text"/>
		<van-cell title="备注" :label="cardInfo.remark"/>
	</van-cell-group>
</template>

<style scoped lang="scss">

</style>
