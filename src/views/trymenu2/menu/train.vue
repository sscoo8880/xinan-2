<template>
  <section :style="{marginLeft:'158px',width:'750px'}">

    <p></p>
    <section v-show="show1">
      <section class="A" :style="{width:'750px'}">
        <APage style="width: 250px">
          <h1 style="font-size: 20px">已标记新闻</h1>
          <h1 style="font-size: 25px">24659</h1>
        </APage>
        <APage style="width: 250px">
          <h1 style="font-size: 20px">真实新闻</h1>
          <h1 style="font-size: 25px">10092</h1>
        </APage>
        <APage style="width: 250px">
          <h1 style="font-size: 20px">虚假新闻</h1>
          <h1 style="font-size: 25px">14567</h1>
        </APage>
      </section>
    </section>

    <section v-show="show2">
      <section class="A" :style="{width:'750px'}">
        <APage style="width: 250px">
          <h1 style="font-size: 20px">已标记新闻</h1>
          <h1 style="font-size: 25px">25159</h1>
        </APage>
        <APage style="width: 250px">
          <h1 style="font-size: 20px">真实新闻</h1>
          <h1 style="font-size: 25px">10287</h1>
        </APage>
        <APage style="width: 250px">
          <h1 style="font-size: 20px">虚假新闻</h1>
          <h1 style="font-size: 25px">14872</h1>
        </APage>
      </section>
    </section>

<!--    模型正确率-->
    <section v-show="show1" :style="{backgroundColor: 'rgba(12,130,255,.5'}">
      <h1 :style="{height: '2px'}">&#8197;</h1>
      <h1 style="font-size: 30px">模型准确率</h1>
      <h1 :style="{fontSize: '25px'}">80.13%</h1>
      <h1 :style="{height: '2px'}">&#8197;</h1>
    </section>

    <section v-show="show2" :style="{backgroundColor: 'rgba(12,130,255,.5'}">
      <h1 :style="{height: '2px'}">&#8197;</h1>
      <h1 style="font-size: 30px">模型准确率</h1>
      <h1 :style="{fontSize: '25px',color: 'red'}">80.77%</h1>
      <h1 :style="{height: '2px'}">&#8197;</h1>
    </section>


    <section :style="{width:'750px',height:height,backgroundColor:'rgba(12,130,255,.5'}">
      <p>&#8197;</p>
      <a-upload draggable action="/" :style="{width:'500px',marginLeft: '125px',marginTop:'20px'}"/>
      <a-button @click="isShow1" type="warning" :style="{marginTop: '20px'}" status="danger">开始训练</a-button>
      <h1 v-show="show3">正在训练...</h1>
      <section v-show="show2" :style="{marginLeft: '280px',marginTop:'30px'}">
        <p></p>
        <section class="B" :style="{marginLeft:'155px'}">
          <h1 :style="{marginLeft:'-280px',fontsize:'25px'}">训练集：</h1>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>

          <a-statistic title="真实新闻" :value="190" :precision="2" show-group-separator >
            <template #suffix>条&#8197;</template>
          </a-statistic>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <p>&#8197;</p>
          <a-statistic title="虚假新闻" :value="310" :precision="2">
            <template #suffix>&#8197;条</template>
          </a-statistic>
        </section>
    </section>



    </section>
  </section>

</template>

<script>
import APage from "@/views/tryecharts/components/A-Page";

export default {
  name: "train",
  components: {APage,},
  data() {
    return {
      show1: true,
      show2: false,
      show3: false,
      height:'320px',
    }
  },


  methods: {
    isShow1() {
      this.show3=true;
      setTimeout(() =>{
        this.show1 = false;
        this.show2 = true;
        this.show3 = false;
        this.height='440px';
      },2000);

    },
  }

}
</script>

<style scoped>
.A {
  flex: 5;
  display: flex; /*内部横向*/
}
.B {
  flex: 1;
  display: flex; /*内部横向*/
}
</style>