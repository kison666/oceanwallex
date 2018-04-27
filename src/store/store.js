import {
    setStore,
    getStore,
} from '../config/mUtils'

const NAME_TOKEN = 'token';
const NAME_RETURNURL = 'returnurl';
const NAME_MARKETSTATE = 'marketState';
const NAME_MARKET_PACKAGE = 'marketPackage'
const NAME_MARKET_INDEX = 'marketIndex'
const NAME_MARKET_MAIN = 'marketMain'
const NAME_MARKET_TOP = 'marketTop'
const NAME_ASSET_FOF = 'assetFof'
const NAME_ASSET_FOF_TYPE = 'assetFofType'
const NAME_ASSET_STATE = 'assetState' //0,虚拟盘-推荐组合；1,虚拟盘-自配组合；2,实盘-推荐组合
const NAME_MY_ASSET_QUERY_STATUS='queryState'
const NAME_VIRTUAL_DIY_INFO='virtualDiyInfo'
const NAME_TRADE_CHOICE_TYPE='tradeChoiceType'
const NAME_VIRUAL_CHOICE_TYPE='virualChoiceType'
const NAME_ASSET_QUERY_TYPE='assetQueryType'
const NAME_APPOINT_IP_INFO='appointIpInfo'
const NAME_APPOINT_BENFI_INFO='appointBenfiInfo'
const NAME_APPOINT_TIME='appointTime'
const NAME_APPOINT_WEEK='appointweek'
const NAME_APPOINT_NAME='appointUserName'
const NAME_APPOINT_MOBILE='appointMobile'
const NAME_APPOINT_HOLDER_INFO='holderInfo'
const NAME_APPOINT_INSURANT_INFO='insurantInfo'
const NAME_APPOINT_SAME_ONE='isSameOne'

/**
 * 存储预约产品信息
 */
export const setAppointIpInfo = (content) => {
    setStore(NAME_APPOINT_IP_INFO, content);
}

/**
 * 获取预约产品信息
 */
export const getAppointIpInfo = () => {

    return getStore(NAME_APPOINT_IP_INFO);
}

/**
 * 存储预约产品受益人信息
 */
export const setAppointBenfiInfo = (content) => {
    setStore(NAME_APPOINT_BENFI_INFO, content);
}

/**
 * 获取预约产品受益人信息
 */
export const getAppointBenfiInfo = () => {

    return getStore(NAME_APPOINT_BENFI_INFO);
}

/**
 * 存储token
 */
export const setToken = (content) => {
    setStore(NAME_TOKEN, content);
}

/**
 * 获取token
 */
export const getToken = () => {

    return getStore(NAME_TOKEN);
}

/**
 * 存储returnurl
 */
export const setReturnUrl = (content) => {
    setStore(NAME_RETURNURL, content);
}

/**
 * 获取returnurl
 */
export const getReturnUrl = () => {

    return getStore(NAME_RETURNURL);
}

/**
 * 存储market的tab状态
 */
export const setMarketState = (content) => {
    setStore(NAME_MARKETSTATE, content);
}

/**
 * 获取market的tab状态
 */
export const getMarketState = () => {

    return getStore(NAME_MARKETSTATE);
}

/**
 * 存储asset的tab状态
 */
export const setAssetState = (content) => {
    setStore(NAME_ASSET_STATE, content);
}

/**
 * 获取asset的tab状态
 */
export const getAssetState = () => {

    return getStore(NAME_ASSET_STATE);
}

/**
 * 存储market的index最新的数据
 */
export const setMarketIndexList = (content) => {
    setStore(NAME_MARKET_INDEX, content);
}

/**
 * 获取market的index最新的数据
 */
export const getMarketIndexList = () => {

    return getStore(NAME_MARKET_INDEX);
}

/**
 * 存储market的package最新的数据
 */
export const setMarketPackageList = (content) => {
    setStore(NAME_MARKET_PACKAGE, content);
}

/**
 * 获取market的package最新的数据
 */
export const getMarketPackageList = () => {

    return getStore(NAME_MARKET_PACKAGE);
}

/**
 * 存储market的main最新的数据
 */
export const setMarketMainList = (content) => {
    setStore(NAME_MARKET_MAIN, content);
}

/**
 * 获取market的main最新的数据
 */
export const getMarketMainList = () => {

    return getStore(NAME_MARKET_MAIN);
}

/**
 * 存储market的main top最新的数据
 */
export const setMarketTopList = (content) => {
    setStore(NAME_MARKET_TOP, content);
}

/**
 * 获取market的main top最新的数据
 */
export const getMarketTopList = () => {

    return getStore(NAME_MARKET_TOP);
}

/**
 * 存储asset自配的FOF列表
 */
