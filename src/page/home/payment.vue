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
                <el-row>
                    <el-col :span="13">
                        <el-card class="box-card" style="min-height: 560px">
                            <div slot="header" class="clearfix">
                                <span style="color:#409EFF" v-show="currencyStep==1">1、请填写交易信息</span>
                                <span style="color:#409EFF" v-show="currencyStep!=1">&nbsp;&nbsp;&nbsp;</span>
                            </div>
                            <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 100%">
                                <el-form-item label="卖出币种" prop="outCurrencyType">
                                    <el-radio-group v-model="ruleForm.outCurrencyType" @change="changeOutCurrency()" :disabled="currencyStep!=1">
                                        <el-radio-button v-for="(item, index) in currencyOutList" :key="index" :label="item.currencyCode">{{item.currencyName}}</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="买入币种" prop="inCurrencyType">
                                    <el-radio-group v-model="ruleForm.inCurrencyType" @change="changeInCurrency()" :disabled="currencyStep!=1">
                                        <el-radio-button v-for="(item, index) in currencyInList" :key="index" :label="item.currencyCode">{{item.currencyName}}</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="交易模式" prop="ruleType">
                                    <el-radio-group v-model="ruleForm.ruleType" @change="changeRuleType()" :disabled="currencyStep!=1">
                                        <el-radio-button :label="0">以买入币种为准</el-radio-button>
                                        <el-radio-button :label="1">以卖出币种为准</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="交易金额" prop="soldAmtE2" style="width: 320px">
                                    <el-input placeholder="请输入交易金额" v-model="ruleForm.soldAmtE2" :disabled="currencyStep!=1">
                                        <template slot="prepend">{{currencyName}}</template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="交割日期" prop="tradeDate">
                                    <el-date-picker v-model="ruleForm.tradeDate" type="date" placeholder="选择交割日期" :disabled="currencyStep!=1" style="width:220px;" :picker-options="pickerOptions1">
                                    </el-date-picker>
                                    <el-tooltip class="item" effect="dark" placement="right">
                                        <div slot="content">完成换汇并出款的日期</div>
                                        <i class="el-icon-question" style="cursor: pointer;font-size: 22px;padding-left: 10px;color:#409EFF"></i>
                                    </el-tooltip>
                                </el-form-item>
                                <el-form-item label="受益人" prop="benefitId">
                                    <el-select v-model="ruleForm.benefitId" placeholder="请选择" :disabled="currencyStep!=1" style="margin-right:10px;width:220px;">
                                        <el-option label="请选择" value=""></el-option>
                                        <el-option v-for="(item, index) in benefitListData" :key="index" :label="item.accountName" v-if="item.currencyId==avliBenefiTypeId" :value="item.benefitId"></el-option>
                                    </el-select>
                                    <el-button type="primary" @click="clickBenfiType()" :disabled="currencyStep!=1">{{buttonName}}</el-button>
                                    <el-tooltip class="item" effect="dark" placement="right">
                                        <div slot="content">目前支持分发至中国境内多个企业或个人</div>
                                        <i class="el-icon-question" style="cursor: pointer;font-size: 22px;padding-left: 10px;color:#409EFF"></i>
                                    </el-tooltip>
                                </el-form-item>
                                <el-form-item label="文件" prop="transFile" v-show="buttonName=='我要付款'">
                                    <el-input v-model="ruleForm.transFile" placeholder="请上传您的分发文件" style="width:220px;margin-right: 10px" type="file"></el-input>
                                    <el-button type="primary">下载分发模板</el-button>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading" v-show="currencyStep==1">下一步</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </el-col>
                    <el-col :span="11" style="height: 100%">
                        <el-card class="box-card" v-show="currencyStep==2" style="min-height: 560px">
                            <div slot="header" class="clearfix">
                                <span style="color:#409EFF">2、请确认交易信息</span>
                            </div>
                            <div class="height:100%;background-color:#ffffff;width:100%;">
                                <div class="card-item" style="width: 100%;text-align: center;position: relative;height: 200px">
                                    <el-progress type="circle" :percentage="actualBlueProgress" :stroke-width='progressStrokeWidth' :show-text="false" :width="progressWidth" v-show="progressStatus==''"></el-progress>
                                    <el-progress type="circle" :percentage="actualProgress" :stroke-width='progressStrokeWidth' :show-text="false" :width="progressWidth" :status="progressStatus" v-show="progressStatus=='exception'"></el-progress>
                                    <div class="progress-in">
                                        {{rate.custRate}}
                                    </div>
                                </div>
                                <div class="card-desc">
                                    <div class="detail-item">
                                        <div class="item-title">您支付：</div>
                                        <div class="item-content">{{rate.actPayAmount}}&nbsp;&nbsp;{{ruleForm.outCurrencyType}}</div>
                                    </div>
                                    <div class="detail-item">
                                        <div class="item-title">手续费率(‰)：</div>
                                        <div class="item-content">{{rate.actFee}}</div>
                                    </div>
                                    <div class="detail-item">
                                        <div class="item-title">汇率：</div>
                                        <div class="item-content">{{rate.actRate}}</div>
                                    </div>
                                    <div class="detail-item">
                                        <div class="item-title">您获得：</div>
                                        <div class="item-content">{{rate.actgetAmount}}&nbsp;&nbsp;{{ruleForm.inCurrencyType}}</div>
                                    </div>
                                </div>
                                <div style="width: 100%;text-align: center;margin: 20px auto">
                                    <el-button type="primary" @click="getRateCountDown()" v-show="progressStatus==''">锁定汇率</el-button>
                                    <el-button type="danger" @click="lockingResult('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading" v-show="progressStatus=='exception'">完成并提交</el-button>
                                    <el-button @click="buttonPreStep()">返回修改</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card class="box-card" style="margin-top: 10px">
                    <div slot="header" class="clearfix">
                        <span>交易记录-显示过去五个工作日</span>
                        <el-tooltip class="item" effect="dark" placement="right">
                            <div slot="content">未处理：已提交但未处理。原因可能是节假日和非交易时间。
                                <br/>
                                <br/>已确认：交易已经成交，待交割。
                                <br/>
                                <br/>已完成：交割完成且已经出账。
                            </div>
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
                                    <el-form-item label="买入">
                                        <span>{{ props.row.buyAmtE2 }}</span>
                                    </el-form-item>
                                    <el-form-item label="卖出">
                                        <span>{{ props.row.soldAmtE2 }}</span>
                                    </el-form-item>
                                    <el-form-item label="手续费">
                                        <span>{{ props.row.feeE2 }}</span>
                                    </el-form-item>
                                    <el-form-item label="汇率">
                                        <span>{{ props.row.exRate }}</span>
                                    </el-form-item>
                                    <el-form-item label="状态">
                                        <span>{{ props.row.tradeDesc }}</span>
                                    </el-form-item>
                                    <el-form-item label="提交日期">
                                        <span>{{ props.row.submitDate }}</span>
                                    </el-form-item>
                                    <el-form-item label="交割日期">
                                        <span>{{ props.row.tradeDate }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column prop="tradeNo" label="通知编号">
                        </el-table-column>
                        <el-table-column prop="buyAmtE2" label="买入">
                        </el-table-column>
                        <el-table-column prop="soldAmtE2" label="卖出">
                        </el-table-column>
                        <el-table-column prop="feeE2" label="手续费">
                        </el-table-column>
                        <el-table-column prop="exRate" label="汇率">
                        </el-table-column>
                        <el-table-column prop="tradeDesc" label="状态">
                        </el-table-column>
                        <el-table-column prop="submitDate" label="提交日期">
                        </el-table-column>
                        <el-table-column prop="tradeDate" label="交割日期">
                        </el-table-column>
                    </el-table>
                    <div style="text-align: center;margin-top: 10px" v-show="totalAccount>0">
                        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="5" layout="total, prev, pager, next" :total="totalAccount">
                        </el-pagination>
                    </div>
                </el-card>
            </el-main>
        </el-container>
        <simple-dialog :dialogVisible="dialogVisible" :dialogMsg="dialogMsg" @clickDialog="clickDialog" v-if="dialogVisible==true"></simple-dialog>
    </el-container>
</template>
<script>
import headerTop from '../../components/headerTop'
import leftAside from '../../components/leftAside'
import simpleDialog from '../../components/simpleDialog'
import {
    addPaymentFile,
    addPayment,
    getPaymentRate,
    currencyList,
    chargeBankList,
    paymentList,
    benefitList,
    paymentUsefulAccount,
    paymentCalendar
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
        var validateInCur = (rule, value, callback) => {
            if (value == this.ruleForm.outCurrencyType) {
                callback(new Error('买入卖出的币种不能一样!'));
            } else {
                callback();
            }
        };
        return {
            activeItem: 'payment',
            fullscreenLoading: false,
            dialogMsg: '', //对话框内容
            dialogVisible: false, //对话框是否显示
            benShowType0: 'primary',
            benShowType1: 'info',
            swiftDesc: 'SWIFT',
            currencyOutList: [],
            currencyInList: [],
            currencyName: '',
            outBankList: [],
            benefitListData: [],
            calendarData: [],
            tableData: [],
            currentPage: 1,
            totalAccount: 0,
            perPage: 5,
            avliBenefiType: 'USD',
            avliBenefiTypeId: 1,
            buttonName: '我要分发',
            fileProgress: '上传文件',
            actualProgress: 0, //锁汇进度
            actualBlueProgress: 100, //锁汇进度
            timer: '',
            countDownTimer: '',
            currencyStep: 1, //当前是第几步
            progressStatus: '',
            progressStrokeWidth: 15,
            progressWidth: 170,
            expands: [],
            getRowKeys(row) {
                return row.payId;
            },
            ruleForm: {
                inCurrencyType: 'USD',
                outCurrencyType: 'CNY',
                soldAmtE2: '',
                tradeDate: '',
                benefitId: '',
                ruleType: '1',
                transFile: '',
                payType: '0',

            },
            rate: {
                actPayAmount: '',
                actFee: '',
                actRate: '',
                actgetAmount: '',
                custRate: '',
            },
            rules: {
                inCurrencyType: [
                    { required: true, message: '买入币种不能为空', trigger: 'blur' },
                    { validator: validateInCur, trigger: 'blur' }
                ],
                outCurrencyType: [
                    { required: true, message: '卖出币种不能为空', trigger: 'blur' },
                ],
                soldAmtE2: [
                    { required: true, message: '交易金额不能为空', trigger: 'blur' },
                ],
                tradeDate: [
                    { required: true, message: '交割日期不能为空', trigger: 'blur' },
                ],
                benefitId: [
                    { required: true, message: '请选择受益人', trigger: 'blur' },
                ],
                transFile: [
                    { required: false, message: '请上传您的分发文件', trigger: 'blur' },
                ],
            },
            pickerOptions1: {
                disabledDate: (time) => {

                    return this.getDisabledDate(time);
                }
            },
        }
    },
    created() {
        this.requestCurrencyList();
    },
    methods: {

        toggleRowExpansion(row) {
            this.expands = [];
            this.expands.push(row.payId);
        },

        getDisabledDate(time) {
            let isReturn = true;
            if (this.calendarData.length > 0) {
                for (let i = 0; i < this.calendarData.length; i++) {
                    let dateStr = Date.parse(new Date(this.calendarData[i].replace('-', '/').toString()));
                    if (time.getTime() == dateStr) {
                        return false;
                    }
                }
            }
            return isReturn;
        },

        getRateCountDown() {
            this.progressStatus = 'exception';
            this.actualProgress = 0;
            this.countDownTimer = setInterval(() => {
                this.actualProgress++;
                if (this.actualProgress == 100) {
                    clearInterval(this.countDownTimer);
                    this.progressStatus = '';
                }
            }, 100);
        },

        handleCurrentChange(val) {
            this.currentPage = val;
            this.requestPaymentList(this.currentPage, this.perPage);
        },

        //交易日历
        requestPaymentCalendar() {
            let handler = this;
            paymentCalendar(function(ret) {
                // console.log("success=" + data);
                handler.responsePaymentCalendar(ret);
            });
        },

        responsePaymentCalendar(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.calendarData = ret.retData;
                return;
            }
        },

        //受益人列表
        requestBenfiList() {
            let handler = this;
            paymentUsefulAccount(function(ret) {
                // console.log("success=" + data);
                handler.responseBenfiList(ret);
            });
        },

        responseBenfiList(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.benefitListData = ret.retData.data;
                return;
            }
        },


        //记录列表
        requestPaymentList() {

            let handler = this;
            paymentList(this.currentPage, this.perPage, function(ret) {
                handler.responsePaymentList(ret);
            });
        },

        responsePaymentList(ret) {
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

        getLongPaymentRate() {

            let handler = this;
            this.requestPaymentRate();
            this.timer = setInterval(() => {
                this.requestPaymentRate();
            }, 5000);
        },

        //获取当前选择的汇率
        requestPaymentRate() {
            let handler = this;
            getPaymentRate(this.ruleForm.inCurrencyType, this.ruleForm.outCurrencyType, this.ruleForm.soldAmtE2, this.ruleForm.ruleType, function(ret) {
                // console.log("success=" + data);
                handler.responsePaymentRate(ret);
            });
        },

        responsePaymentRate(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.rate.actPayAmount = ret.retData.custSellAmt;
                this.rate.actFee = '0.00';
                this.rate.actRate = ret.retData.custRate;
                this.rate.actgetAmount = ret.retData.custBuyAmt;
                this.rate.custRate = ret.retData.custRate;
                return;
            }
        },

        changeInCurrency() {
            for (let i = 0; i < this.currencyInList.length; i++) {
                if (this.currencyInList[i].currencyCode == this.ruleForm.inCurrencyType && this.ruleForm.ruleType == '0') {
                    this.currencyName = this.currencyInList[i].currencyName;
                    this.avliBenefiType = this.currencyOutList[i].currencyCode;
                    this.avliBenefiTypeId = this.currencyOutList[i].id;
                }
            }
        },

        changeOutCurrency() {
            for (let i = 0; i < this.currencyOutList.length; i++) {
                if (this.currencyOutList[i].currencyCode == this.ruleForm.outCurrencyType && this.ruleForm.ruleType == '1') {
                    this.currencyName = this.currencyOutList[i].currencyName;
                    // this.avliBenefiType = this.currencyOutList[i].currencyCode;
                    // this.avliBenefiTypeId = this.currencyOutList[i].id;
                }
            }
        },

        changeRuleType() {
            this.changeInCurrency();
            this.changeOutCurrency();
        },

        clickBenfiType() {
            if (this.buttonName == '我要分发') {
                this.rules.benefitId[0].required = false;
                this.rules.transFile[0].required = true;
                this.buttonName = '我要付款';
            } else {
                this.rules.benefitId[0].required = true;
                this.rules.transFile[0].required = false;
                this.buttonName = '我要分发';
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
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.currencyOutList = ret.retData;
                this.currencyInList = ret.retData;
                this.changeInCurrency();
                this.changeOutCurrency();
                this.requestPaymentCalendar();
                this.requestBenfiList();
                this.requestPaymentList();
                return;
            }
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.getLongPaymentRate();
                    this.currencyStep = 2;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        lockingResult(formName) {
            this.progressStatus = '';
            // this.actualProgress = 100;
            clearInterval(this.timer);
            clearInterval(this.countDownTimer);
            this.requestAddPayment();
        },

        buttonPreStep() {
            this.currencyStep = 1;
            clearInterval(this.timer);
            clearInterval(this.countDownTimer);
            this.progressStatus = '';
            this.actualProgress = 100;
        },

        requestAddPayment() {

            this.fullscreenLoading = true;
            let handler = this;

            let dateStr = new Date(this.ruleForm.tradeDate).getFullYear() + '-' + (("0" + (new Date(this.ruleForm.tradeDate).getMonth() + 1)).slice(-2)) + '-' + new Date(this.ruleForm.tradeDate).getDate();

            if (this.ruleForm.payType == '1') {

                addPaymentFile(this.ruleForm.outCurrencyType, this.ruleForm.inCurrencyType, this.ruleForm.ruleType, this.rate.actPayAmount, this.rate.actgetAmount, dateStr, this.ruleForm.benefitId, this.ruleForm.transFile, this.rate.actRate, this.ruleForm.payType,
                    function(ret) {
                        // console.log("success=" + data);
                        handler.responseAddPayment(ret);
                    });
            } else {

                addPayment(this.ruleForm.outCurrencyType, this.ruleForm.inCurrencyType, this.ruleForm.ruleType, this.rate.actPayAmount, this.rate.actgetAmount, dateStr, this.ruleForm.benefitId, this.ruleForm.transFile, this.rate.actRate, this.ruleForm.payType,
                    function(ret) {
                        // console.log("success=" + data);
                        handler.responseAddPayment(ret);
                    });
            }
        },

        responseAddPayment(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.dialogVisible = true;
                this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.currencyStep = 1;
                this.showNoticeDialog('提示', '支付换汇提交成功');
                this.requestPaymentList();
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
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.progress-in {
    position: absolute;
    top: 0;
    width: 100%;
    text-align: center;
    font-size: 34px;
    height: 40px;
    margin-top: 58px;
}

.card-desc {
    width: 60%;
    margin: auto;
    position: relative;
    padding-left: 40px
}

.detail-item {
    display: flex;
    position: relative;
    width: 100%;
    line-height: 30px;
}

.detail-item .item-title {
    flex: 6;
    color: #999999;
    padding-left: 40px;
}

.detail-item .item-content {
    flex: 6
}

.detail-item .item-status {
    color: green;
}

.no-use-style {
    background-color: #eeeeee;
}
</style>