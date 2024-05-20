import {POST} from "@/services/request.js";


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
	}
}

export default Business;
