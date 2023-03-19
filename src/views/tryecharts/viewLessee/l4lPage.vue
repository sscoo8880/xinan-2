<template>
  <h2 id="title_rl">阅读等级自测问卷</h2>
  <div className="chart" id="demo"/>
</template>

<script>
import {inject, onMounted} from "vue";

export default {
  name: "l4lessee",
  setup() {
    let $echarts = inject("echarts")

    //数据集
    //1000人
    const Q1Data = {
      'C/C++': 200,
      'JavaScript': 170,
      'Python': 250,
      'Go': 50,
      'PHP': 50,
      'Java': 250,
    };
    const Q2Data = {
      '江户川乱步': 294,
      '柯南道尔': 75,
      '绫辻行人': 511,
      '东野圭吾': 555,
      '阿加莎': 700,
    };
    const Q3Data = {
      '《白门柳》': 404,
      '《南腔北调》': 625,
      '《雪国》': 898,
      '《第一夜》': 521,
    };
    const Q4Data = {
      '《雪》': 54,
      '《细雪》': 125,
      '《雪国》': 808,
    };
    const Q5Data = {
      '莫言': 694,
      '川端康成': 125,
      '安妮·埃尔诺': 28,
      '苏利·普吕多姆':32,
      '其他':54,
    };
    const Q6Data = {
      '《胭脂》':462,
      '《霸王别姬》': 22,
      '《饺子》': 145,
      '《青蛇》':143,
      '都是':222,
    };
    const Q7Data = {
      '小说': 514,
      '诗集': 18,
      '其他': 102,
      '传记': 175,
      '纪实文学': 183,
    };
    const Q8Data = {
      '婉约': 944,
      '华丽': 25,
      '朴素': 23,
    };
    const Q9Data = {
      '谷行润一郎':123,
      '谷崎润一郎': 544,
      '谷田润一郎': 185,
      '谷川润一郎': 138,
    };
    const Q10Data = {
      '总有些痴男怨女，恨不得除了自己和所爱之人，全部都死干净': 170,
      '我们的太太自己以为，她的客人们也以为她是当地的一个沙龙的主人':390,
      '远看一只狗，近看郭沫若': 180,
      '不招蚊子叮，也要起疙瘩': 250,
    };
    const Q11Data = {
      '莫泊桑': 504,
      '欧亨利': 265,
      '契诃夫': 128,
      '其他': 100,
    };
    const Q12Data = {
      '李耳': 12,
      '孔夫子': 25,
      '其他': 72,
      '孔丘': 891,
    };
    onMounted(() => {
      let myChart = $echarts.init(document.getElementById("demo"))

      const option = {
        title: [{
          text: ' ',
          subtext: '第1题：最近看的一本语言书（单选题）',
          //计数
          // subtext: '总计 ' +
          //     Object.keys(Q12Data).reduce(function (all, key) {
          //       return all + Q12Data[key];
          //     }, 0),
          left: '150px',
          top: '-15px',
          textAlign: 'center',
        },
          {
            text: '',
            subtext: '第2题：选出本格派作家（多选题）',
            left: '150px',
            top: '150px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第3题：选出封面是蓝色的实体书（多选题）',
            left: '150px',
            top: '300px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第4题：哪本书是川端康成的（单选题）',
            left: '150px',
            top: '450px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第5题：获得2012诺贝尔文学奖的是（填空题）',
            left: '50%',
            top: '0px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第6题：哪本不是李碧华的（单选题）',
            left: '50%',
            top: '150px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第7题：《房思琪的初恋乐园》是什么类型（单选题）',
            left: '50%',
            top: '300px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第8题：李清照的语言风格（单选题）',
            left: '50%',
            top: '450px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第9题：哪个是《刺青》的作者（单选题）',
            left: '80%',
            top: '0px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第10题：那句话不是鲁迅骂人的（单选题）',
            left: '80%',
            top: '150px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第11题：世界三大短篇小说巨匠中谁是法国人（填空题）',
            left: '80%',
            top: '300px',
            textAlign: 'center'
          },
          {
            text: '',
            subtext: '第12题(必做）：孔子原名（填空题）',
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
            data: Object.keys(Q5Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q5Data[key]
              };
            }),
          },
          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['50%', '225px'],
            data: Object.keys(Q6Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q6Data[key]
              };
            }),
          },
          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['50%', '375px'],
            data: Object.keys(Q7Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q7Data[key]
              };
            }),
          },
          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['50%', '525px'],
            data: Object.keys(Q8Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q8Data[key]
              };
            }),
          },
          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['80%', '75px'],
            data: Object.keys(Q9Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q9Data[key]
              };
            }),
          },
          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['80%', '225px'],
            data: Object.keys(Q10Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q10Data[key]
              };
            }),
          },          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['80%', '375px'],
            data: Object.keys(Q11Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q11Data[key]
              };
            }),
          },          {
            type: 'pie',
            radius: ['40px', '15px'],
            center: ['80%', '525px'],
            data: Object.keys(Q12Data).map(function (key) {
              return {
                name: key.replace('.js', ''),
                value: Q12Data[key]
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