<template>
    <section style="height: 100%">
        <section class="banner-block">
            <header-static :solutions="solutions" :fixedTop="true"></header-static>
            <section class="banner-bg">
            </section>
            <section class="banner-cover">
                <div class="banner-content">
                    <p class="xbt-title">We are OceanWallex</p>
                    <p class="xbt-sub-title">Being one of the first regulated cross border payment companies based on blockchain technology,Ocean Wallex strives to service more than 3 million SMEs in Asia and connnect them to success</p>
                </div>
                </div>
            </section>
        </section>
        <section class="xbt-block team">
            <div class="container">
                <div class="xbt-title"><span>Team</span></div>
                <div class="xbt-content" style="margin-top: 60px">
                    <p>Strong financial professions in banking, forex and payment fields. Strong Tech team with blockchain, crypto and fintech background. Solid local connections and partnerships in Asean Countries in Public Sector, financial regulatory and local business development. </p>
                </div>
            </div>
        </section>
        <section class="xbt-block partner" style="background-color: #f0f0f0;min-height: 400px;">
            <div class="container">
                <div class="xbt-title"><span>Partners</span></div>
                <div class="xbt-content" style="margin-top: 60px">
                    <div class="row">
                        <div class="col-md-4 col-sm-6 xbt-col">
                            <div class="xbt-col-item">
                                <img src="http://od60al7id.bkt.clouddn.com/ocean/imagepartner1.jpg" width="100%">
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 xbt-col">
                            <div class="xbt-col-item">
                                <img src="http://od60al7id.bkt.clouddn.com/ocean/imagepartner2_2.png">
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 xbt-col">
                            <div class="xbt-col-item">
                                <img src="http://od60al7id.bkt.clouddn.com/ocean/imagepartner3_1.jpg">
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 xbt-col">
                            <div class="xbt-col-item">
                                <img src="http://od60al7id.bkt.clouddn.com/ocean/imagepartner4_2.png">
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 xbt-col">
                            <div class="xbt-col-item">
                                <img src="http://od60al7id.bkt.clouddn.com/ocean/imagepartner5_1.png">
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 xbt-col">
                            <div class="xbt-col-item" style="padding-top:22px">
                                <img src="http://od60al7id.bkt.clouddn.com/ocean/imagepartner6.png">
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 xbt-col">
                            <div class="xbt-col-item">
                                <img src="http://od60al7id.bkt.clouddn.com/ocean/imagepartner7_1.jpg">
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 xbt-col">
                            <div class="xbt-col-item" style="padding-top:25px">
                                <img src="http://od60al7id.bkt.clouddn.com/ocean/imagepartner8.jpg">
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-6 xbt-col">
                            <div class="xbt-col-item" style="padding-top:8px">
                                <img src="http://od60al7id.bkt.clouddn.com/ocean/imagepartner9.jpg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="xbt-block benfit">
            <div class="container">
                <div class="xbt-title"><span>Contact us</span></div>
                <div class="xbt-content" style="margin-top: 60px">
                    <div class="row">
                        <div class="col-md-8 col-xs-12 xbt-col" style="padding-top: 10px">
                            <el-form label-position="left" :model="ruleFrom" ref="ruleFrom" :rules="rules" label-width="130px" class="demo-ruleForm feedback">
                                <el-form-item label="FirstName" prop="firstName">
                                    <el-input v-model="ruleFrom.firstName" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="LastName" prop="lastName">
                                    <el-input v-model="ruleFrom.lastName" auto-complete="off" style="border-color:#B0E0E6"></el-input>
                                </el-form-item>
                                <el-form-item label="Email" prop="email">
                                    <el-input v-model="ruleFrom.email" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Phone Number" prop="mobile">
                                    <el-input v-model="ruleFrom.mobile" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Job Title" prop="jobTitle">
                                    <el-input v-model="ruleFrom.jobTitle" auto-complete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="Message" prop="msg">
                                    <el-input v-model="ruleFrom.msg" auto-complete="off" type="textarea" :rows="5"></el-input>
                                </el-form-item>
                                <el-form-item style="text-align: left;padding-top: 20px">
                                    <el-button type="primary" @click="submitForm('ruleFrom')" style="background-color:#00BCF1;border-color:#00BCF1">Submit</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="col-md-4 col-xs-12 xbt-col">
                            <div class="contact">
                                <p>No. SHR2-043 Street Nakri Orkide Villa the Royal,St 2004 Sankat Toeuk Thlar,Khan Sen Sok</p>
                                <p style="margin-bottom:20px">Phnom Penh Cambodia</p>
                               
                                <p>+00855 23 6789737</p>
                                <p>OceanWallex@protonmail.com</p>
                                <a href="http://goo.gl/maps/8rfwe4wUMt72" target="_blank">
                                    <img src="http://od60al7id.bkt.clouddn.com/ocean/imagelocal2.png" width="100%">  
                                  </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer-static></footer-static>
    </section>
