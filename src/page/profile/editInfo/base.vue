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
                        <div class="title">注册人信息</div>
                        <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                            <el-form-item label="您的身份" prop="bodyType">
                                <el-radio-group v-model="ruleForm.bodyType" @change="changeBodyType()">
                                    <el-radio-button :label="0">授权代表人</el-radio-button>
                                    <el-radio-button :label="1">法定代表人</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="请上传授权书" prop="file_img_author" class="avatar-uploader" v-show="typeAuthor=='0'">
                                <p style="line-height: 15px">请参照授权书模板上传附件 <a href="http://od60al7id.bkt.clouddn.com/%E5%AF%BB%E5%AE%9D%E5%9B%BE%E6%8E%88%E6%9D%83%E4%B9%A6%E6%A8%A1%E6%9D%BF.pdf" style="color:">下载授权书模板>>></a></p>
                                <p style="line-height: 15px">格式限定为jpg、jpeg、bmp、pdf(请确保上传资料文字清晰可见，最大不超过5MB)</p>
                                <uploadFiles :id="authId" @getFilesData="getAuthFilesData" :max="1" :isDelete="false" :isCanDeleteModel="false" :ufiles="authAllFile" :imgBaseUrl="true" v-if="isShowAuth==true"></uploadFiles>
                            </el-form-item>
                            <el-form-item label="请上传身份证副本" prop="file_img_card" class="avatar-uploader" v-show="typeAuthor=='0'">
                                <p style="line-height: 15px">格式限定为jpg、jpeg、bmp、pdf(请确保上传资料文字清晰可见，最大不超过5MB)</p>
                                <uploadFiles :id="cardId" @getFilesData="getCardFilesData" :max="2" :isDelete="false" :isCanDeleteModel="false" :ufiles="cardAllFile" :imgBaseUrl="true" v-if="isShowCard==true"></uploadFiles>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">确&nbsp;&nbsp;&nbsp;定</el-button>
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
import uploadFiles from '../../../components/uploadFiles2'
import {
    complementInfoBase,
    infoRegister,
    editRegister
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
            authId: 'authFiles',
            cardId: 'cardFiles',
            fullscreenLoading: false,
            activeItem: '22',
            accountData: '',
            stepActive: 0,
            imageUrl: '',
            file_img_author: '', //授权书
            file_img_card: '', //身份证副本-正面
            file_img_card_opp: '', //身份证副本-反面
            typeAuthor: '0',
            authAllFile: { id: '', file: '', fileUrls: [{ fileUrl: '' }] }, //企业证书
            cardAllFile: { id: '', file: '', fileUrls: [{ fileUrl: '' }] }, //身份证
            isShowAuth: false,
            isShowCard: false,
            deleteImgIds: [], //要删除的图片ID
            cardImgArr: '', //身份证图片数组
            authImgArr: '', //证书图片数组
            ruleForm: {
                bodyType: '0',
                file_img_author: '', //授权书
                file_img_card: '', //身份证副本-正面
                file_img_card_opp: '', //身份证副本-反面
            },
            rules: {
                bodyType: [
                    { required: true, message: '请选择您的身份', trigger: 'blur' },
                ],
                file_img_author: [
                    { required: true, message: '请上传你的授权书', trigger: 'blur' },
                ],
                file_img_card: [
                    { required: true, message: '请上传您的身份证副本', trigger: 'blur' },
                ],
            },

        }
    },
    created() {
        this.requestRegisterInfo();
    },
    watch: {

    },
    methods: {

        changeBodyType() {
            if (this.ruleForm.bodyType == '1') {
                this.typeAuthor = '1';
                this.rules.file_img_author[0].required = false;
                this.rules.file_img_card[0].required = false;
            } else {
                this.typeAuthor = '0';
                this.rules.file_img_author[0].required = true;
                this.rules.file_img_card[0].required = true;
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
                this.ruleForm.bodyType = ret.retData.uType;
                this.changeBodyType();
                let tmpItem = ret.retData.imgArr;
                let tmpAuthUrls = [];
                let count = 0;
                let tmpCardUrls = [];
                let count1 = 0;

                if (tmpItem.length > 0) {
                    for (let i = 0; i < tmpItem.length; i++) {
                        if (tmpItem[i].type == 0) {
                            let tmpFileUrl = { id: tmpItem[i].id, fileUrl: tmpItem[i].url };
                            tmpAuthUrls[count] = tmpFileUrl;
                            count++;
                        }
                        if (tmpItem[i].type == 1) {
                            let tmpFileUrl = { id: tmpItem[i].id, fileUrl: tmpItem[i].url };
                            tmpCardUrls[count1] = tmpFileUrl;
                            count1++;
                        }
                    }

                    let tmp = this.authAllFile;
                    tmp['fileUrls'] = tmpAuthUrls;
                    this.authImgArr = tmpAuthUrls;
                    let tmp1 = this.cardAllFile;
                    tmp1['fileUrls'] = tmpCardUrls;
                    this.cardImgArr = tmpCardUrls;
                    this.ruleForm['file_img_card'] = true;
                    this.ruleForm['file_img_author'] = true;

                    this.authAllFile = tmp;
                    this.cardAllFile = tmp1;
                } else {

                }
                this.isShowAuth = true;
                this.isShowCard = true;

                return;
            }
        },

        requestComplementInfo() {
            this.fullscreenLoading = true;
            let handler = this;
            let tmpAuthFile = [];
            // tmpAuthFile[0] = this.authAllFile['fileUrls'][0]['fileUrl'];
            let tmpCardFile = [];
            if (this.ruleForm.bodyType == '0') {
                if (this.authAllFile['file'] != '') {
                    tmpAuthFile = this.authAllFile['file'][0];
                    this.saveUpdateImgId(this.authAllFile['fileUrls'][0]['id']);
                }

                // for (let i = 0; i < this.cardAllFile['fileUrls'].length; i++) {
                //     tmpCardFile[i] = this.cardAllFile['fileUrls'][i]['fileUrl'];
                // }
                let cardCount = 0;
                if (this.cardAllFile['file'] != '') {
                    for (let i = 0; i < this.cardAllFile['file'].length; i++) {
                        if (this.cardAllFile['file'][i] && this.cardAllFile['file'][i] != '') {
                            tmpCardFile[cardCount] = this.cardAllFile['file'][i];
                            cardCount++;
                            //获取修改的图片的ID
                            this.saveUpdateImgId(this.cardAllFile['fileUrls'][i]['id']);
                        }
                    }
                }
            } else {
                this.deleteAllImgId();
            }
            editRegister(this.ruleForm.bodyType, tmpAuthFile, tmpCardFile, this.deleteImgIds, function(ret) {
                // console.log("success=" + data);
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

        //获取授权文件
        getAuthFilesData(data) {
            let index = data[0];
            let fileData = data[1];
            this.authAllFile = fileData;
            if (fileData.file.length > 0) {
                this.ruleForm['file_img_author'] = true;
            } else {
                this.ruleForm['file_img_author'] = '';
            }

        },
        //获取身份证副本
        getCardFilesData(data) {
            let index = data[0];
            let fileData = data[1];

            this.cardAllFile = fileData;
            if (fileData.file.length > 0) {
                this.ruleForm['file_img_card'] = true;
            } else {
                this.ruleForm['file_img_card'] = '';
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
        },

        //删除所有的图片
        deleteAllImgId() {

            for (let i = 0; i < (this.authAllFile['fileUrls']).length; i++) {
                this.saveUpdateImgId(this.authAllFile['fileUrls'][i]['id']);
            }
            for (let j = 0; j < (this.cardAllFile['fileUrls']).length; j++) {
                this.saveUpdateImgId(this.cardAllFile['fileUrls'][j]['id']);
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

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
</style>