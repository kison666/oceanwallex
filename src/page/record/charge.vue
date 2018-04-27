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
                <el-card class="box-card" style="min-height: 500px">
                    <el-row>
                        <el-col :span="3" style="line-height: 40px">
                            币种
                        </el-col>
                        <el-col :span="12">
                            <el-radio-group v-model="currencyId">
                                <el-radio-button label="">全部</el-radio-button>
                                <el-radio-button v-for="(item, index) in currencyList" :key="index" :label="item.id">{{item.currencyName}}</el-radio-button>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 30px">
                        <el-col :span="3" style="line-height: 40px">
                            交易日期
                        </el-col>
                        <el-col :span="12">
                            <el-date-picker v-model="searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 30px">
                        <el-col :span="3">
                            &nbsp;
                        </el-col>
                        <el-col :span="12">
                            <el-button type="primary" @click="queryButton()">查询</el-button>
                        </el-col>
                    </el-row>
                    <el-table :data="tableData" style="width: 100%;margin-top:30px" :row-key="getRowKeys" :expand-row-keys="expands" @current-change="toggleRowExpansion" border>
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
                        <el-table-column prop="tradeNo" label="通知编号">
                        </el-table-column>
                        <el-table-column prop="outBankName" label="出款银行">
                        </el-table-column>
                        <el-table-column prop="inBankName" label="入款银行">
                        </el-table-column>
                        <el-table-column prop="currencyName" label="充值币种">
                        </el-table-column>
                        <el-table-column prop="amtE2" label="充值金额">
                        </el-table-column>
                        <el-table-column prop="actAmtE2" label="实际充值金额">
                        </el-table-column>
                        <el-table-column prop="stateDesc" label="状态">
                        </el-table-column>
                        <el-table-column prop="createTime" label="提交日期">
                        </el-table-column>
                    </el-table>
                    <div style="text-align: center;margin-top: 10px" v-show="totalAccount>0">
                        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="perPage" layout="total, prev, pager, next" :total="totalAccount">
                        </el-pagination>
                    </div>
                </el-card>
            </el-main>
        </el-container>
        <simple-dialog :dialogVisible="dialogVisible" :dialogMsg="dialogMsg" v-if="dialogVisible==true"></simple-dialog>
    </el-container>
</template>
<script>
import headerTop from '../../components/headerTop'
import leftAside from '../../components/leftAside'
import {
    currencyList,
    chargeRecord
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
        headerTop
    },
    data() {
        return {
            expands: [],
            getRowKeys(row) {
                return row.addId;
            },
            activeItem: 'recharge-record',
            fullscreenLoading: false,
            dialogMsg: '', //对话框内容
            dialogVisible: false, //对话框是否显示
            accountData: '',
            totalAccount: 0,
            currentPage: 1,
            perPage: 10,
            tableData: [],
            currencyId: '',
            startDate: '',
            endDate: '',
            searchDate: '',
            currencyList: [],
        }
    },
    created() {
        this.requestCurrencyList();
        this.requestChargeList();
    },
    watch: {
        searchDate: function(value) {
            if (this.searchDate != null && this.searchDate != '') {
                this.startDate = new Date(value[0]).getFullYear() + '-' + (("0" + (new Date(value[0]).getMonth() + 1)).slice(-2)) + '-' + new Date(value[0]).getDate();
                this.endDate = new Date(value[1]).getFullYear() + '-' + (("0" + (new Date(value[1]).getMonth() + 1)).slice(-2)) + '-' + new Date(value[1]).getDate();

            } else {
                this.startDate = "";
                this.endDate = "";
            }
        }
    },
    methods: {

        toggleRowExpansion(row) {
            this.expands = [];
            this.expands.push(row.addId);
        },

        queryButton() {
            this.requestChargeList();
        },

        handleCurrentChange(val) {
            this.currentPage = val;
            this.requestChargeList();
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
                return;
            }
        },

        //充值记录列表
        requestChargeList() {
            let handler = this;
            chargeRecord(this.currentPage, this.perPage, this.startDate, this.endDate, this.currencyId, function(ret) {
                handler.responseChargeList(ret);
            });
        },

        responseChargeList(ret) {
            let response = responseResult(this, ret,1);
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
</style>