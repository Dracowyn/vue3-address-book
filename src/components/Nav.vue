<template>
    <div>
        <h1>Nav</h1>
        <p>导航栏组件</p>
    </div>
    <ul>
        <li>首页</li>
        <li>关于我们</li>
        <li>联系我们</li>
    </ul>
</template>

<style lang="scss" scoped>
    h1 {
        color: skyblue;
    }
    p {
        color: #666;
    }
    ul {
        list-style: none;
        display: flex;
        li {
            margin-right: 20px;
        }
    }
</style>