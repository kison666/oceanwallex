<template>
    <el-container>
        <el-header>
            <header-top></header-top>
        </el-header>
        <el-container class="super-main">
            <el-main>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>添加出款银行账户</span>
                    </div>
                    <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" style="width: 500px">
                        <el-form-item label="受益人类型" prop="benType">
                            <el-button :type="benShowType0" @click="changeBenType('0')">公司自身账户</el-button>
                            <el-button :type="benShowType1" @click="changeBenType('1')">第三方受益人账户</el-button>
                        </el-form-item>
                        <el-form-item label="所在国家" prop="region">
                            <el-select v-model="ruleForm.region" placeholder="请选择" @change="changeRegion(value)">
                                <el-option label="请选择" value=""></el-option>
                                <el-option label="中国大陆" value="1"></el-option>
                                <el-option label="中国香港" value="2"></el-option>
                                <el-option label="亚洲其他地区" value="3"></el-option>
                                <el-option label="欧洲" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="路由方式" prop="swift" v-show="ruleForm.region!='1'">
                            <el-button type="primary" v-model="ruleForm.swift">{{swiftDesc}}</el-button>
                        </el-form-item>
                        <el-form-item label="SWIFT CODE" prop="swiftCode" v-show="ruleForm.region!='1'">
                            <el-input v-model="ruleForm.swiftCode" placeholder="请输入您的SWIFT CODE"></el-input>
                        </el-form-item>
                        <el-form-item label="IBAN" prop="iBan" v-show="ruleForm.region=='4'">
                            <el-input v-model="ruleForm.iBan" placeholder="请输入您的IBAN"></el-input>
                        </el-form-item>
                        <el-form-item label="账户币种" prop="currency">
                            <el-select v-model="ruleForm.currency" placeholder="请选择">
                                <el-option label="请选择" value=""></el-option>
                                <el-option label="美元" value="1"></el-option>
                                <el-option label="人民币" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="受益人别名" prop="nameAlias">
                            <el-input v-model="ruleForm.nameAlias" placeholder="例：公司简称-银行简称-币种"></el-input>
                        </el-form-item>
                        <el-form-item label="银行全名" prop="bankName">
                            <el-input v-model="ruleForm.bankName" placeholder="海外银行建议输入英文全名"></el-input>
                        </el-form-item>
                        <el-form-item label="银行所属省份" prop="bankProvince" v-show="ruleForm.region=='1'">
                            <el-input v-model="ruleForm.bankProvince" placeholder="请输入银行所属省份"></el-input>
                        </el-form-item>
                        <el-form-item label="银行所属城市" prop="bankCity" v-show="ruleForm.region=='1'">
                            <el-input v-model="ruleForm.bankCity" placeholder="请输入银行所属城市"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="mobile" v-show="ruleForm.region=='1'">
                            <el-input v-model="ruleForm.mobile" placeholder="请输入手机号码"></el-input>
                        </el-form-item>
                        <el-form-item label="证件号码" prop="cardId" v-show="ruleForm.region=='1'">
                            <el-input v-model="ruleForm.cardId" placeholder="请输入证件号码"></el-input>
                        </el-form-item>
                        <el-form-item label="公司账号" prop="companyAcc">
                            <el-input v-model="ruleForm.companyAcc" placeholder="请输入公司账号"></el-input>
                        </el-form-item>
                        <el-form-item label="账户全名" prop="accName">
                            <el-input v-model="ruleForm.accName" placeholder="开户使用的公司全名-海外一般为英文"></el-input>
                        </el-form-item>
                        <el-form-item label="受益人地址" prop="benfiAddr" v-show="ruleForm.region!='1'">
                            <el-input v-model="ruleForm.benfiAddr" placeholder="请输入受益人地址"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">确&nbsp;定</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-main>
        </el-container>
        <simple-dialog :dialogVisible="dialogVisible" :dialogMsg="dialogMsg" v-if="dialogVisible==true"></simple-dialog>
    </el-container>
