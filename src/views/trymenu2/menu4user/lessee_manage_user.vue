<template>
<!--  <div style="width: 30%">-->
<!--    <a-page-header class="title" title="返回" @back="$router.back()" :style="{padding:'20px',height:'60px'}" />-->
<!--  </div>-->
<!--  <a-form>-->
<!--    <a-typography-text id="title-m">管理群组</a-typography-text>-->

<!--  </a-form>-->





<!--  <div id="background-r">-->
<div id="user">
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
    <a-space column="1" direction="horizontal" size="large" style="width: 90%">
      <a-input-search :style="{width:'320px'}" placeholder="输入用户名称，进行模糊搜索" search-button/>
      <a-button type="outline" :style="{width:'130px',left:'50px'}">新增用户</a-button>
      <a-button type="outline" :style="{width:'130px',left:'50px'}" @click="appear(getpath('group')),disappear(getpath('user'))">返回上一级页面</a-button>
    </a-space>
  </div>


  <br><br>

  <br><br><br><br><br><br><br><br><br>

  <a-table id="form3" :columns="columns" :data="data" :rowKey="data.key" :row-selection="rowSelection">
    <template #optional="{ record }">
      <a-button type="primary" status="success"  @click="handleClick">管理</a-button>
      <a-modal v-model:visible="visible" title="用户信息详情" @cancel="handleCancel" @before-ok="handleBeforeOk">
        <a-form :model="record">
          <a-form-item field="name" label="用户名">
            <a-input v-model="record.name" />
          </a-form-item>
          <a-form-item field="level" label="会员等级">
            <a-select v-model="record.level">
              <a-option value="post1">青铜</a-option>
              <a-option value="post2">白银</a-option>
              <a-option value="post3">黄金</a-option>
              <a-option value="post4">钻石</a-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-modal>
      <a-button type="primary" status="danger" @click="$modal.info({ title:'删除', content:'群组名称：'+record.name })">删除</a-button>
    </template>
  </a-table>
</div>
    <div id="group">

    </div>

<!--  </div>-->


</template>

<script>
import {reactive, ref} from 'vue';
import lessee_manage_group from "@/views/trymenu2/menu4user/lessee_manage_group";
const size = ref('large');
export default {
  components: {
    // 引入子页面
    lessee_manage_group,},

  data(){
    const rowSelection = reactive({
      type: 'checkbox',
      // fixed:false,
      showCheckedAll: true
    });
    // 管理-弹出框
    const visible = ref(false);
    const record = reactive({
      name: '',
      level: '',
    });
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
    const handleCancel = () => {
      visible.value = false;
    };

    return{
      visible,
      record,
      rowSelection,
      handleClick,
      handleBeforeOk,
      handleCancel,
      value : '',
      text : '',
      columns : [
        {
          title: 'ID',
          dataIndex: 'id',
          width:150
        },
        {
          title: '用户名称',
          dataIndex: 'name',
          width:170
        },
        {
          title: '会员等级',
          dataIndex: 'level',
          width:110
        },
        {
          title: '更新日期',
          dataIndex: 'last_update',
          width:250
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
      data : ([{
        key: '1',
        name: 'uJane Doe',
        level:'黄金',
        id: 23000,
        last_update:'2002-6-7',
        address: '32 Park Road, London',
        email: 'jane.doe@example.com',
        phone:'18640967655',
      }, {
        key: '2',
        name: 'uAlisa Ross',
        level:'钻石',
        id: 25000,
        last_update:'2002-8-10',
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
        phone:'19585652545',

      }, {
        key: '3',
        name: 'uKevin Sandra',
        level:'黄金',
        id: 22000,
        last_update:'1996-5-13',
        address: '31 Park Road, London',
        email: 'kevin.sandra@example.com',
        phone:'13961552541'
      }, {
        key: '4',
        name: 'uEd Hellen',
        level:'钻石',
        id: 17000,
        last_update:'1992-10-19',
        address: '42 Park Road, London',
        email: 'ed.hellen@example.com',
        phone:'18555625262',
      }, {
        key: '5',
        name: 'uWilliam Smith',
        level:'黄金',
        id: 27000,
        last_update:'1989-6-27',
        address: '62 Park Road, London',
        email: 'william.smith@example.com',
        phone:'13625252573',
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
  methods:{
    getpath(id) {
      return document.getElementById(id);
    },
    disappear(x)//让当前页面消失
    {
      x.style.display="none"
    },
    appear(x)//让当前页面出现
    {
      x.style.display="block"
    }
  }
}
</script>

<style scoped>

#background-r{
  background: url("../../../assets/login_background.jpg") no-repeat center;
  position:relative;
  height: 100%;
  width: 100%;
  top: 10%;
  background-size: cover;
  position: fixed;


}

#form{
  position: absolute;
  top: 3%;
  left: 7%;

  /*-ms-transform: translate(-50%, -50%);*/
  /*transform: translate(-50%, -50%);*/
}

#form2{
  position: absolute;
  top: 90%;
  left: 30%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#form3{
  position: absolute;
  top: 200%;
  left: 55%;
  width: 98%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
#upic{
  position: fixed;
  width: 40px;
  height: 40px;
  right: 100px;
  top: 20px;
}

#group{

}
#user{

}
#title-m{
  position: absolute;
  top: 20px;
  left: 50%;
  height: 20px;
  font-size: 30px;
}
</style>
