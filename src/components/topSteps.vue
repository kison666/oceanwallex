<template>
    <el-steps :active="stepActive" finish-status="success">
        <el-step title="注册人信息"></el-step>
        <el-step title="企业信息"></el-step>
        <el-step title="股东信息"></el-step>
        <el-step title="业务信息"></el-step>
        <el-step title="信息总览"></el-step>
    </el-steps>
</template>
<script>
export default {
    data() {
        return {}
    },
    props: ['stepActive'],
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>