</template>
<script>
import headerStatic from '../../components/headerStatic'
import footerStatic from '../../components/footerStatic'
import {
    accountTotal,
    infoSteps
} from '../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_DATA,
    responsePassword,
} from '../../config/response'
export default {
    components: {
        headerStatic,
        footerStatic
    },
    data() {
        return {
            solutions: 'Solutions',
            activeItem: 'account',
            accountData: '',
            activeCharacter: 0, //激活的菜单
            ruleFrom: {
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                jobTitle: '',
                msg: '',
            },
            rules: {
                firstName: [
                    { required: true, message: 'firstName is required', trigger: 'blur' },
                ],
                lastName: [
                    { required: true, message: 'lastName is required', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: 'email is required', trigger: 'blur' },
                ],
                mobile: [
                    { required: true, message: 'phone number is required', trigger: 'blur' },
                ],
                jobTitle: [
                    { required: true, message: 'job title is required', trigger: 'blur' },
                ],
                msg: [
                    { required: true, message: 'message is required', trigger: 'blur' },
                ],
            },
        }
    },
    created() {
        // this.requestAccountInfo();
        this.initAutoPic();
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.showNoticeDialog('提示', '您的信息已提交成功！');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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

        initAutoPic() {

            setInterval(() => {
                this.activeCharacter++;
                if (this.activeCharacter >= 3) {
                    this.activeCharacter = 0;
                }
            }, 5000);
        },
        //获取用户账户信息
        requestAccountInfo() {
            let handler = this;
            accountTotal(function(ret) {
                // console.log("success=" + data);
                handler.responseAccountInfo(ret);
            });
        },

        responseAccountInfo(ret) {
            let response = responseResult(this, ret, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.accountData = ret.retData;
                return;
            }
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner-block {
    position: relative;
    height: 540px
}

.xbt-block {
    padding: 60px 0px;
    padding-bottom: 60px;
    background-color: #ffffff;
}

.banner-bg {
    background-color: #40CFDE;
    background: -webkit-linear-gradient(top, #40CFDE, #00BEEF);
    height: 540px;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 10;
    background-size: 100% 100%;
}

.banner-cover {
    height: 540px;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 11;
    background-size: 100% 100%;
    padding-top: 200px;
}

.banner-cover .banner-content {
    width: 1000px;
    text-align: center;
    margin: auto;
}

.banner-cover .banner-content .xbt-title {
    color: #ffffff;
    font-size: 43px
}

.banner-cover .banner-content .xbt-sub-title {
    color: #ffffff;
    font-size: 26px;
    font-weight: 300;
}

.xbt-block .container .xbt-title {
    font-size: 30px;
}

.xbt-block .container .xbt-title span {
    font-size: 30px;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: #00BCF1;
    padding-bottom: 5px;
}

.xbt-block .container .xbt-sub-title {
    font-size: 20px
}

.xbt-block .container .xbt-content .row img {
    /*margin-bottom: 20px*/
}

.xbt-block .container .xbt-content .row .xbt-title {
    font-size: 19px;
}

.xbt-block .container .xbt-content .row .xbt-sub-title {
    font-size: 16px;
    color: #556468;
    /*text-align: left;*/
    line-height: 19px;
    margin-bottom: 10px;
}

.benfit .container .xbt-content .row .xbt-title {
    font-size: 28px;
    margin-top: 30px;
    min-height: 300px;
}

.xbt-ul {
    list-style: none;
    margin: 0 auto;
    overflow: hidden;
    width: 70%;
}

.xbt-ul li {
    float: left;
    width: 19%;
    cursor: pointer;
}

.xbt-ul .width20,
.xbt-ul .width20l {
    width: 20%
}

.xbt-ul .width30 {
    width: 30%
}

.xbt-ul .width60p {
    width: 60px
}

.xbt-ul li .xbt-item {
    color: #ffffff;
    height: 60px;
}

.xbt-ul li .xbt-item a {
    color: #ffffff;
    padding-bottom: 10px;
    border-bottom: 3px transparent solid;
    font-size: 28px;
}

.divsvg {
    margin: auto;
    margin-top: 18px;
    width: 25px;
    height: 4px;
    background-color: #00BCF1;
}

.xbt-block .container .xbt-content .row .xbt-col {
    /*position: relative;*/
}

.xbt-icon {
    width: 80px;
    margin: auto;
}

.xbt-icon svg {
    width: 60px;
    height: 60px;
}

.xbt-ul li .xbt_active a {
    border-bottom: 3px #ffffff solid
}

.btn {
    padding: 3px 15px;
    border: 2px solid #00BCF1;
    font-size: 18px;
    border-radius: 15px;
}

.btn:hover {
    transform: scale(1.2);
}
.team{
    min-height: 360px;
}

.team .xbt-content p {
    font-size: 20px;
    text-align: left;
    font-weight: 300;
}

.partner .container .xbt-title span {
    color: #000000;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: #00BCF1;
    padding-bottom: 5px;
}

.partner .container .xbt-col {
    padding: 20px 0px;
}

.partner .container .xbt-col-item {
    text-align: center;
    background-color: white;
    transition: background-color 500ms ease;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.3);
    height: 130px;
    width: 80%;
}

.partner .container .xbt-col-item img {
    width: 100%;
    max-height: 130px;
}


@media(max-width: 890px) {
    .team{
    min-height: 280px;
    padding-bottom: 20px;
}
    .banner-block {
        position: relative;
        height: 400px
    }
    .banner-bg {
        background-color: #40CFDE;
        background: -webkit-linear-gradient(top, #40CFDE, #00BEEF);
        height: 400px;
        width: 100%;
        position: absolute;
        top: 0;
        z-index: 10;
        background-size: 100% 100%;
    }
    .banner-cover {
        background: rgba(0, 0, 0, 0);
        padding-top: 120px;
    }
    .banner-cover .banner-content {
        width: 100%;
        text-align: center;
        margin: auto;
        padding: 0px 30px;
    }

    .banner-cover .banner-content .xbt-title {
        font-size: 36px
    }

    .banner-cover .banner-content .xbt-sub-title {
        font-size: 18px;
    }
    .xbt-ul {
        width: 100%;
        webkit-margin-before: 0em;
        -webkit-margin-after: 0em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        -webkit-padding-start: 0px;
    }

    .xbt-ul .width20 {
        width: 100px
    }
    .xbt-ul .width20l {
        width: 110px
    }
    .xbt-ul .width30 {
        width: 170px
    }
    .xbt-ul .width60p {
        width: 0px;
        display: none
    }
    .xbt-block .container .xbt-content .row .xbt-col {
        padding-bottom: 30px;
    }
    .partner{
        display: none
    }
}

.xbt-ul li {
    font-size: 21px;
}

.contact {
    background-color: #f0f0f0;
    padding: 30px 0px 0px 0px
}

.contact p {
    text-align: left;
    padding-left: 30px;
    line-height: 20px;
}
.el-input__inner{border: 1px solid #00BCF1}
</style>