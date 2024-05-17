<script setup>
// Footer组件

import {ref} from 'vue'
// 当前年份
const year = ref(new Date().getFullYear())
</script>

<template>
    <div>
        <h1>Footer</h1>
        <p>版权所有 &copy; 2020 - {{ year }}</p>
    </div>
</template>

<style lang="scss" scoped>
    h1 {
        color: skyblue;
    }
    p {
        color: #666;
    }
</style>