<script setup>
import { ref,watchEffect,onMounted } from 'vue'
// 导入组件
// 导入底部组件
import Footer from './components/Footer.vue'
// 导入导航栏组件
import Nav from './components/Nav.vue'

// ref()函数创建一个响应式对象
// ref()函数的参数是初始值
// ref()函数返回一个对象，对象中有一个value属性，value属性的值就是ref()函数的参数
// count的值发生变化时，页面会自动更新
const count = ref(0)

// v-model双向绑定
const name = ref('')

// 监听属性
// watchEffect()函数用来监听一个响应式对象
watchEffect(() => {
  console.log('count的值发生了变化', count.value)
})

// v-html
const html = ref('<h1>我是一个标题</h1>')

// v-text
const text = ref('我是一个文本')

// v-on
// 更改当前元素的样式
const changeStyle = (e)=> {
  e.target.style.color = 'red'
  e.target.style.fontSize = '20px'
}

// v-bind
// v-bind指令可以动态绑定一个或多个属性
// v-bind:属性名="属性值"
// 简写：:属性名="属性值"
const style = ref({
  color: 'blue',
  fontSize: '20px',
})

// 生命周期
// setup()函数中可以使用生命周期函数

// 创建一个ref对象，用于测试mounted生命周期函数
const mountedCount = ref(0)
console.log('mountedCount', mountedCount.value);
// onMounted()函数表示当前组件挂载完成
onMounted(() => {
  console.log('mounted!')

  // 当前组件挂载完成后，修改count的值
  mountedCount.value = 10

  // 创建一个定时器，每隔1秒修改count的值
  const timer = setInterval(() => {
    mountedCount.value++
  }, 1000)

  // 当mountedCount的值发生变化时，执行回调函数
  watchEffect(() => {
    console.log('mountedCount的值发生了变化', mountedCount.value)
    // 当mountedCount的值大于等于15时，清除定时器
    if (mountedCount.value >= 15) {
      console.log('清除定时器')
      clearInterval(timer)
    }
  })
})

// 当前时间
const now = ref(new Date().toLocaleString())
// 创建一个定时器，每隔1秒修改now的值
setInterval(() => {
  now.value = new Date().toLocaleString()
}, 1000)

</script>

<template>
  <Nav />
  <div>
    <h1>Hello world</h1>
    <p>count值: {{ count }}</p>
    <button @click="count++">增加count</button>
    <button @click="count--">减少count</button>

    <h2>计算属性</h2>
    <p>count的平方: {{ count * count }}</p>

    <h2>监听属性</h2>
    <p>count的值: {{ count }}</p>

    <h2>双向绑定</h2>
    在这里输入内容：<input type="text" v-model="name" />
    <br>
    <p>name的值会发生变化</p>
    <p>name的值: {{ name }}</p>

    <div>
      <h2>v-html</h2>
      <div v-html="html"></div>
    </div>

    <div>
      <h2>v-text</h2>
      <div v-text="text"></div>
    </div>

    <div>
      <h2>v-bind</h2>
      <p>点击下面的文字，会改变文字的颜色和大小</p>
      <p @click="changeStyle">点我</p>
    </div>

    <div>
      <h2>v-bind</h2>
      <p :style="style">我是一个文本</p>
      <p :style="{color: 'red', fontSize: '30px'}">我是一个文本</p>
    </div>

    <div>
      <h2>生命周期</h2>
      <p>mountedCount的值: {{ mountedCount }}</p>
    </div>

    <div>
      <h2>当前时间</h2>
      <p>当前时间: {{ now }}</p>
    </div>

  </div>

  Footer组件
  <Footer />
</template>

<!-- 如果要支持sass、less等预处理器，需要另外安装 -->
<style scoped>
/* scoped表示当前样式只在当前组件生效 */
h2 {
  margin: 5px;
}
</style>

<style lang="scss" scoped>
/* lang="scss"表示当前样式使用scss语法 */

</style>

