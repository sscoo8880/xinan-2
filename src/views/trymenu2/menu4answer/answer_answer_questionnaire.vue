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
          title: '问卷ID',
          dataIndex: 'id',
          width:150
        },
        {
          title: '问卷名称',
          dataIndex: 'name',
          width:220
        },
        {
          title: '可回答次数',
          dataIndex: 'contains',
          width:110
        },
        {
          title: '发布日期',
          dataIndex: 'last_update',
          width:270
        },
        {
          title: '截止日期',
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
        name: '课程满意度调查表',
        contains:'2',
        id: 20001,
        last_update:'2020-5-18',
        address: '32 Park Road, London',
        email: 'jane.doe@example.com',
        phone:'2020-8-17',
      }, {
        key: '2',
        name: '全球气候变暖问卷',
        contains:'2',
        id: 20002,
        last_update:'2021-1-11',
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
        phone:'2021-3-10',

      }, {
        key: '3',
        name: '食堂满意度调查问卷',
        contains:'2',
        id: 20003,
        last_update:'2022-9-17',
        address: '31 Park Road, London',
        email: 'kevin.sandra@example.com',
        phone:'2022-12-16'

      }, {
        key: '4',
        name: '二十大报告满意度问卷',
        contains:'1',
        id: 20004,
        last_update:'2022-11-11',
        address: '42 Park Road, London',
        email: 'ed.hellen@example.com',
        phone:'2023-2-10',

      }, {
        key: '5',
        name: '中国未来发展的展望',
        contains:'1',
        id: 20005,
        last_update:'2017-9-21',
        address: '62 Park Road, London',
        email: 'william.smith@example.com',
        phone:'2017-12-20',
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
