<template>
  <h1 >题库详情 </h1>
  <div id="background-r">

    <div id="form">
      <a-descriptions column="1" direction="horizontal" >
        <a-descriptions-item label="题库id:">{{$route.query.qTemplate_id}}</a-descriptions-item>
        <a-descriptions-item label="题库名称：">{{$route.query.qTemplate_name}}</a-descriptions-item>
        <a-descriptions-item label="题目类型：">{{$route.query.qTemplate_type}}</a-descriptions-item>
        <a-descriptions-item label="题目数量：">{{$route.query.qTemplate_questionnaireNum}}</a-descriptions-item>
        <a-descriptions-item label="题目描述：">{{$route.query.qTemplate_description}}</a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
  <div id="title2">题目列表</div>
  <div id="form2">
    <a-space id="form4" column="1" direction="horizontal" size="large" style="width: 90%" top="500px">
      <a-input-search :style="{width:'320px'}" placeholder="输入用户名称，进行模糊搜索" search-button/>
      <a-button type="outline" :style="{width:'130px',left:'50px'}" @click="handleClick2">新增题目</a-button>
      <a-modal v-model:visible="visible2" title="题目详情" @cancel="handleCancel2" @before-ok="handleBeforeOk2">
        <a-form :model="newQuestion">
          <a-form-item field="question" label="题目">
            <a-input v-model="newQuestion.question" />
          </a-form-item>
          <a-form-item field="select_item" label="选项">
            <a-input v-model="newQuestion.select_item" />
          </a-form-item>
          <a-form-item field="type" label="类型">
            <a-select v-model="newQuestion.type">
              <a-option value="单选">单选</a-option>
              <a-option value="多选">多选</a-option>
              <a-option value="填空">填空</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="answer" label="答案">
            <a-input v-model="newQuestion.answer" />
          </a-form-item>
          <a-form-item field="explanation" label="解析">
            <a-input v-model="newQuestion.explanation" />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-space>
  </div>

  <a-table id="form3" :columns="columns" :data="data" :rowKey="data.key" :row-selection="rowSelection">
    <template #optional="{ record }">
      <a-button type="primary" status="success"  @click="handleClick">管理</a-button>
      <a-modal v-model:visible="visible" title="用户信息详情" @cancel="handleCancel" @before-ok="handleBeforeOk">
        <a-form :model="record">
          <a-form-item field="question" label="题目">
            <a-input v-model="record.question" />
          </a-form-item>
          <a-form-item field="select_item" label="选项">
            <a-input v-model="record.select_item" />
          </a-form-item>
          <a-form-item field="type" label="类型">
            <a-select v-model="record.type">
              <a-option value="post1">单选</a-option>
              <a-option value="post2">多选</a-option>
              <a-option value="post3">填空</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="answer" label="答案">
            <a-input v-model="record.answer" />
          </a-form-item>
          <a-form-item field="explanation" label="解析">
            <a-input v-model="record.explanation" />
          </a-form-item>
        </a-form>
      </a-modal>
      <a-button type="primary" status="danger" @click="$modal.info({ title:'删除', content:'群组名称：'+record.name })">删除</a-button>
    </template>
  </a-table>
</template>

<script>
import {reactive, ref} from 'vue';
const size = ref('large');
export default {


  data(){
    const rowSelection = reactive({
      type: 'checkbox',
      // fixed:false,
      showCheckedAll: true
    });
    // 管理-弹出框
    const visible = ref(false);
    const visible2 = ref(false);
    const record = reactive({
      name: '',
      level: '',
    });
    const newQuestion=reactive({
      question:'',
      type:'',
      answer:'',
      explanation:'',
    });
    const handleClick2 = () => {
      visible2.value = true;
    };
    const handleClick = () => {
      visible.value = true;
    };
    const handleBeforeOk = (done) => {
      console.log(record)
      window.setTimeout(() => {
        done()
        // prevent close
        // done(false)
      }, 3000)
    };
    const handleBeforeOk2 = (done) => {
      console.log(newQuestion)
      window.setTimeout(() => {
        done()
        // prevent close
        // done(false)
      }, 3000)
    };
    const handleCancel = () => {
      visible.value = false;
    };
    const handleCancel2 = () => {
      visible2.value = false;
    };
    return{
      visible,
      visible2,
      record,
      newQuestion,
      rowSelection,
      handleClick,
      handleClick2,
      handleBeforeOk,
      handleBeforeOk2,
      handleCancel,
      handleCancel2,
      value : '',
      text : '',
      columns : [
        {
          title: '题目',
          dataIndex: 'question',
          width:200
        },
        {
          title: '类型',
          dataIndex: 'type',
          width:100
        },
        {
          title: '选项',
          dataIndex: 'select_item',
          width:100
        },
        {
          title: '答案',
          dataIndex: 'answer',
          width:150
        },
        {
          title: '解析',
          dataIndex: 'explanation',
          width:250
        },
        {
          title: '操作',
          dataIndex: 'option',
          width:100,
          slotName: 'optional'
        },
      ],
      data : ([{
        question: '这是一道题目这是一道题目这是一道题目这是一道题目这是一道题目',
        type: '单选题',
        select_item:'A好 B好 C好 D好',
        answer:'A',
        explanation: ' 因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以',
      }, {
        question: '这是一道题目这是一道题目这是一道题目这是一道题目这是一道题目',
        type: '多选',
        select_item:'A好 B好 C好 D好',
        answer:'AB',
        explanation: ' 因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以',
      }, {
        question: '这是一道题目这是一道题目这是一道题目这是一道题目这是一道题目',
        type: '填空',
        select_item:'A好 B好 C好 D好',
        answer:'这是答案按',
        explanation: ' 因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以',
      }]),
    }
  },
  setup(){
    // 勾选框
    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true
    });
  },
}
</script>

<style scoped>

#background-r{
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

#title2{
  position:absolute;
  top: 300px;
  left: 744px;
  font-size: 20px;
}
#form{
  position: absolute;
  top: 3%;
  left: 5%;

  /*-ms-transform: translate(-50%, -50%);*/
  /*transform: translate(-50%, -50%);*/
}

#form2{
  position: absolute;
  top: 40%;
  left: 18%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#form3{
  position: absolute;
  top: 62%;
  left: 50%;
  width: 98%;
  /*-ms-transform: translate(-50%, -50%);*/
  /*transform: translate(-50%, -50%);*/
}
</style>

