<template>
    <el-container>
        <el-header>
            <header-top :isLogin="isLogin"></header-top>
        </el-header>
        <div class="main-container" style="min-height: 950px">
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
    emailActive
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
            isLogin: false,
            fullscreenLoading: false,
            dialogMsg: '', //对话框内容
            dialogVisible: false, //对话框是否显示
            loginDesc: '立即登录',
            email: '',
            token: '',
        };
    },
    created() {
        this.email = this.$route.query.email;
   
        this.token = this.$route.query.token;

        this.requestActive();
    },

    methods: {

        //发送登录信息
        requestActive() {
            if (this.email == '') {
                this.dialogVisible = true;
                this.dialogMsg = "参数错误";
                return;
            }
            if (this.token == '') {
                this.dialogVisible = true;
                this.dialogMsg = "参数错误";
                return;
            }
            let handler = this;
            emailActive(this.token, this.email, function(ret) {
                // console.log("success=" + data);
                handler.response(ret);
            });
        },

        response(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.dialogVisible = true;
                this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.$router.replace({
                    path: '/signup',
                    query: { email: this.email }
                });
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
.login-div {
    width: 400px;
    margin: auto;
    margin-top: 200px;
    padding: 60px 60px 30px 0px;
    background-color: rgba(255, 255, 255, .6);
}
</style>