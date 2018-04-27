import http from '../config/http'
import fhttp from '../config/fileHttp'
import { getToken } from '../store/store'


/**
 * 创建临时数据
 */
const setpromise = data => {
    return new Promise((resolve, reject) => {
        resolve(data)
    })
}

/**
 * 账号密码登录
 */

// var accountLogin = (username, password) => http('POST', '/user/login', { username, password });

var accountLogin = (email, password, successCallback) => http('POST', '/user/login', { email, password }, successCallback);


/**
 * my/index
 */

var myIndex = (token, successCallback) => http('POST', '/my/test', { token }, successCallback);



/**
 * 获取注册短信验证码
 */
var mobileCode = (phone, successCallback) => http('POST', '/utility/sendtoken', {
    mobile: phone,
    type: 'exchange.signup'
}, successCallback);

/**
 * 获取忘记密码短信验证码
 */
var forgetGetMobileCode = (phone, successCallback) => http('POST', '/utility/sendtoken', {
    mobile: phone,
    type: 'exchange.findpwd'
}, successCallback);

/**
 * 注册-发送注册邮件
 */
var sendEmail = (email, successCallback) => http('POST', '/user/send', {
    email: email
}, successCallback);

/**
 * 注册
 */
var register = (email, mobile, token, userName, password, confirmPassword, successCallback) => http('POST', '/user/sign-up', {
    email: email,
    mobile: mobile,
    token: token,
    userName: userName,
    password: password,
    confirmPassword: confirmPassword
}, successCallback);

/**
 * 注册-激活账户
 */
var emailActive = (token, email, successCallback) => http('POST', '/user/valid-email', {
    email: email,
    token: token
}, successCallback);

/**
 * 忘记密码-验证手机
 */
var forgetVeriftyMobile = (mobile, token, successCallback) => http('POST', '/user/find-pwd', {
    mobile: mobile,
    tokentype: 'is.findpwd',
    token: token
}, successCallback);

/**
 * 忘记密码-确认密码
 */
var forgetResetPassword = (mobile, password, token, successCallback) => http('POST', '/user/reset-pwd', {
    mobile: mobile,
    password: password,
    token: token
}, successCallback);



/**
 * 个人中心-账户信息
 */
var profileInfo = (successCallback) => http('POST', '/user/info', {}, successCallback, getToken());


/**
 * 个人中心-设置-退出
 */
var signOut = (successCallback) => http('POST', '/user/logout', {}, successCallback, getToken());


/**
 * 个人中心-基本信息
 */
var baseInfo = (successCallback) => http('POST', '/my/base-info', {}, successCallback, getToken());

/**
 * 出款账户-账户详情
 */
var benefitDetail = (id, successCallback) => http('POST', '/benefit/view', { id }, successCallback, getToken());


/**
 * 出款账户-账户列表
 */
var benefitList = (type, page, perPage, successCallback) => http('POST', '/benefit/list', { type, page, perPage }, successCallback, getToken());



/**
 * 出款账户-创建受益人
 */
var createBenfiAccount = (bType, areaType, routeType, swiftCode, iban, currencyId, bName, bankName, compAccount, accountName, bankProvince, bankCity, cardNo, address, mobile, remark, successCallback) => http('POST', '/benefit/new', { bType, areaType, routeType, swiftCode, iban, currencyId, bName, bankName, compAccount, accountName, bankProvince, bankCity, cardNo, address, mobile, remark }, successCallback, getToken());

/**
 * 出款账户-修改受益人
 */
var editBenfiAccount = (id, bType, areaType, routeType, swiftCode, iban, currencyId, bName, bankName, compAccount, accountName, bankProvince, bankCity, cardNo, address, mobile, remark, successCallback) => http('POST', '/benefit/edit', { id, bType, areaType, routeType, swiftCode, iban, currencyId, bName, bankName, compAccount, accountName, bankProvince, bankCity, cardNo, address, mobile, remark }, successCallback, getToken());


/**
 * 出款账户-获取币种列表
 */
var currencyList = (successCallback) => http('POST', '/benefit/currency', {}, successCallback, getToken());


