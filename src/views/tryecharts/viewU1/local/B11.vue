<template>
  <div class="chart" id="B11"/>
</template>

<script>
import {inject,onMounted} from "vue";

export default {
  name: "B11",
  setup() {
    let $echarts = inject("echarts")

    onMounted(()=>{
      let myChart=$echarts.init(document.getElementById("B11"))

      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show:false,
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '数量',
            type: 'pie',
            radius: ['60%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 15,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1647, name: '虚假新闻' },
              { value: 1117, name: '真实新闻' },
              { value: 577, name: '无法判断' },
            ],
            formatter: '{value} 条'
          }
        ]
      };

      myChart.setOption(option)

    })
  }
}
</script>

<style scoped>
.chart{
  margin-left: 0px;
  margin-top:-5px;
  height: 160px;
  width: 150px;
}
#title_rl{
  margin-top: 20px;
  font-size: x-large;
}
</style>