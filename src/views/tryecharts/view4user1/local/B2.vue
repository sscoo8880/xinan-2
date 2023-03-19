<template>
  <h2 id="title_rl">爬虫数据来源</h2>
  <div class="chart" id="B2"/>
</template>

<script>
import {inject,onMounted} from "vue";

export default {
  name: "B2",
  setup() {
    let $echarts = inject("echarts")

    onMounted(()=>{
      let myChart=$echarts.init(document.getElementById("B2"))

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {show:false},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['百度贴吧', '知乎', '哔哩哔哩', '其他', '今日头条']
        },
        series: [
          {
            name: '虚假新闻',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: '真实新闻',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '无法判断',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
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
  margin-top:-42px;
  height: 190px;
  width: 330px;
}
#title_rl{
  margin-top: 20px;
  font-size: 18px;
}
</style>