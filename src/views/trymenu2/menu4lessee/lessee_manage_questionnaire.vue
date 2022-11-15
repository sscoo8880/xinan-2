<template>
  <div><h1> </h1></div>
  <div class="Login" id="figure">
    <!--    <img alt="Vue logo" src="../../assets/dashboard.png">-->
  </div>

  <div id="form">
    <a-space >
      <a-button type="outline">新增问卷</a-button>
      <a-button type="outline">删除问卷</a-button>
      <a-button type="outline">修改问卷信息</a-button>
    </a-space >

  </div>
  <br>  `
  <div id="form2">
    <a-space direction="horizontal" size="large" style="width: 90%">
      <p>姓名:</p>
      <a-mention v-model="value" :data="['Bytedance', 'Bytedesign', 'Bytenumner']" placeholder="请输入姓名" />


      <p>性别:</p>
      <a-select :style="{width:'320px'}" placeholder="请选择性别" allow-clear>
        <a-option>男</a-option>
        <a-option>女</a-option>

      </a-select>
      <p>出生日期:</p>
      <a-date-picker style="width: 200px;" />


      <a-button type="outline">查询</a-button>

    </a-space>
  </div>

  <br><br><br><br><br><br><br><br><br>

  <a-table id="form3" :columns="columns" :data="data" :rowKey="data.key" :row-selection="rowSelection">
    <template #optional="{ record }">
      <a-button type="primary" status="success" @click="$modal.info({ title:'Name', content:record.name })">修改</a-button>
      <a-button type="primary" status="danger" @click="$modal.info({ title:'Name', content:record.name })">删除</a-button>
    </template>
  </a-table>



</template>

<script>
import {reactive, ref} from 'vue';

export default {
  data(){
    const rowSelection = reactive({
      type: 'checkbox',
      // fixed:false,
      showCheckedAll: true
    });
    return{
      value : '',
      text : '',
      rowSelection,
      columns : [
        {
          title: 'ID',
          dataIndex: 'id',
          width:150
        },
        {
          title: '问卷名称',
          dataIndex: 'name',
          width:170
        },
        {
          title: '性别',
          dataIndex: 'sex',
          width:110
        },
        {
          title: '出生日期',
          dataIndex: 'birthday',
          width:250
        },
        {
          title: '联系电话',
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
        name: 'Jane Doe',
        sex:'男',
        id: 23000,
        birthday:'2002-6-7',
        address: '32 Park Road, London',
        email: 'jane.doe@example.com',
        phone:'18640967655',
      }, {
        key: '2',
        name: 'Alisa Ross',
        sex:'女',
        id: 25000,
        birthday:'2002-8-10',
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
        phone:'19585652545',

      }, {
        key: '3',
        name: 'Kevin Sandra',
        sex:'男',
        id: 22000,
        birthday:'1996-5-13',
        address: '31 Park Road, London',
        email: 'kevin.sandra@example.com',
        phone:'13961552541'

      }, {
        key: '4',
        name: 'Ed Hellen',
        sex:'女',
        id: 17000,
        birthday:'1992-10-19',
        address: '42 Park Road, London',
        email: 'ed.hellen@example.com',
        phone:'18555625262',

      }, {
        key: '5',
        name: 'William Smith',
        sex:'男',
        id: 27000,
        birthday:'1989-6-27',
        address: '62 Park Road, London',
        email: 'william.smith@example.com',
        phone:'13625252573',
      }]),
    }
  },
  setup(){
    const rowSelection = reactive({
      type: 'checkbox',
      // fixed:false,
      showCheckedAll: true
    });
  },
}
</script>

<style>

#background-r{
  background: url("../../../assets/login_background.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

#form{
  position: relative;
  top: 90%;
  left: -11%;
  /*-ms-transform: translate(-50%, -50%);*/
  /*transform: translate(-50%, -50%);*/
}

#form2{
  position: relative;
  top: 30%;
  left: 45%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#form3{
  position: relative;
  top: 60%;
  left: 44.625%;
  width: 98%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>

