import Vue from 'vue'
import Router from 'vue-router'
import Account from '@/page/home/account'
import Charge from '@/page/home/charge'
import Payment from '@/page/home/payment'
import Profile from '@/page/home/profile'
import Beneficiary from '@/page/home/beneficiary'
import BeneficiaryCreate from '@/page/beneficiary/create'
import BeneficiaryDetail from '@/page/beneficiary/detail'
import BeneficiaryUpdate from '@/page/beneficiary/update'
import Signin from '@/page/profile/signin'
import addBankAccount from '@/page/profile/addBankAccount'
import ChargeRecord from '@/page/record/charge'
import PaymentRecord from '@/page/record/payment'
import AccountRecord from '@/page/record/account'
import SignupSendEmail from '@/page/profile/signupSendEmail'
import SignupEmailResult from '@/page/profile/signupEmailResult'
import Signup from '@/page/profile/signup'
import SignupActive from '@/page/profile/signupActive'
import CompleteInfoBase from '@/page/profile/completeInfo/base'
import CompleteInfoEnterprise from '@/page/profile/completeInfo/enterprise'
import CompleteInfoShareholder from '@/page/profile/completeInfo/shareholder'
import CompleteInfoBusiness from '@/page/profile/completeInfo/business'
import CompleteInfoPandect from '@/page/profile/completeInfo/pandect'

import EditRegisterInfo from '@/page/profile/editInfo/base'
import EditEnterpriseInfo from '@/page/profile/editInfo/enterprise'
import EditShareHolderInfo from '@/page/profile/editInfo/shareholder'
import EditBusinessInfo from '@/page/profile/editInfo/business'

import Index from '@/page/html/index'
import DigitalWallet from '@/page/html/business'
import Remittance from '@/page/html/remittance'
import CrossPayment from '@/page/html/exchange'
import MicroFinance from '@/page/html/micro_finance'
import Aboutus from '@/page/html/aboutus'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            meta: {
                title: 'OceanWallex'
            },
            component: Index
        },
        {
            path: '/solutions/business',
            meta: {
                title: 'Business Account'
            },
            component: DigitalWallet
        },
        {
            path: '/solutions/remit',
            meta: {
                title: 'Remittance'
            },
            component: Remittance
        },
        {
            path: '/solutions/exchange',
            meta: {
                title: 'FX P2P Exchange'
            },
            component: CrossPayment
        },
        {
            path: '/solutions/microfinance',
            meta: {
                title: 'MicroFinance'
            },
            component: MicroFinance
        },
        {
            path: '/aboutus',
            meta: {
                title: 'About us'
            },
            component: Aboutus
        },
        {
            path: '/index',
            meta: {
                title: 'OceanWallex'
            },
            component: Index
        },
        {
            path: '/account',
            meta: {
                title: '账户总览'
            },
            component: Account
        },
        {
            path: '/charge',
            meta: {
                title: '交易充值'
            },
            component: Charge
        },
        {
            path: '/payment',
            meta: {
                title: '支付换汇'
            },
            component: Payment
        },
        {
            path: '/profile',
            meta: {
                title: '个人中心'
            },
            component: Profile
        },
        {
            path: '/beneficiary',
            meta: {
                title: '出款账户'
            },
            component: Beneficiary
        },
        {
            path: '/signin',
            meta: {
                title: '登录'
            },
            component: Signin
        },
        {
            path: '/signup',
            meta: {
                title: '注册'
            },
            component: Signup
        },
        {
            path: '/signup/sendemail',
            meta: {
                title: '填写注册邮箱'
            },
            component: SignupSendEmail
        },
        {
            path: '/signup/emailresult',
            meta: {
                title: '注册邮箱结果'
            },
            component: SignupEmailResult
        },
        {
            path: '/signup/active',
            meta: {
                title: '激活邮箱'
            },
            component: SignupActive
        },

        {
            path: '/compinfo/base',
            meta: {
                title: '完善注册人信息'
            },
            component: CompleteInfoBase
        },

        {
            path: '/compinfo/enterprise',
            meta: {
                title: '完善企业信息'
            },
            component: CompleteInfoEnterprise
        },

        {
            path: '/compinfo/shareholder',
            meta: {
                title: '股东信息'
            },
            component: CompleteInfoShareholder
        },

        {
            path: '/compinfo/business',
            meta: {
                title: '业务信息'
            },
            component: CompleteInfoBusiness
        },

        {
            path: '/compinfo/pandect',
            meta: {
                title: '信息总览'
            },
            component: CompleteInfoPandect
        },

        {
            path: '/editinfo/base',
            meta: {
                title: '编辑注册人信息'
            },
            component: EditRegisterInfo
        },
        {
            path: '/editinfo/enterprise',
            meta: {
                title: '编辑企业信息'
            },
            component: EditEnterpriseInfo
        },
        {
            path: '/editinfo/shareholder',
            meta: {
                title: '编辑股东信息'
            },
            component: EditShareHolderInfo
        },
        {
            path: '/editinfo/business',
            meta: {
                title: '编辑业务信息'
            },
            component: EditBusinessInfo
        },
        {
            path: '/beneficiary/create',
            meta: {
                title: '创建受益人'
            },
            component: BeneficiaryCreate
        },
        {
            path: '/beneficiary/detail',
            meta: {
                title: '受益人详情'
            },
            component: BeneficiaryDetail
        },
        {
            path: '/beneficiary/update',
            meta: {
                title: '受益人编辑'
            },
            component: BeneficiaryUpdate
        },
        {
            path: '/profile/addbank',
            meta: {
                title: '添加银行账户'
            },
            component: addBankAccount
        },
        {
            path: '/recharge-record',
            meta: {
                title: '充值记录'
            },
            component: ChargeRecord
        },
        {
            path: '/trans-record',
            meta: {
                title: '交易记录'
            },
            component: PaymentRecord
        },
        {
            path: '/acct-flowRecord',
            meta: {
                title: '账户记录'
            },
            component: AccountRecord
        },
    ]
})