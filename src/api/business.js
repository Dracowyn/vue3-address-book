import {POST, UPLOAD} from "@/services/request.js";


const Business = {
	login(data) {
		return POST({
			url: '/business/login',
			params: data
		})
	},
	register(data) {
		return POST({
			url: '/business/register',
			params: data
		})
	},
	check(data) {
		return POST({
			url: '/business/check',
			params: data
		})
	},
	profile(data) {
		return UPLOAD({
			url: '/business/profile',
			params: data
		})
	}
}

export default Business;
