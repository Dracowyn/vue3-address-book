import {POST} from "@/services/request.js";

const Type = {
	index(data) {
		return POST({
			url: '/card/type/index',
			params: data
		})
	},
	info(data) {
		return POST({
			url: '/card/type/info',
			params: data
		})
	},
	all(data) {
		return POST({
			url: '/card/type/all',
			params: data
		})
	},
	add(data) {
		return POST({
			url: '/card/type/add',
			params: data
		})
	},
	edit(data) {
		return POST({
			url: '/card/type/edit',
			params: data
		})
	},
	del(data) {
		return POST({
			url: '/card/type/del',
			params: data
		})
	}
}

export default Type;