/**
 * 充值账户-充值银行账户列表
 */
var chargeBankList = (successCallback) => http('POST', '/profile/banklist', {}, successCallback, getToken());


/**
 * 充值账户-添加充值银行账户
 */
var chargeAddBank = (bankCode, bankName, accountName, accountNo, successCallback) => http('POST', '/profile/addbank', { bankCode, bankName, accountName, accountNo }, successCallback, getToken());


/**
 * 账户充值-充值
 */
var addCharge = (relatedId, amtE2, outBankId, inBankId, inAccount, currencyType, tradeType, successCallback) => http('POST', '/add/new', { relatedId, amtE2, outBankId, inBankId, inAccount, currencyType, tradeType }, successCallback, getToken());


/**
 * 账户充值-充值记录列表
 */
var chargeList = (page, perPage, successCallback) => http('POST', '/add/list', { page, perPage }, successCallback, getToken());


/**
 * 账户充值-入款银行
 */
var inBankList = (successCallback) => http('POST', '/add/banks', {}, successCallback, getToken());


/**
 * 账户充值-可用的出款银行
 */
var chargeUserfulBankList = (successCallback) => http('POST', '/profile/usefulbank', {}, successCallback, getToken());


/**
 * 支付换汇-支付（有分发文件）
 */
var addPaymentFile = (soldCur, buyCur, ruleType, soldAmtE2, buyAmtE2, tradeDate, benefitId, transFile, exRate, payType, successCallback) => http('POST', '/trade/pay', { soldCur, buyCur, ruleType, soldAmtE2, buyAmtE2, tradeDate, benefitId, transFile, exRate, payType }, successCallback, getToken(), 'true');

/**
 * 支付换汇-支付（无分发文件）
 */
var addPayment = (soldCur, buyCur, ruleType, soldAmtE2, buyAmtE2, tradeDate, benefitId, transFile, exRate, payType, successCallback) => http('POST', '/trade/pay', { soldCur, buyCur, ruleType, soldAmtE2, buyAmtE2, tradeDate, benefitId, transFile, exRate, payType }, successCallback, getToken());

/**
 * 支付换汇-获取币种汇率
 */
var getPaymentRate = (buyCur, sellCur, exAmt, exType, successCallback) => http('POST', '/trade/getrate', { buyCur, sellCur, exAmt, exType }, successCallback, getToken());


/**
 * 支付换汇-换汇记录列表
 */
var paymentList = (page, perPage, successCallback) => http('POST', '/trade/list', { page, perPage }, successCallback, getToken());


/**
 * 支付换汇-获取可用受益人
 */
var paymentUsefulAccount = (successCallback) => http('POST', '/benefit/useful', {}, successCallback, getToken());


/**
 * 账户总览
 */
var accountTotal = (successCallback) => http('POST', '/trade/account', {}, successCallback, getToken());


/**
 * 历史记录-充值记录
 */
var chargeRecord = (page, perPage, startDate, endDate, currencyId, successCallback) => http('POST', '/add/search', { page, perPage, startDate, endDate, currencyId }, successCallback, getToken());


/**
 * 历史记录-交易记录
 */
var paymentRecord = (page, perPage, startDate, endDate, successCallback) => http('POST', '/trade/search', { page, perPage, startDate, endDate }, successCallback, getToken());


/**
 * 历史记录-账户流水
 */
var accountRecord = (page, perPage, startDate, endDate, currencyId, successCallback) => http('POST', '/trade/bill', { page, perPage, startDate, endDate, currencyId }, successCallback, getToken());


/**
 * 支付换汇-交割日期
 */
var paymentCalendar = (successCallback) => http('POST', '/add/calendar', {}, successCallback, getToken());


/**
 * 受益人-获取地区
 */
var benefitCountry = (successCallback) => http('POST', '/benefit/country', {}, successCallback, getToken());


/**
 * 用户账户资料完善-注册人信息
 */
var complementInfoBase = (uType, authProve, cardFiles, successCallback) => http('POST', '/user/add-info', { uType, authProve, cardFiles }, successCallback, getToken(), true);

