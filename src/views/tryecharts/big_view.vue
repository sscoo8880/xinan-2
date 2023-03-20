<template>
  <h1 :style="{marginTop: '30px',fontSize:'41px'}">区块链数据收集</h1>
  <section class="container" style="margin-top: -105px">

    <section class="left">
      <section class="A">
        <APage>
          <A1></A1>
        </APage>
        <APage>
          <A2></A2>
        </APage>
        <APage>
          <A3></A3>
        </APage>
      </section>
      <section class="C">
        <CPage>
          <C></C>
        </CPage>
      </section>
    </section>

    <section class="right">
      <section class="B">
        <BPage>
          <B1></B1>
        </BPage>
        <BPage>
          <B2></B2>
        </BPage>
      </section>
      <section class="D">
        <DPage>
          <D></D>
        </DPage>
      </section>
    </section>
  </section>
</template>

<script>
import APage from "@/views/tryecharts/components/A-Page";
import BPage from "@/views/tryecharts/components/B-Page";
import CPage from "@/views/tryecharts/components/C-Page";
import DPage from "@/views/tryecharts/components/D-Page";
import A1 from "@/views/tryecharts/view/local/A1";
import A2 from "@/views/tryecharts/view/local/A2";
import A3 from "@/views/tryecharts/view/local/A3";
import B1 from "@/views/tryecharts/view/local/B1";
import B2 from "@/views/tryecharts/view/local/B2";
import C from "@/views/tryecharts/view/local/C";
import D from "@/views/tryecharts/view/local/D";

import {inject} from "vue";

export default {
  name: "big_view",
  components: {APage, BPage, CPage, DPage, A1, A2, A3, B1, B2, C, D},
  data() {
    return {
      flag: 0,
    }
  },
  setup() {
    let $echarts = inject("echarts")
    let $http = inject("axios")
  },
  methods: {
    changeflag() {
      this.$emit('flag_echarts_lessee', this.flag)
    }
  }
}
</script>

<style scoped>
#title_e {
  margin-top: 10px;
  font-size: 33px;
}

.container {

  /*min-width: 1200px;*/
  /*max-width: 2048px;*/
  /*width: 1577px;*/
  width: 100%;
  height: 899px;
  /*height: 880px;*/
  /*margin: 0 auto;*/
  padding: 0 0 0;
  display: flex;
  background-color: floralwhite;
  /*background: url("../../assets/pic_2.jpg") no-repeat center*/

}

.A {
  flex: 5;
  margin-left: 50px;
  margin-top: 111px;
  display: flex; /*内部横向*/
}

.B {
  flex: 5;
  margin-right: 50px;
  margin-top: 111px;
  height: 195px;
  display: flex; /*内部横向*/
}

.C {
  flex: 5;
  margin-left: 50px;
  margin-top: 20px;
  height: 200px;
}

.D {
  flex: 5;
  margin-right: 50px;
  margin-top: 20px;
  height: 200px;
}

.top{
  height: 50px;
  width: 100%;
}

.bottom{
  width: 100%;
}

.left {
  flex: 5;
  height: 700px;
  /*width: 100%;*/
}

.right {
  flex: 5;
  height: 700px;
  /*width: 100%;*/
}

</style>
