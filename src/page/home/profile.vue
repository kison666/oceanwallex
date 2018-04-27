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
                <el-card class="box-card" style="min-height: 480px">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;font-size: 18px">银行账户</span>
                        <el-button style="float: right; padding: 9px 15px" type="primary" @click="dialogFormVisible = true">添加出款银行</el-button>
                    </div>
                    <el-row>
                        <el-col :span="2" class="item-title">出款银行</el-col>
                        <el-col :span="22">
                            <el-table :data="tableData" border style="width: 100%">
                                <el-table-column prop="accountNo" label="银行账号">
                                </el-table-column>
                                <el-table-column prop="bankCode" label="银行名称">
                                </el-table-column>
                                <el-table-column prop="bankName" label="银行全称">
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 20px">
                        <el-col :span="2" class="item-title">入款银行</el-col>
                        <el-col :span="22">
                            <el-table :data="inBankData" border style="width: 100%">
                                <el-table-column prop="bankName" label="银行名称">
                                </el-table-column>
                                <el-table-column prop="accountName" label="银行账户名">
                                </el-table-column>
                                <el-table-column prop="accountNo" label="银行账号">
                                </el-table-column>
                                <el-table-column prop="currencyName" label="币种">
                                </el-table-column>
                                <el-table-column prop="swiftCode" label="SWIFT CODE">
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </el-card>
            </el-main>
        </el-container>
        <!-- 新增出款银行 -->
        <el-dialog title="新增出款银行" :visible.sync="dialogFormVisible" width="600px">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="银行代码" :label-width="formLabelWidth" prop="bankCode">
                    <el-input v-model="form.bankCode" auto-complete="off" placeholder="请输入您的银行代码"></el-input>
                </el-form-item>
                <el-form-item label="银行名称" :label-width="formLabelWidth" prop="bankName">
                    <el-input v-model="form.bankName" auto-complete="off" placeholder="请输入您的银行名称"></el-input>
                </el-form-item>
                <el-form-item label="账户名称" :label-width="formLabelWidth" prop="accountName">
                    <el-input v-model="form.accountName" auto-complete="off" placeholder="请输入您的账户名称"></el-input>
                </el-form-item>
                <el-form-item label="银行账号" :label-width="formLabelWidth" prop="accountNo">
                    <el-input v-model="form.accountNo" auto-complete="off" placeholder="请输入您的银行账号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
            </div>
        </el-dialog>
        <simple-dialog :dialogVisible="dialogVisible" :dialogMsg="dialogMsg" @clickDialog="clickDialog" v-if="dialogVisible==true"></simple-dialog>
    </el-container>
</template>
<script>
import headerTop from '../../components/headerTop'
import simpleDialog from '../../components/simpleDialog'
import leftAside from '../../components/leftAside'
import {
    chargeBankList,
    chargeAddBank,
    inBankList
} from '../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_DATA,
    responsePassword,
} from '../../config/response'
export default {
    components: {
        headerTop,
        simpleDialog,
        leftAside
    },
    data() {
        return {
            fullscreenLoading: false,
            dialogMsg: '', //对话框内容
            dialogVisible: false, //对话框是否显示
            activeItem: '',
            dialogFormVisible: false,
            formLabelWidth: '80px',
            bankListData: [],
            tableData: [],
            inBankData: [],
            form: {
                bankCode: '',
                bankName: '',
                accountName: '',
                accountNo: '',
            },
            rules: {
                bankCode: [
                    { required: true, message: '银行代码不能为空', trigger: 'blur' },
                ],
                bankName: [
                    { required: true, message: '银行名称不能为空', trigger: 'blur' },
                ],
                accountName: [
                    { required: true, message: '账户名称不能为空', trigger: 'blur' },
                ],
                accountNo: [
                    { required: true, message: '银行账号不能为空', trigger: 'blur' },
                ],
            }
        }
    },
    created() {
        this.requestBankList();
        this.requestInBankList();
    },
    methods: {

        //入款银行列表
        requestInBankList() {

            let handler = this;
            inBankList(function(ret) {
                handler.responseInBankList(ret);
            });
        },

        responseInBankList(ret) {
            let response = responseResult(this, ret,1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                // this.bankListData = ret.retData.
                this.inBankData = ret.retData;
                return;
            }
        },

        //出款银行列表
        requestBankList() {

            let handler = this;
            chargeBankList(function(ret) {
                // console.log("success=" + data);
                handler.responseBankList(ret);
            });
        },

        responseBankList(ret) {
            let response = responseResult(this, ret,1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                // this.bankListData = ret.retData.
                this.tableData = ret.retData.data;
                return;
            }
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.requestAddBankAccount();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },



        //提交请求
        requestAddBankAccount() {

            this.fullscreenLoading = true;
            let handler = this;
            console.log(this.form.bankCode);
            chargeAddBank(this.form.bankCode, this.form.bankName, this.form.accountName, this.form.accountNo,
                function(ret) {
                    // console.log("success=" + data);
                    handler.responseAddBankAccount(ret);
                });
        },

        responseAddBankAccount(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.dialogVisible = true;
                this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.dialogFormVisible = false;
                this.showNoticeDialog('提示', '添加出款银行成功');
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
.item-title {
    flex: 1;
    color: #999999;
}

.no-body-card {
    border-bottom-width: 0px!important;
}
</style>