<template>
  <a-form>
    <a-page-header class="title" title="返回" @back="$router.back()" style="padding: 0" />
  </a-form>

  <div id="background-r"></div>
  <div class="Register" id="form-r">
    <a-form :model="form" :style="{width:'600px'}" @submit="handleSubmit" >
      <a-typography-title id="title-r">
        问卷宝
      </a-typography-title>
      <a-form-item field="name" label="用户名">
        <a-input v-model="form.username" placeholder="请输入你的用户名..." />
      </a-form-item>
      <a-form-item field="post" label="密码">
        <a-input v-model="form.password" placeholder="请输入你的密码..." />
      </a-form-item>
      <a-form-item field="post" label="手机号">
        <a-input v-model="form.phone" placeholder="请输入你的密码..." />
      </a-form-item>
      <a-form-item field="post" label="手机号验证码">
        <a-input v-model="form.capcode" placeholder="请输入验证码..."  style="width:300px;" />
        <a-button v-if="flag" type="primary" @click="getcode" id="a-button-s">获取</a-button>
        <a-button v-else direction='vertical' disabled type='primary' id="a-button-ss">获取</a-button>
      </a-form-item>
      <a-form-item field="treeSelect" label="用户类型">
        <a-tree-select style="width:600px;" :data="treeData" v-model="form.authority" placeholder="请选择 ..."/>
      </a-form-item>
      <a-form-item field="isRead">
        <a-checkbox v-model="form.isRead">
          我已阅读《服务许可协议》
        </a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button @click="empty" id="a-button-rrr">重置</a-button>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" id="a-button-r">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {reactive, toRaw} from 'vue';
import api from "@/api";
import axios from "axios";
import router from "@/router";
export default {
  name: 'register',
  data(){
    return {
      flag: true,
    }
  },
  components: {
  },
  setup() {
    const form = reactive({
      username: '',
      password: '',
      phone:'',
      capcode:'',
      authority: '',
      isRead: false,
    })

    //判断用户输入表单没有空值
    const objecAtrtIsEmpty = function (form) {
      let data=form;
      // 如果是数组，遍历数组里面的
      if (Array.isArray(data)) {
        if (data.length === 0) return false;
        return data.every(el => {
          return objecAtrtIsEmpty(el);
        });
        // 非空数组
      } else if (Object.prototype.toString.call(data) === "[object Object]" && JSON.stringify(data) !== '{}') {

        //对象or对象数组
        return Object.keys(data).every(key => {
          // 如果对象子元素为数组
          if (Array.isArray(data[key])) {
            if (data[key].length === 0) return false;
            return data[key].every(el => {
              return objecAtrtIsEmpty(el);
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
    }

    const handleSubmit = (data) => {
      data = Object.assign({}, form);
      delete data.isRead;
      if(objecAtrtIsEmpty(data)===false){
        alert("请完整输入")
      }
      else if(!form.isRead){
        alert("请勾选框")
      }
      else{
        let raw =toRaw(form);
        api.getregister(raw).then(res =>{
          if (res.code===200){
            alert("成功注册")
            router.push("/");
          }
          if(res.code===400){
            alert(res.message)
          }
        })
      }
    }

    //下拉菜单属性值
    const treeData = [
      {
        key: '1',
        title: '租户'
      },
      {
        key: '3',
        title: '答者'
      }
    ]

    return {
      form,
      treeData,
      handleSubmit
    }
  },
  methods:{
    empty(){
      this.form.phone=''
      this.form.username=''
      this.form.password=''
      this.form.capcode=''
      this.form.authority=''
      this.form.isRead=false
    },
    //验证码接口
    getcode(){
      if(this.form.phone===''){
        alert("请输入手机号码")
      }
      else {
        api.getregistercode(this.form.phone).then(res=>{
          console.log(res.data.code)
          if (res.data.code===20000){
            this.flag=false
          }
          else {
            alert("输入手机号不正确")
          }
        })
      }
    }
  }
}
</script>

<style scoped>

#background-r{
  background: url("../../assets/login_background.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

#title-r{
  position: relative;
  left: 50px;
}

#form-r{
  position: absolute;
  top: 40%;
  left: 25%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#a-button-r{
  background: #409EFF;
  color: #ffffff;
  width: 600px;
}

#a-button-s{
  background: #409EFF;
  color: #ffffff;
  width: 200px;
}

#a-button-ss{
  color: #ffffff;
  width: 200px;
}


#a-button-rrr{
  background: #409EFF;
  color: #ffffff;
  width: 600px;
}

</style>
