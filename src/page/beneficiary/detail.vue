<template>
    <el-container>
        <el-header>
            <header-top></header-top>
        </el-header>
        <el-container class="super-main">
            <el-aside>
                <left-aside :activeItem="activeItem"></left-aside>
            </el-aside>
            <el-main>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>受益人账户详情</span>
                    </div>
                    <div class="detail-item">
                        <div class="item-title">受益人编号</div>
                        <div class="item-content">{{detail.bNo}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="item-title">受益人类型</div>
                        <div class="item-content">{{detail.typeDesc}}</div>
                    </div>
                    <div class="detail-item" v-show="detail.areaType!=null && detail.areaType!=''">
                        <div class="item-title">所在国家</div>
                        <div class="item-content">{{detail.areaDesc}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="item-title">账户币种</div>
                        <div class="item-content">{{detail.currencyName}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="item-title">路由方式</div>
                        <div class="item-content">{{detail.routeDesc}}</div>
                    </div>
                    <div class="detail-item" v-show="detail.swiftCode!=null && detail.swiftCode!=''">
                        <div class="item-title">SWIFT CODE</div>
                        <div class="item-content">{{detail.swiftCode}}</div>
                    </div>
                    <div class="detail-item" v-show="detail.iban!=null && detail.iban!=''">
                        <div class="item-title">IBAN</div>
                        <div class="item-content">{{detail.iban}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="item-title">受益人别名</div>
                        <div class="item-content">{{detail.bName}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="item-title">银行全名</div>
                        <div class="item-content">{{detail.bankName}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="item-title">公司账号</div>
                        <div class="item-content">{{detail.compAccount}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="item-title">账户全名</div>
                        <div class="item-content">{{detail.accountName}}</div>
                    </div>
                    <div class="detail-item" v-show="detail.bankProvince!=null && detail.bankProvince!=''">
                        <div class="item-title">银行所属省份</div>
                        <div class="item-content">{{detail.bankProvince}}</div>
                    </div>
                    <div class="detail-item" v-show="detail.bankCity!=null && detail.bankCity!=''">
                        <div class="item-title">银行所属城市</div>
                        <div class="item-content">{{detail.bankCity}}</div>
                    </div>
                    <div class="detail-item" v-show="detail.cardNo!=null && detail.cardNo!=''">
                        <div class="item-title">证件号码</div>
                        <div class="item-content">{{detail.cardNo}}</div>
                    </div>
                    <div class="detail-item" v-show="detail.mobile!=null && detail.mobile!=''">
                        <div class="item-title">手机号码</div>
                        <div class="item-content">{{detail.mobile}}</div>
                    </div>
                    <div class="detail-item" v-show="detail.address!=null && detail.address!=''">
                        <div class="item-title">受益人地址</div>
                        <div class="item-content">{{detail.address}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="item-title">备注</div>
                        <div class="item-content">{{detail.remark}}</div>
                    </div>
                    <div class="detail-item">
                        <div class="item-title">状态</div>
                        <div class="item-content item-status">{{detail.stateDesc}}</div>
                    </div>
                </el-card>
            </el-main>
        </el-container>
        <simple-dialog :dialogVisible="dialogVisible" :dialogMsg="dialogMsg" @clickDialog="clickDialog" v-if="dialogVisible==true"></simple-dialog>
    </el-container>
</template>
<script>
import headerTop from '../../components/headerTop'
import leftAside from '../../components/leftAside'
import simpleDialog from '../../components/simpleDialog'
import {
    benefitDetail
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
        headerTop,
        simpleDialog
    },
    data() {
        return {
            fullscreenLoading: false,
            dialogMsg: '', //对话框内容
            dialogVisible: false, //对话框是否显示
            activeItem: 'beneficiary',
            id: '',
            detail: '',
        }
    },
    created() {
        this.id = this.$route.query.id;
        if (this.id) {
            this.requestBenfiDetail();
        }
    },
    methods: {

        //提交请求
        requestBenfiDetail() {

            //用户名登录
            this.fullscreenLoading = true;
            let handler = this;
            benefitDetail(this.id,
                function(ret) {
                    // console.log("success=" + data);
                    handler.responseBenfiDetail(ret);
                });
        },

        responseBenfiDetail(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret,1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.dialogVisible = true;
                this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                // this.$router.replace({
                //     path: '/home'
                // });
                this.detail = ret.retData;
                return;
            }
        },
        clickDialog(){
            this.dialogVisible=false;
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail-item {
    display: flex;
    position: relative;
    width: 100%;
    line-height: 40px;
}

.detail-item .item-title {
    flex: 1;
    color: #999999;
}

.detail-item .item-content {
    flex: 6
}

.detail-item .item-status {
    color: green;
}
</style>