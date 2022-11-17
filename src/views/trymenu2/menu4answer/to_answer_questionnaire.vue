<template>
  <h1>已完成问卷界面</h1>
  <div>
    <div class="container">
      <div class="qu-wrap">
        <header>
          <span @click=" changeflag">&lt; 返回</span>
          <p>{{this.quData.title}}</p>
        </header>
        <div class="qu-content">
          <section class="qu-item" v-for="(item, index) in questions">
            <h3>{{ `Q${index + 1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.topic}` }}
              <span v-if="item.isMandatory"> *</span>
            </h3>
            <textarea rows="8"
                      cols="80"
                      v-if="item.type === 'textarea'"
                      v-model="item.answer"
                      :required="item.isMandatory">
					</textarea>
            <ul v-else class="options-list">
              <li v-for="(option, optIndex) in item.options">
                <label >
                  <input v-if="item.type === 'radio'"
                         :type="item.type"
                         :name="index + 1"
                         checked
                         @change="item.answer = optIndex">
                  <input v-else
                         :type="item.type"
                         :name="index + 1"
                         checked
                         @change="checkboxAnswer($event, optIndex, item.answer)">
                  <span>{{ option }}</span>
                </label>
              </li>
            </ul>
          </section>
        </div>
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
  </div>
  <div>
    <a-button type="primary" @click="appare(getpath('look')),disappare(getpath('comp'))">返回上级页面</a-button>
  </div>


  <div id="look">
    <answer_answer_questionnaire></answer_answer_questionnaire>
  </div>
</template>

<script>
import answer_answer_questionnaire from "@/views/trymenu2/menu4answer/answer_answer_questionnaire";
import Data from "@/utils/data";
import {Message} from "@arco-design/web-vue";
export default {
  name: "to_answer_questionnaire",
  components:{
    answer_answer_questionnaire
  },data(){
    return{
      flag:0,
      quData: {},
      form:{
        title: '',
      },
      state:0,
      questions: [],
      answers: {},
      promptText: '',
      isShowPrompt: false,
    }
  },
  mounted() {
    this.getData();
  },
  methods:{
    getData() {

      this.quData = Data.list[3];

      this.date = this.quData.time;
      this.title = this.quData.title;
      this.state = this.quData.state;
      this.questionTemplate = Data.template;
      this.questions = [...this.quData.questions];


      this.questions.forEach((item) => {
        if (item.type === 'checkbox') {
          item.answer = [];
        }
        else {
          item.answer = '';
        }
      });
    },

    showPrompt(text) {
      this.promptText = text;
      this.isShowPrompt = true;
    },

    checkboxAnswer(event, index, answer) {
      if (event.target.checked) {
        answer.push(index);
      }
      else {
        answer.splice(answer.indexOf(index), 1);
      }
    },

    requireValidate() {
      let textareas = document.querySelectorAll('textarea');
      return [].every.call(textareas, item => {
        if (item.hasAttribute('required') && item.value.trim() === '') {
          return false;
        }
        return true;
      })
    },

    getAnswer() {
      this.questions.forEach((item, index) => {
        this.answers[`Q${index + 1}answer`] = item.answer;
      })
    },

    sendAnswer() {
      this.getAnswer();
      Message.success("提交成功!")
      this.changeflag();
    },

    *submitBtn() {
      let text = ``;
      if (!this.requireValidate()) {
        text = `有必填项未填写，无法提交！`;
        this.iterator = null;
      }
      else {
        text = `确认提交问卷吗？`
        yield this.showPrompt(text);
        yield this.sendAnswer();
      }
    },
    getpath(id) {
      return document.getElementById(id);
    },
    disappare(x)//当前页面消失
    {
      console.log(document.getElementById("comp").style.display)
      x.style.display="none"
      console.log(document.getElementById("comp").style.display)
    },
    appare(x)//新页面出现
    {
      x.style.display="block"
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../style/_Fill';
</style>
