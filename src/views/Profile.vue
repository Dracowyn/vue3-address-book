<script setup>
import {ref} from "vue";
import router from "@/router/index.js";
import {useUserStore} from "@/store/userStore.js";
import {areaList} from "@vant/area-data";
import {showNotify} from "vant";
import businessApi from "@/api/business.js";

const userStore = useUserStore();
const userInfo = userStore.getUserInfo;

const business = ref({
	nickname: userInfo.nickname,
	gender: userInfo.gender,
	region: userInfo.region,
	address: userInfo.address,
	avatar: userInfo.avatar,
});

// 获取后端地址
const url = import.meta.env.VITE_APP_BASE_URL;

const fileList = ref([]);
if (userInfo.avatar) {
	fileList.value.push({
		url: userInfo.avatar
	})
}

const regionCode = ref(business.value.district ? business.value.district : (business.value.city ? business.value.city : business.value.province));

// 选择地区
const showArea = ref(false);
const onAreaConfirm = ({selectedOptions}) => {
	showArea.value = false;
	business.value.region = selectedOptions.map((item) => item.text).join('-');
	// 获取地区编码
	const code = selectedOptions.map((item) => item.value)
	regionCode.value = code[0] ? code[0] : (code[1] ? code[1] : code[2]);
	console.log(regionCode.value)
};

const onSubmit = async (values) => {
	console.log(values)
	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
		nickname: business.value.nickname,
		gender: business.value.gender,
		address: business.value.address,
	}

	if (regionCode.value) {
		data.region = regionCode.value
	}

	const avatar = values.avatar[0]?.file;
	// 如果有头像
	if (avatar) {
		data.avatar = avatar;
	}

	console.log(data);

	const result = await businessApi.profile(data);

	if (result.code === 1) {
		result.data.avatar = url + result.data.avatar;
		userStore.setUserInfo(result.data)
		showNotify({
			type: 'success',
			message: result.msg,
			duration: 1500,
			onClose: () => {
				router.back();
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
		title="个人资料"
		left-text="返回"
		left-arrow
		@click-left="() => router.back()"
	/>

	<van-form
		ref="form"
		@submit="onSubmit"
	>

		<van-field name="avatar" label="头像上传">
			<template #input>
				<van-uploader v-model="fileList" max-count="1"/>
			</template>
		</van-field>

		<van-field
			v-model="business.nickname"
			name="nickname"
			label="昵称"
			placeholder="请输入昵称"
			required
			:rules="[{ required: true, message: '请输入昵称' }]"
		/>

		<van-field name="gender" label="性别">
			<template #input>
				<van-radio-group v-model="business.gender" direction="horizontal">
					<van-radio name="0">保密</van-radio>
					<van-radio name="1">男</van-radio>
					<van-radio name="2">女</van-radio>
				</van-radio-group>
			</template>
		</van-field>

		<van-field
			v-model="business.region"
			is-link
			readonly
			name="region"
			label="地区选择"
			placeholder="选择省市区"
			@click="showArea = true"
		/>
		<van-popup v-model:show="showArea" round position="bottom">
			<van-area
				:area-list="areaList"
				@confirm="onAreaConfirm"
				@cancel="showArea = false"
				v-model="regionCode"
				title="选择地区"
			/>
		</van-popup>

		<van-field
			v-model="business.address"
			name="address"
			label="详细地址"
			placeholder="请输入详细地址"
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
