<template>
  <h2 id="title_rl">题目</h2>
  <div class="chart" id="demo"/>
</template>

<script>
import {inject,onMounted} from "vue";
import echarts_demo1 from "@/views/echarts_demo1";

export default {
  name: "l4lessee",
  setup() {
    let $echarts = inject("echarts")

    //数据集
    const Q1Data = {
      'C/C++': 17365,
      'JavaScript': 14079,
      'Python': 16929,
      'Go': 3489,
      'PHP':3232,
      'Java':13453,
    };
    const Q2Data = {
      'dark.js': 1594,
      'infographic.js': 925,
      'shine.js': 1608,
      'roma.js': 721,
      'macarons.js': 2179,
      'vintage.js': 1982
    };
    const Q3Data = {
      'dark.js': 1594,
      'infographic.js': 925,
      'shine.js': 1608,
      'roma.js': 721,
      'macarons.js': 2179,
      'vintage.js': 1982
    }

    onMounted(()=>{
      let myChart=$echarts.init(document.getElementById("demo"))
      myChart.resize()

      const option = {
        title: [{
          text: ' ',
          subtext: '第一题：语言',
          top:'-5%',
          left: '25%',
          textAlign: 'center',
          },
          {
            text: '',
            subtext:'第二题：题目',
            left: '25%',
            top: '25%',
            textAlign: 'center'
          },
          {
            text: '',
            subtext:
                '总计 ' +
                Object.keys(Q2Data).reduce(function (all, key) {
                  return all + Q3Data[key];
                }, 0),
            left: '50%',
            top: '60%',
            textAlign: 'center'
          },
        ],
        series: [
          {
            type: 'pie',
            radius: ['15%', '5%'],
            center: ['25%', '10%'],
            data: Object.keys(Q1Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q1Data[key]
              };
            })
          },
          {
            type: 'pie',
            radius: ['15%', '5%'],
            center: ['25%', '40%'],
            data: Object.keys(Q2Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q2Data[key]
              };
            }),
          },
          {
            type: 'pie',
            radius: [0, '30%'],
            center: ['50%', '125%'],
            data: Object.keys(Q2Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q3Data[key]
              };
            }),
          },
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
  height: 600px;
}

#title_rl{
  margin-top: 20px;
  font-size: x-large;
}
</style>