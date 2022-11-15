<template>
  <h1>已完成问卷界面</h1>
  <div>
    <a-button type="primary" @click="appare(getpath('look')),disappare(getpath('comp'))">返回上级页面</a-button>
  </div>


  <div id="look">
    <answer_answer_questionnaire></answer_answer_questionnaire>
  </div>
</template>

<script>
import answer_answer_questionnaire from "@/views/trymenu2/menu4answer/answer_answer_questionnaire";
export default {
  name: "to_answer_questionnaire",
  components:{
    answer_answer_questionnaire
  }
  ,methods:{
    getpath(id) {
      return document.getElementById(id);
    },
    disappare(x)//当前页面消失
    {
      console.log(document.getElementById("comp").style.display)
      x.style.display="none"
      console.log(document.getElementById("comp").style.display)
    },
    appare(x)//新页面出现
    {
      x.style.display="block"
    }
  }
}
</script>

<style scoped>

</style>
