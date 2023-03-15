<template>
  <div style="margin-bottom: 15px">
    <a-space direction="horizontal" size="large" style="width: 100%">
      <a-button @click="changeflag" type="primary">返回上一界面</a-button>
    </a-space>
  </div>
  <echarts-page4questions/>
</template>

<script>
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import echartsPage4questions from "@/views/tryecharts/viewLessee/echartsPage4questions";
export default {
  name: "user_manage_analyse_questionnaire",
  components:{
    echartsPage4questions
  },
  data() {
    return {
      flag: 0,
      quData: {},
      scale: '',
    }
  },
  methods:{
    changeflag(){
      this.$emit('flag_analyse',this.flag)
    }
  },
}
</script>

<style scoped lang="scss">
@import '../../../style/_Data.scss';
</style>
