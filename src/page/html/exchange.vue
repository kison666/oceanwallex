<template>
    <section style="height: 100%">
        <section class="banner-block">
            <header-static :solutions="solutions" :fixedTop="true"></header-static>
            <section class="banner-bg">
            </section>
            <section class="banner-cover">
                <p class="xbt-title">FX P2P Exchange</p>
                <p class="xbt-sub-title">Fast,&nbsp;Secure,&nbsp;Low Costs and Decentralised</p>
                </div>
            </section>
        </section>
        <section class="xbt-block benfit">
            <div class="container">
                <div class="xbt-title" style="font-weight:300;color:#000000">Tranditionally Global Payments and FX</div>
                <div class="xbt-content">
                    <div class="row">
                        <div class="col-md-7 col-xs-12 xbt-col-text">
                            <p>Based on SWIFT which is quite slow</p>
                            <p>Insecure as the banks as the center are storing all the valuable trade/payment information</p>
                            <p>Very expensive cross border transaction cost</p>
                            <p>The FX rate are not transparent most of the time</p>
                            <p>SMEs are under serviced by banks</p>
                        </div>
                        <div class="col-md-5 col-xs-12 xbt-col-img">
                            <img src="http://od60al7id.bkt.clouddn.com/ocean/imagepage_pic9.jpg" width="100%">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="xbt-block benfit" style="background-color: #f5f5f5">
            <div class="container">
                <div class="xbt-title" style="font-weight:300;color:#000000">Our Solution to Global Payments and FX</div>
                <div class="xbt-content">
                    <div class="row">
                        <div class="col-md-6 col-xs-12 xbt-col-img">
                            <img src="http://od60al7id.bkt.clouddn.com/ocean/imagepage_pic10.png" width="90%">
                        </div>
                        <div class="col-md-6 col-xs-12 xbt-col-text">
                            <p style="margin-top:-5px">Blockchain technology is used to faciliate the cross border and forex transactions</p>
                            <p>Fast and secure transactions due to the decentralised deployment</p>
                            <p>Zero transaction costs and real exchange rates</p>
                            <p>Ocean Wallex focuses on the services of Asian SMEs</p>
                            <p>FX P2P Exchange works with our Multiple Currency Business Wallet</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="xbt-block chart-block" style="min-height: 300px;background-color:#ffffff;padding-bottom: 60px">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-xs-12 chart-item" style="text-align: center">
                        <p style="font-weight:300;color:#000000">USDTHB</p>
                        <div id="chart0" class="chart">
                            <p v-show="mData ==''" class="loading">加载中……</p>
                        </div>
                    </div>
                    <div class="col-md-6 col-xs-12 chart-item chart-item-right">
                        <p style="font-weight:300;color:#000000">USDSGD</p>
                        <div id="chart1" class="chart">
                            <p v-show="mData1 ==''" class="loading">加载中……</p>
                        </div>
                    </div>
                </div>
                <p class="tip">* Interbank intermediate price trend over the past 30 days</p>
            </div>
        </section>
        <footer-static></footer-static>
    </section>
</template>
<script>
import headerStatic from '../../components/headerStatic'
import footerStatic from '../../components/footerStatic'
import {
    drawHistoryKLine,
    reDrawChart
} from '../../utils/kMonthTrend.js'
import {
    accountTotal,
    infoSteps,
    getCurrTrend
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
        footerStatic,
    },
    data() {
        return {
            solutions: 'FX P2P Exchange',
            activeItem: 'account',
            accountData: '',
            activeCharacter: 0, //激活的菜单
            fofName: '资产配置',
            mData: '', //资产详情
            mData1: '', //
            loadCount: 0,
        }
    },
    created() {
        this.requestCurrencyTrend('USD', 'SGD', 'chart0', '#00BCF1');
        this.requestCurrencyTrend('USD', 'THB', 'chart1', '#00BCF1');

    },
    mounted: function() {
        this.$nextTick(function() {
                // drawHistoryKLine(this.mData, "#318eff", 'chart0');
                // drawHistoryKLine(this.mData, "#B0E0E6", 'chart1');
            }),
            window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop > 900 && this.loadCount < 2 && this.mData != '' && this.mData1 != '') {
                this.loadCount++;
                // drawHistoryKLine(this.mData1, "#00BCF1", 'chart1');
                // reDrawChart(this.mData,'chart0');
                // reDrawChart(this.mData1,'chart1');

            }
        },

        //获取用户账户信息
        requestCurrencyTrend(currA, currB, divId, color) {
            let handler = this;
            getCurrTrend(currA, currB, function(ret) {
                // console.log("success=" + data);
                handler.responseCurrencyTrend(ret, divId, color);
            });
        },

        responseCurrencyTrend(ret, divId, color) {
            let response = responseResult(this, ret, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                // this.dialogVisible = true;
                // this.dialogMsg = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                if (divId == 'chart0') {
                    this.mData = ret.retData.data;
                    drawHistoryKLine(this.mData, color, divId);
                } else {
                    this.mData1 = ret.retData.data;
                    drawHistoryKLine(this.mData1, color, divId);
                }

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
    padding: 30px 0px;
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
    background: rgba(0, 0, 0, 0);
    height: 540px;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 11;
    background-size: 100% 100%;
    padding-top: 240px;
}

