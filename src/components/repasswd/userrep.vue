<template>
  <a-form :model="form" :style="{width:'600px'}" id= "form-phonerep1" @submit="handleSubmit">
    <a-typography-title id="title-rp">
      问卷宝
    </a-typography-title>
    <a-form-item field="name" label="用户名">
      <a-input v-model="form.username" placeholder="请输入用户名..." />
    </a-form-item>
    <a-form-item field="post" label="密保问题">
      <a-input disabled="true" v-model="question" style="width:300px;"/>
      <a-button type="primary" @click="getquestion" id="a-button-p">获取</a-button>
    </a-form-item>
    <a-form-item field="post" label="密保答案">
      <a-input v-model="form. passwordAnswer" placeholder="请输入密保答案..."  style="width:600px;" />
    </a-form-item>
    <a-form-item>
      <a-button @click="empty" type="outline" id="a-button-pp">重置</a-button>
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit" type="outline" id="a-button-pppp1" style="width:600px;">
        找回密码
      </a-button>
      <a-button @click="changeflag" type="outline" id="a-button-pppp1" style="width:600px;">
        手机找回
      </a-button>
    </a-form-item>
  </a-form>

</template>

<script>
import {reactive, toRaw} from 'vue';
import api from "@/api";
import bus from "@/api/index"

export default {
  name: 'userrep',
  data(){
    return{
      flag: 0,
      flag2: 2,
      token:'',
      question:'点击按钮获得密保问题',
      form:{
        username: '',
        passwordAnswer:'',
      },
      form1:{
        username: ''
      }
    }
  },
  methods:{
    empty(){
      this.form.username=''
      this.form.passwordAnswer=''
      this.question=''
    },
    changeflag(){
      this.$emit("onEvent",this.flag)
    },
    //判断用户输入表单没有空值
    objecAtrtIsEmpty(form) {
      let data=form;
      // 如果是数组，遍历数组里面的
      if (Array.isArray(data)) {
        if (data.length === 0) return false;
        return data.every(el => {
          return this.objecAtrtIsEmpty(el);
        });
        // 非空数组
      } else if (Object.prototype.toString.call(data) === "[object Object]" && JSON.stringify(data) !== '{}') {

        //对象or对象数组
        return Object.keys(data).every(key => {
          // 如果对象子元素为数组
          if (Array.isArray(data[key])) {
            if (data[key].length === 0) return false;
            return data[key].every(el => {
              return this.objecAtrtIsEmpty(el);
            });
          } else if (Object.prototype.toString.call(data) === "[object Object]") {
            // 如果0表示不为空的话可以直接用!data
            // 直接用!data,非运算符的话有些值为0的话会被过滤掉
            return data[key] !== "" && data[key] != null && data[key] !== undefined;
          } else {
            return key !== "" && key != null && true;
          }
        });
      } else if (Object.prototype.toString.call(data) === "[object Object]" && JSON.stringify(data) === '{}') {
        return false;
      } else {
        // 处理单个值
        return data !== "" && data != null && true;
      }
    },

    handleSubmit(data){
      data = Object.assign({}, this.form);
      delete data.isRead;
      if(this.objecAtrtIsEmpty(data)===false){
        alert("请完整输入")
      }
      else {
        let raw =toRaw(this.form);
        api.getqwd(raw).then(res =>{
          if (res.code===20000){
            alert("验证成功")
            this.token=res.data.token
            this.$emit("onEvent",this.flag2)
            sessionStorage.setItem("token",res.data.token)
          }
          if(res.code===20001){
            alert(res.msg)
          }
        })
      }
    },
    getquestion(){
      if(this.form.username===''){
        alert("请输入用户名")
      }
      else {
        this.form1.username=this.form.username
        api.getquestion(this.form1).then(res=>{
          if(res.code===200){
            this.question= res.data.question
          }
          else {
            alert("输入用户名不正确")
          }
        })
      }
    }
  },
}

</script>

<style scoped>
#form-phonerep1{
  position: absolute;
  top: 40%;
  left: 25%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#a-button-pppp1{
  width: 300px;
}

#a-button-p{
  background: #409EFF;
  color: #ffffff;
  width: 200px;
}

#a-button-pp{
  background: #409EFF;
  color: #ffffff;
  width: 600px;
}

#title-rp{
  position: relative;
  left: 50px;
}

</style>