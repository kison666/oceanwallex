<template>
    <div class="header-container">
        <div class="logo-icon"><span>OceanWallex</span></div>
        <div class="account" style="padding-right:50px">
            <el-dropdown v-show="isLogin!=false" @command="handleCommand">
                <span class="el-dropdown-link">
                        {{companyName}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="account">我的账户</el-dropdown-item>
                    <el-dropdown-item command="author">信息认证</el-dropdown-item>
                    <el-dropdown-item command="signout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>您确定退出系统？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="signout()">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
import { setToken,getToken } from '../store/store'
import {
    signOut,
    infoSteps
} from '../service/getData'
import {
    responseResult,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_DATA,
    responsePassword,
} from '../config/response'
export default {
    data() {
        return {
            companyName: '个人中心', //公司名称
            dialogVisible: false,
            step: 0,

        }
    },
    props: ['isLogin', 'isShowSteps','isShowAuthDialog'],
    created() {
        if (this.isLogin != false) {
            this.requestStepsInfo();
        }
    },

    methods: {
        //初始化获取数据
        handleCommand(command) {
            if (command === 'signout') {
                this.dialogVisible = true;
            } else if (command === 'account') {
                this.account();
            } else if (command === 'author') {
                this.author();
            }
        },

        signout() {
            this.dialogVisible = false;
            this.requestSignOut();
        },

        account() {
            this.$router.push({
                path: '/profile'
            });
            this.$router.go(1);
        },

        author() {
            if (this.step == 0) {
                if (this.$router.history.current.fullPath != "/compinfo/base") {
                    this.$router.push({ path: '/compinfo/base' });
                    this.$router.go(1);
                }
            } else if (this.step == 1) {
                if (this.$router.history.current.fullPath != "/compinfo/enterprise") {
                    this.$router.push({ path: '/compinfo/enterprise' });
                    this.$router.go(1);
                }
            } else if (this.step == 2) {
                if (this.$router.history.current.fullPath != "/compinfo/shareholder") {
                    this.$router.push({ path: '/compinfo/shareholder' });
                    this.$router.go(1);
                }
            } else if (this.step == 3) {
                if (this.$router.history.current.fullPath != "/compinfo/business") {
                    this.$router.push({ path: '/compinfo/business' });
                    this.$router.go(1);
                }
            } else if (this.step >= 4) {

                if (this.$router.history.current.fullPath != "/compinfo/pandect") {
                    this.$router.push({ path: '/compinfo/pandect' });
                    this.$router.go(1);
                }

            }
        },

        closeDialog() {
            this.dialogVisible = true;
        },

        requestSignOut() {

            let handler = this;
            signOut(function(ret) {
                // console.log("success=" + data);
                handler.responseSignOut(ret);
            });
        },

        responseSignOut(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {

                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.$router.replace({
                    path: '/signin'
                });
                setToken('');
                return;
            }
        },

        requestStepsInfo() {
            let handler = this;
            infoSteps(function(ret) {
                // console.log("success=" + data);
                handler.responseStepsInfo(ret);
            });
        },

        responseStepsInfo(ret) {
            let response='';
            let currToken = getToken();
            if(currToken==null || currToken==''){
                response = responseResult(this, ret,1);
            }else{
                response = responseResult(this, ret);
            }

            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                if (ret.retData.step != 6) {
                    if (this.isShowSteps && this.isShowSteps == true) {
                        // this.callbackPage(ret.retData.step);
                        this.openSteps(ret.retData.step);
                    }
                }
                this.step = ret.retData.step;
                return;
            }
        },

        openSteps(step) {
            let message = '您企业的信息还未完善';
            let buttonText = '去完善';
            if (step == 5) { message = '您的企业信息正在审核中';
                buttonText = '去查看'; }
            if (step == 7) { message = '您的企业信息审核不通过';
                buttonText = '去查看'; }
            this.$alert(message, '认证信息', {
                confirmButtonText: buttonText,
                showClose: false,
                center: true,
                callback: action => {
                    if (step == 0) {
                        this.$router.push({ path: '/compinfo/base' });
                    } else if (step == 1) {
                        this.$router.push({ path: '/compinfo/enterprise' });
                    } else if (step == 2) {
                        this.$router.push({ path: '/compinfo/shareholder' });
                    } else if (step == 3) {
                        this.$router.push({ path: '/compinfo/business' });
                    } else if (step >= 4) {
                        this.$router.push({ path: '/compinfo/pandect' });
                    }
                    this.$router.go(1);
                }
            });
        },

        callbackPage(step) {
            try {
                this.$emit('callbackPage', [step]);
            } catch (e) {

            }

        },

    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-container {
    display: flex;
}

.logo-icon {
    flex: 3;
    padding-left: 30px;
}

.logo-icon img {
    height: 40px;
    margin-top: 10px
}

.logo-icon span{font-size: 30px;color:#333;}

.account {
    flex: 9;
    text-align: right;
    padding-right: 30px;
    font-size: 16px;
}

.el-dropdown {
    width: 100px;
    display: inline-block;
    max-width: 100%;
    white-space: nowrap;
    word-break: keep-all;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}

.el-message-box__headerbtn {
    display: none!important;
}
</style>