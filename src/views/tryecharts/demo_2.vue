<template>
  <h2 id="title_rl">图表</h2>
  <div class="chart" id="l2Chart"/>
</template>

<script>
import {inject,onMounted} from "vue";
import chart1Data from "@/views/tryecharts/mock/one.json";

export default {
  name: "l2",
  setup() {
    let $echarts = inject("echarts")
    let $http = inject("axios")

    let chart1Data, xdata, ydata

    function setData() {
      chart1Data = require("./mock/one.json")
      xdata = chart1Data.chartData.map(v => v.title)
      ydata = chart1Data.chartData.map(v => v.num)
      console.log("xdata", xdata)
      console.log("ydata", ydata)
    }

    onMounted(() => {
      let myChart = $echarts.init(document.getElementById("l2Chart"))

      setData()

      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {type: 'cross'}
        },
        legend: {},
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '降水量',
            min: 0,
            max: 250,
            position: 'right',
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            position: 'left',
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: '降水量',
            type: 'bar',
            yAxisIndex: 0,
            data: [6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36.0, 19.3]
          },
          {
            name: '温度',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: [
              6.0,
              10.2,
              10.3,
              11.5,
              10.3,
              13.2,
              14.3,
              16.4,
              18.0,
              16.5,
              12.0,
              5.2
            ]
          }
        ]
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