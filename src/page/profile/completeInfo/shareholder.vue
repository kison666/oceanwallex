<template>
    <el-container>
        <el-header>
            <header-top></header-top>
        </el-header>
        <el-container class="super-main">
            <el-aside>
                <left-aside :activeItem="activeItem"></left-aside>
            </el-aside>
            <el-main>
                <el-card class="box-card" style="min-height: 560px;padding: 0px">
                    <top-steps :stepActive="stepActive"></top-steps>
                    <div class="form-div">
                        <div class="title"><span style="font-weight: bold;">股东信息</span>(您仅需要提供10%以上的股东相关信息)</div>
                        <!--  股东列表 -->
                        <el-form label-position="left" :model="modelData" ref="modelData" label-width="150px" class="demo-ruleForm" v-if="isActive==true">
                            <div v-for="(item,index) in modelData.data" v-if="item.show==true" style="border-top:1px solid #e5e5e5;padding-bottom: 20px">
                                <p style="font-weight: bold;">股东{{currShareNum+index+1}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <el-button type="danger" @click="deleteModel(index)" v-show="index>0">删除</el-button>
                                </p>
                                <el-form-item label="股东类型" :prop="'data.' + index + '.dType'" :rules="item.rules.dType">
                                    <el-radio-group v-model="item.dType" @change="changeRulesType(item)">
                                        <el-radio-button :label="0">个人</el-radio-button>
                                        <el-radio-button :label="1">企业</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="持股区间" :prop="'data.' + index + '.holdType'" :rules="item.rules.holdType">
                                    <el-radio-group v-model="item.holdType" @change="changeRulesType(item)">
                                        <el-radio-button :label="0">10%(含)~25%(不含)</el-radio-button>
                                        <el-radio-button :label="1">25%以及以上</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <div v-if="item.dType=='1'">
                                    <el-form-item label="公司名称" :prop="'data.' + index + '.compName'" :rules="item.rules.compName" v-if="item.holdType=='0'">
                                        <el-input v-model="item.compName" placeholder="请输入公司名称" style="max-width: 320px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="企业所在地" :prop="'data.' + index + '.areaType'" :rules="item.rules.areaType">
                                        <el-radio-group v-model="item.areaType" @change="changeRulesType(item)">
                                            <el-radio-button :label="0">中国大陆</el-radio-button>
                                            <el-radio-button :label="1">中国香港</el-radio-button>
                                            <el-radio-button :label="2">其它</el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="" :prop="'data.' + index + '.registerAddr'" :rules="item.rules.registerAddr" v-if="item.areaType=='2'">
                                        <el-input v-model="item.registerAddr" placeholder="请输入企业注册所在地" style="max-width: 320px"></el-input>
                                    </el-form-item>
                                    <div v-if="item.holdType=='0'">
                                        <el-form-item label="成立日期" :prop="'data.' + index + '.vDate'" :rules="item.rules.vDate">
                                            <el-date-picker v-model="item.vDate" type="date" placeholder="选择成立日期" style="width:220px;">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="注册编号" :prop="'data.' + index + '.registerNo'" :rules="item.rules.registerNo" v-if="item.areaType!='0'">
                                            <el-input v-model="item.registerNo" placeholder="请输入注册编号" style="max-width: 320px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="统一社会信用代码" :prop="'data.' + index + '.vCode'" :rules="item.rules.vCode" v-if="item.areaType=='0'">
                                            <el-input v-model="item.vCode" placeholder="请输入统一社会信用代码" style="max-width: 320px"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div v-else>
                                    <div v-if="item.holdType=='0'">
                                        <el-form-item label="股东姓名" :prop="'data.' + index + '.dName'" :rules="item.rules.dName">
                                            <el-input v-model="item.dName" placeholder="请输入股东姓名" :prop="'domains.' + index + '.value'" style="max-width: 320px"></el-input>
                                        </el-form-item>
                                        <el-form-item label="股东性别" :prop="'data.' + index + '.sType'" :rules="item.rules.sType">
                                            <el-radio v-model="item.sType" label="0">男</el-radio>
                                            <el-radio v-model="item.sType" label="1">女</el-radio>
                                        </el-form-item>
                                        <el-form-item label="出生日期" :prop="'data.' + index + '.birthDate'" :rules="item.rules.birthDate">
                                            <el-date-picker v-model="item.birthDate" type="date" placeholder="选择出生日期" style="width:220px;">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="证件类型" :prop="'data.' + index + '.cardType'" :rules="item.rules.cardType">
                                            <el-radio v-model="item.cardType" label="0">身份证</el-radio>
                                            <el-radio v-model="item.cardType" label="1">护照</el-radio>
                                        </el-form-item>
                                        <el-form-item label="证件号码" :prop="'data.' + index + '.cardNo'" :rules="item.rules.cardNo">
                                            <el-input v-model="item.cardNo" placeholder="请输入股东证件号码" style="max-width: 320px"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <el-form-item :label="fileType" :rules="item.rules.compFile" :prop="'data.' + index + '.compFile'" v-if="item.holdType=='1'">
                                    <div v-if="item.dType=='1'">
                                        <p style="line-height: 15px" v-if="item.areaType=='0'">股份高于25%的中国大陆企业，请上传营业执照</p>
                                        <p style="line-height: 15px" v-if="item.areaType=='1'">股份高于25%的中国香港企业，请上传注册证书及商业登记证</p>
                                        <p style="line-height: 15px" v-if="item.areaType=='2'">股份高于25%的其他地区企业，请上传注册证书</p>
                                        <p style="line-height: 15px">格式限定为jpg、jpeg、bmp、pdf(请确保上传资料文字清晰可见，最大不超过5MB)</p>
                                    </div>
                                    <div v-else>
                                        <p style="line-height: 15px">股份高于25%的个人请上传股东身份证</p>
                                        <p style="line-height: 15px">格式限定为jpg、jpeg、bmp、pdf(请确保上传资料文字清晰可见，最大不超过5MB)</p>
                                    </div>
                                    <uploadFiles :index="index" :id="ruleFormDesc+index" @getFilesData="getEnterpFilesData" :max="2" :isDelete="false" :isCanDeleteModel="false" :ufiles="enterpAllFile[index]"></uploadFiles>
                                </el-form-item>
                            </div>
                            <el-form-item style="margin-top:40px">
                                <el-button type="primary" @click="addModel()" v-loading.fullscreen.lock="fullscreenLoading">添加股东</el-button>
                            </el-form-item>
                            <el-form-item style="margin-top: 40px">
                                <el-button type="success" @click="submitForm()" v-loading.fullscreen.lock="fullscreenLoading">下一步</el-button>
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
import uploadFiles from '../../../components/uploadFiles1'
import {
    complementInfoShareHoder
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
        topSteps,
        uploadFiles
    },
    data() {
        return {
            currModelNum: 0, //当前需要上传的董事
            backUrlFlag: 0,
            currShareNum: 0,
            fileType: '身份证副本(或护照)',
            ruleFormDesc: 'ruleForm',
            rulesDesc: 'rules',
            ruleFormItemDesc: '.',
            holderTypeDesc: 'dType',
            holderRangeDesc: 'holdType',
            holderNameDesc: 'dName',
            holderGenderDesc: 'sType',
            holderBirthdayDesc: 'birthDate',
            holderCertTypeDesc: 'cardType',
            holderCertNoDesc: 'cardNo',
            compNameDesc: 'compName',
            compAddrDesc: 'areaType',
            startDateDesc: 'vDate',
            compCodeDesc: 'vCode',
            shareCount: 1, //股东个数
            isActive: true,
            modelItem: {
                dType: '0', //股东类型
                holdType: '0', //持股区间
                sType: '0', //持股人性别
                dName: '', //持股人姓名
                birthDate: '', //持股人出生日期
                cardType: '0', //持股人证件类型
                cardNo: '', //持股人证件号码
                compName: '', //公司名称
                areaType: '0', //企业所在地
                vDate: '', //成立日期
                vCode: '', //统一社会编码
                registerNo: '', //注册号
                registerAddr: '', //企业注册所在地址
                compFile: '', //企业文件
                rules: {
                    dType: [
                        { required: true, message: '请选择股东类型', trigger: 'blur' },
                    ],
                    holdType: [
                        { required: true, message: '请选择持股区间', trigger: 'blur' },
                    ],
                    sType: [
                        { required: true, message: '请选择股东性别', trigger: 'blur' },
                    ],
                    cardType: [
                        { required: true, message: '请选择证件类型', trigger: 'blur' },
                    ],
                    dName: [
                        { required: true, message: '请输入股东姓名', trigger: 'blur' },
                    ],
                    birthDate: [
                        { required: true, message: '请选择股东出生日期', trigger: 'blur' },
                    ],
                    cardNo: [
                        { required: true, message: '请输入股东证件号码', trigger: 'blur' },
                    ],
                    compName: [
                        { required: false, message: '请输入公司名称', trigger: 'blur' },
                    ],
                    areaType: [
                        { required: false, message: '请选择企业所在地', trigger: 'blur' },
                    ],
                    vDate: [
                        { required: false, message: '请选择企业成立日期', trigger: 'blur' },
                    ],
                    vCode: [
                        { required: false, message: '请输入统一社会信用代码', trigger: 'blur' },
                    ],
                    registerNo: [
                        { required: false, message: '请输入企业注册号', trigger: 'blur' },
                    ],
                    registerAddr: [
                        { required: false, message: '请输入企业注册所在地', trigger: 'blur' },
                    ],
                    compFile: [
                        { required: false, message: '请选择文件', trigger: 'blur' },
                    ],
                },
                show: true
            },
            modelItem1: {
                ruleForm: {
                    holdType: '0', //持股区间
                    sType: '0', //持股人性别
                    dName: '', //持股人姓名
                    birthDate: '', //持股人出生日期
                    cardType: '0', //持股人证件类型
                    cardNo: '', //持股人证件号码
                    compName: '', //公司名称
                    areaType: '0', //企业所在地
                    vDate: '', //成立日期
                    vCode: '', //统一社会编码
                    registerNo: '', //注册号
                    registerAddr: '', //企业注册所在地址
                    compFile: '', //企业文件
                },
                rules: {
                    holdType: [
                        { required: true, message: '请选择持股区间', trigger: 'blur' },
                    ],
                    sType: [
                        { required: true, message: '请选择股东性别', trigger: 'blur' },
                    ],
                    cardType: [
                        { required: true, message: '请选择证件类型', trigger: 'blur' },
                    ],
                    dName: [
                        { required: true, message: '请输入股东姓名', trigger: 'blur' },
                    ],
                    birthDate: [
                        { required: true, message: '请选择股东出生日期', trigger: 'blur' },
                    ],
                    cardNo: [
                        { required: true, message: '请输入股东证件号码', trigger: 'blur' },
                    ],
                    compName: [
                        { required: false, message: '请输入公司名称', trigger: 'blur' },
                    ],
                    areaType: [
                        { required: false, message: '请选择企业所在地', trigger: 'blur' },
                    ],
                    vDate: [
                        { required: false, message: '请选择企业成立日期', trigger: 'blur' },
                    ],
                    vCode: [
                        { required: false, message: '请输入统一社会信用代码', trigger: 'blur' },
                    ],
                    registerNo: [
                        { required: false, message: '请输入企业注册号', trigger: 'blur' },
                    ],
                    registerAddr: [
                        { required: false, message: '请输入企业注册所在地', trigger: 'blur' },
                    ],
                    compFile: [
                        { required: false, message: '前选择文件', trigger: 'blur' },
                    ],
                },
                show: true
            },
            modelData: {
                data: [{
                    dType: '0', //股东类型
                    holdType: '0', //持股区间
                    sType: '0', //持股人性别
                    dName: '', //持股人姓名
                    birthDate: '', //持股人出生日期
                    cardType: '0', //持股人证件类型
                    cardNo: '', //持股人证件号码
                    compName: '', //公司名称
                    areaType: '0', //企业所在地
                    vDate: '', //成立日期
                    vCode: '', //统一社会编码
                    registerNo: '', //注册号
                    registerAddr: '', //企业注册所在地址
                    compFile: '', //企业文件
                    compFile: '', //身份证副本
                    rules: {
                        dType: [
                            { required: true, message: '请选择股东类型', trigger: 'blur' },
                        ],
                        holdType: [
                            { required: true, message: '请选择持股区间', trigger: 'blur' },
                        ],
                        sType: [
                            { required: true, message: '请选择股东性别', trigger: 'blur' },
                        ],
                        cardType: [
                            { required: true, message: '请选择证件类型', trigger: 'blur' },
                        ],
                        dName: [
                            { required: true, message: '请输入股东姓名', trigger: 'blur' },
                        ],
                        birthDate: [
                            { required: true, message: '请选择股东出生日期', trigger: 'blur' },
                        ],
                        cardNo: [
                            { required: true, message: '请输入股东证件号码', trigger: 'blur' },
                        ],
                        compFile: [
                            { required: false, message: '请选择文件', trigger: 'blur' },
                        ],
                        compName: [
                            { required: false, message: '请输入公司名称', trigger: 'blur' },
                        ],
                        areaType: [
                            { required: false, message: '请选择企业所在地', trigger: 'blur' },
                        ],
                        vDate: [
                            { required: false, message: '请选择企业成立日期', trigger: 'blur' },
                        ],
                        vCode: [
                            { required: false, message: '请输入统一社会信用代码', trigger: 'blur' },
                        ],
                        registerNo: [
                            { required: false, message: '请输入企业注册号', trigger: 'blur' },
                        ],
                        registerAddr: [
                            { required: false, message: '请输入企业注册所在地', trigger: 'blur' },
                        ],
                        compFile: [
                            { required: false, message: '前选择文件', trigger: 'blur' },
                        ],
                    },
                    show: true
                }]
            },
            fullscreenLoading: false,
            activeItem: '22',
            stepActive: 2,
            imageUrl: '',
            typeAuthor: '0',
            utitle1: '法定代表人',
            subtitle1: '身份证副本(或护照)',
            utitleEnterprise: '企业证书',
            enterpAllFile: [{ id: '', file: '', fileUrls: [{ fileUrl: '' }] }], //企业证书
            maxFileCount: 10,
            file_img_author: '',
            fileDelete: true,
            isCanDeleteModel: true,
        }
    },
    created() {
        if (this.$route.query.back) {

            this.backUrlFlag = this.$route.query.back;
        }
        if (this.$route.query.num) {

            this.currShareNum = parseInt(this.$route.query.num);
        }
    },
    watch: {

    },
    methods: {

        changeRulesType(item) {
            if (item.dType == '0') {
                if (item.holdType == '0') { //持股期间为0
                    item.rules.dName[0].required = true;
                    item.rules.sType[0].required = true;
                    item.rules.birthDate[0].required = true;
                    item.rules.cardType[0].required = true;
                    item.rules.cardNo[0].required = true;
                    item.rules.compFile[0].required = false;
                } else { //持股区间为1
                    item.rules.dName[0].required = false;
                    item.rules.sType[0].required = false;
                    item.rules.birthDate[0].required = false;
                    item.rules.cardType[0].required = false;
                    item.rules.cardNo[0].required = true;
                    item.rules.compFile[0].required = true;
                }
                item.rules.compName[0].required = false;
                item.rules.areaType[0].required = false;
                item.rules.vDate[0].required = false;
                item.rules.vCode[0].required = false;
                item.rules.registerNo[0].required = false;
                item.rules.registerAddr[0].required = false;
            } else {
                if (item.holdType == '0') { //持股期间为0
                    item.rules.compName[0].required = true;
                    item.rules.areaType[0].required = true;

                    if (item.areaType == '0') { //企业所在地0
                        item.rules.vDate[0].required = true;
                        item.rules.vCode[0].required = true;
                        item.rules.registerNo[0].required = false;
                        item.rules.registerAddr[0].required = false;
                        item.rules.compFile[0].required = false;
                    } else if (item.areaType == '1') { //企业所在地1
                        item.rules.vDate[0].required = true;
                        item.rules.vCode[0].required = false;
                        item.rules.registerNo[0].required = true;
                        item.rules.registerAddr[0].required = false;
                        item.rules.compFile[0].required = false;
                    } else {
                        item.rules.vDate[0].required = true;
                        item.rules.vCode[0].required = false;
                        item.rules.registerNo[0].required = true;
                        item.rules.registerAddr[0].required = true;
                        item.rules.compFile[0].required = false;
                    }
                } else { //持股区间为1
                    item.rules.vDate[0].required = false;
                    item.rules.vCode[0].required = false;
                    item.rules.registerNo[0].required = false;
                    item.rules.registerAddr[0].required = false;
                    item.rules.compFile[0].required = true;
                    if (item.areaType == '2') { //企业所在地2
                        item.rules.registerAddr[0].required = true;
                    }
                }
                item.rules.dName[0].required = false;
                item.rules.sType[0].required = false;
                item.rules.birthDate[0].required = false;
                item.rules.cardType[0].required = false;
                item.rules.cardNo[0].required = false;
            }
        },

        //动态删除指定的董事文件
        deleteModel(index) {
            console.log(this.modelData.data);
            console.log(index);
            console.log(this.modelData.data[index]);
            // this.modelData.data[index].show = false;
            // this.modelData.data.splice(index, 1);
            let tmp = [];
            let tmp1 = [];
            let count = 0;
            for (let i = 0; i < this.modelData.data.length; i++) {
                if (i != index) {
                    tmp[count] = this.modelData.data[i];
                    tmp1[count] = this.enterpAllFile[i];
                    count++;
                }
            }
            this.modelData.data = tmp;
            this.enterpAllFile = tmp1;
            console.log(this.modelData.data);
        },

        //增加一个董事
        addModel() {
            this.isActive = false;
            this.shareCount++;

            // let tmp1 = this.modelItem;
            // this.modelData.data[this.shareCount - 1] = tmp1;

            // let tmp = this.modelData.data;
            // this.modelData.data = "";
            // this.modelData.data = tmp;
            // console.log(this.modelData.data);

            this.modelData.data.push({
                dType: '0', //股东类型
                holdType: '0', //持股区间
                sType: '0', //持股人性别
                dName: '', //持股人姓名
                birthDate: '', //持股人出生日期
                cardType: '0', //持股人证件类型
                cardNo: '', //持股人证件号码
                compName: '', //公司名称
                areaType: '0', //企业所在地
                vDate: '', //成立日期
                vCode: '', //统一社会编码
                registerNo: '', //注册号
                registerAddr: '', //企业注册所在地址
                compFile: '', //企业文件
                rules: {
                    dType: [
                        { required: true, message: '请选择股东类型', trigger: 'blur' },
                    ],
                    holdType: [
                        { required: true, message: '请选择持股区间', trigger: 'blur' },
                    ],
                    sType: [
                        { required: true, message: '请选择股东性别', trigger: 'blur' },
                    ],
                    cardType: [
                        { required: true, message: '请选择证件类型', trigger: 'blur' },
                    ],
                    dName: [
                        { required: true, message: '请输入股东姓名', trigger: 'blur' },
                    ],
                    birthDate: [
                        { required: true, message: '请选择股东出生日期', trigger: 'blur' },
                    ],
                    cardNo: [
                        { required: true, message: '请输入股东证件号码', trigger: 'blur' },
                    ],
                    compName: [
                        { required: false, message: '请输入公司名称', trigger: 'blur' },
                    ],
                    areaType: [
                        { required: false, message: '请选择企业所在地', trigger: 'blur' },
                    ],
                    vDate: [
                        { required: false, message: '请选择企业成立日期', trigger: 'blur' },
                    ],
                    vCode: [
                        { required: false, message: '请输入统一社会信用代码', trigger: 'blur' },
                    ],
                    registerNo: [
                        { required: false, message: '请输入企业注册号', trigger: 'blur' },
                    ],
                    registerAddr: [
                        { required: false, message: '请输入企业注册所在地', trigger: 'blur' },
                    ],
                    compFile: [
                        { required: false, message: '前选择文件', trigger: 'blur' },
                    ],
                },
                show: true
            });
            this.enterpAllFile.push({
                id: '',
                file: '',
                fileUrls: [{ fileUrl: '' }]
            });
            this.isActive = true;

        },

        //改变公司注册地
        changeBodyType() {
            if (this.areaType == '1') {
                this.typeAuthor = '1';
                this.rules.regAddr[0].required = false;
                this.utitle1 = "董事";
            } else if (this.areaType == '0') {
                this.typeAuthor = '0';
                this.rules.regAddr[0].required = false;
                this.utitle1 = "法定代表人";
                this.directors1 = 0;
                this.directors1 = 1;
            } else {
                this.typeAuthor = '2';
                this.rules.regAddr[0].required = true;
                this.utitle1 = "董事";
            }
        },

        submitForm() {
            this.$refs['modelData'].validate((valid) => {
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
            let requestData = [];
            let count = 0;
            if (this.modelData.data[this.currModelNum].show == true) {
                // requestData[count] = this.modelData.data[i].ruleForm;
                // count++;
                let tmp = this.modelData.data[this.currModelNum];
                tmp['rules'] = '';
                let tmpVDate = tmp['vDate'];
                let tmpbirDate = tmp['birthDate'];
                let vDateStr = new Date(tmpVDate).getFullYear() + '-' + (("0" + (new Date(tmpVDate).getMonth() + 1)).slice(-2)) + '-' + new Date(tmpVDate).getDate();
                let birDateStr = new Date(tmpbirDate).getFullYear() + '-' + (("0" + (new Date(tmpbirDate).getMonth() + 1)).slice(-2)) + '-' + new Date(tmpbirDate).getDate();
                this.modelData.data[this.currModelNum]['vDate'] = vDateStr;
                this.modelData.data[this.currModelNum]['birthDate'] = birDateStr;
                complementInfoShareHoder(tmp, function(ret) {
                    handler.responseComplementInfo(ret);
                });
            }
        },

        responseComplementInfo(ret) {

            this.fullscreenLoading = false;
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.currModelNum++;
                if (this.currModelNum < this.modelData['data'].length) {
                    this.requestComplementInfo();
                    return;
                }

                if (this.backUrlFlag == 1) {
                    this.$router.replace({ path: '/compinfo/pandect' });
                } else {
                    this.$router.replace({ path: '/compinfo/business' });
                }

                return;
            }
        },
        //获取企业证书文件或身份证副本
        getEnterpFilesData(data) {
            let index = data[0];
            let fileData = data[1];
            this.enterpAllFile[index] = fileData;
            if (fileData.file.length > 0) {
                this.modelData.data[index].compFile = fileData.file;
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

.avatar-uploader .no-border {
    margin: 0px 10px;
    border-width: 0px;
    width: 50px
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader .el-upload-add {
    /*border-radius: 6px;*/
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 10px 0px;
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

.no-border .file-img {
    width: 50px;
}

.no-border .file-img .avatar-uploader-icon {
    width: 50px;
    font-size: 36px;
}

.el-card__body {
    padding: 0px!important;
}
</style>