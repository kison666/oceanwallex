<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu default-openeds.sync="['5']" router.sync="false" :default-active="activeItem">
                <router-link :to="{path: '/account'}" class="menu-link">
                    <el-menu-item index="account" class="menu-item">
                        <i class="el-icon-document"></i>
                        <span slot="title">账户总览</span>
                    </el-menu-item>
                </router-link>
                <router-link :to="{path: '/charge'}" class="menu-link">
                    <el-menu-item index="charge" class="menu-item">
                        <i class="el-icon-refresh"></i>
                        <span slot="title">交易充值</span>
                    </el-menu-item>
                </router-link>
                <router-link :to="{path: '/payment'}" class="menu-link">
                    <el-menu-item index="payment" class="menu-item">
                        <i class="el-icon-sold-out"></i>
                        <span slot="title">支付换汇</span>
                    </el-menu-item>
                </router-link>
                <router-link :to="{path: '/beneficiary'}" class="menu-link">
                    <el-menu-item index="beneficiary" class="menu-item">
                        <i class="el-icon-sort"></i>
                        <span slot="title">收款账户</span>
                    </el-menu-item>
                </router-link>
                <div style="height: 2px;background-color:#eeeeee;width: 100px;margin-left: 90px;margin-top: 20px;margin-bottom: 20px"></div>
                <el-menu-item index="5" style="cursor:default !important" class="disable-menu">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">历史记录</span>
                </el-menu-item>
                <router-link :to="{path: '/recharge-record'}" class="menu-link xbt-sub-menu-item">
                    <el-menu-item index="recharge-record" class="menu-item">
                        <span slot="title">充值记录</span>
                    </el-menu-item>
                </router-link>
                <router-link :to="{path: '/acct-flowRecord'}" class="menu-link xbt-sub-menu-item">
                    <el-menu-item index="acct-flowRecord" class="menu-item">
                        <span slot="title">账户流水</span>
                    </el-menu-item>
                </router-link>
                <router-link :to="{path: '/trans-record'}" class="menu-link xbt-sub-menu-item">
                    <el-menu-item index="trans-record" class="menu-item">
                        <span slot="title">交易记录</span>
                    </el-menu-item>
                </router-link>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: ['activeItem'],
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-aside .el-menu{background-color: transparent;border-right-width: 0px}
.el-aside .el-menu .el-menu-item span{font-size: 16px}
.el-aside .el-submenu__title{font-size: 16px}
.el-aside .el-menu .el-icon-arrow-down{display: none}
.el-aside .el-menu .el-menu-item-group ul .el-menu-item{padding-left:30px!important;font-size: 15px}
.menu-link {
    text-decoration: none!important;
}

.el-menu-item{
   padding-left: 60px!important;
   border-left: 3px #F6F8F9 solid;
}

.xbt-sub-menu-item .el-menu-item {
    padding-left: 90px!important;
}

.xbt-sub-menu-item .el-menu-item span {
    font-size: 15px;
}

.disable-menu span,.disable-menu i {
    color: #999999;
}

.disable-menu{
    color: #999999;
    border-left: none!important;
}

.disable-menu:hover{
    background-color: transparent!important;
}

.menu-item:hover span,.menu-item:hover i{color:#409EFF; }
.el-menu-item.is-active{background-color: #ecf5ff;border-left: 3px #409EFF solid;}
</style>