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
                                    <el-form-item label="流水编号">
                                        <span>{{ props.row.billNo }}</span>
                                    </el-form-item>
                                    <el-form-item label="账户类型">
                                        <span>{{ props.row.accountDesc }}</span>
                                    </el-form-item>
                                    <el-form-item label="币种">
                                        <span>{{ props.row.currencyName }}</span>
                                    </el-form-item>
                                    <el-form-item label="交易金额">
                                        <span>{{ props.row.amtE2 }}</span>
                                    </el-form-item>
                                    <el-form-item label="余额">
                                        <span>{{ props.row.afterAmtE2 }}</span>
                                    </el-form-item>
                                    <el-form-item label="备注">
                                        <span>{{ props.row.remark }}</span>
                                    </el-form-item>
                                    <el-form-item label="交易日期">
                                        <span>{{ props.row.tradeDate }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column prop="billNo" label="流水编号">
                        </el-table-column>
                        <el-table-column prop="accountDesc" label="账户类型">
                        </el-table-column>
                        <el-table-column prop="currencyName" label="币种">
                        </el-table-column>
                        <el-table-column prop="amtE2" label="交易金额">
                        </el-table-column>
                        <el-table-column prop="afterAmtE2" label="余额">
                        </el-table-column>
                        <el-table-column prop="remark" label="备注">
                        </el-table-column>
                        <el-table-column prop="tradeDate" label="交易日期">
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
    accountRecord
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
            activeItem: 'acct-flowRecord',
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
            expands: [],
            getRowKeys(row) {
                return row.id;
            },
        }
    },
    created() {
        this.requestCurrencyList();
        this.requestAccountList();
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
            this.expands.push(row.id);
        },

        queryButton() {
            this.requestAccountList();
        },

        handleCurrentChange(val) {
            this.currentPage = val;
            this.requestAccountList();
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

        //账户流水列表
        requestAccountList() {
            let handler = this;
            accountRecord(this.currentPage, this.perPage, this.startDate, this.endDate, this.currencyId, function(ret) {
                handler.responseAccountList(ret);
            });
        },

        responseAccountList(ret) {
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