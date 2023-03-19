<template>
  <div id="background"></div>
  <div class="Login" id="figure">
    <img alt="Vue logo" src="../../assets/dashboard.png">
  </div>
  <div id="form">
    <a-typography-title id="title-l">
      问卷宝
    </a-typography-title>
    <a-form :model="form" :style="{width:'550px'}" @submit="handleSubmit">
      <a-form-item v-if="form.userflag" field="name" label="用户名">
        <a-input v-model="form.username" placeholder="请输入你的用户名" />
      </a-form-item>
      <a-form-item v-else field="phonenumber" label="手机号码">
        <a-input v-model="form.phone" placeholder="请输入你的手机号码" />
      </a-form-item>

        <a-form-item v-if="form.userflag" field="post" label="密码">
          <a-input  v-model="form.password" type="password" placeholder="请输入你的密码..." />
        </a-form-item>
        <a-form-item v-else field="post" label="验证码">
          <a-input v-model="form.capcode" placeholder="请输入验证码..."  style="width:300px;" />
          <a-button type="primary" @click="getcode" id="a-button-ls">获取</a-button>
        </a-form-item>
      <a-form-item field="isRead">
        <a-checkbox v-model="form.userflag">
          用户密码登录
        </a-checkbox>
        <a-link type="info" id="a-link">
          <router-link to="/register">
            没有账号？立即注册
          </router-link>
          <router-view></router-view>
        </a-link>
        <a-link type="info" id="a-link2">
          <router-link to="/repasswd">
            忘记密码
          </router-link>
          <router-view></router-view>
        </a-link>
      </a-form-item>
      <a-form-item>
        <a-button  html-type="submit" id="a-button">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>

import {reactive, toRaw,} from 'vue';
import api from "@/api";
import router from "@/router";
export default {

  name: 'login',
  components: {
  },

  data(){
    return{
      routerTime: 0,
      transitionName: "slide-left",
      code:0
    }
  },
  setup() {
    const form = reactive({
      username: '',
      password: '',
      phone:'',
      capcode: '',
      userflag: true,
    })

    const form1 = reactive({
      username: '',
      password: '',
    })

    const form2 = reactive({
      phone:'',
      capcode: '',
    })

    const handleSubmit = () => {
      if(form.userflag){
        if(form.username === ""||form.password ===""){
          alert("用户名或密码不能为空")
        }
        else if (form.username==="admin"&&form.password==="77"){
          form1.username = form.username
          form1.password = form.password
          router.push("/menu4user1")
        }
        else if (form.username==="user"&&form.password==="11"){
          form1.username = form.username
          form1.password = form.password
          router.push("/menu4user2")
        }
        else{
          alert("请输入正确的账号和密码")
        }
      //   else {
      //     if (form.userflag) {
      //       form1.username = form.username
      //       form1.password = form.password
      //       api.getuserLogin(form1).then(res => {
      //         if (res.data.code === 20000) {
      //           if(res.data.data.authority===0){
      //             sessionStorage.setItem("token",res.data.data.token);
      //             router.push("/menu4manager");
      //           }
      //           else if (res.data.data.authority===1){
      //             sessionStorage.setItem("token",res.data.data.token);
      //             router.push("/menu4lessee");
      //           }
      //           else if (res.data.data.authority===2){
      //             sessionStorage.setItem("token",res.data.data.token);
      //             router.push("/menu4user");
      //           }
      //           else {
      //             sessionStorage.setItem("token",res.data.data.token);
      //             router.push("/menu4answer");
      //           }
      //         } else {
      //           alert("登录失败")
      //         }
      //       })
      //     }
      // }
      }
      else {
        if(form.phone === ""||form.capcode ===""){
          alert("手机号或验证码不能为空")
        }
        else {
          form2.phone=form.phone
          form2.capcode=form.capcode
          api.getphoneLogin(form2).then(res => {
            if (res.code === 20000) {
              if(res.data.data.authority===0){
                sessionStorage.setItem("token",res.data.data.token);
                router.push("/menu4manager");
              }
              else if (res.data.data.authority===1){
                sessionStorage.setItem("token",res.data.data.token);
                router.push("/menu4lessee");
              }
              else if (res.data.data.authority===2){
                sessionStorage.setItem("token",res.data.data.token);
                router.push("/menu4user");
              }
              else {
                sessionStorage.setItem("token",res.data.data.token);
                router.push("/menu4answer");
              }
            }
            else {
              alert("登录失败")
            }
          })
        }
      }
    }
    return {
      form,
      handleSubmit
    }
  },
  methods:{
    getcode(){
      if(this.form.phone===''){
        alert("请输入手机号码")
      }
      else {
        console.log(this.form.phone),
            api.getregistercode(this.form.phone)
      }
    }
  }
}
</script>

<style scoped>

#title-l{
  position: relative;
  left: 50px;
}

#background{
  background: url("../../assets/login_background.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

#a-button{
  background: #409EFF;
  color: #ffffff;
  width: 600px;
}

#figure{
  position: absolute;
  top: 10%;
  left: 5%;
}

#a-link{
  color: #000000;
  position: absolute;
  top: 205px;
  left: 300px;
}

#a-link2{
  color: #000000;
  position: absolute;
  top: 205px;
  left: 450px;
}

#form{
  position: absolute;
  top: 23%;
  left: 55%;
}

a {
  color: black;
  text-decoration: none;
}

#a-button-ls{
  background: #ffc940;
  color: #ffffff;
  width: 200px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>
