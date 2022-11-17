<template>
  <div v-if="flag===0">
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
          <a-button type="primary" @click="changeflag()">开始答题</a-button>
          <!--          </router-link>-->
        </template>
      </a-table>
    </div>
  </div>

  <div v-else>
    <to_manage_questionnaire @flag="getchange"/>
  </div>

</template>

<script >
import {reactive} from "vue";
import to_manage_questionnaire from "@/views/trymenu2/menu4answer/to_manage_questionnaire";

export default {
  name: "answer_manage_questionnaire",
  components:{
    to_manage_questionnaire
  },
  data(){
    const rowSelection = reactive({
      type: 'checkbox',
      // fixed:false,
      showCheckedAll: true
    });
    return{
      flag:0,
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
        name: '您对疫情的看法',
        contains:'1',
        id: 10001,
        last_update:'2002-6-7',
        address: '32 Park Road, London',
        email: 'jane.doe@example.com',
        phone:'2002-10-6',
      }, {
        key: '2',
        name: '您对东北大学的看法',
        contains:'5',
        id: 10002,
        last_update:'2022-8-10',
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com',
        phone:'2022-11-9',

      }, {
        key: '3',
        name: '您对六级考试的看法',
        contains:'1',
        id: 10003,
        last_update:'2022-5-13',
        address: '31 Park Road, London',
        email: 'kevin.sandra@example.com',
        phone:'2022-8-12'

      }, {
        key: '4',
        name: '您对恋爱的看法',
        contains:'5',
        id: 10004,
        last_update:'2022-10-19',
        address: '42 Park Road, London',
        email: 'ed.hellen@example.com',
        phone:'2023-1-18',

      }, {
        key: '5',
        name: '您对文化冲突的看法',
        contains:'1',
        id: 10005,
        last_update:'1989-6-27',
        address: '62 Park Road, London',
        email: 'william.smith@example.com',
        phone:'1989-9-26',
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
    changeflag(){
      this.flag=1;
    },
    getchange(data){
      this.flag=data
    }
  },
}
</script>

<style scoped>
</style>
