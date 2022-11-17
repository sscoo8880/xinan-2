<template>
  <div style="margin-bottom: 15px">
    <a-space direction="horizontal" size="large" style="width: 100%">
      <a-button @click="changeflag" type="primary">返回上一界面</a-button>
    </a-space>
  </div>
  <h1 id="title_e">数据大屏-分析问卷</h1>
<!--  对答卷情况进行可视化展示-->
  <!--  <a-button @click="changeflag" type="outline">租户分析</a-button>-->
  <section class="container">
    <section class="left">
      <!--      插槽，左1-->
      <RlPage>
        <l4lPage></l4lPage>
      </RlPage>

    </section>

    <section class="right">
      <CPage>
        <r14l></r14l>
      </CPage>
      <CPage style="margin-top: 6px">
        <r24l></r24l>
      </CPage>
    </section>
  </section>
</template>

<script>
import RlPage from "@/views/tryecharts/components/rlPage";
import CPage from "@/views/tryecharts/components/cPage";
import R from "@/views/tryecharts/viewAnswers/r";
import C1 from "@/views/tryecharts/viewAnswers/c1";
import C2 from "@/views/tryecharts/viewAnswers/c2";

import {inject} from "vue";
import L4lessee from "@/views/tryecharts/demo";
import L4lPage from "@/views/tryecharts/viewLessee/l4lPage.vue";
import R14l from "@/views/tryecharts/viewLessee/r14l";
import R24l from "@/views/tryecharts/viewLessee/r24l";

export default {
  name: "echartsPage",
  components: {L4lPage,L4lessee, RlPage, CPage, R, R14l, R24l},
  setup(){
    let $echarts=inject("echarts")
    let $http=inject("axios")
  }
}
</script>

<style scoped>
#title_e{
  margin-top: -50px;
  font-size: 33px;
}

.container{
  /*min-width: 1200px;*/
  /*max-width: 2048px;*/
  width: 1300px;
  margin-left: 0px;
  margin-top: -15px;
  /*margin: 0 auto;*/
  padding: 0 0 0;
  display: flex;
}

.left{
  flex: 7;
  height: 700px;
  /*width: 100%;*/
}

.right{
  flex: 3;
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
