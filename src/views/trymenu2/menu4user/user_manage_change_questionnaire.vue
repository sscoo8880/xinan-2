<template>
  <h1>修改问卷</h1>
  <div >
    <a-button type="primary" @click="appare(getpath('manage')),disappare(getpath('change'))">返回上级页面</a-button>
  </div>
  <div id="manage">
    <user_manage_questionnaire></user_manage_questionnaire>
  </div>
</template>

<script>
import user_manage_questionnaire from "@/views/trymenu2/menu4user/user_manage_questionnaire";
export default {
  name: "user_manage_change_questionnaire",
  components:{
    user_manage_questionnaire
  }
  ,methods:{
    getpath(id) {
      return document.getElementById(id);
    },
    disappare(x)//当前问卷分析页面消失
    {
      x.style.display="none"
    },
    appare(x)//数据大屏页面出现
    {
      x.style.display="block"
    }
  }
}
</script>

<style scoped>

</style>