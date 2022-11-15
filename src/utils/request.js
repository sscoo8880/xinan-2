import qs from "qs"
import axios from "axios";
import QS from "qs";

const errorHandle = (status,info) =>{
    switch(status){
        case 400:
            console.log("语义有误")
            break;
        case 401:
            console.log("服务器认证失败")
            break;
        case 403:
            console.log("服务器拒绝访问")
            break;
        case 404:
            console.log("地址错误")
            break;
        case 500:
            console.log("服务器遇到意外")
            break;
        case 502:
            console.log("服务器无响应")
            break;
        default:
            console.log(status)
            console.log(info);
            break;
    }
}

const instance =axios.create({
    //网络请求的公共配置
    timeout:5000
})

//发送数据之前
instance.interceptors.request.use(
    config =>{
        if(config.method ==="post"){
            config.data =qs.stringify(config.data)
        }
        //包含网络请求所有信息
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

//获取数据之前
instance.interceptors.response.use(
    response =>{
        return response.status ===200? Promise.resolve(response):Promise.reject(response)
    },
    error => {
        const { response } =error;
        //错误处理最重要
        errorHandle(response.status,response.info)
    }
)

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Boolean} json [true：json格式请求头；false：FormData格式请求头]
 */
export function post(url, params = {}, json = false) {
    // json格式请求头

    const headerJSON = {
        "Content-Type": "application/json",
    };

    // FormData格式请求头
    const headerFormData = {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };

    return new Promise((resolve, reject) => {
        axios
            .post(url, json ? JSON.stringify(params) : QS.stringify(params), {
                headers: json ? headerJSON : headerFormData
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });

}


/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Boolean} json [true：json格式请求头；false：FormData格式请求头]
 */
export function posttoken(url, params = {}, json = false) {
    // json格式请求头

    const headerJSON = {
        "Content-Type": "application/json",
        "token": window.sessionStorage.getItem("token")
    };

    // FormData格式请求头
    const headerFormData = {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "token": window.sessionStorage.getItem("token")
    };

    return new Promise((resolve, reject) => {
        axios
            .post(url, json ? JSON.stringify(params) : QS.stringify(params), {
                headers: json ? headerJSON : headerFormData
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            });
    });

}

export default instance;
