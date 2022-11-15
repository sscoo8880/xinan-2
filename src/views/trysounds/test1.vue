<template>
  <div class="wrap wrapBG" @mouseover.stop="clickOther">
    <!--语音播报-->
    <div v-if="voiceWordIsShow" class="flex flex-center" style="position:relative;z-index: 999;">
      <div @click.stop="jumpNewWindow" class="voiceWord_ flex flex-center voicePlayBorderColor voicePlayBg">
        <i class="iconfont iconfont_" style="color: #F6AD31"
        >&#xe697;</i>
        <span>{{voiceWord}}</span>
      </div>
    </div>
  </div>
</template>


<script>



const index =new Vuex.Store({
  state: {
    mapInfo: {},
    region: { // 区域ID

    },
    voiceWord: {}, // 实时播报内容
  },
})

export default {
  name: "test1",
  data(){
    return{
      isOpenPlay: false, // 浏览器是否开启了语音播报
      isPlaying: false, // 语音是否正在播报
    }
  },
  // 监听用户鼠标移入事件
  clickOther() {
    if (!this.isOpenPlay) {
      this.isOpenPlay = !this.isOpenPlay
      voicePlay('-')
    }
  },

  watch: {
    // 监听ws的连接状态
    '$store.state.connectStatus'() {
      let sRegion = getRegion(); // 初始化区域Id
      cancelVoiceWordMessage()
      // 实时播报内容
      if(this.$store.state.connectStatus) {
        // 实时播报内容
        voiceWordMessage(this.$store.state.region.regionCode)
      }
    },
    // 监听区域ID变化
    '$store.state.region'() {
      this.regionId = this.$store.state.region.regionCode;
      cancelVoiceWordMessage();
      if (this.$store.state.connectStatus) {
        // 实时播报内容
        voiceWordMessage(this.regionId)
      }
    },
    //平台实时播报的内容
    '$store.state.voiceWord'() {
      let data = this.$store.state.voiceWord
      if(!this.isPlaying){ // 第一条数据来了之后，就开始播报，
        this.isPlaying = true
        this.voicePlayMethod(data)
      }
    }
  },

  // 播报语音
  voicePlayMethod(data) {
    let that = this
    // 正在播报，就返回
    if (that.voicePlayState) {
      return
    }// 如果没有开启语音播报,就返回
    if (!this.isOpenPlay) {
      return
    }
    // 没有播报，就开始播报
    if (!that.voicePlayState) {
      // 存储当前播报的类型和内容
      that.voiceType = data.tag
      that.eventId = data.eventId
      that.orderId = data.orderId
      that.voiceWord = data.desc

      // 显示播报弹窗
      that.voiceWordIsShow = true
      // 播报文字内容
      that.voicePlayObj = voicePlay(that.voiceWord)
      that.voicePlayObj.addEventListener("canplay", function () {   //当浏览器能够开始播放指定的音频/视频时，发生 canplay 事件。
        that.voicePlayState = true
      });
      that.voicePlayObj.addEventListener("ended", function () {   //当播放完一首歌曲时也会触发
        // 修改为当前没有语音播报
        that.voicePlayState = false
        that.isPlaying =  false // 播报完，设置为false

        that.voiceWord = ''
        that.voiceWordIsShow = false
      })
    }
  },


}
export function voicePlay(word) {
  let url = "https://tts.baidu.com/text2audio?cuid=baike&spd=5&lan=ZH&ctp=1&pdt=301&vol=4&rate=32&per=0&tex=' "+ encodeURI(word);
  let n = new Audio(url);
  n.src = url;
  n.play();//播放阅读
  return n
}

</script>

<style scoped>

</style>