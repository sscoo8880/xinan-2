<template>
  <div class="container">
    <div class="qu-wrap">
      <header>
        <span @click="iterator = backBtn(); iterator.next()">&lt; 返回</span>
        <p v-show="!titleEditing" @click="titleEditing = true;title=''">{{tempTitle}}</p>
        <input type="text"
               v-model="title"
               :class="{inlineShow: titleEditing}"
               @focus="_title = title"
               @blur="titleEditing = false"
               @keyup.esc="cancelTitleEdit()"
               @keyup.enter="titleEditing = false"/>
      </header>
      <div class="qu-content">
        <section class="qu-item"
                 v-for="(item, index) in questions"
                 :class="{nowEditing: curIndex === index && topicEditing, optEditing: curIndex === index}">
          <h3 @click="curIndex = index; curOptIndex=''; topicEditing = true">
            <span class="qu-num">{{`Q${index + 1}`}}</span>
            <span class="qu-topic">{{ item.topic }}</span>
            <input type="text"
                   v-focus
                   v-model="topic"
                   @focus="_topic = topic"
                   @blur="curIndex=''; topic=''"
                   @keyup.esc="cancelTopicEdit()"
                   @keyup.enter="doneTopicEdit(index)">
            <span v-if="item.isMandatory"> *</span>
          </h3>
          <template v-if="item.type === 'sounds'">

            <label id="require-check">
              <input type="checkbox"
                     v-model="item.mp3">
              此题是否必填
            </label>

            <a-button type="primary" @click="startRecorder()" style="margin:0.5vw;">录音
              <template #icon >
                <IconVoice id="icons" style="width: 20px;height: 20px"/>
              </template>
            </a-button>

<!--              <a-button type="primary" @click="resumeRecorder()" >继续录音</a-button>-->
<!--              <a-button type="primary" @click="pauseRecorder()" >暂停录音</a-button>-->

            <a-button type="primary" @click="stopRecorder()" style="margin:0.5vw;">结束录音
              <template #icon >
                <IconRecordStop  id="icons" style="width: 20px;height: 20px"/>
              </template>
            </a-button>

            <a-button type="primary" @click="playRecorder()" style="margin:0.5vw;">播放
              <template #icon >
                <IconPlayCircleFill id="icons" style="width: 20px;height: 20px"/>
              </template>
            </a-button>

          </template>
          <ul v-else-if="item.type==='textarea'">
            <textarea rows="8" cols="80"></textarea>
            <label id="require-check">
              <input type="checkbox"
                     v-model="item.isMandatory">
              此题是否必填
            </label>
          </ul>
          <ul v-else class="options-list" >
            <li v-for="(option, optIndex) in item.options"
                :class="{optionEditing: curOptIndex === optIndex}">
							<span class="optionText"
                    @click="curIndex=index; curOptIndex=optIndex; topicEditing = false">{{ option }}</span>
              <input type="text"
                     v-focus
                     v-model="optionText"
                     @focus="_optionText = optionText"
                     @blur="curIndex=''; optionText=''"
                     @keyup.esc="cancelOptionEdit()"
                     @keyup.enter="doneOptionEdit(index, optIndex)">

              <ul class="opt-ctrl">
                <li v-if="optIndex !== 0"
                    @click="moveUp(optIndex, item.options)">上移</li>
                <li v-if="optIndex !== item.options.length - 1"
                    @click="moveDown(optIndex, item.options)">下移</li>
                <li v-else @click="addOption(item.options)">添加</li>
                <li @click="delOption(optIndex, item.options)">删除</li>
              </ul>
            </li>
          </ul>
          <ul class="operat-list">
            <li v-if="index !== 0"
                @click="moveUp(index)">上移</li>
            <li v-if="index !== questions.length - 1"
                @click="moveDown(index)">下移</li>
            <li @click="reuse(index)">复用</li>
            <li @click="delQuestion(index)">删除</li>
          </ul>
          <div></div>
        </section>
        <div class="add-box">
          <p class="qu-type" :class="{expand: isAdding}">
            <span @click="addType('radio')">单选题</span>
            <span @click="addType('checkbox')">多选题</span>
            <span @click="addType('textarea')">文本题</span>
            <span @click="addType('sounds')">语音题
              <canvas id="canvas" height="1" width="0"></canvas>
              <canvas id="playChart" height="1" width="0"></canvas>
            </span>
          </p>
          <p class="add-btn" @click="isAdding = !isAdding;">
            <span>+ 添加问题</span>
          </p>
        </div>
      </div>
      <footer>
        <div class="date-part">
          <label>问卷截止日期
            <input type="text"
                   readonly="true"
                   v-model="date"
                   @click="isShowDatepicker = !isShowDatepicker">
          </label>
          <date-components id="date-picker"
                           v-show="isShowDatepicker"
                           @sendDate="changeDate">
          </date-components>
        </div>
        <div class="ctrl-part">
          <span @click="iterator = saveBtn(); iterator.next()">保存问卷</span>
          <span @click="iterator = releaseBtn(); iterator.next()">发布问卷</span>
        </div>
      </footer>
    </div>
    <div class="overlay" v-show="isShowPrompt">
      <div class="prompt-box">
        <header>
          <span>提示</span>
          <a href="javascript:;" @click="isShowPrompt = false">&times;</a>
        </header>
        <p>{{ promptText }}</p>
        <footer>
          <span @click="isShowPrompt = false; iterator && iterator.next()">确定</span>
          <span @click="isShowPrompt = false">取消</span>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Data from '../../../utils/data.js';
