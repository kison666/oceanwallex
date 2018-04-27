<template>
    <el-container>
        <el-header>
            <header-top></header-top>
        </el-header>
        <el-container class="super-main">
            <el-aside>
                <left-aside :activeItem="activeItem"></left-aside>
            </el-aside>
            <el-main style="min-height: 560px;padding-top: 20px;padding-bottom: 20px">
                <top-steps :stepActive="stepActive"></top-steps>
                <p v-if="step==5" style="color:#F56C6C">您的信息已经提交，信息正在审核中</p>
                <p v-if="step==6" style="color:#67C23A">您的信息已经审核通过</p>
                <p v-if="step==7" style="color:#F56C6C">您的信息审核被拒绝，原因：{{refuseReason}}</p>
                <el-card class="box-card div-card" style="margin-top: 20px;padding-bottom: 20px">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 30px">1、注册人信息</span>
                        <el-button style="float: right; padding: 8px 15px" type="primary" @click="clickRegister()" v-if="step==4 || step==7">去修改</el-button>
                    </div>
                    <el-row>
                        <el-col :span="24">
                            <div class="detail-item">
                                <div class="item-title">您的身份</div>
                                <div class="item-content">{{registerInfo.typeDesc}}</div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-col :span="24" v-if="registerAuthorImg!=''">
                        <div class="detail-item">
                            <div class="item-title">授权书</div>
                            <div class="item-content-img">
                                <span v-for="(item,index) in registerAuthorImg">
                                    <a :href="url+item.url" target="_blank" v-if="item.type==0"><img :src="cdnPdfUrll">
                                    </a>
                                    <img :src="url+item.url" @click="clickPreview(item.url)" v-else>
                                </span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="24" v-if="registerCardImg!=''">
                        <div class="detail-item">
                            <div class="item-title">身份证或护照</div>
                            <div class="item-content-img">
                                <span v-for="(item,index) in registerCardImg">
                                    <a :href="url+item.url" target="_blank" v-if="item.type==0"><img :src="cdnPdfUrll">
                                    </a>
                                    <img :src="url+item.url" @click="clickPreview(item.url)" v-else>
                                </span>
                            </div>
                        </div>
                    </el-col>
                </el-card>
                <el-card class="box-card div-card" style="margin-top: 10px;padding-bottom: 20px">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 30px">2、企业信息</span>
                        <el-button style="float: right; padding: 8px 15px" type="primary" @click="clickEnterprise()" v-if="step==4 || step==7">去修改</el-button>
                    </div>
                    <el-row v-if="enterpriseInfo !=''">
                        <el-col :span="8" v-if="enterpriseInfo.compInfo && enterpriseInfo.compInfo.registerName">
                            <div class="detail-item" v-if="enterpriseInfo.compInfo">
                                <div class="item-title">企业注册名称</div>
                                <div class="item-content">{{enterpriseInfo.compInfo.registerName}}</div>
                            </div>
                        </el-col>
                        <div v-if="enterpriseInfo.compInfo">
                            <el-col :span="8" v-if="enterpriseInfo.compInfo && enterpriseInfo.compInfo.regAddr==''">
                                <div class="detail-item">
                                    <div class="item-title">企业注册所在地</div>
                                    <div class="item-content">{{enterpriseInfo.compInfo.areaTypeDesc}}</div>
                                </div>
                            </el-col>
                            <el-col :span="8" v-else>
                                <div class="detail-item">
                                    <div class="item-title">企业注册所在地</div>
                                    <div class="item-content">{{enterpriseInfo.compInfo.regAddr}}</div>
                                </div>
                            </el-col>
                        </div>
                        <el-col :span="8" v-if="enterpriseInfo.compInfo && enterpriseInfo.compInfo.opAddr">
                            <div class="detail-item">
                                <div class="item-title">企业经营地址</div>
                                <div class="item-content">{{enterpriseInfo.compInfo.opAddr}}</div>
                            </div>
                        </el-col>
                        <el-col :span="enterpriseImgCount" v-if="enterpriseImg!='' && enterpriseImg!=[]">
                            <div class="detail-item">
                                <div class="item-title">企业证书</div>
                                <div class="item-content-img">
                                    <span v-for="(item,index) in enterpriseImg">
                                    <a :href="url+item.url" target="_blank" v-if="item.type==0"><img :src="cdnPdfUrll">
                                    </a>
                                    <img :src="url+item.url" @click="clickPreview(item.url)" v-else>
                                </span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row v-if="enterpriseInfo!='' && enterpriseInfo.compInfo && enterpriseInfo.compInfo.areaType==0">
                        <p>法人代表</p>
                        <el-col :span="24" v-if="enterpriseCardImg!='' && enterpriseCardImg!=[]">
                            <div class="detail-item">
                                <div class="item-title item-item1">身份证副本(或护照)</div>
                                <div class="item-content-img">
                                    <span v-for="(item,index) in enterpriseCardImg[0]">
                                    <a :href="url+item.url" target="_blank" v-if="item.type==0"><img :src="cdnPdfUrll">
                                    </a>
                                    <img :src="url+item.url" @click="clickPreview(item.url)" v-else>
                                </span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row v-for="(item,index) in enterpriseCardImg" v-else>
                        <p>董事{{index +1}}</p>
                        <el-col :span="enterpriseImgCount" v-if="enterpriseCardImg!='' && enterpriseCardImg!=[]">
                            <div class="detail-item">
                                <div class="item-title item-item1">身份证副本(或护照)</div>
                                <div class="item-content-img">
                                    <span v-for="(item1,index1) in item">
                                    <a :href="url+item1.url" target="_blank" v-if="item1.type==0"><img :src="cdnPdfUrll"></a>
                                    <img :src="url+item1.url" @click="clickPreview(item1.url)" v-else>
                                </span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card class="box-card div-card" style="margin-top: 10px;padding-bottom: 20px">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 30px">3、股东信息</span>
                        <el-button style="float: right; padding: 8px 15px" type="primary" @click="clickShareHolder()" v-if="step==4 || step==7">去添加</el-button>
                    </div>
                    <el-row v-for="(item,index) in shareholderInfo" v-if="shareholderInfo!=''" :class="{sholder_div:index>0}" style="padding: 10px 0px 30px 0px">
                        <p><span style="font-weight: bold;">股东{{index +1}}</span> &nbsp;&nbsp;&nbsp;
                            <el-button style="padding: 8px 15px" type="primary" @click="editShareHoderItem(item.id,index+1)" v-if="step==4 || step==7">修改</el-button>
                            <el-button style="padding: 8px 15px" type="danger" @click="deleteShareHoderItem(item.id,index+1)" v-if="shareholderInfo.length>1 && (step==4 || step==7)">删除</el-button>
                        </p>
                        <div v-if="item.dType==0">
                            <el-col :span="8">
                                <div class="detail-item">
                                    <div class="item-title">股东类型</div>
                                    <div class="item-content">{{item.typeDesc}}</div>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="detail-item">
                                    <div class="item-title">持股区间</div>
                                    <div class="item-content">{{item.holdDesc}}%</div>
                                </div>
                            </el-col>
                            <el-col :span="8" v-if="item.dName!=''">
                                <div class="detail-item">
                                    <div class="item-title">股东姓名</div>
                                    <div class="item-content">{{item.dName}}</div>
                                </div>
                            </el-col>
                            <el-col :span="8" v-if="item.sType!=''">
                                <div class="detail-item">
                                    <div class="item-title">股东性别</div>
                                    <div class="item-content">{{item.sDesc}}</div>
                                </div>
                            </el-col>
                            <el-col :span="8" v-if="item.birthDate!='' && (item.holdType=='0' || item.holdType==0)">
                                <div class="detail-item">
                                    <div class="item-title">出生日期</div>
                                    <div class="item-content">{{changeDate(item.birthDate)}}</div>
                                </div>
                            </el-col>
                            <el-col :span="8" v-if="item.cardType!=''">
                                <div class="detail-item">
                                    <div class="item-title">证件类型</div>
                                    <div class="item-content">{{item.cardDesc}}</div>
                                </div>
                            </el-col>
                            <el-col :span="8" v-if="item.cardNo!=''">
                                <div class="detail-item">
                                    <div class="item-title">证件编号</div>
                                    <div class="item-content">{{item.cardNo}}</div>
                                </div>
                            </el-col>
                            <el-col :span="24" v-if="item['imgArr']!='' && item['imgArr']!=[] && (item.holdType==1 || item.holdType=='1')">
                                <div class="detail-item">
                                    <div class="item-title" style="width:200px">身份证副本(或护照)</div>
                                    <div class="item-content-img">
                                        <span v-for="(item1,index1) in item['imgArr']">
                                            <a :href="url+item1.link" target="_blank" v-if="(item1.link).indexOf('.pdf')>=0"><img :src="cdnPdfUrll"></a>
                                            <img :src="url+item1.link" @click="clickPreview(item1.link)" v-else>
                                        </span>
                                    </div>
                                </div>
                            </el-col>
                        </div>
                        <div v-else>
                            <el-col :span="8">
                                <div class="detail-item">
                                    <div class="item-title">股东类型</div>
                                    <div class="item-content">{{item.typeDesc}}</div>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="detail-item">
                                    <div class="item-title">持股区间</div>
                                    <div class="item-content">{{item.holdDesc}}%</div>
                                </div>
                            </el-col>
                            <el-col :span="8" v-if="item.compName!=''">
                                <div class="detail-item">
                                    <div class="item-title">公司名称</div>
                                    <div class="item-content">{{item.compName}}</div>
                                </div>
                            </el-col>
                            <el-col :span="8" v-if="item.areaDesc!=''">
                                <div class="detail-item">
                                    <div class="item-title">企业所在地</div>
                                    <div class="item-content">{{item.areaDesc}}</div>
                                </div>
                            </el-col>
                            <el-col :span="8" v-if="item.registerAddr!=null && item.registerAddr!=''">
                                <div class="detail-item">
                                    <div class="item-title">企业注册所在地</div>
                                    <div class="item-content">{{item.registerAddr}}</div>
                                </div>
                            </el-col>
                            <el-col :span="8" v-if="item.vDate !=null && item.vDate!='' && item.holdDesc=='0'">
                                <div class="detail-item">
                                    <div class="item-title">成立日期</div>
                                    <div class="item-content">{{item.vDate}}</div>
                                </div>
                            </el-col>
                            <el-col :span="8" v-if="item.registerNo !=null && item.registerNo!=''">
                                <div class="detail-item">
                                    <div class="item-title">注册编号</div>
                                    <div class="item-content">{{item.registerNo}}</div>
                                </div>
                            </el-col>
                            <el-col :span="8" v-if="item.vCode !=null && item.vCode!=''">
                                <div class="detail-item">
                                    <div class="item-title">统一社会信用代码</div>
                                    <div class="item-content">{{item.vCode}}</div>
                                </div>
                            </el-col>
                            <el-col :span="24" v-if="item['imgArr']!='' && item['imgArr']!=[] && (item.holdType==1 || item.holdType=='1')">
                                <div class="detail-item">
                                    <div class="item-title">企业文件</div>
                                    <div class="item-content-img">
                                        <span v-for="(item1,index1) in item['imgArr']">
                                            <a :href="url+item1.link" target="_blank" v-if="(item1.link).indexOf('.pdf')>=0"><img :src="cdnPdfUrll"></a>
                                            <img :src="url+item1.link" @click="clickPreview(item1.link)" v-else>
                                        </span>
                                    </div>
                                </div>
                            </el-col>
                        </div>
                    </el-row>
                </el-card>
                <el-card class="box-card div-card" style="margin-top: 10px;padding-bottom: 20px">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 30px">4、业务信息</span>
                        <el-button style="float: right; padding: 8px 15px" type="primary" @click="clickBusiness()" v-if="step==4 || step==7">去修改</el-button>
                    </div>
                    <el-row>
                        <el-col :span="24">
                            <div class="detail-item">
                                <div class="item-title">开户类型</div>
                                <div class="item-content">全球支付</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detail-item">
                                <div class="item-title" style="width:200px">购买的商品或者服务</div>
                                <div class="item-content">{{businessInfo.pName}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detail-item">
                                <div class="item-title">付款国家</div>
                                <div class="item-content">{{businessInfo.payCountry}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detail-item">
                                <div class="item-title">付款币种</div>
                                <div class="item-content">{{businessInfo.payCurrency}}</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="detail-item">
                                <div class="item-title">预估月付款额</div>
                                <div class="item-content">{{businessInfo.amtE2/10000}} 万美元</div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-main>
            <el-button type="button" @click="clickAllButton()" class="submit-all" v-if="step==4 || step==7"><span>提交</span></el-button>
        </el-container>
    </el-container>
</template>
<script>
import headerTop from '../../../components/headerTop'
import leftAside from '../../../components/leftAside'
import topSteps from '../../../components/topSteps'
import {
    baseUrl,
    cdnPdfUrl
} from '../../../config/env'
import {
    infoRegister,
    infoEnterprise,
    infoShareHolder,
    infoBusiness,
    infoSteps,
    deleteShareHolder,
    buttonAllInfo
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
            stepActive: 4,
            step: '', //用户信息的状态
            refuseReason: '',
            imageUrl: '',
            registerInfo: '', //注册人信息
            registerAuthorImg: '', //注册人信息-授权书
            registerCardImg: '', //注册人信息-身份证
            enterpriseInfo: '', //企业信息
            shareholderInfo: '', //股东信息
            businessInfo: '', //业务信息
            enterpriseImgCount: 8, //企业图片的占比
            enterpriseImg: '', //企业证书信息
            enterpriseCardImg: '', //企业-法人代表和董事
            url: '',
            shareholderNum: 0, //股东的个数
            cdnPdfUrll: '', //

        }
    },
    created() {
        this.url = baseUrl + "/";
        this.cdnPdfUrll = cdnPdfUrl;
        this.requestStepsInfo();
        this.requestRegisterInfo();
        this.requestEnterpriseInfo();
        this.requestShareHolderInfo();
        this.requestBusinessInfo();
    },
    watch: {

    },
    methods: {

        changeDate(dateDesc) {
            let dateStr = new Date(dateDesc).getFullYear() + '-' + (("0" + (new Date(dateDesc).getMonth() + 1)).slice(-2)) + '-' + new Date(dateDesc).getDate();

            return dateStr;
        },

        requestRegisterInfo() {
            this.fullscreenLoading = true;
            let handler = this;
            infoRegister(function(ret) {
                // console.log("success=" + data);
                handler.responseRegisterInfo(ret);
            });
        },

        responseRegisterInfo(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret,1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.registerInfo = ret.retData;
                let tmpItem = ret.retData.imgArr;
                let tmp = [];
                let tmp1 = [];
                let count = 0;
                let count1 = 0;
                for (let i = 0; i < tmpItem.length; i++) {
                    if (tmpItem[i].type == "0") {
                        if (tmpItem[i].url.indexOf('.pdf') > -1) {
                            let tmpModel = { url: tmpItem[i].url, type: 0 };
                            tmp[count] = tmpModel;
                        } else {
                            let tmpModel = { url: tmpItem[i].url, type: 1 };
                            tmp[count] = tmpModel;
                        }
                        count++;
                    } else {
                        if (tmpItem[i].url.indexOf('.pdf') > -1) {
                            let tmpModel = { url: tmpItem[i].url, type: 0 };
                            tmp1[count1] = tmpModel;
                        } else {
                            let tmpModel = { url: tmpItem[i].url, type: 1 };
                            tmp1[count1] = tmpModel;
                        }

                        count1++;
                    }
                }
                if (tmp.length > 0) {
                    this.registerAuthorImg = tmp;
                }
                if (tmp1.length > 0) {
                    this.registerCardImg = tmp1;
                }
                return;
            }
        },

        requestEnterpriseInfo() {
            this.fullscreenLoading = true;
            let handler = this;
            infoEnterprise(function(ret) {
                // console.log("success=" + data);
                handler.responseEnterpriseInfo(ret);
            });
        },

        responseEnterpriseInfo(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret,1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.enterpriseInfo = ret.retData;
                let tmpItem = ret.retData.imgArr;
                let count = 0;
                let tmp = [];
                for (let i = 0; i < tmpItem.length; i++) {
                    if (tmpItem[i]['type'] == 0 || tmpItem[i]['type'] == '0') {

                        for (let j = 0; j < tmpItem[i]['imgArr'].length; j++) {
            
                            if ((tmpItem[i]['imgArr'][j]['link']).indexOf('.pdf') > -1) {
                        
                                let tmpModel = { url: tmpItem[i]['imgArr'][j]['link'], type: 0 };
                                tmp[count] = tmpModel;
                            } else {
        
                                let tmpModel = { url: tmpItem[i]['imgArr'][j]['link'], type: 1 };
                                tmp[count] = tmpModel;
                            }
                            count++;

                        }
                    }
                }
                this.enterpriseImg = tmp;

                if (this.enterpriseImg != '' && this.enterpriseImg != []) {
                    this.enterpriseImgCount = 8 * this.enterpriseImg.length;
                }
                let count1 = 0;
                let tmp1 = [];
                for (let i = 0; i < tmpItem.length; i++) {
                    let tmp2 = [];
                    let count2=0;
                    if (tmpItem[i].type != 0) {

                        for (let j = 0; j < tmpItem[i].imgArr.length; j++) {
                            if ((tmpItem[i].imgArr[j]['link']).indexOf('.pdf') > -1) {
                                let tmpModel = { url: tmpItem[i].imgArr[j]['link'], type: 0 };
                                tmp2[count2] = tmpModel;
                            } else {
                                let tmpModel = { url: tmpItem[i].imgArr[j]['link'], type: 1 };
                                tmp2[count2] = tmpModel;
                            }
                            count2++;
                        }
                        tmp1[count1] = tmp2;
                        count1++;
                    }
                }
                this.enterpriseCardImg = tmp1;

                if (this.enterpriseCardImg != '' && this.enterpriseCardImg != []) {
                    this.enterpriseImgCount = 8 * this.enterpriseCardImg.length;
                }

                return;
            }
        },

        requestShareHolderInfo() {
            this.fullscreenLoading = true;
            let handler = this;
            infoShareHolder(function(ret) {
                // console.log("success=" + data);
                handler.responseShareHolderInfo(ret);
            });
        },

        responseShareHolderInfo(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret,1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;

                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.shareholderInfo = ret.retData;
                this.shareholderNum = this.shareholderInfo.length;

                for (let i = 0; i < this.shareholderInfo.length; i++) {

                    let tmpImgFiles = [];
                    let tmpImgItem = this.shareholderInfo[i]['imgArr'];
                    for (let j = 0; j < tmpImgItem.length; j++) {

                        if (tmpImgItem[j].indexOf('.pdf') > -1) {
                            let tmpJson = { url: tmpImgItem[j], type: 0 };
                            tmpImgFiles[j] = tmpJson;
                        } else {
                            let tmpJson2 = { url: tmpImgItem[j], type: 1 };
                            tmpImgFiles[j] = tmpJson2;
                        }

                    }

                    this.shareholderInfo[i]['fileArr'] = tmpImgFiles;

                }
                return;
            }
        },

        requestBusinessInfo() {
            this.fullscreenLoading = true;
            let handler = this;
            infoBusiness(function(ret) {
                // console.log("success=" + data);
                handler.responseBusinessInfo(ret);
            });
        },

        responseBusinessInfo(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret,1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.businessInfo = ret.retData;
                return;
            }
        },

        requestStepsInfo() {
            this.fullscreenLoading = true;
            let handler = this;
            infoSteps(function(ret) {
                // console.log("success=" + data);
                handler.responseStepsInfo(ret);
            });
        },

        responseStepsInfo(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret,1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                // this.stepActive = ret.retData.step;
                if (ret.retData.step > 4) {
                    this.stepActive = 5;
                }
                this.step = ret.retData.step;

                return;
            }
        },


        requestDeleteShareHolder(id) {
            this.fullscreenLoading = true;
            let handler = this;
            deleteShareHolder(id, function(ret) {
                // console.log("success=" + data);
                handler.responseDeleteShareHolder(ret);
            });
        },

        responseDeleteShareHolder(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.requestShareHolderInfo();
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                return;
            }
        },

        requestButtonAll() {
            this.fullscreenLoading = true;
            let handler = this;
            buttonAllInfo(function(ret) {
                // console.log("success=" + data);
                handler.responseButtonAll(ret);
            });
        },

        responseButtonAll(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.$message({
                    type: 'success',
                    message: '提交成功!'
                });
                this.requestStepsInfo();
                return;
            }
        },

        clickRegister() {
            this.$router.push({ path: '/editinfo/base' });
            this.$router.go(1);
        },

        clickEnterprise() {
            this.$router.push({ path: '/editinfo/enterprise' });
            this.$router.go(1);
        },
        clickShareHolder() {
            this.$router.push({ path: '/compinfo/shareholder', query: { back: 1, num: this.shareholderNum } });
            this.$router.go(1);
        },
        clickBusiness() {
            this.$router.push({ path: '/editinfo/business' });
            this.$router.go(1);
        },

        clickAllButton() {
            this.requestButtonAll();
        },
        //图片预览  
        clickPreview(link) {
            // console.log(item.link);
            // if ((item.link.indexOf('.pdf'))>=0) {
            //     //跳转到pdf预览
            //     window.open(this.cdnPdfUrll);
            //     return;
            // }
            const h = this.$createElement;
            this.$msgbox({
                title: '图片预览',
                message: h('p', null, [
                    h('img', { style: "background-repeat:no-repeat; background-size:100% 100%;-moz-background-size:100% 100%;width:100%;height:380px;background-image: url(" + this.url + link + ")" })
                ]),
                customClass: 'dialogClass',
                showCancelButton: true,
                showConfirmButton: false,
                showCancelButton: false,
            });
        },


        //删除股东
        deleteShareHoderItem(id, index) {

            let handler = this;
            this.$confirm('此操作将删除股东' + index + '的信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                handler.requestDeleteShareHolder(id);
            }).catch(() => {});
        },

        //编辑股东信息
        editShareHoderItem(id, index) {
            this.$router.push({ path: '/editinfo/shareholder', query: { id: id, index: index } });
            this.$router.go(1);
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

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
    line-height: 10px;
}

