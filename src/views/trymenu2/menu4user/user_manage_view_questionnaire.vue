<template>
  <h1>查看问卷</h1>
  <div>
    <div class="container">
      <div class="qu-wrap">
        <header>
          <span @click=" changeflag">&lt; 返回</span>
          <p>{{ title1 }}</p>
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
                         @change="item.answer = optIndex">
                  <input v-else
                         :type="item.type"
                         :name="index + 1"
                         @change="checkboxAnswer($event, optIndex, item.answer)">
                  <span>{{ option }}</span>
                </label>
              </li>
            </ul>
          </section>
        </div>
        <footer>
          <span id="submitBtn" @click="iterator = submitBtn(); iterator.next()">提交问卷</span>
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
  </div>
  <div>
    <a-button @click="changeflag">返回</a-button>
  </div>
</template>

<script>
import api from "@/api";
import {Message} from "@arco-design/web-vue";
import {toRaw} from "vue";
import Data from "@/utils/data";

export default {
  name: "user_manage_view_questionnaire",
  props:['title1'],
  data(){
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
    this.getData(this.title1);
  },
  methods:{
    getData(data) {
      this.form.title = data
      api.getQuestionnaireInfo(this.form).then(res=>{
        if(res.code===200){
          Message.success(res.msg)
          this.list = toRaw(this.quData)
          this.date = res.data["time"]
          this.title = res.data["title"]
          this.questionTemplate = Data.template;
          this.questions = [...res.data["questions"]];
          this.state=res.data["state"];

        }
        else{
          Message.error(res.msg)
        }
      })

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
      this.changeflag();
      Message.success("提交成功!")
      // this.$router.push({path: '/'});
      // console.log('非正式项目，无需发送用户回答数据，打印出来看看就好');
      // console.log(this.answers);
    },

    *submitBtn() {
      let text = ``;
      if (this.state === 0) {
        Message.error("问卷尚未发布，无法提交！");
      }
      else if (!this.requireValidate()) {
        text = `有必填项未填写，无法提交！`;
        this.iterator = null;
      }
      else {
        text = `确认提交问卷吗？`
        yield this.showPrompt(text);
        yield this.sendAnswer();
      }
    },
    changeflag(){
      this.$emit('flag_view',this.flag)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../style/_Fill';
</style>
