<template>
    <el-container>
        <el-header>
            <header-top :isShowSteps="true"></header-top>
        </el-header>
        <el-container class="super-main">
            <el-aside>
                <left-aside :activeItem="activeItem"></left-aside>
            </el-aside>
            <el-main>
                <el-card class="box-card" style="min-height: 560px">
                    <el-row style="min-height: 80px;">
                        <el-col :span="12">
                            <p style="text-align: center;font-size: 20px;line-height: 22px;-webkit-margin-before:0px">全球支付</p>
                            <el-row style="padding: 10px 0px">
                                <el-col :span="12" style="text-align: center;">
                                    <router-link :to="{path: '/charge'}">
                                        <el-button type="primary">账户充值</el-button>
                                    </router-link>
                                </el-col>
                                <el-col :span="12" style="text-align: center;">
                                    <router-link :to="{path: '/payment'}">
                                        <el-button type="primary">支付换汇</el-button>
                                    </router-link>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12">
                        </el-col>
                    </el-row>
                    <el-row style="padding: 10px 0px 0px 0px">
                        <el-col :span="6" style="text-align: center;" v-for="(item, index) in accountData" :key="index">
                            <div class="row-item">
                                <img :src="item.flag">
                                <p>{{item.currencyName}}余额</p>
                                <p>{{item.currencyCode}}&nbsp; {{item.amtE2}}</p>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import headerTop from '../../components/headerTop'
import leftAside from '../../components/leftAside'
import {
    accountTotal,
    infoSteps
} from '../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_DATA,
    responsePassword,
} from '../../config/response'
export default {
    components: {
        leftAside,
        headerTop
    },
    data() {
        return {
            activeItem: 'account',
            accountData: '',
        }
    },
    created() {
        this.requestAccountInfo();
    },
    methods: {
        //获取用户账户信息
        requestAccountInfo() {
            let handler = this;
            accountTotal(function(ret) {
                // console.log("success=" + data);
                handler.responseAccountInfo(ret);
            });
        },

        responseAccountInfo(ret) {
            let response = responseResult(this, ret,1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.accountData = ret.retData;
                return;
            }
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row-item {
    margin: 0px 5px;
    padding: 20px 0px 10px 0px;
    text-align: center;
    background-color: #f5f5f5;
}

.row-item img {
    height: 90px
}

.row-item p {
    line-height: 10px
}

.el-card__body {
    padding: 10px 20px 20px 20px!important
}
</style>