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

    //查询租户
    getLessees(data){
        return posttoken(path.baseUrl + path.getLessees, data, true)
    },

    //查询用户
    searchUser(data){
        return posttoken(path.baseUrl + path.searchUser, data, true)
    },

    //删除租户
    deleteLessees(data){
        return posttoken(path.baseUrl + path.deleteLessees, data, true)
    },

    //修改租户
    updateLessees(data){
        return posttoken(path.baseUrl + path.updateLessees, data, true)
    },

    //创建前验证唯一：租户名或手机号(异步
    checkUsernameOrPhone(data){
        return posttoken(path.baseUrl + path.checkUsernameOrPhone, data, true)
    },

    //新增租户，管理员
    registerByAdmin(data){
        return posttoken(path.baseUrl + path.registerByAdmin, data, true)
    },

    //新增用户，租户
    registerByLessees(data){
        return posttoken(path.baseUrl + path.registerByLessees, data, true)
    },

    //修改前验证唯一：租户名或手机号(异步
    checkUsernameOrPhoneExpOwn(data){
        return posttoken(path.baseUrl + path.checkUsernameOrPhoneExpOwn, data, true)
    },

    //修改租户
    updateUser(data){
        return posttoken(path.baseUrl + path.updateUser, data, true)
    },

    //删除用户
    deleteUser(data){
        return posttoken(path.baseUrl + path.deleteUser, data, true)
    },

    //查询问卷
    searchQuestion(data){
        return posttoken(path.baseUrl +path.searchQuestion,data,true)
    },

    //删除问卷
    deleteQuestion(data){
        return posttoken(path.baseUrl +path.deleteQuestion,data,true)
    },

    //查询群组
    selectGroup(data){
        return posttoken(path.baseUrl +path.selectGroup,data,true)
    },

    //新增群组
    addGroup(data){
        return posttoken(path.baseUrl +path.addGroup,data,true)
    },

    //删除群组
    deleteGroup(data){
        return posttoken(path.baseUrl +path.deleteGroup,data,true)
    },

    userLogout(data){
        return posttoken(path.baseUrl +path.userLogout,data,true)
    },

    updateQuestion(data){
        return posttoken(path.baseUrl +path.updateQuestion,data,true)
    }
}

export default api;
