<template>
    <section class="main-div">
        <div class="main-container">
             
            <div class="login-div">
               <p style="text-align: center;color:#00BCF1;font-size: 40px;margin-bottom: 30px">OceanWallex</p>
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <div style="padding-right: 60px">
                    <el-form-item label="Your email" prop="email">
                        <el-input v-model="ruleForm2.email" placeholder="test@gmail.com"></el-input>
                    </el-form-item>
                    <el-form-item label="Password" prop="pass">
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="password"></el-input>
                    </el-form-item>
                </div>
                        <el-button type="primary" @click="submitForm('ruleForm2')" class="full-button" v-loading.fullscreen.lock="fullscreenLoading" :loading="isLoading" style="width: 200px;margin:auto;margin-bottom: 30px;background-color:#00BCF1;border-color:#00BCF1">{{loginDesc}}</el-button>
                </el-form>
            </div>
        </div>
        <simple-dialog :dialogVisible="dialogVisible" :dialogMsg="dialogMsg" @clickDialog="clickDialog" v-if="dialogVisible==true"></simple-dialog>
    </section>
</template>
<script>
import headerTop from '../../components/headerTop'
import leftAside from '../../components/leftAside'
import simpleDialog from '../../components/simpleDialog'
import { setToken } from '../../store/store'
import {
    accountLogin
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
                return callback(new Error('email is required'));
            }
            callback();
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('password is required'));
            } else {
                callback();
            }
        };
        return {
            ruleForm2: {
                pass: '',
                email: ''
            },
            rules2: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                email: [
                    { validator: checkEmail, trigger: 'blur' }
                ]
            },
            isLogin: false,
            fullscreenLoading: false,
            dialogMsg: '', //对话框内容
            dialogVisible: false, //对话框是否显示
            isLoading: false, //是否是登录中
            loginDesc: 'Login'
        };
    },
    watch: {
        isLoading: function(value) {
            if (this.isLoading == true) {
                this.loginDesc = "Logining";
            } else {
                this.loginDesc = "Login";
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.requestLogin();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        //发送登录信息
        requestLogin() {

            //用户名登录
            // this.fullscreenLoading = true;
            this.isLoading = true;
            let handler = this;
            accountLogin(this.ruleForm2.email, this.ruleForm2.pass, function(ret) {
                // console.log("success=" + data);
                handler.response(ret);
            });
        },

        response(ret) {
            this.isLoading = false;
            let response = responseResult(this, ret, 2, 2);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.dialogVisible = true;
                this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.$router.replace({
                    path: '/account'
                });
                this.showNoticeDialog('提示', '登录成功');
                setToken(ret.retData.token);
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

.main-div{
    background:url(https://ohfz8un5b.qnssl.com/image/fx/index_banner37.jpg);
    padding-top: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    height: 1113px;
    width: 100%;
}
.main-container{
    background: rgba(0, 0, 0, 0.3);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
    height: 1113px;
    width: 100%;
    padding-top:200px; 
}
.login-div {
    width: 400px;
    margin: auto;
    /*margin-top: 200px;*/
    padding: 30px 0px 30px 0px;
    background-color: #F9FAFC;
}

.menu-link {
    text-decoration: none!important;
    color: #333333;
}
</style>