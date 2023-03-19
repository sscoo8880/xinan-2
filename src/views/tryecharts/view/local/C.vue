<template>
  <h2 id="title_rl" style="font-size: 20px">云端数据集上传量（2023-03-14）</h2>
  <div class="chart" id="C"/>
</template>

<script>
import {inject,onMounted} from "vue";

export default {
  name: "C",

  setup() {
    let $echarts = inject("echarts")

    onMounted(()=>{
      let myChart=$echarts.init(document.getElementById('C'))
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // prettier-ignore
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} 条'
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 6,
              color: 'green'
            },
            {
              gt: 6,
              lte: 8,
              color: 'red'
            },
            {
              gt: 8,
              lte: 14,
              color: 'green'
            },
            {
              gt: 14,
              lte: 17,
              color: 'red'
            },
            {
              gt: 17,
              color: 'green'
            }
          ]
        },
        series: [
          {
            name: 'Electricity',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: [300, 280, 250, 260, 270, 300, 450, 600, 500, 390, 380, 390, 400, 500, 600, 750, 800, 700, 530, 400],
            markArea: {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.4)'
              },
              data: [
                [
                  {
                    name: '早高峰',
                    xAxis: '07:30'
                  },
                  {
                    xAxis: '10:00'
                  }
                ],
                [
                  {
                    name: '晚高峰',
                    xAxis: '17:30'
                  },
                  {
                    xAxis: '21:15'
                  }
                ]
              ]
            }
          }
        ]
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
  height: 500px;
  width: 600px;
}

#title_rl{
  margin-top: 20px;
  font-size: x-large;
}
</style>