<template>
  <h2 id="title_rl">动态租金榜单</h2>
  <div class="chart" id="r1Chart"/>
</template>

<script>
import {inject,onMounted} from "vue";

export default {
  name: "r1",
  setup(){
    let $echarts = inject("echarts")

    //数据集
    let  chart3Data  = [
      {
        cdate: "2022-11-13",
        uname: "小帅,小美,Jane,Kangkang,起起,东方,007,B,崔雪莉,李钟硕,东方既白,迪杰斯特拉,图图,艾米莉亚,路人甲",
        fare: "79.10,13.82,1.28,0.56,0.49,0.48,0.47,0.47,0.41,0.32,0.30,0.29,0.24,0.24,0.22"
      },
      {
        cdate: "2022-11-14",
        uname: "小帅,小美,Jane,东方,007,Kangkang,迪杰斯特拉,崔雪莉,艾米莉亚,图图,东方既白,起起,李钟硕,路人乙,lzz",
        fare: "69.60,16.19,1.91,1.83,1.42,1.18,0.82,0.76,0.65,0.53,0.51,0.50,0.46,0.42,0.38"
      },
      {
        cdate: "2022-11-15",
        uname: "小帅,东方,起起,艾米莉亚,lzz,李钟硕,007,迪杰斯特拉,Jane,东方既白,Kangkang,崔雪莉,小美,图图,路人壬",
        fare: "69.60,16.19,1.91,1.83,1.42,1.18,0.82,0.76,0.65,0.53,0.51,0.50,0.46,0.42,0.38"
      },

    ]

    onMounted(()=>{
      let myChart=$echarts.init(document.getElementById("r1Chart"))
      let updateFrequency=3000
      let month=[]
      let startIndex=0
      for (let i=0;i<chart3Data.length;i++){
        if (month.length===0){
          month.push(chart3Data[i])
        }
      }

      const startMonth = month[startIndex].cdate;
      const startName = month[startIndex].uname.split(',');
      const startFare = month[startIndex].fare.split(',');
      // Array.sort(startFare);
      const option = {
        grid: {
          top: 10,
          bottom: 30,
          left: 80,
        },
        xAxis: {
          max: 100,
          splitLine: {
            show: true,
            lineStyle: {
              // color: 'rgba(19,229,227, 0.4)',
              type: 'dashed'
            }
          }
        },
        dataset: {
          source: chart3Data
        },
        yAxis: {
          type: 'category',
          inverse: true,
          max: startName.length-1,
          data: startName,
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 14
            },
            rich: {
              flag: {
                fontSize: 25,
                padding: 5
              }
            }
          },
          animationDuration: 300,
          animationDurationUpdate: 300
        },
        series: [{
          realtimeSort: true,
          seriesLayoutBy: 'column',
          type: 'bar',
          itemStyle: {
            // color: 'rgb(13,208,229)'
          },
          encode: {
            x: 0,
            y: 3
          },
          label: {
            show: true,
            precision: 1,
            position: 'right',
            valueAnimation: true,
            // fontFamily: 'monospace',
            fontSize:'12px',
            formatter: function (data) {
              return startFare[data.dataIndex] + "百元";
            }
          },
          data: startFare
        }],
        animationDuration: 0,
        animationDurationUpdate: 1000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
          elements: [{
            type: 'text',
            right: 30,
            bottom: 60,
            style: {
              text: startMonth,
              font: 'bolder 30px monospace',
              fill:'rgba(0,0,0,0.5)'
              // fill: 'rgba(19,229,227, 0.4)'
            },
            z: 100
          }]
        }
      };

      myChart.setOption(option)
      for (let i=startIndex;i<chart3Data.length-1;++i){
        (function (i) {
          setTimeout(function () {
            updateYear(chart3Data[i + 1]);
          }, (i + 1) * updateFrequency);
        })(i);
      }

      function updateYear(year) {
        option.yAxis.data = year.uname.split(',');
        option.series[0].data = year.fare.split(',');
        option.graphic.elements[0].style.text = year.cdate;
        myChart.setOption(option);
      }

    })
  }
}
</script>

<style scoped>
.chart{
  margin-left: 20px;
  margin-top:10px;
  height: 600px;
  width: 100%;
}
#title_rl{
  margin-top: 20px;
  font-size: x-large;
}
</style>