<template>
    <el-container>
        <el-header>
            <header-top :isLogin="isLogin"></header-top>
        </el-header>
        <div class="main-container">
            <div class="register-div">
                <div class="register-title">注册您的外汇账户</div>
                <div class="register-content">
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="left" style="width: 100%">
                        <el-form-item label="登录邮箱" prop="email" placeholder="请输入注册邮箱">
                            <el-input v-model="ruleForm2.email" disabled style="width: 50%"></el-input>
                        </el-form-item>
                        <div class="split-line"></div>
                        <div class="form-title">密码</div>
                        <el-form-item label="登录密码" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入6-16位数字和字母组合的密码" style="width: 50%"></el-input>
                        </el-form-item>
                        <el-form-item label="密码确认" prop="rePass">
                            <el-input type="password" v-model="ruleForm2.rePass" auto-complete="off" placeholder="请再次输入密码" style="width: 50%"></el-input>
                        </el-form-item>
                        <div class="split-line"></div>
                        <div class="form-title">联系信息</div>
                        </el-form-item>
                        <el-form-item label="姓名" prop="name">
                            <el-input style="width: 50%" v-model="ruleForm2.name" auto-complete="off" placeholder="请输入您的姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="mobile">
                            <el-input style="width: 50%" placeholder="请输入手机号码" v-model="ruleForm2.mobile" class="input-with-select">
                                <el-select v-model="ruleForm2.preFixMobile" slot="prepend" placeholder="请选择" style="width: 140px">
                                    <el-option label="中国大陆 +86" value="1"></el-option>
                                </el-select>
                            </el-input>
                            <el-button :type="codeButtonType" @click="getVerifyCode" style="width: 120px">{{codeButtonDesc}}</el-button>
                        </el-form-item>
                        <el-form-item label="验证码" prop="token">
                            <el-input v-model="ruleForm2.token" placeholder="请输入验证码" style="width: 50%"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm2')" class="full-button" v-loading.fullscreen.lock="fullscreenLoading" :loading="isLoading" style="width: 50%">{{loginDesc}}</el-button>
                        </el-form-item>
                    </el-form>
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
    sendEmail,
    mobileCode,
    register
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
                return callback(new Error('请输入登录邮箱'));
            }
            callback();
        };
        var checkpass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入登录密码'));
            }
            if (value.length<6 || value.length>16) {
                return callback(new Error('请输入6-16位数字和字母组合的密码'));
            }
            callback();
        };
        var checkRePass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入确认密码'));
            } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
            callback();
        };
        var checkName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入姓名'));
            }
            callback();
        };
        var checkMobile = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入手机号码'));
            }
            callback();
        };
        var checkToken = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入验证码'));
            }
            callback();
        };
        return {
            labelPostion: 'left',
            ruleForm2: {
                email: '',
                pass: '',
                rePass: '',
                preFixMobile: '1',
                name: '',
                mobile: '',
                token: '',
            },
            rules2: {
                pass: [
                    { validator: checkpass, trigger: 'blur' }
                ],
                rePass: [
                    { validator: checkRePass, trigger: 'blur' }
                ],
                name: [
                    { validator: checkName, trigger: 'blur' }
                ],
                mobile: [
                    { validator: checkMobile, trigger: 'blur' }
                ],
                token: [
                    { validator: checkToken, trigger: 'blur' }
                ]
            },
            isLogin: false,
            fullscreenLoading: false,
            dialogMsg: '', //对话框内容
            dialogVisible: false, //对话框是否显示
            isLoading: false, //是否是登录中
            loginDesc: '立即注册',
            codeButtonDesc: '发送验证码',
            codeButtonType: 'primary',
            computedTime: 0,
            timer: '',
        };
    },
    created() {
        this.ruleForm2.email = this.$route.query.email;
    },
    watch: {
        isLoading: function(value) {
            if (this.isLoading == true) {
                this.loginDesc = "注册中";
            } else {
                this.loginDesc = "立即注册";
            }
        },
        computedTime:function(value){
            if(this.computedTime==0){
                this.codeButtonDesc = '发送验证码';
                this.codeButtonType='primary';
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.requestRegister();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        //获取验证吗
        getVerifyCode() {

            if (this.ruleForm2.mobile != '' && this.computedTime==0) {

                //获取验证信息
                // this.showWaiting = true;\
                this.computedTime = 60;
                let handler = this;
                this.startHttp = true;
                this.timer = setInterval(() => {
                    this.computedTime--;
                    this.codeButtonDesc = '已发送('+this.computedTime+'s)';
                    this.codeButtonType = 'info';
                    if (this.startHttp == true) {
                        let handler = this;
                        this.startHttp = false;
                        mobileCode(this.ruleForm2.mobile, function(ret) {
                            if (ret.retCode != 0) {
                                handler.dialogVisible = true;
                                if (ret.retMsg != null && ret.retMsg != '') {
                                    handler.dialogMsg = ret.retMsg;
                                } else {
                                    handler.dialogVisible = true;
                                    handler.dialogMsg = "发送短信验证码成功";
                                }
                                handler.computedTime = 0;
                                clearInterval(handler.timer);
                                return;
                            } else {
                                handler.dialogVisible = true;
                                handler.dialogMsg = "发送短信验证码成功";
                            }
                        });
                    }
                    if (this.computedTime == 0) {
                        clearInterval(this.timer)
                    }
                }, 1000);

            }
            if(this.ruleForm2.mobile == '' && this.computedTime==0) {
                this.dialogVisible = true;
                this.dialogMsg = "请输入手机号码";
            } 
        },

        //发送注册信息
        requestRegister() {

            // this.fullscreenLoading = true;
            this.isLoading = true;
            let handler = this;
            register(this.ruleForm2.email,this.ruleForm2.mobile,this.ruleForm2.token,this.ruleForm2.name,this.ruleForm2.pass,this.ruleForm2.rePass, function(ret) {
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
                this.$router.replace({
                    path: '/signin'
                });
                this.showNoticeDialog('提示', '注册成功，请登录');
                return;
            }
        },
        showNoticeDialog(title, message) {
            const h = this.$createElement;

            this.$notify({
                title: title,
                message: h('i', { style: 'color: teal' }, message),
                duration: 4000,
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
    margin-top: 30px;
    padding: 40px 60px 30px 0px;
    background-color: rgba(255, 255, 255, .6);
}

.register-title {
    margin-bottom: 20px;
    text-align: center;
    font-size: 22px;
    color: #409EFF;
}

.register-content {
    width: 100%;
    margin: auto;
    padding: 30px 60px;
    text-align: left;
}
.split-line{height: 1px; background-color:#eeeeee;width: 90%;margin-top: 20px;margin-bottom: 20px}
.form-title{color:#999999;margin-bottom: 20px}
</style>