export const setAssetFOFList = (content) => {
    setStore(NAME_ASSET_FOF, content);
}

/**
 * 获取asset自配的FOF列表
 */
export const getAssetFOFList = () => {

    return getStore(NAME_ASSET_FOF);
}

/**
 * 存储FOF大类列表
 */
export const setAssetFOFTypeList = (content) => {
    setStore(NAME_ASSET_FOF_TYPE, content);
}

/**
 * 获取FOF大类列表
 */
export const getAssetFOFTypeList = () => {

    return getStore(NAME_ASSET_FOF_TYPE);
}

/**
 * 存储大类的K线数据
 */
export const setFOFKDataByTypeAndId = (type, fofId, content) => {
    setStore(NAME_ASSET_FOF_TYPE, content);
}

/**
 * 获取大类的K线数据
 */
export const getFOFKDataByTypeAndId = (type, fofId) => {

    return getStore(NAME_ASSET_FOF_TYPE);
}

/**
 * 设置我的资产信息查询的状态
 */
export const setMyAssetQueryStatus = (flag) => {
    setStore(NAME_MY_ASSET_QUERY_STATUS, flag);
}

/**
 * 获取我的资产信息查询的状态
 */
export const getMyAssetQueryStatus = () => {

    return getStore(NAME_MY_ASSET_QUERY_STATUS);
}

/**
 * 存储asset自配的数据，包括自配信息和持仓列表
 */
export const setAssetDiyInfo = (content) => {
    setStore(NAME_VIRTUAL_DIY_INFO, content);
}

/**
 * 获取asset自配的数据，包括自配信息和持仓列表
 */
export const getAssetDiyInfo = () => {

    return getStore(NAME_VIRTUAL_DIY_INFO);
}

/**
 * 存储实盘推荐组合的界面上的选择类型
 */
export const setTradeChoiceType = (content) => {
    console.log("content="+content);
    setStore(NAME_TRADE_CHOICE_TYPE, content);
}

/**
 * 获取实盘推荐组合的界面上的选择类型
 */
export const getTradeChoiceType = () => {
    return getStore(NAME_TRADE_CHOICE_TYPE);
}

/**
 * 存储虚拟盘推荐组合的界面上的选择类型
 */
export const setVirualChoiceType = (content) => {
    setStore(NAME_VIRUAL_CHOICE_TYPE, content);
}

/**
 * 获取虚拟盘推荐组合的界面上的选择类型
 */
export const getVirualChoiceType = () => {
    return getStore(NAME_VIRUAL_CHOICE_TYPE);
}

/**
 * 存储预约时间
 */
export const setAppointTime = (type,content) => {
    setStore(NAME_APPOINT_TIME+type, content);
}

/**
 * 获取预约时间
 */
export const getAppointTime = (type) => {

    return getStore(NAME_APPOINT_TIME+type);
}

/**
 * 存储预约星期
 */
export const setAppointWeek = (type,content) => {
    setStore(NAME_APPOINT_WEEK+type, content);
}

/**
 * 获取预约星期
 */
export const getAppointWeek = (type) => {

    return getStore(NAME_APPOINT_WEEK+type);
}

/**
 * 存储预约者姓名
 */
export const setAppointBuyName = (content) => {
    setStore(NAME_APPOINT_NAME, content);
}

/**
 * 获取预约者姓名
 */
export const getAppointBuyName = () => {

    return getStore(NAME_APPOINT_NAME);
}

/**
 * 存储预约者电话号码
 */
export const setAppointMobile = (content) => {
    setStore(NAME_APPOINT_MOBILE, content);
}

/**
 * 获取预约电话号码
 */
export const getAppointMobile = () => {

    return getStore(NAME_APPOINT_MOBILE);
}

/**
 * 存储投保人信息
 */
export const setAppointHolderInfo = (content) => {
    setStore(NAME_APPOINT_HOLDER_INFO, content);
}

/**
 * 获取投保人信息
 */
export const getAppointHolderInfo = () => {

    return getStore(NAME_APPOINT_HOLDER_INFO);
}

/**
 * 存储被保人信息
 */
export const setAppointInsurantInfo = (content) => {
    setStore(NAME_APPOINT_INSURANT_INFO, content);
}

/**
 * 获取被保人信息
 */
export const getAppointInsurantInfo = () => {

    return getStore(NAME_APPOINT_INSURANT_INFO);
}

/**
 * 存储预约信息投保人和被保人是否为同一人
 */
export const setAppointIsSameOne = (content) => {
    setStore(NAME_APPOINT_SAME_ONE, content);
}

/**
 * 获取预约信息投保人和被保人是否为同一人
 */
export const getAppointIsSameOne = () => {

    return getStore(NAME_APPOINT_SAME_ONE);
}





