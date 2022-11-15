<template>
  <div><h1> </h1></div>
  <div class="Login" id="figure">
  </div>
  <br>
  <div style="margin-bottom: 15px">
    <a-space direction="horizontal" size="large" style="width: 100%">
      <p>问卷名:</p>
      <a-mention v-model="question_name"  placeholder="请输入问卷名..." />
      <a-button @click="serchQuestion" type="outline" >查询</a-button>
      <a-modal v-model:visible="flag_search" @ok="handleOk" @cancel="handleCancel">
        <template #title>
          提醒
        </template>
        <div>没有查询到相关问卷</div>
      </a-modal>
    </a-space>
  </div>
  <a-table :columns="columns" :data="info.col" :pagination="pagination" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" style="margin-top: 10px">
    <template #optional="{ record }">
      <div v-if="record.state==0">
      <a-button type="primary" style="margin-right:10px;background-color: #ffc940">查看</a-button>
      <a-button type="primary" style="margin-right:10px;background-color: crimson">修改</a-button>
      <a-button type="primary" @click="handleClickDelete(record.title)" style="background-color: #409EFF">删除</a-button>
      </div>
      <div v-else>
        <a-button type="primary" style="margin-right:10px;background-color: #ffc940">查看</a-button>
        <a-button type="primary" style="margin-right:10px;background-color: #4ddc14">分析</a-button>
        <a-button type="primary" @click="handleClickDelete(record.title)" style="background-color: #409EFF">删除</a-button>
      </div>
      <a-modal v-model:visible="flag_delete" @ok="DeleteQuestion" @cancel="cancelDeleteQuestion">
        <template #title>
          提示
        </template>
        <div>是否确认删除该问卷</div>
      </a-modal>
    </template>
  </a-table>
</template>

<script>
import {reactive, ref} from 'vue';
import api from "@/api";
import {Message, Modal} from '@arco-design/web-vue';

export default {
  name: "user_manage_send_questionnaire",
  mounted() {
    this.form.title =this.question_name;
    api.searchQuestion(this.form).then(res => {
      if (res.code === 200){
        console.log(res.data)
        this.info.col=res.data;
      }else {
        this.info.col = null;
      }
    })
  },
  data(){
    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true
    });

    return{
      selectedKeys :['1','2'],
      form:{
        title: '',
      },
      pagination:{pageSize: 5},
      info:{
        col:[]
      },
      flag_search:false,
      flag_delete:false,
      question_name : '',
      text : '',
      rowSelection,
      columns : [
        {
          title: '问卷ID',
          dataIndex: 'id',
          width:100
        },
        {
          title: '问卷名称',
          dataIndex: 'title',
          width:170
        },
        {
          title: '问卷状态',
          dataIndex: 'state',
          width:170
        },
        {
          title: '创建日期',
          dataIndex: 'createTime',
          width:110
        },
        {
          title: '截止日期',
          dataIndex: 'time',
          width:110
        },
        {
          title: '操作',
          slotName: 'optional',
          width:180,
        },
      ],
    }
  },

  methods:{
    updateQuestion(){
      this.form.title='';
      api.searchQuestion(this.form).then(res=>{
        if(res.code===200){
          this.info.col=res.data;
        }
        else{
          this.info.col=null;
        }
      })
    },
    handleOk(){
      this.flag_search = false;
    },
    handleCancel(){
      this.flag_search = false;
    },
    serchQuestion(){
      if(this.question_name===""){
        Modal.warning({
          title: '警告提示',
          content: '输入问卷名字不能为空'
        });
      }
      else {
        this.form.title =this.question_name;
        api.searchQuestion(this.form).then(res=>{
          if(res.code===200){
            this.info.col=res.data;
          }
          else{
            this.flag_search = true;
          }
        })
      }
    },
    handleClickDelete(title){
      this.form.title=title
      this.flag_delete =true;
    },
    cancelDeleteQuestion(){
      this.flag_delete=false;
    },
    DeleteQuestion(){
      api.deleteQuestion(this.form).then(res=>{
        if(res.code===200){
          this.updateQuestion()
          Message.success(res.msg)
        }
        else{
          Message.error('删除失败！')
        }
      })
    }
  }
}
</script>

<style>

</style>


