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
                <el-card class="box-card" style="min-height: 560px">
                    <top-steps :stepActive="stepActive"></top-steps>
                    <div class="form-div">
                        <div class="title">企业信息</div>
                        <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                            <el-form-item label="企业注册名称" prop="registerName">
                                <el-input v-model="ruleForm.registerName" placeholder="请输入企业注册名称" style="max-width: 320px"></el-input>
                            </el-form-item>
                            <el-form-item label="企业注册所在地" prop="areaType">
                                <el-radio-group v-model="ruleForm.areaType" @change="changeBodyType()">
                                    <el-radio-button :label="0">中国大陆</el-radio-button>
                                    <el-radio-button :label="1">中国香港</el-radio-button>
                                    <el-radio-button :label="2">其它</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label=" " prop="regAddr" v-show="typeAuthor=='2'">
                                <el-input v-model="ruleForm.regAddr" placeholder="请输入企业注册地址" style="max-width: 320px"></el-input>
                            </el-form-item>
                            <el-form-item label="企业经营地址" prop="opAddr">
                                <el-input v-model="ruleForm.opAddr" placeholder="请输入企业经营地址" style="max-width: 320px"></el-input>
                            </el-form-item>
                            <!-- 企业证书  -->
                            <el-form-item label="企业证书" :prop="enterpId">
                                <p style="line-height: 15px">格式限定为jpg、jpeg、bmp、pdf(请确保上传资料文字清晰可见，最大不超过5MB)</p>
                                <uploadFiles :id="enterpId" @getFilesData="getEnterpFilesData" :max="2" :isDelete="false" :isCanDeleteModel="false" :ufiles="enterpAllFile" :imgBaseUrl="true" v-if="isShowAuth==true"></uploadFiles>
                            </el-form-item>
                            <!--  法人代表 -->
                            <div v-for="(item,index) in directors1" v-if="typeAuthor=='0'">
                                <p>法定代表</p>
                                <el-form-item label="身份证副本或护照" :prop="corporationId+index">
                                    <p style="line-height: 15px">格式限定为jpg、jpeg、bmp、pdf(请确保上传资料文字清晰可见，最大不超过5MB)</p>
                                    <uploadFiles @getFilesData="getCorporationFilesData" :max="maxFileCount" :isDelete="false" :isCanDeleteModel="false" :id="corporationId+index" :ufiles="corporationFile[0]" :index="index" :imgBaseUrl="true" v-if="isShowCard==true"></uploadFiles>
                                </el-form-item>
                            </div>
                            <div v-for="(item,index) in directorsAllFile" v-else>
                                <div v-if="item.userful==true">
                                    <p>董事 {{item.index}}
                                        <el-button type="danger" @click="deleteModel(index)" v-show="index>0">删除</el-button>
                                    </p>
                                    <el-form-item label="身份证副本或护照" :prop="directId+index">
                                        <p style="line-height: 15px">格式限定为jpg、jpeg、bmp、pdf(请确保上传资料文字清晰可见，最大不超过5MB)</p>
                                        <uploadFiles @getFilesData="getDirectFilesData" :max="maxFileCount" :isDelete="false" :isCanDeleteModel="false" :id="directId+index" :index="index" :ufiles="item" :imgBaseUrl="true" v-if="isShowCard==true"></uploadFiles>
                                    </el-form-item>
                                </div>
                            </div>
                            <el-form-item v-show="typeAuthor=='1'" style="margin-top:40px">
                                <el-button type="primary" @click="addDirectorNum()" v-loading.fullscreen.lock="fullscreenLoading" v-show="typeAuthor=='1'">添加董事</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">确定</el-button>
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
    complementInfoEnterprise,
    infoEnterprise,
    editEnterpriseInfo
} from '../../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_DATA,
    responsePassword,
} from '../../../config/response'
import {
    baseUrl
} from '../../../config/env'
export default {
    components: {
        leftAside,
        headerTop,
        topSteps,
        uploadFiles
    },
    data() {
        return {
            currentAreaType: '', //
            deleteImgIds: [], //要删除的图片ID
            isShowAuth: false,
            isShowCard: false,
            enterpId: 'certFiles',
            directId: 'directorFiles',
            corporationId: 'corporationFiles',
            fullscreenLoading: false,
            activeItem: '22',
            accountData: '',
            stepActive: 1,
            imageUrl: '',
            typeAuthor: '0',
            utitle1: '法定代表人',
            subtitle1: '身份证副本(或护照)',
            utitleEnterprise: '企业证书',
            enterpAllFile: { id: '', file: '', fileUrls: [{ fileUrl: '' }] }, //企业证书
            maxFileCount: 10,
            file_img_author: '',
            fileDelete: true,
            isCanDeleteModel: true,
            directors1: 1, //法人代表个数
            directors: 1, //董事的个数
            tmpDirectorFile: '', //中间的
            corporationFile: [{ id: '', file: '', fileUrls: [{ fileUrl: '' }] }], //法人代表的文件
            directorsAllFile: [{ index: 1, file: '', fileUrls: [{ fileUrl: '' }], userful: true }], //董事的所有文件
            directorUploadFile: '', //要上传的文件
            ruleForm: {
                id: '',
                registerName: '', //企业名称
                regAddr: '', //企业注册所在地
                areaType: '0', //企业注册所在地
                opAddr: '', //企业地址
            },
            resultForm: {

            },
            rules: {
                registerName: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' },
                ],
                regAddr: [
                    { required: false, message: '其输入企业注册所在地', trigger: 'blur' },
                ],
                opAddr: [
                    { required: true, message: '请输入企业经营地址', trigger: 'blur' },
                ],
                areaType: [
                    { required: true, message: '请选择企业注册地', trigger: 'blur' },
                ],
                file_img_author: [
                    { required: true, message: '请上传你的授权书', trigger: 'blur' },
                ],
                file_img_card: [
                    { required: true, message: '请上传您的身份证副本', trigger: 'blur' },
                ],
                certFiles: [
                    { required: true, message: '请上传您的企业证书', trigger: 'blur' },
                ],
                directorFiles0: [
                    { required: true, message: '请上传董事的身份证副本或护照', trigger: 'blur' },
                ],
                corporationFiles0: [
                    { required: true, message: '请上传法人的身份证副本或护照', trigger: 'blur' },
                ],
            },
        }
    },
    created() {
        this.requestEnterpriseInfo();
    },
    watch: {

    },
    methods: {

        requestEnterpriseInfo() {

            let handler = this;
            infoEnterprise(function(ret) {
                // console.log("success=" + data);
                handler.responseEnterpriseInfo(ret);
            });
        },

        responseEnterpriseInfo(ret) {

            let response = responseResult(this, ret, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                let compInfo = ret.retData.compInfo;
                let imgArr = ret.retData.imgArr;
                this.ruleForm.id = compInfo.id;
                this.ruleForm.areaType = compInfo.areaType;
                this.currentAreaType = this.ruleForm.areaType;
                this.ruleForm.registerName = compInfo.registerName;
                this.ruleForm.opAddr = compInfo.opAddr;
                this.ruleForm.regAddr = compInfo.regAddr;

                // 企业证书
                if (imgArr.length > 0) {
                    let tmpEnterpFiles = [];
                    let count = 0;
                    for (let i = 0; i < imgArr.length; i++) {
                        let tmpImg = imgArr[i];
                        if (tmpImg.type == 0) {
                            let tmpImgArrItem = tmpImg.imgArr;

                            for (let j = 0; j < tmpImgArrItem.length; j++) {
                                let tmp = { id: tmpImgArrItem[j]['id'], fileUrl: tmpImgArrItem[j]['link'] };
                                tmpEnterpFiles[count] = tmp;
                                count++;
                            }
                        }
                    }
                    this.enterpAllFile['fileUrls'] = tmpEnterpFiles;
                    this.isShowAuth = true;
                    if (tmpEnterpFiles.length > 0) {
                        this.ruleForm['certFiles'] = true;
                    }


                    //法人和董事
                    let tmpCardFiles = [];
                    let count1 = 0;
                    for (let i = 0; i < imgArr.length; i++) {
                        let tmpImg = imgArr[i];
                        let tmpCardItemArr = [];
                        let count2 = 0;
                        if (tmpImg.type == 1) {
                            let tmpImgArrItem = tmpImg.imgArr;

                            for (let j = 0; j < tmpImgArrItem.length; j++) {
                                let tmp = { id: tmpImgArrItem[j]['id'], fileUrl: tmpImgArrItem[j]['link'] };
                                tmpCardItemArr[count2] = tmp;
                                count2++;
                            }
                            let tmp22 = { index: count1 + 1, fileUrls: tmpCardItemArr, userful: true, file: '' };
                            tmpCardFiles[count1] = tmp22;
                            count1++;
                        }
                    }

                    if (tmpCardFiles.length > 0) {
                        // this.corporationFile['fileUrls'] = tmpCardFiles;
                        //  this.directorsAllFile['fileUrls'] = tmpCardFiles;
                        if (this.ruleForm.areaType == '0' || this.ruleForm.areaType == 0) {
                            this.corporationFile = tmpCardFiles;
                            if (tmpCardFiles.length > 0) {
                                this.ruleForm['directorFiles0'] = true;
                                this.ruleForm['corporationFiles0'] = true;

                            }
                        } else {
                            this.directorsAllFile = tmpCardFiles;
                            if (tmpCardFiles.length > 0) {
                                this.ruleForm['certFiles'] = true;
                                this.ruleForm['corporationFiles0'] = true;
                                this.directors = count1;
                            }

                            this.updateRuleFormDirector();
                        }
                    }
                    this.isShowCard = true;
                }
                this.changeBodyType();
                return;
            }
        },

        //增加一个董事
        addDirectorNum() {
            this.directors++;
            this.directorsAllFile[this.directors - 1] = { index: this.directors, file: '', fileUrls: [{ fileUrl: '' }], userful: true };
            this.updateDirectIndex();
            this.updateDirectRules();
            let tmp = this.directorsAllFile;
            this.directorsAllFile = [];
            this.directorsAllFile = tmp;

        },

        //改变公司注册地
        changeBodyType() {
             this.initFilesItem(); 
            if (this.ruleForm.areaType == '1' || this.ruleForm.areaType == 1) {
                this.typeAuthor = '1';
                this.rules.regAddr[0].required = false;
                this.utitle1 = "董事";

            } else if (this.ruleForm.areaType == '0' || this.ruleForm.areaType == 0) {
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

        initFilesItem() {
            console.log("=============initFilesItem=============");
            console.log(this.currentAreaType);
            if (this.ruleForm.areaType == '1' || this.ruleForm.areaType == 1) {

                if (this.currentAreaType == 0 || this.currentAreaType == '0') {
                    this.directorsAllFile = this.corporationFile;
                }
            } else if (this.ruleForm.areaType == '0' || this.ruleForm.areaType == 0) {
                console.log("============this.ruleForm.areaType == 0============"); 
                if (this.currentAreaType != 0 && this.currentAreaType != '0') {
                    console.log("============");
                    console.log(this.directorsAllFile[0]);
                    this.corporationFile[0] = this.directorsAllFile[0];
                }
                console.log(this.corporationFile);
            } else {
                if (this.currentAreaType == 0 || this.currentAreaType == '0') {
                    this.directorsAllFile = this.corporationFile;
                }
            }

            console.log(this.corporationFile);
            console.log("==============directorsAllFile=============");
            console.log(this.directorsAllFile);
        },


        deleteUnUserfulFile(){
            
            if(this.currentAreaType==1 || this.currentAreaType=='1'){
                if(this.ruleForm.areaType == '0' || this.ruleForm.areaType == 0){
                    if(this.directorsAllFile.length>1){
                        for(let i=1;i<this.directorsAllFile.length;i++){
                            this.deleteModel(i);
                        }
                    }
                }
            }
        },

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

            this.conformRequestData();
            this.resultForm['chgIds'] = this.deleteImgIds;
            console.log(this.resultForm);
            editEnterpriseInfo(this.resultForm, function(ret) {
                handler.responseComplementInfo(ret);
            });
        },

        responseComplementInfo(ret) {
            this.fullscreenLoading = false;
            let response = responseResult(this, ret);
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
        //动态获取董事的文件
        getDirectFilesData(data) {
            let index = data[0];
            let fileData = data[1];
            this.directorsAllFile[index] = fileData;
            if (fileData.file.length > 0) {
                this.ruleForm[this.directId + index] = true;
            } else {
                this.ruleForm[this.directId + index] = '';
            }
        },
        //动态获取法定代表人的文件
        getCorporationFilesData(data) {
            let index = data[0];
            let fileData = data[1];
            this.corporationFile[0] = fileData;
            if (fileData.file.length > 0) {
                this.ruleForm[this.corporationId + index] = true;
            } else {
                this.ruleForm[this.corporationId + index] = '';
            }

        },
        //获取企业证书文件
        getEnterpFilesData(data) {
            let index = data[0];
            let fileData = data[1];
            this.enterpAllFile = fileData;
            if (fileData.file.length > 0) {
                this.ruleForm['certFiles'] = true;
            } else {
                this.ruleForm['certFiles'] = '';
            }

        },

        //动态删除指定的董事文件
        deleteModel(index) {
            this.directorsAllFile[index]['userful'] = false;
            this.directors = this.directors - 1;
            this.updateDirectIndex();
            this.updateDirectRules();
            let tmp = this.directorsAllFile;
            this.directorsAllFile = [];
            this.directorsAllFile = tmp;
            for (let i = 0; i < this.directorsAllFile[index]['fileUrls'].length; i++) {

                this.saveUpdateImgId(this.directorsAllFile[index]['fileUrls'][i]['id']);
            }
        },

        //动态的分配董事的编号
        updateDirectIndex() {
            let count = 0;
            for (let i = 0; i < this.directorsAllFile.length; i++) {
                let item = this.directorsAllFile[i];
                if (item.userful == true) {
                    count++;
                    item.index = count;
                }
            }
        },

        //整合上传前的数据和文件
        conformRequestData() {
            //公司文件
            this.resultForm['registerName'] = this.ruleForm['registerName'];
            this.resultForm['areaType'] = this.ruleForm['areaType'];
            this.resultForm['opAddr'] = this.ruleForm['opAddr'];
            this.resultForm['regAddr'] = this.ruleForm['regAddr'];
            this.resultForm['id'] = this.ruleForm['id'];


            let tmpEnterFileUrls = this.enterpAllFile['fileUrls'];
            let tmpEnterFiles = this.enterpAllFile['file'];
            let tmpEnterResultFiles = [];
            // for (let i = 0; i < tmpEnterFileUrls.length; i++) {
            //     tmpEnterResultFiles[i] = tmpEnterFileUrls[i]['fileUrl'];
            // }
            let enterCount = 0;
            for (let i = 0; i < tmpEnterFiles.length; i++) {
                if (tmpEnterFiles[i] && tmpEnterFiles[i] != '') {
                    tmpEnterResultFiles[enterCount] = tmpEnterFiles[i];
                    //获取修改的图片的ID
                    this.saveUpdateImgId(this.enterpAllFile['fileUrls'][i]['id']);
                    enterCount++;
                }
            }

            this.resultForm['certFiles'] = tmpEnterResultFiles;

            let count = 0;
            //董事和法人文件
            let tmpDirectFile = '';
            if (this.resultForm['areaType'] == '0') {
                console.log(this.corporationFile[0]['file']);
                let tmpFileUrls = this.corporationFile[0]['fileUrls'];
                let tmpFiles = this.corporationFile[0]['file'];
                let tmpResultFiles = [];
                // for (let i = 0; i < tmpFileUrls.length; i++) {
                //     tmpResultFiles[i] = tmpFileUrls[i]['fileUrl'];

                // }

                let directCount = 0;
                if (tmpFiles != '') {
                    for (let i = 0; i < tmpFiles.length; i++) {
                        if (tmpFiles[i] && tmpFiles[i] != '') {
                            tmpResultFiles[directCount] = tmpFiles[i];
                            //获取修改的图片的ID
                            this.saveUpdateImgId(this.corporationFile[0]['fileUrls'][i]['id']);
                            directCount++;
                        }
                    }

                    tmpDirectFile = this.corporationFile[0]['file'];
                    this.resultForm['directorFiles'] = tmpResultFiles;
                    this.resultForm['count'] = 1;
                }

                this.deleteUnUserfulFile();
            } else {
                for (let i = 0; i < this.directorsAllFile.length; i++) {
                    let tmpDitectItem = this.directorsAllFile[i];

                    //判断是否是新增的董事


                    let tmpDirectorFileUrl = [];
                    // let count111=0; 
                    // for(let j=0;j<tmpDitectItem['fileUrls'].length;j++){
                    //     let tmp = tmpDitectItem['fileUrls'][j];
                    //     if(tmp['fileUrl'] !=''){
                    //      tmpDirectorFileUrl[count111] = tmp['fileUrl'];
                    //      count111++;   
                    //     }                        
                    // }

                    let directCount1 = 0;
                    for (let j = 0; j < tmpDitectItem['file'].length; j++) {
                        let tmp1 = tmpDitectItem['file'][j];
                        if (tmp1 && tmp1 != '') {
                            tmpDirectorFileUrl[directCount1] = tmp1;
                            //获取修改的图片的ID
                            this.saveUpdateImgId(tmpDitectItem['fileUrls'][j]['id']);
                            directCount1++;
                        }
                    }

                    if (tmpDitectItem.userful == true) {
                        if (count >= 1) {
                            this.resultForm['directorFiles' + count] = tmpDirectorFileUrl;
                        } else {
                            this.resultForm['directorFiles'] = tmpDirectorFileUrl;
                        }
                        count++;

                    }
                }
                this.resultForm['count'] = count;
            }
        },

        //初始化的时候增加ruleForm的director
        updateRuleFormDirector() {
            for (let i = 0; i < this.directorsAllFile.length; i++) {
                this.ruleForm['directorFiles' + i] = true;
            }
        },

        //动态的改变rules
        updateDirectRules() {
            for (let i = 0; i < this.directorsAllFile.length; i++) {
                let item = this.directorsAllFile[i];
                let rulesMap = eval(this.rules);
                let flag = false;
                for (let ruleKey in rulesMap) {
                    if (ruleKey == (this.directId + i)) {
                        if (item.userful == true) {
                            this.rules[ruleKey].required = true;
                        } else {
                            this.rules[ruleKey].required = false;
                        }
                        flag = true;
                    }
                }

                if (flag == false) {
                    //新增一条rules
                    let tmp = { required: true, message: '请上传董事的身份证副本或护照', trigger: 'blur' };
                    this.rules[this.directId + i] = tmp;
                }
            }
        },

        //存储要删除的文件的id
        saveUpdateImgId(id) {
            let del = false;
            for (let i = 0; i < this.deleteImgIds.length; i++) {
                if (id == this.deleteImgIds[i]) {
                    del = true;
                }
            }
            if (del == false) {
                this.deleteImgIds[this.deleteImgIds.length] = id;
            }
        }

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
</style>