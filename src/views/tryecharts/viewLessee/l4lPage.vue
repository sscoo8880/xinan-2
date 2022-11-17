<template>
  <h2 id="title_rl">《我的阅读兴趣》自测问卷</h2>
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
      '天空': 594,
      '海洋': 925,
      '眼睛': 608,
      '其他': 1721,
    };
    const Q4Data = {
      '好': 594,
      '一般': 925,
      '差': 608,
    };

    onMounted(() => {
      let myChart = $echarts.init(document.getElementById("demo"))

      const option = {
        title: [{
          text: ' ',
          subtext: '第1题：最近看的一本语言书？（单选题）',
          left: '150px',
          top: '-15px',
          textAlign: 'center',
        },
          {
            text: '',
            subtext: '第2题：讨厌的食物有？（多选题）',
            left: '150px',
            top: '150px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第3题：什么是蓝色的？（填空题）',
            left: '150px',
            top: '300px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第4题：自我感觉（单选题）',
            left: '150px',
            top: '450px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第5题：喜欢的书籍',
            left: '50%',
            top: '0px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第6题：喜欢的作者',
            left: '50%',
            top: '150px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第7题：喜欢的文学派别',
            left: '50%',
            top: '300px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第8题：下面那本书不是川端康成的',
            left: '50%',
            top: '450px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第9题：题目',
            left: '80%',
            top: '0px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第10题：题目',
            left: '80%',
            top: '150px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第11题：题目',
            left: '80%',
            top: '300px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第12题：题目',
            left: '80%',
            top: '450px',
            textAlign: 'center'
          },

        ],
        series: [
          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['150px', '75px'],
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
          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['50%', '75px'],
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
            center: ['50%', '225px'],
            data: Object.keys(Q4Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q4Data[key]
              };
            }),
          },
          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['50%', '375px'],
            data: Object.keys(Q1Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q1Data[key]
              };
            }),
          },
          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['50%', '525px'],
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
            center: ['80%', '75px'],
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
            center: ['80%', '225px'],
            data: Object.keys(Q4Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q4Data[key]
              };
            }),
          },          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['80%', '375px'],
            data: Object.keys(Q2Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q2Data[key]
              };
            }),
          },          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['80%', '525px'],
            data: Object.keys(Q1Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q1Data[key]
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