/**
 * 用户账户资料完善-企业信息
 */
var complementInfoEnterprise = (params, successCallback) => http('POST', '/user/add-comp', params, successCallback, getToken(), true);

/**
 * 用户账户资料完善-股东信息
 */
var complementInfoShareHoder = (params, successCallback) => http('POST', '/user/add-dir', params, successCallback, getToken(), true);


/**
 * 用户账户资料完善-业务信息
 */
var complementInfoBusiness = (params, successCallback) => http('POST', '/user/business', params, successCallback, getToken());


/**
 * 信息认证-获取注册人信息
 */
var infoRegister = (successCallback) => http('POST', '/user/info', {}, successCallback, getToken());


/**
 * 信息认证-获取注册人信息
 */
var infoEnterprise = (successCallback) => http('POST', '/user/get-comp', {}, successCallback, getToken());


/**
 * 信息认证-获取股东信息
 */
var infoShareHolder = (successCallback) => http('POST', '/user/dir-list', {}, successCallback, getToken());


/**
 * 信息认证-获取业务信息
 */
var infoBusiness = (successCallback) => http('POST', '/user/get-business', {}, successCallback, getToken());


/**
 * 信息认证-获取步骤信息
 */
var infoSteps = (successCallback) => http('POST', '/user/step', {}, successCallback, getToken());


/**
 * 认证信息修改-业务信息
 */
var editBusiness = (params,successCallback) => http('POST', '/user/edit-business', params, successCallback, getToken());

/**
 * 认证信息修改-注册人信息
 */
var editRegister = (uType, authProve, cardFiles,chgIds,successCallback) => http('POST', '/user/edit-info', {uType, authProve, cardFiles,chgIds}, successCallback, getToken(),true);

/**
 * 认证信息修改-删除股东
 */
var deleteShareHolder = (id,successCallback) => http('POST', '/user/del-dir', {id}, successCallback, getToken());

/**
 * 认证信息修改-获取股东信息(根据ID)
 */
var getShareHolderInfo = (id,successCallback) => http('POST', '/user/get-dir', {id}, successCallback, getToken());


/**
 * 认证信息修改-修改股东信息
 */
var editShareHoderInfo = (params, successCallback) => http('POST', '/user/edit-dir', params, successCallback, getToken(), true);


/**
 * 认证信息修改-企业信息
 */
var editEnterpriseInfo = (params, successCallback) => http('POST', '/user/edit-comp', params, successCallback, getToken(), true);


/**
 * 认证信息-提交全部信息
 */
var buttonAllInfo = (successCallback) => http('POST', '/user/submit', {}, successCallback, getToken());


/**
 * 汇率-获取货比对的汇率走势
 */
var getCurrTrend = (currA,currB,successCallback) => http('POST', '/exchange/get-ex', { currA,currB }, successCallback, getToken());

export {
    mobileCode,
    accountLogin,
    sendMobile,
    register,
    profileInfo,
    feedBack,
    signOut,
    forgetGetMobileCode,
    forgetVeriftyMobile,
    forgetResetPassword,
    createBenfiAccount,
    benefitList,
    benefitDetail,
    editBenfiAccount,
    currencyList,
    chargeBankList,
    chargeAddBank,
    addCharge,
    chargeList,
    addPayment,
    getPaymentRate,
    addPaymentFile,
    paymentList,
    accountTotal,
    chargeRecord,
    paymentRecord,
    accountRecord,
    inBankList,
    paymentUsefulAccount,
    chargeUserfulBankList,
    paymentCalendar,
    benefitCountry,
    sendEmail,
    emailActive,
    complementInfoBase,
    complementInfoEnterprise,
    complementInfoShareHoder,
    complementInfoBusiness,
    infoRegister,
    infoEnterprise,
    infoShareHolder,
    infoBusiness,
    infoSteps,
    editBusiness,
    editRegister,
    deleteShareHolder,
    getShareHolderInfo,
    editShareHoderInfo,
    editEnterpriseInfo,
    buttonAllInfo,
    getCurrTrend
}