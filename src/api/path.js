//定义了每个接口对应的url地址
const base ={
    baseUrl:" http://localhost:8085",

    //用户名登录
    userlogin:"/user-service/user/login",

    //手机登录?
    phonelogin:"/user-service/sms/login",

    //获取验证码
    registercode:"/user-service/api/sms/send",

    //注册
    register:"/user-service/user/register",

    //手机找回
    findpwd:"/user-service/sms/login",

    //密保找回
    findqwd:"/user-service/user/forgetByQuestion",

    //修改密码
    changewd:"/user-service/user/changePassword",

    //获取密保问题
    getQuestion:"/user-service/user/getQuestion",

    //查询租户
    getLessees: "/user-service/user/getLessees",


    //删除租户
    deleteLessees:"/user-service/user/deleteLessees",

    //修改租户
    updateLessees:"/user-service/user/updateLessees",


    //创建前验证唯一：用户名或手机号
    checkUsernameOrPhone:"/user-service/user/checkUsernameOrPhone",

    //新增租户，管理员
    registerByAdmin:"/user-service/user/registerByAdmin",

    //查询用户
    searchUser:"/user-service/user/searchUser",

    //新增用户，租户
    registerByLessees:"/user-service/user/registerByLessees",

    //修改前验证唯一：用户名或手机号
    checkUsernameOrPhoneExpOwn:"/user-service/user/checkUsernameOrPhoneExpOwn",

    //修改用户
    updateUser:"/user-service/user/updateUser",

    //删除用户
    deleteUser:"/user-service/user/deleteUser",

    //查询问卷
    searchQuestion:"/user-service/questionnaire/searchAllQuestionnairesByName",

    //删除问卷
    deleteQuestion:"/user-service/questionnaire/deleteQuestionnaire",

    //查询群组
    selectGroup:"/user-service/group/selectGroup",

    //新增群组
    addGroup:"/user-service/group/addGroup",

    //删除群组
    deleteGroup:"/user-service/group/deleteGroup",

    //注销
    userLogout:"/user-service/user/logout",

    //修改密保
    updateQuestion:"/user-service/user/updateQuestion"
}

export default base;
