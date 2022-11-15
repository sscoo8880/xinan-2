<template>
  <h1 id="title_e">数据大屏</h1>
  <section class="container">
    <section class="left">
      <!--      插槽，左1-->
      <RPage>
        <L1></L1>
      </RPage>


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
      <RPage>
        <R1></R1>
      </RPage>

    </section>

  </section>
</template>

<script>
import RlPage from "@/views/tryecharts/rlPage";
import RPage from "@/views/tryecharts/rPage";
import CPage from "@/views/tryecharts/cPage";
import R1 from "@/views/tryecharts/r1";
import R2 from "@/views/tryecharts/r2";
import L1 from "@/views/tryecharts/l1";
import L2 from "@/views/tryecharts/l2";
import C1 from "@/views/tryecharts/c1";
import C2 from "@/views/tryecharts/c2";

import {inject} from "vue";

export default {
  name: "echartsPage",
  components: {RlPage, RPage, CPage, R1, R2, L1, L2, C1, C2},
  setup(){
    let $echarts=inject("echarts")
    let $http=inject("axios")
  }
}
</script>

<style scoped>
#title_e{
  margin-top: 30px;
  font-size: 44px;
}

.container{
  /*min-width: 1200px;*/
  /*max-width: 2048px;*/
  width: 1500px;
  margin-left: 20px;
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