import Datepicker from './Datepicker.vue';
import {toRaw} from "vue";
import Recorder from 'js-audio-recorder';
import {IconVoice,IconRecordStop,IconPlayCircle,IconPlayCircleFill} from '@arco-design/web-vue/es/icon';

const lamejs = require('lamejs')

let recorder = new Recorder({
  sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
  sampleRate: 48000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
  numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
  // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
})

export default {
  name: "design_questionnaire",
  components: {
    'date-components': Datepicker,
    IconVoice,IconRecordStop,IconPlayCircle,IconPlayCircleFill,
  },
  data() {
    return {
      index: '',
      quData: {},
      questions: [],
      questionTemplate:{},
      quList: Data.list,
      date: '',
      title: '',
      _title: '',
      topic: '',
      _topic: '',
      optionText: '',
      _optionText: '',
      curIndex: '',
      curOptIndex: '',
      promptText: '',
      iterator: {},
      isAdding: false,
      titleEditing: false,
      topicEditing: false,
      isShowPrompt: false,
      isShowDatepicker: false,

      recorder,
      //波浪图-录音
      drawRecordId:null,
      oCanvas : null,
      ctx : null,
      //波浪图-播放
      drawPlayId:null,
      pCanvas : null,
      pCtx : null,
    }
  },

  mounted() {
    this.getData();
    // console.log(this.quList);
    this.startCanvas();
  },

  computed: {
    tempTitle() {
      return this.title || this.quData.title;
    }
  },

  methods: {
    getData() {
      //改这里，创建问卷时id默认为零来进入if
      let item = {};
      //问卷id后端自己生成
      //标题名字自己取
      item.title = `请输入问卷名...`;
      item.state = 0;
      item.stateName = '未发布';
      item.time = '2020-12-31';
      item.questions = [];
      this.quData = item;
      this.date = this.quData.time;
      this.title = this.quData.title;
      this.index = this.quData.id - 1;
      this.questionTemplate = Data.template;
      this.questions = [...this.quData.questions];
    },

    changeDate(date) {
      let nowTime = Date.now();
      let chioceTime = new Date(date.replace(/-/g, ','))*1;
      if (chioceTime < nowTime) {
        this.iterator = null;
        this.showPrompt(`选择的日期不能早于当前日期，请重新选择！`);
        return;
      }
      this.date = date;
    },

    cancelTitleEdit() {
      this.titleEditing = false;
      this.title = this._title;
    },

    cancelTopicEdit() {
      this.topicEditing = false;
      this.topic = this._topic;
    },

    cancelOptionEdit() {
      this.curOptIndex = '';
      this.optionText = this._optionText;
    },

    doneTopicEdit(index) {
      this.topicEditing = false;
      this.questions[index].topic = this.topic;
    },

    doneOptionEdit(index, optIndex) {
      this.curOptIndex = '';
      this.questions[index].options[optIndex] = this.optionText;
    },

    switchItem(index, array) {
      this.optIndex = '';
      this.curIndex = '';

      let arr = array.splice(index, 2);
      array.splice(index , 0, ...arr.reverse());
    },

    moveUp(index, array) {
      this.switchItem(index - 1, array);
    },

    moveDown(index, array) {
      this.switchItem(index, array);
    },

    errorPrompt(text) {
      this.iterator = null;
      this.showPrompt(text);
    },

    reuse(index) {
      if (this.questions.length === 10) {
        this.errorPrompt(`每份问卷至多10个问题！`);
        return;
      }
      let oldQuestion = this.questions[index];
      let newQuestion = JSON.parse(JSON.stringify(oldQuestion));
      this.questions.splice(index, 0, newQuestion);
    },

    delQuestion(index) {
      if (this.questions.length <= 1) {
        this.errorPrompt(`每份问卷至少一个问题！`);
        return;
      }
      this.questions.splice(index, 1);
    },

    delOption(index, options) {
      if (options.length <= 2) {
        this.errorPrompt(`每个问题至少两个选项`);
        return;
      }
      options.splice(index, 1)
    },

    addOption(options) {
      if (options.length === 4) {
        this.errorPrompt(`每个问题至多四个选项`);
        return;
      }
      options.push(`请编辑选项内容`)
    },

    showPrompt(text) {
      this.promptText = text;
      this.isShowPrompt = true;
    },

    addType(type) {
      if (this.questions.length === 10) {
        this.errorPrompt(`每份问卷至多10个问题！`);
        return;
      }
      this.questions.push(this.questionTemplate[type]);
    },

    saveData() {
      if (this.questions.length < 1) {
        this.errorPrompt(`每份问卷至少一个问题！`);
        return;
      }
      this.quData.title = this.title;
      this.quData.time = this.date;
      this.quData.questions = [...this.questions];
    },

    backBtn() {
      this.showPrompt(`确认未保存回到主页吗？`);
      this.$router.push({path: '/'});
    },

    saveBtn() {
      this.showPrompt(`确认要保存问卷？`);
      this.saveData();
      let raw = toRaw(this.quData)
      console.log(JSON.stringify(raw));
    },

    releaseBtn() {
      this.showPrompt(`确认要保存并发布问卷？`);
      (() => {
        this.quData.state = 1;
        this.quData.stateName = '发布中';
        this.saveData();
      })();
      this.$router.push({path: '/'});
    },

    // 语音题
    /**
     * 波浪图配置
     * */
    startCanvas(){
      //录音波浪
      this.oCanvas = document.getElementById('canvas');
      this.ctx = this.oCanvas.getContext("2d");
      //播放波浪
      this.pCanvas = document.getElementById('playChart');
      this.pCtx = this.pCanvas.getContext("2d");
    },

    /**
     *  录音的具体操作功能
     * */
    // 开始录音
    startRecorder () {
      recorder.start().then(() => {
        this.drawRecord();//开始绘制图片
      }, (error) => {
        // 出错了
        console.log(`${error.name} : ${error.message}`);
      });
    },
    // 继续录音
    resumeRecorder () {
      recorder.resume()
    },
    // 暂停录音
    pauseRecorder () {
      recorder.pause();
      this.drawRecordId && cancelAnimationFrame(this.drawRecordId);
      this.drawRecordId = null;
    },
    // 结束录音
    stopRecorder () {
      recorder.stop()
      this.drawRecordId && cancelAnimationFrame(this.drawRecordId);
      this.drawRecordId = null;
    },
    // 录音播放
    playRecorder () {
      recorder.play();
      this.drawPlay();//绘制波浪图
    },
    // 暂停录音播放
    pausePlayRecorder () {
      recorder.pausePlay()
    },
    // 恢复录音播放
    resumePlayRecorder () {
      recorder.resumePlay();
      this.drawPlay();//绘制波浪图
    },
    // 停止录音播放
    stopPlayRecorder () {
      recorder.stopPlay();
    },
    // 销毁录音
    destroyRecorder () {
      recorder.destroy().then(function() {
        recorder = null;
        this.drawRecordId && cancelAnimationFrame(this.drawRecordId);
        this.drawRecordId = null;
      });
    },
    /**
     *  获取录音文件
     * */
    getRecorder(){
      let toltime = recorder.duration;//录音总时长
      let fileSize = recorder.fileSize;//录音总大小

      //录音结束，获取取录音数据
      let PCMBlob = recorder.getPCMBlob();//获取 PCM 数据
      let wav = recorder.getWAVBlob();//获取 WAV 数据

      let channel = recorder.getChannelData();//获取左声道和右声道音频数据

    },
    /**
     *  下载录音文件
     * */
    //下载pcm
    downPCM(){
      //这里传参进去的时文件名
      recorder.downloadPCM('新文件');
    },
    //下载wav
    downWAV(){
      //这里传参进去的时文件名
      recorder.downloadWAV('新文件');
    },
    /**
     *  获取麦克风权限
     * */
    getPermission(){
      Recorder.getPermission().then(() => {
        this.$Message.success('获取权限成功')
      }, (error) => {
        console.log(`${error.name} : ${error.message}`);
      });
    },
    /**
     * 文件格式转换 wav-map3
     * */
    getMp3Data(){
      const mp3Blob = this.convertToMp3(recorder.getWAV());
      recorder.download(mp3Blob, 'recorder', 'mp3');
    },
    convertToMp3(wavDataView) {
      // 获取wav头信息
      const wav = lamejs.WavHeader.readHeader(wavDataView); // 此处其实可以不用去读wav头信息，毕竟有对应的config配置
      const { channels, sampleRate } = wav;
      const mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);
      // 获取左右通道数据
      const result = recorder.getChannelData()
      const buffer = [];

      const leftData = result.left && new Int16Array(result.left.buffer, 0, result.left.byteLength / 2);
      const rightData = result.right && new Int16Array(result.right.buffer, 0, result.right.byteLength / 2);
      const remaining = leftData.length + (rightData ? rightData.length : 0);

      const maxSamples = 1152;
      for (let i = 0; i < remaining; i += maxSamples) {
        const left = leftData.subarray(i, i + maxSamples);
        let right = null;
        let mp3buf = null;

        if (channels === 2) {
          right = rightData.subarray(i, i + maxSamples);
          mp3buf = mp3enc.encodeBuffer(left, right);
        } else {
          mp3buf = mp3enc.encodeBuffer(left);
        }

        if (mp3buf.length > 0) {
          buffer.push(mp3buf);
        }
      }

      const enc = mp3enc.flush();

      if (enc.length > 0) {
        buffer.push(enc);
      }

      return new Blob(buffer, { type: 'audio/mp3' });
    },

    /**
     * 绘制波浪图-录音
     * */
    drawRecord () {
      // 用requestAnimationFrame稳定60fps绘制
      this.drawRecordId = requestAnimationFrame(this.drawRecord);

      // 实时获取音频大小数据
      let dataArray = recorder.getRecordAnalyseData(),
          bufferLength = dataArray.length;

      // 填充背景色
      this.ctx.fillStyle = 'rgb(200, 200, 200)';
      this.ctx.fillRect(0, 0, this.oCanvas.width, this.oCanvas.height);

      // 设定波形绘制颜色
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'rgb(0, 0, 0)';

      this.ctx.beginPath();

      var sliceWidth = this.oCanvas.width * 1.0 / bufferLength, // 一个点占多少位置，共有bufferLength个点要绘制
          x = 0;          // 绘制点的x轴位置

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * this.oCanvas.height / 2;

        if (i === 0) {
          // 第一个点
          this.ctx.moveTo(x, y);
        } else {
          // 剩余的点
          this.ctx.lineTo(x, y);
        }
        // 依次平移，绘制所有点
        x += sliceWidth;
      }

      this.ctx.lineTo(this.oCanvas.width, this.oCanvas.height / 2);
      this.ctx.stroke();
    },
    /**
     * 绘制波浪图-播放
     * */
    drawPlay () {
      // 用requestAnimationFrame稳定60fps绘制
      this.drawPlayId = requestAnimationFrame(this.drawPlay);

      // 实时获取音频大小数据
      let dataArray = recorder.getPlayAnalyseData(),
          bufferLength = dataArray.length;

      // 填充背景色
      this.pCtx.fillStyle = 'rgb(200, 200, 200)';
      this.pCtx.fillRect(0, 0, this.pCanvas.width, this.pCanvas.height);

      // 设定波形绘制颜色
      this.pCtx.lineWidth = 2;
      this.pCtx.strokeStyle = 'rgb(0, 0, 0)';

      this.pCtx.beginPath();

      var sliceWidth = this.pCanvas.width * 1.0 / bufferLength, // 一个点占多少位置，共有bufferLength个点要绘制
          x = 0;          // 绘制点的x轴位置

      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * this.pCanvas.height / 2+100;

        if (i === 0) {
          // 第一个点
          this.pCtx.moveTo(x, y);
        } else {
          // 剩余的点
          this.pCtx.lineTo(x, y);
        }
        // 依次平移，绘制所有点
        x += sliceWidth;
      }

      this.pCtx.lineTo(this.pCanvas.width, this.pCanvas.height / 2);
      this.pCtx.stroke();
    },
  },

  directives: {
    focus: {
      update: el => el.focus(),
    }
  },

}
</script>

<style scoped lang="scss">
@import '../../../style/_Edit';
#icons{
  margin-top: 20%;
}
</style>
