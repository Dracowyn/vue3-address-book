import {defineStore} from "pinia";
import {useCookies} from "vue3-cookies";
import business from "@/api/business.js";
import {showNotify} from "vant";

// 定义用户信息
export const useUserStore = defineStore({
	id: "user",
	state: () => {
		const {cookies} = useCookies();
		let userInfo = cookies.get('business') || {}; // 添加默认值

		// 如果用户信息存在，访问API更新用户信息
		if (userInfo && !userInfo !== {}) {
			const data = {
				id: userInfo.id,
				mobile: userInfo.mobile,
			}

			// 获取用户信息
			business.check(data).then(res => {
				if (res.code === 1) {
					userInfo = res.data;
				} else {
					showNotify({
						type: 'danger',
						message: '请先登录',
						duration: 1500,
						onClose: () => {
							userInfo = null;
							cookies.remove('business');
						}
					});
				}
			});
		}

		return {
			// 用户信息
			userInfo: userInfo,
		};
	},
	getters: {
		// 获取用户信息
		getUserInfo: (state) => {
			return state.userInfo;
		}
	},
	actions: {
		// 设置用户信息
		setUserInfo(userInfo) {
			this.userInfo = userInfo;
			const {cookies} = useCookies();
			cookies.set('business', userInfo);
		},
		// 清除用户信息
		clearUserInfo() {
			this.userInfo = null;
			const {cookies} = useCookies();
			cookies.remove('business');
		},
		// 更新用户信息
		updateUserInfo(data) {
			const {cookies} = useCookies();
			business.check(data).then(res => {
				if (res.code === 1) {
					this.userInfo = res.data;
				} else {
					showNotify({
						type: 'danger',
						message: res.msg,
						duration: 1500,
						onClose: () => {
							this.userInfo = null;
							cookies.remove('business');
						}
					});
				}
			});
		},
	},
});
