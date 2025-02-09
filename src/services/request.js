import axios from 'axios';
import {showNotify} from "vant";

let cancel, promiseArr = {};

const CancelToken = axios.CancelToken;

// 请求拦截器
axios.interceptors.request.use(config => {
	//发起请求时，取消掉当前正在进行的相同请求
	if (promiseArr[config.url]) {
		promiseArr[config.url]('操作取消');
		promiseArr[config.url] = cancel;
	} else {
		promiseArr[config.url] = cancel;
	}
	return config;
}, error => {
	return Promise.reject(error);
})


// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
	return response;
}, err => {
	if (err && err.response) {
		switch (err.response.status) {
			case 400:
				err.message = '错误请求';
				break;
			case 401:
				err.message = '未授权，请重新登录';
				break;
			case 403:
				err.message = '拒绝访问';
				break;
			case 404:
				err.message = '请求错误,未找到该资源';
				break;
			case 405:
				err.message = '请求方法未允许';
				break;
			case 408:
				err.message = '请求超时';
				break;
			case 500:
				err.message = '服务器端出错';
				break;
			case 501:
				err.message = '网络未实现';
				break;
			case 502:
				err.message = '网络错误';
				break;
			case 503:
				err.message = '服务不可用';
				break;
			case 504:
				err.message = '网络超时';
				break;
			case 505:
				err.message = 'http版本不支持该请求';
				break;
			default:
				err.message = `连接错误${err.response.status}`;
		}
	} else {
		err.message = "连接到服务器失败";
	}
	console.error(err.message);
	showNotify({
		message: err.message,
		type: 'danger'
	});
	return Promise.resolve(err.response);
})

// 请求默认前缀
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API;

// 设置默认请求头，异步的请求方式
axios.defaults.headers = {
	'X-Requested-With': 'XMLHttpRequest',
}

// 设置请求超时
axios.defaults.timeout = 10000;

// get请求
export function GET(data = {}) {
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url: data.url,
			params: data.params,
			cancelToken: new CancelToken(c => {
				cancel = c;
			})
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data);
		})
	})
}

// post请求
export function POST(data = {}) {
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url: data.url,
			data: data.params,
			cancelToken: new CancelToken(c => {
				cancel = c;
			})
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data);
		})
	})
}

// 文件上传请求
export function UPLOAD(data = {}) {
	return new Promise((resolve, reject) => {
		// 封装表单对象
		let formData = new FormData();
		if (JSON.stringify(data.params) !== '{}') {
			for (let key in data.params) {
				formData.append(key, data.params[key]);
			}
		}
		axios({
			method: 'post',
			url: data.url,
			data: data.params,
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			cancelToken: new CancelToken(c => {
				cancel = c;
			})
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data);
		})
	})
}
