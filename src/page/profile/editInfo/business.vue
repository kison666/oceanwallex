<template>
    <el-container>
        <el-header>
            <header-top ></header-top>
        </el-header>
        <el-container class="super-main">
            <el-aside>
                <left-aside :activeItem="activeItem"></left-aside>
            </el-aside>
            <el-main>
                <el-card class="box-card" style="min-height: 560px">
                    <top-steps :stepActive="stepActive"></top-steps>
                    <div class="form-div">
                        <div class="title">业务信息</div>
                        <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm">
                            <el-form-item label="购买的商品或者服务" prop="pName">
                                <el-input v-model="ruleForm.pName" placeholder="请输入您购买的商品或者服务" style="max-width: 320px"></el-input>
                            </el-form-item>
                            <el-form-item label="付款国家" prop="payCountry">
                                <el-input v-model="ruleForm.payCountry" placeholder="请输入付款国家" style="max-width: 320px"></el-input>
                            </el-form-item>
                            <el-form-item label="付款币种" prop="payCurrency">
                                <el-input v-model="ruleForm.payCurrency" placeholder="请输入付款币种" style="max-width: 320px"></el-input>
                            </el-form-item>
                            <el-form-item label="预估月付款额(美金)" prop="amtE2">
                                <el-input v-model.number="ruleForm.amtE2" placeholder="请输入预估月付款额(美金)" style="max-width: 320px">
                                    <template slot="append"> 万</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">确&nbsp;&nbsp;&nbsp;定</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import headerTop from '../../../components/headerTop'
import leftAside from '../../../components/leftAside'
import topSteps from '../../../components/topSteps'
import {
    complementInfoBusiness,
    infoBusiness,
    editBusiness
} from '../../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_DATA,
    responsePassword,
} from '../../../config/response'
export default {
    components: {
        leftAside,
        headerTop,
        topSteps
    },
    data() {
        return {
            fullscreenLoading: false,
            activeItem: '22',
            accountData: '',
            stepActive: 3,
            imageUrl: '',
            ruleForm: {
                id:'',
                bType: '0',
                amtE2: '',
                pName: '',
                payCountry: '',
                payCurrency: ''
            },
            rules: {
                amtE2: [
                    { required: true, message: '请输入预估月付款额(美金)', trigger: 'blur' },
                    { type: 'number', message: '月付款金额必须为数字值' }
                ],
                pName: [
                    { required: true, message: '请输入购买的商品或服务', trigger: 'blur' },
                ],
                payCountry: [
                    { required: true, message: '请输入付款国家', trigger: 'blur' },
                ],
                payCurrency: [
                    { required: true, message: '请输入付款币种', trigger: 'blur' },
                ],
            },
        }
    },
    created() {
          this.requestBusinessInfo();
    },
    watch: {

    },
    methods: {

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.requestComplementInfo();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        requestComplementInfo() {
            this.fullscreenLoading = true;
            let handler = this;
            this.ruleForm.amtE2 = this.ruleForm.amtE2 * 10000;
            console.log(this.ruleForm);
            editBusiness(this.ruleForm, function(ret) {
                // console.log("success=" + data);
                handler.responseComplementInfo(ret);
            });
        },

        responseComplementInfo(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret);
            this.ruleForm.amtE2 = this.ruleForm.amtE2 / 10000;
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.$router.replace({
                    path: '/compinfo/pandect'
                });
                return;
            }
        },

        requestBusinessInfo() {
            let handler = this;
            infoBusiness(function(ret) {
                // console.log("success=" + data);
                handler.responseBusinessInfo(ret);
            });
        },

        responseBusinessInfo(ret) {
            let response = responseResult(this, ret,1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                let tmpData = ret.retData;
                this.ruleForm.amtE2 = tmpData.amtE2 /10000;
                this.ruleForm.pName = tmpData.pName;
                this.ruleForm.payCountry = tmpData.payCountry;
                this.ruleForm.payCurrency = tmpData.payCurrency;
                this.ruleForm.id = tmpData.id;
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

.form-div {
    margin-top: 20px
}

.form-div .title {
    margin-bottom: 20px
}

.upload-container {
    width: 200px;
    height: 150px;
    position: relative;
}

.upload-container .oppsite-upload,
.upload-container .front-upload {
    display: block;
    position: absolute;
    opacity: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.upload-container .file-img {
    width: 100%;
    height: 100%;
    text-align: center;
}

.upload-container .file-img img {
    height: 100%;
}

.el-form-item__content {
    line-height: 20px
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    /*border-radius: 6px;*/
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 150px;
    line-height: 150px;
    text-align: center;
}

.avatar {
    width: 200px;
    height: 150px;
    display: block;
}
</style>