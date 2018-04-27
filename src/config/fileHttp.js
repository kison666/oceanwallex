import {
    baseUrl
} from './env'
import Vue from 'vue'
import VueResource from 'vue-resource'
export default (type = 'GET', url = '', data = {}, successCallback, auth = '', file = 'false') => {
    //检测设备是否联网
    if (!navigator.onLine) {
        successCallback({ retCode: 402, retMsg: "设配已断开网络，请检查!" });
        return;

    }
    console.log("===========fhttp==================");
    Vue.use(VueResource);
    type = type.toUpperCase();
    url = baseUrl + url;

    if (auth != '') {
        Vue.http.headers.common['Authorization'] = 'Bearer ' + auth;
    } else {

    }
    // {data:[{dType:0,compFile:[file1,file2]}]} 
    if (file == 'false') {
        Vue.http.options.emulateJSON = true;
    } else {
        let fileData = new FormData();
        fileData.append("enctype", "multipart/form-data");
        var map = eval(data);
        // map= {data........};
        for (var key in map) {
            var val = map[key];
            // val=data:[{dType:0,compFile:[file1,file2]}];
            if (val instanceof Array) {
                for (let i = 0; i < val.length; i++) {
                    // val[i] =  {dType:0,compFile:[file1,file2]};
                    var obj = val[i];
                    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
                    if (isjson == true) {
                        var itemMap = eval(val[i]);
                        // itemMap =  {dType:0,compFile:[file1,file2]};
                        for (var itemKey in itemMap) {
                            var itemValue = itemMap[itemKey];
                            //itemValue = [file1,file2] | 0;
                            let fileData1 = new FormData();
                            fileData1.append("enctype", "multipart/form-data");
                            if (itemValue instanceof Array) {
                                // for (let arrayi = 0; i < itemValue.length; arrayi++) {
                                //  fileData.append(key + '['+itemKey+'[]'+']', itemValue[arrayi]);
                                // } 
                            } else {
                                fileData.append(key + '[' + itemKey + ']', itemValue);
                            }
                        }
                    } else {
                        fileData.append(key + '[]', val[i]);
                    }
                }
            } else {
                fileData.append(key, val);
            }

        }
        data = fileData;
    }

    if (type == 'POST') {
        try {
            Vue.http.post(url, data).then(function(res) {
                if (res.status == 200) {
                    try {
                        successCallback(JSON.parse(res.bodyText));
                        return;
                    } catch (e) {
                        return;
                    }
                } else if (res.status == 500) {
                    successCallback({ retCode: 500, retMsg: "服务器连接错误" });
                    return;
                }

            }, function(res) {
                if (res.status == 401) {
                    successCallback({ retCode: 110001, retMsg: "TOKEN为空" });
                } else if (res.status == 500) {
                    successCallback({ retCode: 500, retMsg: "服务器连接错误" });
                } else {
                    successCallback({ retCode: 401, retMsg: "服务器错误" });
                }
                return;
            });
        } catch (e) {
            successCallback({ retCode: 401, retMsg: "服务器错误" });
            return;
        }

    }
}