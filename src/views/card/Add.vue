<script setup>
import {onMounted, ref} from "vue";

import router from "@/router/index.js";
import card from "@/api/card.js";
import type from "@/api/type.js";
import {showNotify} from "vant";

import {useUserStore} from "@/store/userStore.js";
// 选择地区
import {areaList} from '@vant/area-data';

const userStore = useUserStore();
const userInfo = userStore.getUserInfo;

const nickname = ref('')
const cardMobile = ref('')
const gender = ref('0')

const remark = ref('')

// 地区选择
const region = ref('')
const province = ref('');
const city = ref('');
const county = ref('');

// 分类选择数据
const typeId = ref(0)
const typeList = ref([]);
// 分类选择数据
const typeValue = ref('');
// 是否显示选择器
const showPicker = ref(false);
// 确认选择分类
const onTypeConfirm = ({selectedOptions}) => {
	showPicker.value = false;
	typeValue.value = selectedOptions[0].text;
	typeId.value = selectedOptions[0].value;
	console.log(typeValue.value)
	console.log(selectedOptions[0].value)
};

// 定义地区
const showArea = ref(false);
const onAreaConfirm = ({selectedOptions}) => {
	showArea.value = false;
	region.value = selectedOptions.map((item) => item.text).join('-');
	// 获取地区编码
	const code = selectedOptions.map((item) => item.value)
	console.log(code)
	province.value = code[0];
	city.value = code[1];
	county.value = code[2];
	console.log(province.value, city.value, county.value)
};

// 获取分类列表
const getTypeList = async () => {
	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
	}

	const result = await type.all(data);

	console.log(result);

	if (result.code === 1) {
		// 转换数据格式并更新
		typeList.value.push(...result.data.map(item => {
			return {
				text: item.name,
				value: item.id,
			}
		}));
	} else {
		console.log(result);
	}
};

// 提交
const onSubmit = async (values) => {
	console.log('submit', values);

	const data = {
		id: userInfo.id,
		mobile: userInfo.mobile,
		nickname: nickname.value,
		card_mobile: cardMobile.value,
		gender: gender.value,
		type_id: typeId.value,
		remark: remark.value,
	}

	if (region.value) {
		data.region = county.value ? county.value : city.value ? city.value : province.value;
	}

	const result = await card.add(data);

	console.log(result);

	if (result.code === 1) {
		showNotify({
			type: 'success',
			message: result.msg,
			duration: 1500,
			onClose: () => {
				router.push('/');
			}
		});
	} else {
		showNotify({
			type: 'fail',
			message: result.msg,
			duration: 1500,
		});
	}

}

onMounted(() => {
	getTypeList();
})

</script>

<template>
	<van-nav-bar
		title="新增通讯录"
		left-text="返回"
		left-arrow
		@click-left="router.back()"
	/>
	<van-form
		ref="form"
		@submit="onSubmit"
	>
		<van-cell-group inset>
			<van-field
				v-model="nickname"
				name="nickname"
				label="昵称"
				placeholder="昵称"
				:rules="[{ required: true, message: '请填写昵称' }]"
			/>
			<van-field
				v-model="cardMobile"
				name="mobile"
				label="手机号"
				placeholder="手机号"
				:rules="[{ required: true, message: '请填写手机号' }]"
			/>
			<van-field name="gender" label="性别">
				<template #input>
					<van-radio-group v-model="gender" direction="horizontal">
						<van-radio name="0">保密</van-radio>
						<van-radio name="1">男</van-radio>
						<van-radio name="2">女</van-radio>
					</van-radio-group>
				</template>
			</van-field>
			<van-field
				v-model="region"
				is-link
				readonly
				name="area"
				label="地区选择"
				placeholder="点击选择省市区"
				@click="showArea = true"
			/>
			<van-popup v-model:show="showArea" position="bottom">
				<van-area
					:area-list="areaList"
					@confirm="onAreaConfirm"
					@cancel="showArea = false"
				/>
			</van-popup>
			<!-- 选择器（分类选择） -->
			<van-field
				v-model="typeValue"
				name="type"
				is-link
				readonly
				label="分类"
				placeholder="选择分类"
				@click="showPicker = true"
				:rules="[{ required: true, message: '请选择分类' }]"
			/>
			<van-popup v-model:show="showPicker" round position="bottom">
				<van-picker
					:columns="typeList"
					@cancel="showPicker = false"
					@confirm="onTypeConfirm"
				/>
			</van-popup>
			<van-field
				v-model="remark"
				name="remark"
				label="备注"
				type="textarea"
				placeholder="备注"
			/>

		</van-cell-group>
		<div style="margin: 16px;">
			<van-button round block type="primary" native-type="submit">
				提交
			</van-button>
		</div>
	</van-form>
</template>

<style scoped lang="scss">

</style>
