<template>
  <h2 id="title_rl">今日虚假新闻上传量</h2>
  <section class="B1-container">
    <B11></B11>
    <section style="margin-top: 10px">
      <h1 style="font-size: 13px">总上传量</h1>
      <h1 style="font-size: 17px">3341条</h1>
      <h1 style="font-size: 1px">&#8197;</h1>
      <h1 style="font-size: 13px">虚假新闻</h1>
      <h1 style="font-size: 17px">1647条</h1>
    </section>
  </section>
</template>

<script>
import B11 from "@/views/tryecharts/view/local/B11";

export default {
  name: "B2",
  components: {B11},

}
</script>

<style scoped>
.B1-container{
  width: 240px;
  height: 200px;
  display: flex;
}
#title_rl{
  margin-top: 20px;
  font-size: 18px;
}
</style>