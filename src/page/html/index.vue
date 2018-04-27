<template>
    <section style="height: 100%">
        <header-static :solutions="solutions" :fixedTop="true"></header-static>
        <section class="banner-block">
            <section class="banner-cover">
                <p class="xbt-title">Bridge Asian Business to the World</p>
                <p class="xbt-sub-title">Global Transfer and Foreign Exchange on Blockchain</p>
                </div>
            </section>
        </section>
        <section class="xbt-block whatwedo">
            <div class="container">
                <!-- <div class="xbt-title">What We Do</div> -->
                <div class="xbt-content" style="margin-top: 0px;text-align:left">
                    <div class="row">
                        <div class="col-md-4 col-xs-4 xbt-col-item">
                            <p>Focus with Asian SMEs</p>
                        </div>
                        <div class="col-md-4 col-xs-4 xbt-col-item">
                            <p>Local knowledge</p>
                        </div>
                        <div class="col-md-4 col-xs-4 xbt-col-item">
                            <p>Foreign Exchange</p>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 30px">
                        <div class="col-md-12 col-xs-12">
                            <div id="chart1" class="chart" style="margin-right: 20px">
                                <p v-show="mData ==''" class="loading">加载中……</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="xbt-block advantage">
            <div class="container">
                <div class="row">
                    <!-- <div style="background-color: #f5f5f5"> -->
                    <div class="col-md-6 col-xs-12 xbt-col-item xbt-col-left" style="text-align: left;">
                        <img src="http://od60al7id.bkt.clouddn.com/ocean/imageindex_pic1.png" width="90%">
                        <p style="margin-top:25px">Blockchain technology is used to facilitate the cross border and forex transactions</p>
                        <p>Fast and secure transactions due to decentralised deployment</p>
                        <p>Zero transaction costs and real foreign exchange rates</p>
                        <p>We focus on the services of Asian SMEs</p>
                    </div>
                    <div class="col-md-6 col-xs-12 xbt-col-item xbt-col-right">
                        <img src="http://od60al7id.bkt.clouddn.com/ocean/imagewallet1.png" width="90%">
                        <div style="margin-top: 15px">
                            <p>Multiple Currency Business Wallet is created to link the fiat and cyptocurrencies</p>
                            <p>Holding all currencies and digital assets such as bitcoins in one place</p>
                            <p>Exchanges among all currencies and digital assets in a real time</p>
                            <p>Integrations with corporate ERP or other IT systems</p>
                        </div>
                    </div>
                    <!-- </div> -->
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
    drawWordMap
} from '../../utils/worldMap.js'
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
            mData: '',
        }
    },
    created() {
        // this.requestAccountInfo();
        // this.initAutoPic();
    },
    mounted: function() {
        this.$nextTick(function() {
            drawWordMap('chart1');
            // drawHistoryKLine(this.mData, "#B0E0E6", 'chart1');
        })
    },
    methods: {

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
    background: url(http://www.baomap.com/assets/dist/img/index_banner45.jpg) no-repeat;
    position: relative;
    height: 540px;
    margin-top: 60px!important;
    padding-top: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
}

.xbt-block {
    padding: 60px 0px 60px 0px;
    background-color: #ffffff;
}

.banner-cover {
    background: rgba(0, 0, 0, 0.2);
    height: 540px;
    width: 100%;
    position: absolute;
    top: 0;
    right:0;
    z-index: 11;
    background-size: 100% 100%;
    padding-top: 210px;
}





/*.banner-cover p{color:#ffffff;font-size: 46px}*/

.banner-cover .xbt-title {
    color: #ffffff;
    font-size: 43px;
    /*border-bottom: 1px #ffffff solid;*/
    padding-bottom: 5px
}

.banner-cover .xbt-sub-title {
    color: #ffffff;
    font-size: 26px;
    font-weight: 300;
    /*border-bottom: 1px #ffffff solid;*/
    padding-bottom: 5px
}

.whatwedo {
    padding-bottom: 100px;
}

.xbt-block .container .xbt-title {
    font-size: 30px
}

.xbt-block .container .xbt-content .row img {
    margin-bottom: 20px
}

.xbt-block .container .xbt-content .row .xbt-title {
    font-size: 19px;
}

.xbt-block .container .xbt-content .row .xbt-sub-title {
    font-size: 16px;
    color: #556468;
    /*text-align: left;*/
    line-height: 22px;
    margin-bottom: 0px;
}

.whatwedo .xbt-content .row .xbt-title {
    margin-top: 20px;
    margin-bottom: 10px;
}

.whatwedo .xbt-col-item {
    padding-top: 30px;
}

.whatwedo .xbt-col-item p {
    font-size: 24px;
    text-align: center;
    font-weight: 300;
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
    font-family: AxLLCircular, Helvetica, Arial, sans-serif !important;
}

.divsvg {
    margin: auto;
    margin-top: 18px;
    width: 25px;
    height: 4px;
    background-color: #B0E0E6;
}

.xbt-block .container .xbt-content .row .xbt-col {
    position: relative;
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

.advantage {
    padding: 70px 0px;
    background-color: #f5f5f5;
    padding-bottom: 80px;
}

.advantage .xbt-content p {
    color: #ffffff;
}

.advantage .xbt-content .xbt-icon {
    /*text-align: left;*/
    /*text-align: center;*/
    /*margin: 0px;*/
}

.advantage .xbt-content .xbt-icon svg {
    margin: auto;
}

.advantage .container .xbt-content {
    text-align: center;
}

.advantage .container .xbt-content .xbt-title {
    font-size: 40px;
    font-family: AxLLCircular, Helvetica, Arial, sans-serif !important;
}

.advantage .container .xbt-content .xbt-sub-title {
    font-size: 20px;
    color: #ffffff;
    font-family: AxLLCircular, Helvetica, Arial, sans-serif !important;
    padding: 0 15%;
    text-align: center;
}

.advantage .xbt-col-item p {
    font-size: 20px;
    text-align: left;
    padding-left: 20px;
    font-weight: 300;
}

.advantage .xbt-col-item img {
    margin-bottom: 40px;
}

.advantage .xbt-col-item p:before {
    font-family: "FontAwesome";
    content: "\f00c";
    position: absolute;
    left: 10px;
    color: #00BCF1;
}

.advantage .xbt-col-right {
    border-left: solid 1px #00BCF1;
    text-align: left;
    padding-left: 50px
}

.advantage .xbt-col-right p:before {
    left: 40px;
}

.btn {
    padding: 3px 15px;
    border: 2px solid #00BCF1;
    font-size: 18px;
    border-radius: 15px;
    color: #333;
}

.btn:hover {
    transform: scale(1.2);
}

.chart {
    width: 100%;
    height: 480px;
    margin: auto;
    margin-top: 10px;
}

@media(max-width: 890px) {
    .banner-block {
        position: relative;
        height: 320px
    }
    .banner-bg {
        background-color: #40CFDE;
        background: -webkit-linear-gradient(top, #40CFDE, #00BEEF);
        height: 320px;
        width: 100%;
        position: absolute;
        top: 0;
        z-index: 10;
        background-size: 100% 100%;
    }
    .banner-cover {
        background: rgba(0, 0, 0, 0);
        padding-top: 100px;
        height: 320px
    }

    .banner-cover .xbt-title {
        font-size: 32px;
    }

    .banner-cover .xbt-sub-title {
        font-size: 20px;
    }

    .chart {
        height: 300px;
        margin-top: -50px;
    }
    .advantage {
        width: 100%;
        padding: 50px 0px;
        background-color: #ffffff;
        padding-top: 0px;
    }
    .advantage .row {
        background-color: #ffffff
    }
    .advantage .xbt-col-right {
        border-left: solid 0px #00BCF1;
        padding-left: 20px;
        margin-top: 60px;
    }
    .advantage .xbt-col-right p:before {
        left: 10px;
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
    .xbt-ul li .xbt-item a {
        font-size: 20px;
    }
}
</style>