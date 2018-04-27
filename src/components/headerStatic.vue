<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light xbt-navbar" :class="{fixed_top:fixedTop==true}" style="z-index:999">
        <div class="container">
            <router-link class="navbar-brand" :to="{path: '/'}">OceanWallex</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <router-link class="nav-link" :to="{path: '/'}">Home<span class="sr-only">(current)</span></router-link>
                    </li>
                    <li class="nav-item dropdown" :class="{li_active:isShow==true}">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @mouseover="overShow" @mouseout="outHide">
                          {{solutions}}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" :class="{div_show:isShow==true}" @mouseover="overShow" @mouseout="outHide">
                            <router-link class="dropdown-item" :to="{path: '/solutions/exchange'}">FX P2P Exchange</router-link>
                            <router-link class="dropdown-item" :to="{path: '/solutions/business'}">Business Account</router-link>
                        </div>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/aboutus">About Us</router-link>
                    </li>
                    <li class="nav-item nav-item-login">
                        <router-link class="nav-link" to="/signin">Login</router-link>
                    </li>
<!--                     <li class="nav-item dropdown" :class="{li_active:isShowE==true}">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @mouseover="overShowE" @mouseout="outHideE">
                          English
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" :class="{div_show:isShowE==true}" @mouseover="overShowE" @mouseout="outHideE">
                            <router-link class="dropdown-item" :to="{path: '/'}">English</router-link>
                            <router-link class="dropdown-item" :to="{path: '/'}">中文</router-link>
                        </div>
                    </li> -->
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import { setToken, getToken } from '../store/store'
import {
    signOut,
    infoSteps
} from '../service/getData'
import {
    responseResult,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_DATA,
    responsePassword,
} from '../config/response'
export default {
    data() {
        return {
            isShow:false,
            isShowE:false,

        }
    },
    props: ['solutions','fixedTop'],
    created() {
        // if (this.isLogin != false) {
        //     this.requestStepsInfo();
        // }
    },

    methods: {
        //初始化获取数据
        overShow(){
           this.isShow=true;
        },

        outHide(){
           this.isShow=false;
        },
        overShowE(){
           this.isShowE=true;
        },

        outHideE(){
           this.isShowE=false;
        },

    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
    padding: 0.7rem 1rem;
    background-color: rgba(255,255,255,0.5);
    transition: background-color 500ms ease;
    box-shadow: 0 1px 10px 0 rgba(0,0,0,0.4);
}

.dropdown-menu{margin-top: 0px!important;border-radius:0px!important;background-color:#000000!important;background-clip:border-box!important;}
.div_show{display: block!important;background-color: #000000!important;color:#ffffff!important;}
.div_show .dropdown-item{color:#ffffff;}
.div_show .dropdown-item:hover {background-color: #00BCF1!important;}
.li_active{background-color: #000000!important;}
.li_active a:hover,.li_active a,.li_active a:visited,.li_active a:link,.li_active a:active{color: #ffffff!important;}
.nav-item{margin-left: 20px;}
.navbar-brand{font-size: 30px}
.fixed_top {
    position: fixed;
    top: 0;

    right: 0;
    left: 0;
    z-index: 1030;
}
.navbar-light .navbar-brand {
     color: rgba(0,0,0,.9)!important; 
}
@media(max-width: 890px){
.nav-item-login{display: none}

}

</style>