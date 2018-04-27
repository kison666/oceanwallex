<template>
    <el-container>
        <el-header>
            <header-top :isLogin="isLogin"></header-top>
        </el-header>
        <div class="main-container">
            <div class="register-div">
                <div class="register-title">注册您的外汇账户</div>
                <div class="register-content">
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="邮箱" prop="email" placeholder="请输入注册邮箱">
                            <el-input v-model="ruleForm2.email"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm2')" class="full-button" v-loading.fullscreen.lock="fullscreenLoading" :loading="isLoading">{{loginDesc}}</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <simple-dialog :dialogVisible="dialogVisible" :dialogMsg="dialogMsg" @clickDialog="clickDialog"></simple-dialog>
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
            ruleForm2: {
                email: ''
            },
            rules2: {
                email: [
                    { validator: checkEmail, trigger: 'blur' }
                ]
            },
            isLogin: false,
            fullscreenLoading: false,
            dialogMsg: '', //对话框内容
            dialogVisible: false, //对话框是否显示
            isLoading: false, //是否是登录中
            loginDesc: '立即注册'
        };
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
            sendEmail(this.ruleForm2.email, function(ret) {
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
                // this.$router.replace({
                //     path: '/account'
                // });
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
    padding: 40px 60px 30px 0px;
    background-color: rgba(255, 255, 255, .6);
}

.register-title {
    margin-bottom: 60px;
    text-align: center;
    font-size: 22px;
    color:#409EFF;
}
.register-content{width: 450px;margin: auto;}
</style>