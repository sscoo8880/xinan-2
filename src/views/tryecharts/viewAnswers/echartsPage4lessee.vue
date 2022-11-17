<template>
  <div style="margin-bottom: 15px">
    <a-space direction="horizontal" size="large" style="width: 100%">
      <a-button @click="changeflag" type="primary">返回上一界面</a-button>
    </a-space>
  </div>
  <h1 id="title_e">租户分析</h1>
<!--  <a-button @click="changeflag" type="outline">租户分析</a-button>-->
  <section class="container">
    <section class="left">
      <!--      插槽，左1-->
      <RlPage>
        <L></L>
      </RlPage>

    </section>

    <section class="center">
      <CPage>
        <c1></c1>
      </CPage>
      <CPage style="margin-top: 6px">
        <c2></c2>
      </CPage>
    </section>

    <section class="right">
      <!--      插槽，右1-->
      <RlPage>
        <R></R>
      </RlPage>

    </section>

  </section>
</template>

<script>
import RlPage from "@/views/tryecharts/components/rlPage";
import CPage from "@/views/tryecharts/components/cPage";
import R from "@/views/tryecharts/viewAnswers/r";
import L from "@/views/tryecharts/viewAnswers/l";
import C1 from "@/views/tryecharts/viewAnswers/c1";
import C2 from "@/views/tryecharts/viewAnswers/c2";

import {inject} from "vue";
export default {
  name: "echartsPage",
  components: {RlPage, CPage, R, L, C1, C2},
  data(){
    return{
      flag:0,
    }
  },
  setup(){
    let $echarts=inject("echarts")
    let $http=inject("axios")
  },
  methods:{
    changeflag(){
      this.$emit('flag_echarts_lessee',this.flag)
    }
  }
}
</script>

<style scoped>
#title_e{
  margin-top: 10px;
  font-size: 33px;
}

.container{
  /*min-width: 1200px;*/
  /*max-width: 2048px;*/
  width: 1200px;
  margin-left: -50px;
  margin-top: -15px;
  /*margin: 0 auto;*/
  padding: 0 0 0;
  display: flex;
}

.left{
  flex: 6;
  height: 700px;
  /*width: 100%;*/
}

.right{
  flex: 4;
  height: 700px;
  /*width: 100%;*/
}

.center{
  flex: 3;
  height: 700px;
  /*width: 100%;*/
  /*border: 1px solid blue;*/
  /*margin: 2px;*/
  /*background-color: rgba(12,130,255,.3);*/
}
</style>
