<template>
  <a-form ref="phonerep" :model="form" :style="{width:'600px'}" id= "form-phonerep" @submit="handleSubmit">
    <a-typography-title id="title-rp">
      问卷宝
    </a-typography-title>
    <a-form-item field="post" label="手机号">
      <a-input v-model="form.phone" placeholder="请输入手机号..." />
    </a-form-item>
    <a-form-item field="post" label="验证码">
      <a-input v-model="form.capcode" placeholder="请输入验证码..."  style="width:300px;" />
      <a-button v-if="flag3" type="primary" @click="getCode" id="a-button-p">获取</a-button>
      <a-button v-else direction='vertical' disabled type='primary' id="a-button-p2">获取</a-button>
    </a-form-item>
    <a-form-item>
      <a-button @click="empty" type="outline" id="a-button-pp">重置</a-button>
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit" type="outline" id="a-button-pppp" style="width:600px;">
        找回密码
      </a-button>
      <a-button @click="changeflag" type="outline" id="a-button-pppp" style="width:600px;">
        密保找回
      </a-button>
    </a-form-item>
  </a-form>

</template>

<script>
import {reactive, toRaw} from 'vue';
import api from "@/api";

export default {
  name: 'phonerep',
  data(){
    return{
      flag: 1,
      flag2: 2,
      flag3: true,
      token:'',
      form:{
        phone: '',
        capcode:'',
      },
    }
  },

  methods:{
    empty(){
      this.form.phone=''
      this.form.capcode=''
    },
    //修改页面
    changeflag(){
      this.$emit("onEvent",this.flag)
    },
    //获取手机验证码
    getCode(){
      if(this.form.phone===''){
        alert("请输入手机号码")
      }
      else {
        api.getregistercode(this.form.phone).then(res=>{
          if (res.data.code===20000){
            this.flag=false
          }
          else {
            alert("输入手机号不正确")
          }
        })
      }
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
        api.getpwd(raw).then(res =>{
          console.log(res);
          if (res.code===20000){
            alert(res.msg)
            this.token=res.data.token
            this.$emit("onEvent",this.flag2)
            sessionStorage.setItem("token",res.data.token)
          }
          if(res.code===20001){
            alert(res.msg)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
#form-phonerep{
  position: absolute;
  top: 40%;
  left: 25%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#a-button-p{
  background: #409EFF;
  color: #ffffff;
  width: 200px;
}

#a-button-p2{
  color: #ffffff;
  width: 200px;
}

#a-button-pp{
  background: #409EFF;
  color: #ffffff;
  width: 600px;
}

#a-button-pppp{
  width: 300px;
}

#title-rp{
  position: relative;
  left: 50px;
}

</style>