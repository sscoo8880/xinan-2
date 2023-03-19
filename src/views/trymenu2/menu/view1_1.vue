<template>
  <div style="margin-bottom: 15px">

  <h1 class="title_e">每日数据集收集量</h1>
  <section class="container">
    <cloudview></cloudview>
  </section>
  </div>
</template>

<script>
import cloudview from "@/views/tryecharts/view/cloud/cloudview";

import {inject} from "vue";
export default {
  name: "echartsPage",
  components: {cloudview},
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
.title_e{
  margin-top: 10px;
  margin-right: 111px;
  font-size: 25px;
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
.A{
  flex: 5;
  display: flex; /*内部横向*/
}

.B{
  flex: 5;
  height: 195px;
  display: flex; /*内部横向*/
}

.C{
  flex: 5;
  margin-top: 5px;
  height: 200px;
}

.D{
  flex: 5;
  height: 200px;
}
.left{
  flex: 5;
  height: 100px;
  /*width: 100%;*/
}

.right{
  flex: 5;
  height: 100px;
  /*width: 100%;*/
}

</style>
