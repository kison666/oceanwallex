<template>
    <div id="app">
        <div v-wechat-title="$route.meta.title"></div>
        <router-view/>
    </div>
</template>
<script>
export default {
    name: 'App'
}
</script>
<style>
    #app {
        font-family: sans-serif;
        text-align: center;
        color: #2c3e50;
        height: 100%;
    }
.transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
}
</style>