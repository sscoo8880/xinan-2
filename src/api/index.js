import axios, {post, posttoken} from "../utils/request";
import path from "./path";

const api ={
    //登录
    getuserLogin(data){
        return axios.post( path.baseUrl+path.userlogin,
            {
                username:data.username,
                password:data.password
            })
    },

    //登录
    getphoneLogin(data){
        return post( path.baseUrl+path.phonelogin,data,true)
    },

    //注册验证码
    getregistercode(data){
        return axios.post(path.baseUrl + path.registercode + '/' + data)
    },

    //注册
    getregister(data){
        return post( path.baseUrl+path.register,data,true)
    },

    //手机找回
    getpwd(data){
        return post( path.baseUrl+path.findpwd,data,true)
    },

    //密保找回
    getqwd(data){
        return post( path.baseUrl+path.findqwd,data,true)
    },

    //修改密码
    changewd(data){
        return posttoken( path.baseUrl+path.changewd,data,true)
    },

    //获取密保问题
    getquestion(data){
        return post(path.baseUrl+path.getQuestion,data,true)
    },
    //新增群组
    addGroup(data){
        return posttoken(path.baseUrl +path.addGroup,data,true)
    },

    userLogout(data){
        return posttoken(path.baseUrl +path.userLogout,data,true)
    },

    updateQuestion(data){
        return posttoken(path.baseUrl +path.updateQuestion,data,true)
    },

}

export default api;
