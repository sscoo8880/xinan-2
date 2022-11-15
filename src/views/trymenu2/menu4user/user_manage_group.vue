<template>
  <div style="margin-bottom: 15px">
    <a-space direction="horizontal" size="large" style="width: 100%">
      <p>群组名:</p>
      <a-mention v-model="group_name"  placeholder="请输入群组名..." />
      <a-button @click="searchGroup" type="outline" >查询</a-button>
      <a-modal v-model:visible="flag_search" @ok="handleOk" @cancel="handleCancel">
        <template #title>
          提醒
        </template>
        <div>没有查询到相关群组</div>
      </a-modal>
      <a-button @click="handleClick" type="outline" :style="{width:'320px',left:'420px'}">新增群组</a-button>
      <a-modal  v-model:visible="visible" title="新增群组" @cancel="handleCancel_group" @before-ok="handleBeforeOk">
        <a-form :model="form_group">
          <a-form-item field="name" label="群组名">
            <a-input v-model="form_group.gname" />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-space>
  </div>
  <a-table :columns="columns" :data="info.col" :pagination="pagination" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" style="margin-top: 10px">
    <template #optional="{ record }">
      <router-link :to="{path:'/user_manage_answer'}">
        <a-button type="primary" status="success" style="margin-right:10px;background-color: #ffc940" >管理</a-button>
      </router-link>
      <a-button type="primary" @click="handleClickDelete(record.gname)" style="margin-right:10px;background-color: #409EFF">删除</a-button>
    </template>
  </a-table>
  <a-modal v-model:visible="flag_delete" @ok="DeleteGroup" @cancel="cancelDeleteGroup">
    <template #title>
      提示
    </template>
    <div>是否确认删除该问卷</div>
  </a-modal>
</template>

<script>
import {reactive} from 'vue';
import {Message, Modal} from "@arco-design/web-vue";
import api from "@/api";

export default {

  mounted() {
    this.form.gname =this.group_name;
    api.selectGroup(this.form).then(res => {
      if (res.code === 200){
        this.info.col=res.data;
      }else {
        this.info.col = null;
      }
    })
  },
  data(){
    const rowSelection = reactive({
      type: 'checkbox',
      // fixed:false,
      showCheckedAll: true
    });
    return{
      action:true,
      selectedKeys :['1','2'],
      group_name: '',
      visible:false,
      flag_search:false,
      flag_delete:false,
      form_group:{
        gname:"",
      },
      form:{
        gname: '',
      },
      pagination:{pageSize: 5},
      info:{
        col:[]
      },
      text : '',
      rowSelection,
      columns : [
        {
          title: 'ID',
          dataIndex: 'gid',
          width:150
        },
        {
          title: '群组名称',
          dataIndex: 'gname',
          width:110
        },
        {
          title: '创建日期',
          dataIndex: 'createTime',
          width:200
        },
        {
          title: '更新日期',
          dataIndex: 'updateTime',
          width:250
        },
        {
          title: '操作',
          width:200,
          slotName: 'optional'
        },
      ],
    }
  },
  setup(){
    const rowSelection = reactive({
      type: 'checkbox',
      // fixed:false,
      showCheckedAll: true
    });
  },
  methods:{
    handleClick(){
      this.visible = true;
    },
    handleBeforeOk(done){
      if(this.form_group.gname===''){
        Modal.warning({
          title: '警告',
          content: '群组名不能为空'
        });
        window.setTimeout(() => {
          done(false)
        }, 300)
      }
      else {
        api.addGroup(this.form_group).then(res=>{
          if(res.code===200){
            window.setTimeout(() => {
              done()
            }, 300)
            this.updateGroup();
            Message.success('增加群组成功')
          }
          else {
            window.setTimeout(() => {
              done(false)
            }, 300)
            Message.error('增加群组失败')
          }
        })
      }
    },
   handleCancel_group(){
      this.visible= false;
    },
    updateGroup(){
      this.form.gname='';
      api.selectGroup(this.form).then(res=>{
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
    searchGroup(){
      this.form.gname =this.group_name;
      api.selectGroup(this.form).then(res=>{
        if(res.code===200){
          this.info.col=res.data;
        }
        else{
          this.flag_search = true;
        }
      })
    },
    handleClickDelete(gname){
      this.form.gname=gname
      this.flag_delete =true;
    },
    cancelDeleteGroup(){
      this.flag_delete=false;
    },
    DeleteGroup(){
      api.deleteGroup(this.form).then(res=>{
        if(res.code===200){
          this.updateGroup()
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