.banner-cover .xbt-title {
    color: #ffffff;
    font-size: 43px
}

.banner-cover .xbt-sub-title {
    color: #ffffff;
    font-size: 26px;
    font-weight: 300
}

.xbt-block .container .xbt-title {
    font-size: 30px
}

.xbt-block .container .xbt-sub-title {
    font-size: 20px
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
    line-height: 19px;
    margin-bottom: 10px;
}

.benfit {
    background-color: #ffffff;
    padding: 60px 0px
}

.benfit .xbt-title {
    font-size: 22px
}

.benfit .container .xbt-content {
    margin-top: 100px;
}

.benfit .container .xbt-content .row .xbt-title {
    font-size: 28px;
    margin-top: 30px;
}

.benfit .xbt-col-img {
    text-align: left;
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
    background-color: #00BCF1;
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
    padding: 50px;
    min-height: 400px;
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

.btn {
    padding: 3px 15px;
    border: 2px solid #00BCF1;
    font-size: 18px;
    border-radius: 15px;
}

.btn:hover {
    transform: scale(1.2);
}

.chart {
    width: 100%;
    height: 280px;
    margin: auto;
    margin-top: 10px;
}

..chart-block .container {
    margin-top: 50px;
}

.chart-block p {
    font-size: 26px;
}


.chart-block .chart-item-right {
    text-align: center;
    padding-left: 40px
}

.chart-block .chart-item .chart {
    margin-left: 20px;
}

.chart .loading {
    text-align: center;
    font-size: 16px;
    color: #333333;
}

.xbt-col-text {
    font-size: 20px;
    text-align: left;
    padding-left: 30px;
    font-weight: 300;
}

.xbt-col-text p {
    font-weight: 300;
    font-family: sans-serif
}

.benfit .container .xbt-col-text p:before {
    font-family: "FontAwesome";
    content: "\f00c";
    position: absolute;
    left: 0px;
    color: #00BCF1;
}

.chart-block {
    padding-bottom: 0px
}

.chart-block .tip {
    font-size: 16px;
    color: #999999;
    font-weight: 200;
    margin-top: 30px;
}

@media(max-width: 890px) {
    .banner-block {
        position: relative;
        height: 340px
    }
    .banner-bg {
        height: 340px;
        width: 100%;
        position: absolute;
        top: 0;
        z-index: 10;
        background-size: 100% 100%;
    }
    .banner-cover {
        background: rgba(0, 0, 0, 0);
        padding-top: 160px;
    }

    .banner-cover .xbt-title {
        font-size: 32px;
    }

    .banner-cover .xbt-sub-title {
        font-size: 20px;
    }
    .advantage {
        width: 100%;
        padding: 50px 0px;
    }

    .xbt-col-text {
        padding-left: 35px;
    }

    .xbt-col-text p {
        font-size: 18px;
    }

    .benfit .container .xbt-content {
        margin-top: 30px;
    }

    .benfit .container .xbt-col-text p:before {
        left: 10px;
    }
    .benfit .xbt-col-img {
        text-align: center;
    }

    ..chart-block .container {
        margin-top: 30px;
    }

    .chart-block .chart-item {
        padding-left: 0px;
        padding-right: 20px;
    }

    .chart-block .chart-item-right {
        text-align: center;
        padding-left: 0px;
        margin-top: 40px;
    }
    .chart-block .chart-item .chart {
        margin-right: 20px;
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
}

.xbt-ul li {
    font-size: 21px;
}
</style>