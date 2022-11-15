<template>
  <div style="margin-bottom: 15px">
    <a-space direction="horizontal" size="large" style="width: 100%">
      <a-input-search :style="{width:'320px'}" placeholder="输入问卷名称，进行模糊搜索" search-button/>
      <a-button type="outline">查询</a-button>
    </a-space>
  </div>
  <div style="margin-top: 10px" >
    <a-table :columns="columns" :data="data" :rowKey="data.key" :row-selection="rowSelection">
      <template #optional="{ record }">
        <router-link :to="{path:'/to_answer_questionnaire',query:{id:record.id,name:record.name,date:record.last_update}}"><a-button type="primary"  >答卷</a-button></router-link>
      </template>
    </a-table>

  </div>
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
          title: '群组名称',
          dataIndex: 'name',
          width:170
        },
        {
          title: '人数',
          dataIndex: 'contains',
          width:110
        },
        {
          title: '更新日期',
          dataIndex: 'last_update',
          width:250
        },
        {
          title: '联系人电话',
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
    cli(){
      alert("点击答卷按钮")
      console.log(global.apiUrl)
    }
  }
}
</script>

<style scoped>

</style>

