<template>
  <h2 id="title_rl">题目</h2>
  <div class="chart" id="demo"/>
</template>

<script>
import {inject,onMounted} from "vue";

export default {
  name: "l4lessee",
  setup() {
    let $echarts = inject("echarts")

    //数据集
    let data=[
      {
        name: 'A',
        value:  Math.round(Math.random() * 24)
      },
      {
        name: 'B',
        value:  Math.round(Math.random() * 24)
      },
      {
        name: 'C',
        value:  Math.round(Math.random() * 24)
      },
      {
        name: 'D',
        value:  Math.round(Math.random() * 24)
      },
    ]

    onMounted(()=>{
      let myChart=$echarts.init(document.getElementById("demo"))

      const option={

      }

      myChart.setOption(option)

    })
  }
}
</script>

<style scoped>
.chart{
  margin-left: 20px;
  margin-top:10px;
  height: 600px;
  width: 100%;
}
#title_rl{
  margin-top: 20px;
  font-size: x-large;
}
</style>