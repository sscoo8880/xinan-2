<template>
  <div class="chart" id="cloudview"/>
</template>

<script>
import {inject,onMounted} from "vue";
import * as echarts from "echarts";

export default {
  name: "cloudview",

  setup() {
    let $echarts = inject("echarts")
    let chartDom = document.getElementById('main');

    onMounted(()=>{
      let myChart=$echarts.init(document.getElementById("cloudview"))
      function getVirtualData(year) {
        const date = +echarts.time.parse(year + '-01-01');
        const end = +echarts.time.parse(+year + 1 + '-01-01');
        const dayTime = 3600 * 24 * 1000;
        const data = [];
        for (let time = date; time < end; time += dayTime) {
          data.push([
            echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
            Math.floor(Math.random() * 1000)
          ]);
        }
        return data;
      }
      const option = {
        tooltip: {
          position: 'top'
        },
        visualMap: {
          min: 0,
          max: 1000,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          top: 'top'
        },
        calendar: [
          {
            range: '2022',
            cellSize: ['auto', 20]
          },
          {
            top: 260,
            range: '2021',
            cellSize: ['auto', 20]
          },
          {
            top: 450,
            range: '2020',
            cellSize: ['auto', 20],
            right: 5
          }
        ],
        series: [
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 0,
            data: getVirtualData('2022')
          },
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 1,
            data: getVirtualData('2021')
          },
          {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            calendarIndex: 2,
            data: getVirtualData('2020')
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
  margin-left: 100px;
  margin-top:10px;
  height: 600px;
  width: 1200px;
}
#title_rl{
  margin-top: 20px;
  font-size: x-large;
}
</style>