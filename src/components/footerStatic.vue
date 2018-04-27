<template>
    <section class="xbt-block footer">
        <div class="container">
            <div class="row" style="padding-bottom: 5px">
                <div class="col-md-6 col-xs-6 xbt-col-left">
                    <p><span class="fa fa-phone" style="color:#00BCF1;margin-right: 10px;"></span>+00855 23 6789737</p>
                </div>
                <div class="col-md-6 col-xs-6 xbt-col-right">
                    <p><span class="fa fa-envelope-o" style="color:#00BCF1;margin-right: 10px;"></span>OceanWallex@protonmail.com</p>
                </div>
            </div>
            <p style="color: #ffffff;font-size: 14px;margin-top: 20px">© OceanWallex 2018.</p>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {

        }
    },

    created() {
        // if (this.isLogin != false) {
        //     this.requestStepsInfo();
        // }
    },

    methods: {


    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
    background-color: #2E3638!important;
    padding-bottom: 5px!important;
    padding-top: 30px!important;
    margin-top: 0px!important;
}
.row{
    border-bottom: solid 1px #ffffff;
}
.xbt-col-left p{text-align: left;color: #ffffff;font-size: 18px}
.xbt-col-right p{text-align: right;color: #ffffff;font-size: 18px}
@media(max-width: 890px){
.xbt-col-left p{text-align: left;color: #ffffff;font-size: 18px}
.xbt-col-right p{text-align: right;color: #ffffff;font-size: 18px}

}
</style>