<template>
  <h2 id="title_rl">总正确率</h2>
  <div class="chart" id="c2Chart"/>
</template>

<script>
import {inject,onMounted} from "vue";

export default {
  name: "c2",

  setup() {
    let $echarts = inject("echarts")

    onMounted(()=>{
      let myChart=$echarts.init(document.getElementById('c2Chart'))
      const option={
        tooltip:{
          trigger:'axis'
        },
        xAxis:[{
          type:'category',
          // name:'level',
          data:['0-25%','25%-50%','50%-75%','75%-100%','未答题'],
          axisLabel:{
            interval:false
          },
        }],
        yAxis:[{
          type:'value',
        }],
        series:[{
          type:'bar',
          data:[555,1333,2145,4211,184],
          formatter: '{value}人',
          markPoint: {
            data: [
              { type: 'max', name: 'Max' ,value:'max',formatter: '{value}人'},
              { type: 'min', name: 'Min' }
            ]
          },
        }]
      }
      myChart.setOption(option)

    })
  }
}
</script>

<style scoped>
.chart{
  margin-top: 0px;
  margin-left: 0px;
  height: 536.5px;
  width: 100%;
}

#title_rl{
  margin-top: 20px;
  font-size: x-large;
}
</style>