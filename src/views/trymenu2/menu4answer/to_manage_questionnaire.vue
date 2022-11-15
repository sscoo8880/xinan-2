<template>
  <h1>已完成问卷界面</h1>
  <div>
    <a-button type="primary" @click="changeflag">返回上级页面</a-button>
  </div>
</template>

<script>
import answer_manage_questionnaire from "@/views/trymenu2/menu4answer/answer_manage_questionnaire";
export default {
  name: "to_manage_questionnaire",
  components:{
    answer_manage_questionnaire
  },
  data(){
    return{
      flag:0
    }
  }
  ,methods:{
    changeflag(){
      this.$emit("flag",this.flag)
    }
  }
}
</script>

<style scoped>

</style>