<template>
    <el-container>
        <el-header>
            <header-top :isShowSteps="true" @callbackPage="callbackPage"></header-top>
        </el-header>
        <el-container class="super-main">
            <el-aside>
                <left-aside :activeItem="activeItem"></left-aside>
            </el-aside>
            <el-main>
                <el-row>
                    <el-col :span="12">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span style="color:#409EFF">请填写充值信息</span>
                            </div>
                            <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" style="width: 500px">
                                <el-form-item label="充值币种" prop="currencyType">
                                    <el-radio-group v-model="ruleForm.currencyType" @change="changeCurrency()">
                                        <el-radio-button v-for="(item, index) in currencyList" :key="index" :label="item.id">{{item.currencyName}}</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="充值金额" prop="amtE2">
                                    <el-input placeholder="请输入充值金额" v-model="ruleForm.amtE2" style="width: 220px">
                                        <template slot="prepend">{{currencyName}}</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="出款银行" prop="outBankId">
                                    <el-radio-group v-model="ruleForm.outBankId">
                                        <el-radio-button v-for="(item, index) in outBankList" :key="index" :label="item.bankId">{{item.bankName}}</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="入款银行" prop="inBankId">
                                    <el-radio-group v-model="ruleForm.inBankId" @change="changeInBank()">
                                        <el-radio-button v-for="(item, index) in inBankList" :key="index" :label="item.id">{{item.bankName}}</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="入款账户" prop="inAccount">
                                    <el-button type="primary" v-model="ruleForm.inAccount">{{ruleForm.inAccount}}</el-button>
                                </el-form-item>
                                <el-form-item label="相关交易" prop="tradeType">
                                    <el-select v-model="ruleForm.tradeType" placeholder="请选择">
                                        <el-option label="请选择" value=""></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">确定充值</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </el-col>
                    <el-col :span="12"></el-col>
                </el-row>
                <el-card class="box-card" style="margin-top: 10px">
                    <div slot="header" class="clearfix">
                        <span>充值记录-显示过去五个工作日</span>
                        <el-tooltip class="item" effect="dark" placement="right">
                            <div slot="content">未处理：信息已提交。
                                <br/>
                                <br/>已通过：确认资金到达并核实入账。
                                <br/>
                                <br/>已驳回：到帐资金金额与提交金额不符。
                                <br/>
                                <br/>最终入账金额按银行扣除入账手续费后的金额为准</div>
                            <i class="el-icon-question" style="cursor: pointer;font-size: 20px"></i>
                        </el-tooltip>
                    </div>
                    <el-table :data="tableData" style="width: 100%" :row-key="getRowKeys" :expand-row-keys="expands" @current-change="toggleRowExpansion" border>
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="通知编号">
                                        <span>{{ props.row.tradeNo }}</span>
                                    </el-form-item>
                                    <el-form-item label="出款银行">
                                        <span>{{ props.row.outBankName }}</span>
                                    </el-form-item>
                                    <el-form-item label="入款银行">
                                        <span>{{ props.row.inBankName }}</span>
                                    </el-form-item>
                                    <el-form-item label="充值币种">
                                        <span>{{ props.row.currencyName }}</span>
                                    </el-form-item>
                                    <el-form-item label="充值金额">
                                        <span>{{ props.row.amtE2 }}</span>
                                    </el-form-item>
                                    <el-form-item label="实际充值金额">
                                        <span>{{ props.row.actAmtE2 }}</span>
                                    </el-form-item>
                                    <el-form-item label="状态">
                                        <span>{{ props.row.stateDesc }}</span>
                                    </el-form-item>
                                    <el-form-item label="提交日期">
                                        <span>{{ props.row.createTime }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column label="通知编号" prop="tradeNo">
                        </el-table-column>
                        <el-table-column label="出款银行" prop="outBankName">
                        </el-table-column>
                        <el-table-column label="入款银行" prop="inBankName">
                        </el-table-column>
                        <el-table-column label="充值币种" prop="currencyName">
                        </el-table-column>
                        <el-table-column label="充值金额" prop="amtE2">
                        </el-table-column>
                        <el-table-column label="实际充值金额" prop="actAmtE2">
                        </el-table-column>
                        <el-table-column label="状态" prop="stateDesc">
                        </el-table-column>
                        <el-table-column label="提交日期" prop="createTime">
                        </el-table-column>
                    </el-table>
                    <div style="text-align: center;margin-top: 10px" v-show="totalAccount>0">
                        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="5" layout="total, prev, pager, next" :total="totalAccount">
                        </el-pagination>
                    </div>
                </el-card>
            </el-main>
        </el-container>
        <!-- 新增出款银行 -->
        <el-dialog title="新增出款银行" :visible.sync="dialogFormVisible" width="600px" :close-on-click-modal="false" :show-close="false" v-if="requestFlag==true">
            <el-form :model="bankForm" :rules="bankRules" ref="bankForm">
                <el-form-item label="银行代码" :label-width="formLabelWidth" prop="bankCode">
                    <el-input v-model="bankForm.bankCode" auto-complete="off" placeholder="请输入您的银行代码"></el-input>
                </el-form-item>
                <el-form-item label="银行名称" :label-width="formLabelWidth" prop="bankName">
                    <el-input v-model="bankForm.bankName" auto-complete="off" placeholder="请输入您的银行名称"></el-input>
                </el-form-item>
                <el-form-item label="账户名称" :label-width="formLabelWidth" prop="accountName">
                    <el-input v-model="bankForm.accountName" auto-complete="off" placeholder="请输入您的账户名称"></el-input>
                </el-form-item>
                <el-form-item label="银行账号" :label-width="formLabelWidth" prop="accountNo">
                    <el-input v-model="bankForm.accountNo" auto-complete="off" placeholder="请输入您的银行账号"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitBankForm('bankForm')" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
            </div>
        </el-dialog>
        <simple-dialog :dialogVisible="dialogVisible" :dialogMsg="dialogMsg" @clickDialog="clickDialog" v-if="dialogVisible==true"></simple-dialog>
    </el-container>
</template>
<script>
import headerTop from '../../components/headerTop'
import leftAside from '../../components/leftAside'
import simpleDialog from '../../components/simpleDialog'
import {
    addCharge,
    currencyList,
    chargeUserfulBankList,
    chargeList,
    inBankList,
    chargeAddBank
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
            requestFlag: false,
            activeItem: 'charge',
            fullscreenLoading: false,
            dialogMsg: '', //对话框内容
            dialogVisible: false, //对话框是否显示
            dialogFormVisible: false,
            formLabelWidth: '80px',
            benShowType0: 'primary',
            benShowType1: 'info',
            swiftDesc: 'SWIFT',
            currencyList: [],
            currencyName: '',
            outBankList: [],
            inBankList: [],
            tableData: [],
            currentPage: 1,
            totalAccount: 0,
            perPage: 5,
            expands: [],
            getRowKeys(row) {
                return row.addId;
            },
            ruleForm: {
                relatedId: '',
                outBankId: '1',
                inBankId: '1',
                inAccount: '',
                currencyType: '1',
                amtE2: '',
                tradeType: '',
            },
            rules: {
                outBankId: [
                    { required: true, message: '请选择出款银行', trigger: 'blur' },
                ],
                inBankId: [
                    { required: true, message: '入款银行不能为空', trigger: 'blur' },
                ],
                inAccount: [
                    { required: true, message: '入款账户不能为空', trigger: 'blur' },
                ],
                currencyType: [
                    { required: true, message: '充值币种不能为空', trigger: 'blur' },
                ],
                amtE2: [
                    { required: true, message: '充值金额不能为空', trigger: 'blur' },
                ],
                tradeType: [
                    { required: false, message: '', trigger: 'blur' },
                ],
            },
            bankForm: {
                bankCode: '',
                bankName: '',
                accountName: '',
                accountNo: '',
            },
            bankRules: {
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
        this.requestCurrencyList();
    },
    watch: {

    },
    methods: {
        toggleRowExpansion(row) {
            this.expands = [];
            this.expands.push(row.addId);
        },

        changeInBank() {
            for (let i = 0; i < this.inBankList.length; i++) {
                if (this.inBankList[i].id == this.ruleForm.inBankId) {
                    this.ruleForm.inAccount = this.inBankList[i].accountName;
                }
            }
        },

        handleCurrentChange(val) {
            this.currentPage = val;
            this.requestChargeList(this.currentPage, this.perPage);
        },

        //入款银行列表
        requestInBankList() {

            let handler = this;
            inBankList(function(ret) {
                handler.responseInBankList(ret);
            });
        },

        responseInBankList(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                // this.bankListData = ret.retData.
                this.inBankList = ret.retData;
                this.changeInBank();
                return;
            }
        },


        //出款银行列表
        requestBankList() {

            let handler = this;
            chargeUserfulBankList(function(ret) {
                handler.responseBankList(ret);
            });
        },

        responseBankList(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                // this.bankListData = ret.retData.
                this.outBankList = ret.retData.data;
                if (this.outBankList == null || this.outBankList == '' || this.outBankList.length == 0) {
                    this.dialogFormVisible = true;

                } else {
                    this.ruleForm.outBankId = this.outBankList[0].bankId;
                }
                return;
            }
        },

        //充值记录列表
        requestChargeList() {

            let handler = this;
            chargeList(this.currentPage, this.perPage, function(ret) {
                handler.responseChargeList(ret);
            });
        },

        responseChargeList(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                // this.bankListData = ret.retData.
                this.tableData = ret.retData.data;
                this.totalAccount = parseInt(ret.retData.count);
                return;
            }
        },

        changeCurrency() {
            for (let i = 0; i < this.currencyList.length; i++) {
                if (this.currencyList[i].id == this.ruleForm.currencyType) {
                    this.currencyName = this.currencyList[i].currencyName;
                }
            }
        },

        requestCurrencyList() {
            let handler = this;
            currencyList(function(ret) {
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
                this.currencyList = ret.retData;
                this.ruleForm.currencyType = this.currencyList[0].id;
                this.changeCurrency();
                this.requestChargeList();
                this.requestInBankList();
                this.requestBankList();
                return;
            }
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.requestAddCharge();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        requestAddCharge() {

            //用户名登录
            this.fullscreenLoading = true;
            let handler = this;
            addCharge(this.ruleForm.relatedId, this.ruleForm.amtE2, this.ruleForm.outBankId, this.ruleForm.inBankId, this.ruleForm.inAccount, this.ruleForm.currencyType, this.ruleForm.tradeType,
                function(ret) {
                    // console.log("success=" + data);
                    handler.responseAddCharge(ret);
                });
        },

        responseAddCharge(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret, 2, 2);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.dialogVisible = true;
                this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.fullscreenLoading = false;
                this.ruleForm.amtE2 = "";
                this.ruleForm.currencyType = "1";
                this.showNoticeDialog('提示', '充值提交成功');
                this.requestChargeList();
                return;
            }
        },

        submitBankForm(formName) {

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
            chargeAddBank(this.bankForm.bankCode, this.bankForm.bankName, this.bankForm.accountName, this.bankForm.accountNo,
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

        clickDialog() { this.dialogVisible = false; },

        thousandBitSeparator(num) {
            return num && (num
                .toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
                    return $1 + ",";
                }) : num.toString().replace(/(\d)(?=(\d{3}))/g, function($0, $1) {
                    return $1 + ",";
                }));
        },
        //页面头部的信息
        callbackPage(data) {
            if (data[0] >= 5) {
                this.requestFlag = true;
            } else {
                this.requestFlag = false;
            }
        },
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>