<template>
  <a-form ref="phonerep" :model="form" :style="{width:'600px'}" id= "form-phonerep" @submit="handleSubmit">
    <a-typography-title id="title-rp">
      问卷宝
    </a-typography-title>
    <a-form-item field="name" label="新密码">
      <a-input v-model="form.password" placeholder="请输入新密码..." />
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit" type="outline" id="a-button-pppp" style="width:600px;">
        修改密码
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import {reactive, toRaw} from 'vue';
import api from "@/api";

export default {
  name: 'repass',
  data(){
    return{
      flag: 1,
      flag2: 2,
      form:{
        password: '',
      }
    }
  },

  methods:{
    empty(){
      this.form.password=''
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
        //this.form.token=sessionStorage.getItem("token")
        let raw =toRaw(this.form);
        api.changewd(raw).then(res =>{
          console.log(res);
          if (res.code===20000){
            alert("修改成功")
            this.$router.push("/")
          }
          if(res.code===20001){
            alert(res.message)
          }
        })
      }
    },
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

#a-button-pppp{
  width: 300px;
}

#title-rp{
  position: relative;
  left: 50px;
}

</style>