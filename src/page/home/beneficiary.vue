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
                <el-card class="box-card no-body-card">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;font-size: 20px">收款账户</span>
                        <router-link :to="'/beneficiary/create'">
                            <el-button style="float: right; padding: 9px 15px" type="primary">添加受益人账户</el-button>
                        </router-link>
                    </div>
                </el-card>
                <el-card class="box-card" style="margin-top: 10px">
                    <div slot="header" class="clearfix">
                        <span>公司自身账户</span>
                    </div>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="benefitId" label="#" style="width:100px">
                        </el-table-column>
                        <el-table-column prop="bName" label="受益人别名">
                        </el-table-column>
                        <el-table-column prop="bankName" label="银行全名">
                        </el-table-column>
                        <el-table-column prop="areaDesc" label="国家">
                        </el-table-column>
                        <el-table-column prop="currencyName" label="币种">
                        </el-table-column>
                        <el-table-column prop="stateDesc" label="状态">
                        </el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                <el-button @click="handleUpdateClick(scope.row)" type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="text-align: center;margin-top: 10px" v-show="totalAccount>0">
                        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="5" layout="total, prev, pager, next" :total="totalAccount">
                        </el-pagination>
                    </div>
                </el-card>
                <el-card class="box-card" style="margin-top: 10px">
                    <div slot="header" class="clearfix">
                        <span>第三方受益人账户</span>
                    </div>
                    <el-table :data="tableDataS" border style="width: 100%">
                        <el-table-column prop="benefitId" label="#">
                        </el-table-column>
                        <el-table-column prop="bName" label="受益人别名">
                        </el-table-column>
                        <el-table-column prop="bankName" label="银行全名">
                        </el-table-column>
                        <el-table-column prop="areaDesc" label="国家">
                        </el-table-column>
                        <el-table-column prop="currencyName" label="币种">
                        </el-table-column>
                        <el-table-column prop="stateDesc" label="状态">
                        </el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                <el-button @click="handleUpdateClick(scope.row)" type="text" size="small">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="text-align: center;margin-top: 10px" v-show="totalAccountS>0">
                        <el-pagination @current-change="handleCurrentChangeS" :current-page.sync="currentPageS" :page-size="5" layout="total, prev, pager, next" :total="totalAccountS">
                        </el-pagination>
                    </div>
                </el-card>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import headerTop from '../../components/headerTop'
import leftAside from '../../components/leftAside'
import {
    benefitList
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
            activeItem: 'beneficiary',
            tableData: [],
            tableDataS: [],
            currentPage: 1,
            totalAccount: 0,
            currentPageS: 1,
            totalAccountS: 0,
            perPage: 5,
        }
    },
    created() {
        this.requestBenfiList(0, this.currentPage, this.perPage);
        this.requestBenfiList(1, this.currentPageS, this.perPage);
    },
    methods: {
        createAcc() {
            this.$router.push({
                path: '/beneficiary/create'
            });
            this.$router.go(1);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.requestBenfiList(0, this.currentPage, this.perPage);
        },
        handleCurrentChangeS(val) {
            this.currentPageS = val;
            this.requestBenfiList(1, this.currentPageS, this.perPage);
        },
        handleClick(val) {
            this.$router.push({
                path: '/beneficiary/detail',
                query: { id: val.benefitId }
            });
            this.$router.go(1);
        },
        handleUpdateClick(val) {
            this.$router.push({
                path: '/beneficiary/update',
                query: { id: val.benefitId }
            });
            this.$router.go(1);
        },
        //受益人列表
        requestBenfiList(type, page, perPage) {

            let handler = this;
            benefitList(type, page, perPage, function(ret) {
                // console.log("success=" + data);
                handler.responseBenfiList(ret, type);
            });
        },

        responseBenfiList(ret, type) {
            let response = responseResult(this, ret,1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                if (type == 0) {
                    this.tableData = ret.retData.data;
                    this.totalAccount = parseInt(ret.retData.count);
                } else {
                    this.tableDataS = ret.retData.data;
                    this.totalAccountS = parseInt(ret.retData.count);
                }

                return;
            }
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card {
    width: 100%;
}
</style>