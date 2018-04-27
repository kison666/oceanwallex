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
                                <p style="line-height: 15px" v-if="ruleForm.areaType=='0'">中国大陆企业请上传营业执照，文件格式限定为jpg、jpeg、png、bmp、pdf(请确保上传资料文字清晰可见，最大不超过5MB)</p>
                                <p style="line-height: 15px" v-else-if="ruleForm.areaType=='1'">
                                    中国香港企业请上传注册证书及商业登记证，文件格式限定为jpg、jpeg、png、bmp、pdf(请确保上传资料文字清晰可见，最大不超过5MB)</p>
                                <p style="line-height: 15px" v-else>
                                    其他地区的企业请上传注册证书，文件格式限定为jpg、jpeg、png、bmp、pdf(请确保上传资料文字清晰可见，最大不超过5MB)</p>
                                <uploadFiles :id="enterpId" @getFilesData="getEnterpFilesData" :max="2" :isDelete="false" :isCanDeleteModel="false" :isTitle="false" :subTitle="utitleEnterprise" :ufiles="enterpAllFile"></uploadFiles>
                            </el-form-item>
                            <!--  法人代表 -->
                            <div v-for="(item,index) in directors1" v-if="typeAuthor=='0'">
                                <p>法定代表</p>
                                <el-form-item label="身份证副本或驾照" :prop="corporationId+index">
                                    <p style="line-height: 15px">格式限定为jpg、jpeg、bmp、pdf(请确保上传资料文字清晰可见，最大不超过5MB)</p>
                                    <uploadFiles @getFilesData="getCorporationFilesData" :max="maxFileCount" :isDelete="false" :isCanDeleteModel="false" :id="corporationId+index" :ufiles="corporationFile" :index="index"></uploadFiles>
                                </el-form-item>
                            </div>
                            <div v-for="(item,index) in directorsAllFile" v-else>
                                <div v-if="item.userful==true">
                                    <p>董事 {{item.index}}
                                        <el-button type="danger" @click="deleteModel(index)" v-show="index>0">删除</el-button>
                                    </p>
                                    <el-form-item label="身份证副本或驾照" :prop="directId+index">
                                        <p style="line-height: 15px">格式限定为jpg、jpeg、bmp、pdf(请确保上传资料文字清晰可见，最大不超过5MB)</p>
                                        <uploadFiles @getFilesData="getDirectFilesData" :max="maxFileCount" :isDelete="false" :isCanDeleteModel="false" :id="directId+index" :index="index" :ufiles="directorsAllFile[index]"></uploadFiles>
                                    </el-form-item>
                                </div>
                            </div>
                            <el-form-item v-show="typeAuthor=='1'" style="margin-top:40px">
                                <el-button type="primary" @click="addDirectorNum()" v-loading.fullscreen.lock="fullscreenLoading" v-show="typeAuthor=='1'">添加董事</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="success" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">下一步</el-button>
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
    complementInfoEnterprise
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
            corporationFile: { id: '', file: '', fileUrls: [{ fileUrl: '' }] }, //法人代表的文件
            directorsAllFile: [{ index: 1, file: '', fileUrls: [{ fileUrl: '' }], userful: true }], //董事的所有文件
            directorUploadFile: '', //要上传的文件
            ruleForm: {
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

    },
    watch: {

    },
    methods: {

        //增加一个董事
        addDirectorNum() {
            this.directors++;
            this.directorsAllFile[this.directors - 1] = { index: this.directors, file: '', fileUrls: [{ fileUrl: '' }], userful: true };
            this.updateDirectIndex();
            this.updateDirectRules();
            console.log(this.directorsAllFile);
            let tmp = this.directorsAllFile;
            this.directorsAllFile = [];
            this.directorsAllFile = tmp;

        },

        //改变公司注册地
        changeBodyType() {
            if (this.ruleForm.areaType == '1') {
                this.typeAuthor = '1';
                this.rules.regAddr[0].required = false;
                this.utitle1 = "董事";
            } else if (this.ruleForm.areaType == '0') {
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
            complementInfoEnterprise(this.resultForm, function(ret) {
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
                    path: '/compinfo/shareholder'
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
            this.corporationFile = fileData;
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
            this.directorsAllFile[index].userful = false;
            this.directors = this.directors - 1;
            this.updateDirectIndex();
            this.updateDirectRules();
            let tmp = this.directorsAllFile;
            this.directorsAllFile = [];
            this.directorsAllFile = tmp;
            console.log(this.directorsAllFile);
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

            let tmpEnterFile = this.enterpAllFile['file'];
            this.resultForm['certFiles'] = tmpEnterFile;
            let count = 0;
            //董事和法人文件
            let tmpDirectFile = '';
            if (this.resultForm['areaType'] == '0') {
                tmpDirectFile = this.corporationFile.file;
                this.resultForm['directorFiles'] = tmpDirectFile;
                this.resultForm['count'] = 1;

            } else {
                for (let i = 0; i < this.directorsAllFile.length; i++) {
                    let tmpDitectItem = this.directorsAllFile[i];
                    if (tmpDitectItem.userful == true) {
                        if (count >= 1) {
                            this.resultForm['directorFiles' + count] = tmpDitectItem.file;
                        } else {
                            this.resultForm['directorFiles'] = tmpDitectItem.file;
                        }
                        count++;

                    }
                }
                this.resultForm['count'] = count;
            }

            console.log(this.resultForm);
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