<template>

<div>
  <div id="form">
    <a-descriptions column="1" direction="horizontal" >
      <a-descriptions-item label="群组名称:">{{$route.query.name}}</a-descriptions-item>
      <a-descriptions-item label="负责人手机号：">{{$route.query.phone}}</a-descriptions-item>
      <a-descriptions-item label="群组人数：">{{$route.query.contains}}</a-descriptions-item>
      <a-descriptions-item label="上次更新：">{{$route.query.last_update}}</a-descriptions-item>
    </a-descriptions>
  </div>
  <br><br>
  <div id="form2" >
    <a-space column="1" direction="horizontal" size="large" style="width: 100%">
        <p>用户名:</p>
        <a-mention v-model="form_user.username"  placeholder="请输入用户名..." />
        <a-button @click="searchUser" type="outline" >查询</a-button>
        <a-modal v-model:visible="flag_search" @ok="handleOk" @cancel="handleCancel">
          <template #title>
            提醒
          </template>
          <div>没有查询到相关问卷</div>
        </a-modal>
      <a-button type="outline" :style="{width:'130px',left:'50px'}" @click="addUser">新增用户</a-button>
      <a-modal  v-model:visible="flag_add" title="新增用户" @cancel="handleCancel_groupuser" @before-ok="handleBeforeOk_groupuser">
        <a-form :model="form_groupUser">
          <a-form-item field="name" label="群组名">
            {{gname}}
          </a-form-item>
          <a-form-item field="name" label="用户名">
            <a-input v-model="form_groupUser.user.username" />
          </a-form-item>
        </a-form>
      </a-modal>
      <a-button type="outline" :style="{width:'130px',left:'50px'}" @click="changeflag">返回上一级页面</a-button>
    </a-space>
  </div>

  <br><br>
  <br><br><br><br><br><br><br><br><br>

  <a-table id="form3" :columns="columns" :data="info.col" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination">
    <template #optional="{ record }">
      <a-button type="primary" status="danger" @click="handleClickDelete(record.username)">移除</a-button>
    </template>
  </a-table>
  <a-modal v-model:visible="flag_delete" @ok="DeleteGroupUser" @cancel="cancelDeleteGroupUser">
    <template #title>
      提示
    </template>
    <div>是否确认删除该用户</div>
  </a-modal>
</div>


</template>

<script>
import {reactive, ref} from 'vue';
import api from "@/api";
import {Message, Modal} from "@arco-design/web-vue";
const size = ref('large');
export default {
  name: "lessee_manage_user",
  props:['gname'],
  mounted() {
    this.form_user.username =this.gname;
    api.selectGroupUser(this.form_user).then(res => {
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
      showCheckedAll: true
    });
    return{
      form_user:{
        username: '',
      },
      form_groupUser:{
        group:{
          gname:''
        },
        user: {
          username: ''
        },
      },
      flag_delete:false,
      flag_add:false,
      flag_search:false,
      selectedKeys :['1','2'],
      flag:0,
      rowSelection,
      pagination:{pageSize: 5},
      value : '',
      text : '',
      columns : [
        {
          title: 'ID',
          dataIndex: 'uid',
          width:150
        },
        {
          title: '用户名称',
          dataIndex: 'username',
          width:170
        },
        {
          title: '用户电话',
          dataIndex: 'phone',
          width:270
        },
        {
          title: '操作',
          dataIndex: 'option',
          width:180,
          slotName: 'optional'
        },
      ],
      info :{
        col:[
          {
            uid: 23000,
            username: 'uJane Doe',
            phone: '18640967655',
          }
        ]
      }
    }
  },
  methods:{
    updateGroupUser(){
      this.form_groupUser.gname=''
      this.form_groupUser.username=''
      api.selectGroupUser(this.form_groupUser).then(res=>{
        if(res.code===200){
          this.info.col=res.data;
        }
        else{
          this.info.col=null;
        }
      })
    },
    changeflag(){
      this.$emit("flag",this.flag)
    },
    handleOk(){
      this.flag_search = false;
    },
    handleCancel(){
      this.flag_search = false;
    },
    addUser(){
      this.flag_add=true
    },
    handleCancel_groupuser(){
      this.flag_add= false;
    },
    handleBeforeOk_groupuser(done){
      if(this.form_groupUser.user.username===''){
        Modal.warning({
          title: '警告',
          content: '用户名不能为空'
        });
        window.setTimeout(() => {
          done(false)
        }, 300)
      }
      else {
        this.form_groupUser.group.gname=this.gname
        api.addGroupUser(this.form_groupUser).then(res=>{
          if(res.code===200){
            window.setTimeout(() => {
              done()
            }, 300)
            this.updateGroupUser();
            Message.success('增加用户成功')
          }
          else {
            window.setTimeout(() => {
              done(false)
            }, 300)
            Message.error('增加用户失败')
          }
        })
      }
    },
    searchUser(){
      api.selectGroupUser(this.form_user).then(res=>{
        if(res.code===200){
          this.info.col=res.data;
        }
        else{
          this.flag_search = true;
        }
      })
    },
    handleClickDelete(username){
      this.form_groupUser.group.gname=this.gname
      this.form_groupUser.user.username=username
      this.flag_delete =true;
    },
    DeleteGroupUser(){
      api.deleteGroupUser(this.form_groupUser).then(res=>{
        if(res.code===200){
          this.updateGroupUser()
          Message.success(res.msg)
        }
        else{
          Message.error('删除失败！')
        }
      })
    },
    cancelDeleteGroupUser(){
      this.flag_delete=false;
    }
  }
}
</script>

<style scoped>

#form{
  position: absolute;
  top: 3%;
  left: 2%;
}

#form2{
  position: absolute;
  top: 90%;
  left: 26%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#form3{
  position: absolute;
  top: 200%;
  left: 50%;
  width: 98%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

</style>
