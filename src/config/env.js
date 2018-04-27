/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let baseUrl;
let routerMode;
const imgBaseUrl = 'http://10.21.1.21:78';
const cdnPdfUrl="http://od60al7id.bkt.clouddn.com/typepdf.png";
let socketBaseUrl;

if (process.env.NODE_ENV == 'development') {
    baseUrl = 'http://10.21.1.21:10001';
    // baseUrl = 'http://116.62.121.174:8091';
    // baseUrl = 'http://cur.baomap.com';
    routerMode = 'hash';
} else {
    // baseUrl = 'http://10.21.1.21:98';
    baseUrl = 'http://cur.baomap.com';
    routerMode = 'hash';
}

export {
    baseUrl,
    routerMode,
    imgBaseUrl,
    socketBaseUrl,
    cdnPdfUrl
}
