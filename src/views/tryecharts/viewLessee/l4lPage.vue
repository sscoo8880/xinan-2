<template>
  <h2 id="title_rl">题目</h2>
  <div className="chart" id="demo"/>
</template>

<script>
import {inject, onMounted} from "vue";
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
      'PHP': 3232,
      'Java': 13453,
    };
    const Q2Data = {
      '香菜': 1594,
      '茄子': 925,
      '番茄': 1608,
      '苦瓜': 721,
      '榴莲': 2179,
    };
    const Q3Data = {
      'a': 594,
      'b': 925,
      'c': 608,
      'd': 721,
    };
    const Q4Data = {
      'a': 594,
      'b': 925,
      'c': 608,
      'd': 721,
    };

    onMounted(() => {
      let myChart = $echarts.init(document.getElementById("demo"))

      const option = {
        title: [{
          text: ' ',
          subtext: '第1题：语言',
          top: '0px',
          left: '150px',
          textAlign: 'center',
        },
          {
            text: '',
            subtext: '第2题：题目',
            left: '150px',
            top: '150px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第3题：题目',
            left: '150px',
            top: '300px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第4题：题目',
            top: '450px',
            left: '150px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第5题：题目',
            left: '350px',
            top: '0px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第6题：题目',
            left: '25%',
            top: '250px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第7题：题目',
            left: '25%',
            top: '250px',
            textAlign: 'center'
          },

        ],
        series: [
          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['150px', '95px'],
            data: Object.keys(Q1Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q1Data[key]
              };
            })
          },
          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['150px', '225px'],
            data: Object.keys(Q2Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q2Data[key]
              };
            }),
          },
          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['150px', '375px'],
            data: Object.keys(Q3Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q3Data[key]
              };
            }),
          },
          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['150px', '525px'],
            data: Object.keys(Q4Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q4Data[key]
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
.chart {
  margin-top: 0px;
  margin-left: 0px;
  height: 600px;
}

#title_rl {
  margin-top: 20px;
  font-size: x-large;
}
</style>