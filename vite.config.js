import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			// 修复第三方库找不到vue的问题
			vue: "vue/dist/vue.esm-bundler.js",
		}
	},
	esbuild: {
		// 打包去除console和debugger
		drop: ['console', 'debugger'],
	},
})
