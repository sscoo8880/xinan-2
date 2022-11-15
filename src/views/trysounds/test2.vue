<!--<template>-->
<!--  <div class="main_container">-->

<!--    <div class="ai-diagnosis-wrapper">-->
<!--      <div class="message-tips">-->
<!--        <p class="message-tips-p">请长按录音按钮朗读以下文字内容</p>-->
<!--      </div>-->
<!--      <div class="text_words">-->
<!--        “这是你要大声朗读的文字鸭～”-->
<!--      </div>-->


<!--      <div class="icon_btn" ref="btnRef">-->
<!--        <img :src="!isRecording? btn_not_pressed_img : btn_pressed_img" alt=" "/>-->
<!--      </div>-->

<!--    </div>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import Recorder from "recorder-js";-->

<!--const getUserMedia = function () { // 省略 }-->
<!--  const uploadVoice = function () { // 上传音频接口 }-->

<!--    export default {-->
<!--      name: "Record—Page",-->

<!--      data() {-->
<!--        return {-->
<!--          isRecording: false,-->
<!--          isUploading: false,-->
<!--          isUploadSuccess: false,-->

<!--          btn_not_pressed_img: require("src/assets/img2.png"),-->
<!--          btn_pressed_img: require("src/assets/img1.png")-->
<!--        }-->
<!--      },-->

<!--      created() {-->
<!--        created-->
<!--      },-->

<!--      mounted() {-->

<!--        this.init();-->
<!--        this.addLongClickListener();-->

<!--      },-->

<!--      beforeDestroy() {-->
<!--        console.log("before destroy");-->
<!--        try {-->
<!--          if (this.isRecording) {-->
<!--            this.stopRecord(false);-->
<!--          }-->
<!--          this.closeRecordDevice();-->
<!--        } catch (e) {-->

<!--        }-->
<!--      },-->

<!--		methods: {-->
<!--      init()-->
<!--      {-->
<!--        this.isRecordReady = false;-->
<!--        this.isRecording = false;-->
<!--        this.isUploading = false;-->
<!--        this.isUploadSuccess = false;-->
<!--        this.initRecord();-->
<!--      }-->
<!--    ,-->

<!--      // 按钮长按功能-->
<!--      addLongClickListener()-->
<!--      {-->
<!--        const recordBtn = this.$refs.btnRef;-->
<!--        let timer = null;-->
<!--        const _this = this;-->
<!--        this.startRecordTime = -1;-->

<!--        recordBtn.addEventListener('touchstart', function (event) {-->
<!--          console.log('touchstart');-->
<!--          event.stopPropagation();-->
<!--          event.preventDefault();-->
<!--          timer = setTimeout(function () {-->
<!--            _this.startRecord();-->
<!--          }, 300);-->
<!--        });-->

<!--        recordBtn.addEventListener('touchmove', function (event) {-->
<!--          setTimeout(function () {-->
<!--            clearTimeout(timer);-->
<!--            timer = 0;-->
<!--          });-->
<!--        });-->

<!--        recordBtn.addEventListener("touchend", function (event) {-->
<!--          console.log('touchend');-->
<!--          _this.stopRecord(true);-->
<!--          clearTimeout(timer);-->
<!--          return false;-->
<!--        });-->
<!--      }-->
<!--    ,-->

<!--      initRecord()-->
<!--      {-->
<!--        if (!this.recorder) {-->
<!--          const audioContext = new (window.AudioContext || window.webkitAudioContext)();-->
<!--          const recorder = new Recorder(audioContext, {-->
<!--            onAnalysed: data => {-->
<!--              const value = data.lineTo;-->
<!--              // console.log("recorder data", value);-->
<!--            }-->
<!--          });-->
<!--          this.recorder = recorder;-->
<!--        }-->

<!--        if (this.recorder && !this.isRecordReady) {-->
<!--          getUserMedia({-->
<!--                audio: true-->
<!--              },-->
<!--              (stream) => {-->
<!--                this.audioStream = stream;-->
<!--                this.recorder.init(stream);-->
<!--                this.isRecordReady = true;-->
<!--              },-->
<!--              (err) => {-->
<!--                console.log("音频设备打开失败, err= ", err);-->
<!--              });-->
<!--        }-->

<!--      }-->
<!--    ,-->

<!--      startRecord()-->
<!--      {-->
<!--        console.log("开始录音");-->
<!--        if (this.recorder && this.isRecordReady) {-->
<!--          navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;-->
<!--          if (navigator.vibrate) {-->
<!--            console.log("支持设备震动！");-->
<!--            navigator.vibrate(1000);-->
<!--          } else {-->
<!--            console.log("不支持设备震动！");-->
<!--          }-->
<!--          this.recorder.start();-->
<!--          this.isRecording = true;-->
<!--          this.startRecordTime = performance.now();-->
<!--        } else {-->
<!--          this.init();-->
<!--        }-->
<!--      }-->
<!--    ,-->

<!--      // 停止录音-->
<!--      stopRecord(upload)-->
<!--      {-->
<!--        if (!this.isRecording) {-->
<!--          console.log("没有在录音，请长按按钮");-->
<!--          return;-->
<!--        }-->

<!--        const recorder = this.recorder;-->

<!--        try {-->
<!--          recorder.stop().then(({blob, buffer}) => {-->
<!--            this.isRecording = false;-->
<!--            const duration = performance.now() - this.startRecordTime;-->
<!--            blob = blob;-->

<!--            if (duration > 4000) {-->
<!--              if (upload) {-->
<!--                console.log('上传音频文件');-->
<!--                this.uploadVoiceFile(blob);-->
<!--                // Recorder.download(blob, 'my-audio-file');  //将音频文件下载到本地-->
<!--              }-->
<!--            } else {-->
<!--              toast('录音时长太短');-->
<!--            }-->
<!--            this.startRecordTime = -1;-->

<!--          });-->
<!--        } catch (e) {-->
<!--          console.log(e);-->
<!--        }-->
<!--      }-->
<!--    ,-->

<!--      closeRecordDevice()-->
<!--      {-->
<!--        try {-->
<!--          if (this.audioStream) {-->
<!--            this.audioStream.getTracks()[0].stop();-->
<!--            this.audioStream = null;-->
<!--          }-->
<!--        } catch (err) {-->
<!--          console.log("录音设备关闭失败,err= ", err);-->
<!--        }-->
<!--        this.recorder = null;-->
<!--        this.isRecordReady = false;-->
<!--      },-->

<!--      uploadVoiceFile(blob)-->
<!--      {-->
<!--        const _this = this;-->

<!--        if (!_this.isUploading) {-->
<!--          _this.isUploading = true;-->

<!--          // 调用上传接口-->
<!--          uploadVoice(blob, (response) => {-->

<!--            console.log(response);-->
<!--            _this.isUploading = false;-->
<!--            if (response.data && response.data.code == 200) {-->
<!--              _this.isUploadSuccess = true;-->

<!--              // 上传录音成功-->
<!--            } else {-->
<!--              _this.isUploadSuccess = false;-->
<!--              // 上传录音失败-->
<!--            }-->
<!--          }, (error) => {-->
<!--            console.log('uploading voice failed, error= ', error);-->
<!--            _this.isUploading = false;-->
<!--            _this.isUploadSuccess = false;-->
<!--            // 上传录音失败-->
<!--          });-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->