<template>
    <el-container>
        <el-header>
            <header-top :isLogin="isLogin"></header-top>
        </el-header>
        <div class="main-container">
            <div class="register-div">
                <div class="register-title">注册您的外汇账户</div>
                <div class="register-content">
                    <div class="flex-div">
                        <div class="icon">
                            <i class="el-icon-message" style="font-size:50px;color:#409EFF"></i>
                        </div>
                        <div class="content">
                            <p style="color:#000000">感谢您的注册，确认邮件已发送至您的注册邮箱：{{email}}</p>
                            <p style="color:#999999">请进入邮箱点击邮件中的链接，即可快速注册外汇账号</p>
                        </div>
                    </div>
                    <div class="flex-div">
                        <div class="icon">
                            
                        </div>
                        <div class="content">
                            <div class="question">
                                <p style="color:#999999">没有收到邮件?</p>
                                <p>1、请检查邮箱地址是否正确</p>
                                <p>2、检查您的邮件垃圾箱</p>
                                <p>3、若仍未收到激活邮件，请尝试 <span style="color:#409EFF" @click="requestSendEmail">重新发送</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <simple-dialog :dialogVisible="dialogVisible" :dialogMsg="dialogMsg" @clickDialog="clickDialog" v-if="dialogVisible==true"></simple-dialog>
    </el-container>
</template>
<script>
import headerTop from '../../components/headerTop'
import leftAside from '../../components/leftAside'
import simpleDialog from '../../components/simpleDialog'
import { setToken } from '../../store/store'
import {
    sendEmail
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
        var checkEmail = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入邮箱'));
            }
            callback();
        };
        return {
            isLogin: false,
            fullscreenLoading: false,
            dialogMsg: '', //对话框内容
            dialogVisible: false, //对话框是否显示
            isLoading: false, //是否是登录中
            loginDesc: '立即注册',
            email: '', //注册邮箱
        };
    },
    created() {
        this.email = this.$route.query.email;
    },
    watch: {
        isLoading: function(value) {
            if (this.isLoading == true) {
                this.loginDesc = "注册中";
            } else {
                this.loginDesc = "立即注册";
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.requestSendEmail();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        //发送注册信息
        requestSendEmail() {

            // this.fullscreenLoading = true;
            this.isLoading = true;
            let handler = this;
            sendEmail(this.email, function(ret) {
                // console.log("success=" + data);
                handler.response(ret);
            });
        },

        response(ret) {
            this.isLoading = false;
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.dialogVisible = true;
                this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.dialogVisible = true;
                this.dialogMsg = "已经发送到您的邮箱，请注意查收！";
                return;
            }
        },
        showNoticeDialog(title, message) {
            const h = this.$createElement;

            this.$notify({
                title: title,
                message: h('i', { style: 'color: teal' }, message),
                duration: 6000,
                offset: 100,
                type: 'success'

            });
        },

        clickDialog() {
            this.dialogVisible = false;
        }

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register-div {
    width: 800px;
    margin: auto;
    margin-top: 100px;
    padding: 40px 0px 30px 0px;
    background-color: rgba(255, 255, 255, .6);
}

.register-title {
    margin-bottom: 60px;
    text-align: center;
    font-size: 22px;
    color: #409EFF;
}

.register-content {
    width: 100%;
    margin: auto;
    text-align: left;
    padding-left: 60px;
}

.flex-div {
    display: flex;
    width: 100%
}

.flex-div .icon {
    flex: 1;
    width: 40px;
    padding-top: 10px;
}

.flex-div .content {
    flex: 12
}

.flex-div .content p {
    line-height: 10px
}

.question {
    margin-top: 60px;
}

.question span {
    cursor: pointer;
}
</style>