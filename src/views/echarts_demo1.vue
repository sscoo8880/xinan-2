<template>
  <h2 id="title_rl">图表</h2>
  <div class="chart" id="l1Chart"/>
</template>

<script>
import {inject,onMounted} from "vue";
import chart1Data from "@/views/tryecharts/mock/one.json";

export default {
  name: "l1",
  setup() {
    let $echarts = inject("echarts")
    let $http = inject("axios")

    let chart1Data,xdata,ydata

    function setData() {
      chart1Data = require("./tryecharts/mock/one.json")
      xdata = chart1Data.chartData.map(v => v.title)
      ydata = chart1Data.chartData.map(v => v.num)
      console.log("xdata", xdata)
      console.log("ydata", ydata)
    }

    onMounted(()=>{
      let myChart=$echarts.init(document.getElementById("l1Chart"))

      setData()
      myChart.setOption({
        tooltip:{
          trigger:'axis',
          axisPointer:{type:'cross'}
        },
        legend:{},
        xAxis:[
          {
            type: 'category',
            axisTick:{
              alignWithLabel:true
            },
            axisLabel:{
              interval:false
            },
            data:xdata
          }
        ],
        yAxis:[
          {
            type:'value',
            data:ydata,
            name:'价格',
            min:0,
            // max:10,
            position:'left',
            axisLabel:{
              formatter:'{value}元'
            }
          },
        ],
        series:[
          {
            name:'价格',
            type:'bar',
            yAxisIndex:0,
            data:ydata
          },
        ],
        darkMode:true,
      })
    })
  }
}
</script>

<style scoped>
.chart{
  top: 5px;
  height: 300px;
  width: 400px;
}
#title_rl{
  margin-top: 20px;
  font-size: x-large;
}
</style>