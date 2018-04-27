<template>
    <div class="avatar-uploader">
        <el-row>
            <el-col :span="6" v-for="(item, index) in selfUfiles" style="width: 275px;margin-bottom: 40px">
                <section class="el-upload">
                    <div class="input-div">
                        <div class="file-img">
                            <div v-if="item.fileUrl!='' && item.fileUrl.indexOf('blob:')==0">
                                <img :src="item.fileUrl" width="100%">
                            </div>
                            <div v-else-if="item.fileUrl!='' && item.fileUrl.indexOf('blob:')==-1 && item.fileUrl.indexOf('.pdf')>=0">
                                <img :src="pdfUrl" width="100%">
                            </div>
                            <div v-else-if="item.fileUrl!='' && item.fileUrl.indexOf('blob:')==-1 && item.fileUrl.indexOf('http:')==-1">
                                <img :src="baseUrll+item.fileUrl" width="100%">
                            </div>
                            <div v-else-if="item.fileUrl!='' && item.fileUrl.indexOf('blob:')==-1 && item.fileUrl.indexOf('http:')>=0">
                                <img :src="item.fileUrl" width="100%">
                            </div>
                            <i v-else class="el-icon-plus avatar-uploader-icon" @click="clickFileInput(index)"></i>
                        </div>
                        <span style="height: 15px!important;color:#409EFF" @click="clickFileInput(index)" v-if="item.fileUrl!=''">重新选择</span>
                    </div>
                    <div class="function-div" v-if="item.fileUrl!='' && isDelete==true">
                        <i class="el-icon-remove-outline avatar-uploader-icon" @click="removeImg(index)"></i>
                    </div>
                </section>
            </el-col>
            <input type="file" capture="video" class="oppsite-upload" @change="uploadImg()" :id="id" style="display: none" accept="image/*,application/pdf">
        </el-row>
        </el-form-item>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selfUfiles: [{ fileUrl: '' }],
            ufileInfos: [],
            showSelf: true,
            filesInfo: '',
            currencyIndex: 0,
            baseUrll: '',
        }
    },
    created() {
        this.selfUfiles = this.ufiles['fileUrls'];
        this.filesInfo = this['ufiles'];
        if (this.imgBaseUrl == true) {
            this.baseUrll = baseUrl + "/";
        }
    },
    watch: {
        ufiles: function(value) {
            this.selfUfiles = this.ufiles['fileUrls'];
            this.filesInfo = this.ufiles;
        }
    },
    props: ['index', 'id', 'max', 'isDelete', 'isCanDeleteModel', 'ufiles', 'imgBaseUrl'],
    methods: {
        clickFileInput(index) {
            this.currencyIndex = index;
            document.getElementById(this.id).click();
        },

        uploadImg() {
            let index = this.currencyIndex;

            let url = window.URL.createObjectURL(document.getElementById(this.id).files[0]);
            this.selfUfiles[index].fileUrl = url;
            if (document.getElementById(this.id).files[0]['type'] == 'application/pdf') {
                this.selfUfiles[index].fileUrl = 'http://od60al7id.bkt.clouddn.com/typepdf.png';
            } else {
                this.selfUfiles[index].fileUrl = url;
            }
            if (document.getElementById(this.id).files[0]) {
                this.ufileInfos[index] = document.getElementById(this.id).files[0];
            }
            let tmpfiles = this.selfUfiles;
            this.selfUfiles = [];
            this.selfUfiles = tmpfiles;
            let tmp = { fileUrl: '' };
            if (this.max && this.max != '' && index < this.max - 1) {
                this.selfUfiles[index + 1] = tmp;
            }

            this.getFilesData();
        },
        removeImg(index) {
            this.selfUfiles.splice(index, 1);
            this.ufileInfos.splice(index, 1);
            this.getFilesData();
        },

        getFilesData() {
            let tmp = { index: this.filesInfo.index, file: this.ufileInfos, fileUrls: this.selfUfiles, userful: this.filesInfo.userful };
            this.$emit('getFilesData', [this.index, tmp]);
        },

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-uploader {
    /*display: flex;*/
}

.avatar-uploader .el-upload {
    width: 260px;
    height: 150px;
    display: flex;
    position: relative;
}

.avatar-uploader .el-upload .oppsite-upload {
    /*display: block;*/
    position: absolute;
    opacity: 0;
    left: 0;
    width: 200px;
    height: 100%;
    /*display: none;*/
}

.avatar-uploader .el-upload .file-img {
    width: 200px;
    height: 100%;
    text-align: center;
}

.avatar-uploader .el-upload .file-img img {
    height: 150px;
}

.avatar-uploader .el-upload .input-div {
    border: 1px dashed #d9d9d9;
    /*border-radius: 6px;*/
    width: 200px;
}

.avatar-uploader .el-upload .input-div:hover {
    border-color: #409EFF;
}

.avatar-uploader .el-upload .input-div .avatar-uploader-icon {
    font-size: 40px;
    color: #8c939d;
    width: 40px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    cursor: pointer;
}

.avatar-uploader .el-upload .function-div {
    height: 100%;
    text-align: center;
    width: 60px;
    padding: 0px 15px;
}

.avatar-uploader .el-upload .function-div .avatar-uploader-icon {
    font-size: 40px;
    color: #8c939d;
    width: 40px;
    height: 150px;
    line-height: 150px;
    text-align: center;
    color: #409EFF;
    cursor: pointer;
}
</style>