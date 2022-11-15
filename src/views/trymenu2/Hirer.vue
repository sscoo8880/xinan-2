<template>

  <div><h1> </h1></div>
  <div class="Login" id="figure">
    <!--    <img alt="Vue logo" src="../../assets/dashboard.png">-->
  </div>

<!--  <div id="form">-->
<!--    <a-space >-->
<!--&lt;!&ndash;      <a-button type="outline">新增租户</a-button>&ndash;&gt;-->
<!--&lt;!&ndash;      管理员不能增加用户&ndash;&gt;-->

<!--    </a-space >-->

<!--  </div>-->
  <br><br>
  <div id="form2">
    <a-space direction="horizontal" size="large" style="width: 95%">
      <p>租户名:</p>
      <a-mention :style="{width:'200px'}" v-model="value" :data="['Bytedance', 'Bytedesign', 'Bytenumner']" placeholder="请输入租户名" />

      <p>会员等级:</p>
      <a-select :style="{width:'200px'}" placeholder="请选择会员等级" allow-clear>
        <a-option>青铜</a-option>
        <a-option>白银</a-option>
        <a-option>铂金</a-option>
        <a-option>钻石</a-option>
      </a-select>
      <p>最后登陆日期:</p>
      <a-date-picker style="width: 200px;" />

      <a-button type="outline">查询</a-button>
      <a-button-group v-model="selectStatus">
        <a-button type="outline" @click="func_remove" v-on:select="click_remove" label="label_remove">删除</a-button>
        <a-button type="outline" label="label_edit">修改</a-button>
      </a-button-group>
      <div style="display: flex;align-items: center">
        <a-button type="default" @click="sure_remove()" :style="{display: active1}">确定删除</a-button>
        <a-button type="default" @click="exit_remove()" :style="{display: active2}">取消删除</a-button>
      </div>

    </a-space>
  </div>

  <br><br><br><br><br><br><br><br><br>

  <div id="form3" >
    <a-table
        :columns="columns"
        :data="data"
        :row-selection="rowSelection"
        :hoverable=true
        :model="form"
    >
    </a-table>

  </div>
</template>

<script>
import {reactive, ref} from 'vue';
export default {
  name: "Hirer",
  data(){
    return{
      selectStatus:"label_remove",
      active1:'none',
      active2:' ',
    }
  },
  methods:{
    click_remove(){
      this.form.checkbox=false;
    },
    changeStatus(){
      if (this.selectStatus==="label_remove"){
        this.active1=' ';
        this.active2='none';
      }
      else{
        this.active1='none';
        this.active2=' ';
      }
    },
    func_remove(){
      this.active1=' ';
      this.active2='none';
    }
  },
  setup() {
    const value = ref('');
    const text = ref('');
    const rowSelection = reactive({
      type: 'checkbox',
      // fixed:false,
      showCheckedAll: true
    });
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        width:130
      },
      {
        title: '用户名称',
        dataIndex: 'name',
        width:180
      },
      {
        title: '会员等级',
        dataIndex: 'membership_level',
        width:130
      },
      {
        title: '最后登陆日期',
        dataIndex: 'last_login',
        width:200
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        width:200
      },
      {
        title: '欠费',
        dataIndex: 'fair',
        width:200
      },
      {
        title: '状态',
        dataIndex: 'status',
        width:150
      },
      {
        title: '操作',
        dataIndex: 'tags',
        width: 100,
        key: 'tags',
        slots: { customRender: 'tags' },
      },
    ];
    const data = reactive([{
      key: '1',
      name: 'Jane Doe',
      membership_level:'白银',
      id: 23000,
      last_login:'2002-6-7',
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
      phone:'18640967655'
    }, {
      key: '2',
      name: 'Alisa Ross',
      membership_level:'钻石',
      id: 25000,
      last_login:'2002-8-10',
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
      phone:'19585652545'
    }, {
      key: '3',
      name: 'Kevin Sandra',
      membership_level:'白银',
      id: 22000,
      last_login:'1996-5-13',
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
      phone:'13961552541'
    }, {
      key: '4',
      name: 'Ed Hellen',
      membership_level:'钻石',
      id: 17000,
      last_login:'1992-10-19',
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
      phone:'18555625262'
    }, {
      key: '5',
      name: 'William Smith',
      membership_level:'白银',
      id: 27000,
      last_login:'1989-6-27',
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
      phone:'13625252573'
    }]);

    return {
      columns,
      data,
      rowSelection,
      value,
      text
    }
  }
}
</script>

<style scoped>


</style>