.clearfix:after {
    clear: both
}

.detail-item {
    display: flex;
    position: relative;
    width: 100%;
    line-height: 50px;
}

.detail-item .item-title {
    width: 120px;
    color: #999999;
}

.detail-item .item-item1 {
    width: 180px
}

.detail-item .item-content {
    flex: 6
}

.detail-item .item-content-img {
    flex: 6;
}

.detail-item .item-content-img .img-mask {
    position: absolute;
    width: 174px;
    height: 125px;
    margin-top: 10px;
    margin-right: 20px;
    cursor: pointer;
    background-color: #f5f5f5;
}

.detail-item .item-content-img div {}

.detail-item .item-status {
    color: green;
}

.detail-item .item-content img,
.detail-item .item-content-img img {
    width: 174px;
    height: 125px;
    margin-top: 10px;
    margin-right: 20px;
    cursor: pointer;
}

.sholder_div {
    border-top: solid 1px #f5f5f5
}

.submit-all {
    border: 0;
    width: 60px;
    height: 60px;
    background: #13ce66;
    color: #fff;
    border-radius: 50%;
    text-align: center;
    padding-top: 14px;
    padding-left: 24px;
    font-weight: 600;
    font-size: 16px;
    position: fixed;
    z-index: 2000;
    bottom: 100px;
    right: 108px;
    cursor: pointer;
}

.submit-all span {
    margin-left: -5px;
}

.dialogClass {
    width: 660px!important;
    height: 420px!important
}
</style>