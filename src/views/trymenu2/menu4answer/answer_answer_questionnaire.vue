<template>
  <div id="look" >
    <div style="margin-bottom: 15px">
      <a-space direction="horizontal" size="large" style="width: 100%">
        <a-input-search :style="{width:'320px'}" placeholder="输入问卷名称，进行模糊搜索" search-button/>
        <a-button type="outline">查询</a-button>
      </a-space>
    </div>
    <div>
      <a-table  :columns="columns" :data="data" :rowKey="data.key" :row-selection="rowSelection" style="margin-top: 10px">
        <template #optional="{ record }">
<!--          <router-link :to="{path:'/complished_questionnaire',query:{id:record.id,name:record.name,date:record.last_update}}">-->
          <a-button type="primary" status="success" @click="appare(getpath('comp')),disappare(getpath('look'))">查看</a-button>
<!--          </router-link>-->
        </template>
      </a-table>
    </div>
  </div>
  <div id="comp" style="display: none">
    <to_answer_questionnaire></to_answer_questionnaire>
  </div>

</template>

<script >
import {reactive} from "vue";
import to_answer_questionnaire from "@/views/trymenu2/menu4answer/to_answer_questionnaire";

export default {
  name: "answer_answer_questionnaire",
  components:{
    to_answer_questionnaire
  },
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
          title: '题目数量',
          dataIndex: 'contains',
          width:110
        },
        {
          title: '完成日期',
          dataIndex: 'last_update',
          width:250
        },
        {
          title: '发卷人电话',
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
        contains:'100',
        id: 23000,
        last_update:'2002-6-7',
        address: '32 Park Road, London',
        email: 'jane.doe@example.com',
        phone:'18640967655',
      }, {
        key: '2',
        name: 'Alisa Ross',
        contains:'50',
        id: 25000,
        last_update:'2002-8-10',
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
        phone:'19585652545',

      }, {
        key: '3',
        name: 'Kevin Sandra',
        contains:'100',
        id: 22000,
        last_update:'1996-5-13',
        address: '31 Park Road, London',
        email: 'kevin.sandra@example.com',
        phone:'13961552541'

      }, {
        key: '4',
        name: 'Ed Hellen',
        contains:'50',
        id: 17000,
        last_update:'1992-10-19',
        address: '42 Park Road, London',
        email: 'ed.hellen@example.com',
        phone:'18555625262',

      }, {
        key: '5',
        name: 'William Smith',
        contains:'100',
        id: 27000,
        last_update:'1989-6-27',
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
  methods:{
    // cli(){
    //   alert("点击答卷按钮")
    //   console.log(global.apiUrl)
    // },
    getpath(id) {
      console.log('22355677');
      return document.getElementById(id);

    },
    disappare(x)//当前页面消失
    {
      x.style.display="none"
    },
    appare(x)//新页面出现
    {
      x.style.display="block"
    }
    },
}
</script>

<style scoped>

</style>