</template>
<script>
import headerTop from '../../components/headerTop'
import leftAside from '../../components/leftAside'
import simpleDialog from '../../components/simpleDialog'
import {
    createBenfiAccount,
    currencyList
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
            benShowType0: 'primary',
            benShowType1: 'info',
            swiftDesc: 'SWIFT',
            ruleForm: {
                benType: '0',
                region: '2',
                swift: 0,
                swiftCode: '',
                iBan: '-',
                currency: '1',
                nameAlias: '',
                bankName: '',
                companyAcc: '',
                benfiAddr: '',
                accName: '',
                remark: '',
                bankProvince: '',
                bankCity: '',
                cardId: '-',
                mobile: '-',
            },
            rules: {
                benType: [
                    { required: true, message: '', trigger: 'blur' },
                ],
                region: [
                    { required: true, message: '请选择所在国家', trigger: 'blur' },
                ],
                swift: [
                    { required: true, message: '', trigger: 'blur' },
                ],
                swiftCode: [
                    { required: true, message: '请输入SWITF CODE', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value.length != 8 && value.length != 11) {
                                callback(new Error("SWIFTCODE必须为8位或者11位的字母或数字"));
                            } else {
                                callback();
                                return true;
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                iBan: [
                    { required: true, message: '请输入IBAN', trigger: 'blur' },
                ],
                currency: [
                    { required: true, message: '请选择账户币种', trigger: 'blur' },
                ],
                nameAlias: [
                    { required: true, message: '请输入受益人别名', trigger: 'blur' },
                ],
                bankName: [
                    { required: true, message: '请输入银行全名', trigger: 'blur' },
                ],
                companyAcc: [
                    { required: true, message: '请输入公司账号', trigger: 'blur' },
                ],
                accName: [
                    { required: true, message: '请输入账号全名', trigger: 'blur' },
                ],
                benfiAddr: [
                    { required: true, message: '请输入受益人地址', trigger: 'blur' },
                ],
                cardId: [
                    { required: true, message: '请输入证件号码', trigger: 'blur' },
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ],
            }
        }
    },
    created() {
        this.requestCurrencyList();
    },
    methods: {
        changeRegion(value) {
            this.ruleForm.cardId = "";
            this.ruleForm.mobile = "";
            this.ruleForm.iBan = "";
            if (this.ruleForm.region == '4') {
                this.swiftDesc = 'IBAN';
                this.ruleForm.swift = 2;
            } else {
                this.swiftDesc = 'SWIFT';
                this.ruleForm.swift = 1;
            }

            if (this.ruleForm.region == '1') {
                this.ruleForm.swiftCode = "--------";
                this.ruleForm.iBan = "-";
                this.ruleForm.benfiAddr = "-";
            } else {
                this.ruleForm.swiftCode = "";
                this.ruleForm.iBan = "";
                this.ruleForm.cardId = "-";
                this.ruleForm.mobile = "-";
            }

            if (this.ruleForm.region != '4') {
                this.ruleForm.iBan = "-";
            }

        },
        changeBenType(type) {
            if (type == '0') {
                this.benShowType0 = "primary";
                this.benShowType1 = "info";
                this.ruleForm.benType = '0';
            } else {
                this.benShowType0 = "info";
                this.benShowType1 = "primary";
                this.ruleForm.benType = '1';
            }
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.requestCreateBenfi();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        requestCurrencyList() {
            currencyList(
                function(ret) {
                    // console.log("success=" + data);
                    handler.responseCurrencyList(ret);
                });
        },

        responseCurrencyList(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret,1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.dialogVisible = true;
                this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {

                return;
            }
        },

        //提交请求
        requestCreateBenfi() {

            //用户名登录
            this.fullscreenLoading = true;
            let handler = this;
            let swift = '';
            let swiftCode = '';
            let iBan = '';
            let bankProvince = '';
            let bankCity = '';
            let cardId = '';
            let benfiAddr = '';
            let mobile = '';
            if (this.ruleForm.region == '1') {
                bankProvince = this.ruleForm.bankProvince;
                bankCity = this.ruleForm.bankCity;
                cardId = this.ruleForm.cardId;
                mobile = this.ruleForm.mobile;
            }

            if (this.ruleForm.region != '1') {
                benfiAddr = this.ruleForm.benfiAddr;
                swift = this.ruleForm.swift;
                swiftCode = this.ruleForm.swiftCode;
            }

            if (this.ruleForm.region == '4') {
                iBan = this.ruleForm.iBan;

            }
            createBenfiAccount(this.ruleForm.benType, this.ruleForm.region, swift, swiftCode, iBan, this.ruleForm.currency, this.ruleForm.nameAlias, this.ruleForm.bankName, this.ruleForm.companyAcc, this.ruleForm.accName, bankProvince, bankCity, cardId, benfiAddr, mobile, this.ruleForm.remark,
                function(ret) {
                    // console.log("success=" + data);
                    handler.responseCreateBenfi(ret);
                });
        },

        responseCreateBenfi(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret, 2, 2);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.dialogVisible = true;
                this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.$router.replace({
                    path: '/beneficiary'
                });
                this.showNoticeDialog('提示', '添加受益人成功');
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
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-form-item__content .el-select {
    width: 100%
}
</style>