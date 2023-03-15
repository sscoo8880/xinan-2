<template>
  <h1>修改问卷</h1>
  <div >
    <div class="container">
      <div class="qu-wrap">
        <header>
          <span @click="changeflag">&lt; 返回</span>
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
            <template v-if="item.type === 'textarea'">
              <textarea rows="8" cols="80"></textarea>
              <label id="require-check">
                <input type="checkbox"
                       v-model="item.isMandatory">
                此题是否必填
              </label>
            </template>
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
  </div>
  <div >
    <a-button type="primary" @click="changeflag">返回上级页面</a-button>
  </div>

</template>

<script>
import user_manage_questionnaire from "@/views/trymenu2/menu4user/user_manage_questionnaire";
import Design_questionnaire from "@/views/trymenu2/menu4user/design_questionnaire";
import Datepicker from "@/views/trymenu2/menu4user/Datepicker";
import Data from "@/utils/data";
import {toRaw} from "vue";
import api from "@/api";
import {Message} from "@arco-design/web-vue";

export default {
  name: "user_manage_change_questionnaire",
  props:['title1'],
  components:{
    Design_questionnaire,
    user_manage_questionnaire,
    'date-components': Datepicker

  },
  mounted() {
    //判断前面是编辑还是新建
    // alert(123)
    // alert(this.title1);
    // console.log(this.$route)
    // if (title == ''){
    //   this.getData(0);
    // }else {
    //   //编辑
    //   this.getData(1);
    // }
    this.getData(this.title1);
    // console.log(this.quList);
  },


  computed: {
    tempTitle() {
      return this.title || this.quData.title;
    }
  },
  watch:{
    title1(newValue,oldValue){
      // alert(newValue);
      this.title=newValue
    },
    immediate:true
  },
  data() {
    return {
      flag:0,
      index: '',
      quData: {},
      questions: [],
      questionTemplate:{},
      quList: Data.list,
      date: '',
      form:{
        title: '',
      },
      list:{
        id:'',
        date:'',
        title :'',
        questionTemplate:''
      },
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
    }
  },
  methods:{
    changeflag(){
      this.$emit('flag_change',this.flag)
    },
    getpath(id) {
      return document.getElementById(id);
    },
    getData(data) {
      //todo 搜索到题目接口
      // alert(data)
      this.form.title = data
      // alert(this.form.title)
      api.getQuestionnaireInfo(this.form).then(res=>{
        if(res.code===200){
          Message.success(res.msg)
          // console.log(res.data["title"] )
          // this.quData =JSON.parse(JSON.stringify(res.data))
          // console.log(toRaw(this.quData))

          // this.quData =toRaw(this.quData)
          // console.log(this.quData)

          this.list = toRaw(this.quData)
          this.date = res.data["time"]
          this.title = res.data["title"]
          this.questionTemplate = Data.template;
          this.questions = [...res.data["questions"]];

        }
        else{
          Message.error(res.msg)
          this.quData = null
        }
      })
      // this.quData = this.quList[0];
      // //改这里，创建问卷时id默认为零来进入if
      // let item = {};
      // //问卷id后端自己生成
      // //标题名字自己取
      // item.title = `请输入问卷名...`;
      // item.state = 0;
      // item.stateName = '未发布';
      // item.time = '2020-12-31';
      // item.questions = [];
      // this.quData = item;
      // alert( this.quData.time)
      // this.date = this.quData.time;
      // this.title = this.quData.title;
      // this.questionTemplate = Data.template;
      // console.log(this.title)
      // this.questions = [...this.quData.questions];
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
      //接口2个
      //todo 编辑接口
      //新建问卷接口
      api.updateQuestionnaire(raw).then(res => {
        // console.log(res)
        if (res.code === 200) {
          // console.log(res.data.list)
          // x.col=res.data.list;
          Message.success(res.msg)
        } else {
          Message.error(res.msg)
        }
      })

    },
    releaseBtn() {
      this.showPrompt(`确认要保存并发布问卷？`);
      (() => {
        this.quData.state = 1;
        this.quData.stateName = '发布中';
        this.saveData();
      })();
      this.$router.push({path: '/'});
    }
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
</style>
