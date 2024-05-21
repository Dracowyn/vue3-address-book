import {POST} from "@/services/request.js";

const Card = {
	index(data) {
		return POST({
			url: '/card/card/index',
			params: data
		})
	},
	info(data) {
		return POST({
			url: '/card/card/info',
			params: data
		})
	},
	add(data) {
		return POST({
			url: '/card/card/add',
			params: data
		})
	},
	edit(data) {
		return POST({
			url: '/card/card/edit',
			params: data
		})
	},
	del(data) {
		return POST({
			url: '/card/card/del',
			params: data
		})
	}
}

export default Card;
