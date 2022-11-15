<template>

  <div id="first_one" >
    <a-space column="1" direction="horizontal" size="large" style="width: 90%">
      <a-input-search :style="{width:'320px'}" placeholder="输入问卷名称，进行模糊搜索" search-button/>

    </a-space>
  </div>
  <div id="form" style="width: 500%" >
    <a-table id="form3" :columns="columns" :data="data" :rowKey="data.key" :row-selection="rowSelection">
      <template #optional="{ record }">



        <router-link :to="{path:'/lessee_manage_user',query:{name:record.name,phone:record.phone,contains:record.contains,last_update:record.last_update}}">
          <a-button type="primary" status="success" >管理</a-button>
        </router-link>

        <a-button type="primary" status="danger" @click="$modal.info({ title:'删除', content:'群组名称：'+record.name })">删除</a-button>

      </template>
    </a-table>
<!--    <a-menu-->
<!--        :style="{ width: '15%', height: '100%',top:'70px' ,left:'-30px'}"-->
<!--        :default-open-keys="['0']"-->
<!--        :default-selected-keys="['0_0']"-->
<!--        show-collapse-button-->
<!--        breakpoint="xl"-->
<!--        @collapse="onCollapse">-->


<!--      <a-sub-menu>-->
<!--        <template #icon><icon-apps></icon-apps></template>-->
<!--        <template #title>id:6525&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;习近平新时代调查问卷&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2022-1-8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<router-link :to="{path:'/complished_questionnaire',query:{id:6525,name:'习近平新时代调查问卷',date:'2022-1-8'}}"><a-button  type="primary" status="success" >查看</a-button></router-link></template>-->
<!--      </a-sub-menu>-->

<!--      <a-sub-menu>-->
<!--        <template #icon><icon-apps></icon-apps></template>-->
<!--        <template #title>id:5336&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关于东北大学封校看法&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2022-10-25&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<router-link :to="{path:'/complished_questionnaire',query:{id:5336,name:'关于东北大学封校看法',date:'2022-10-25'}}"><a-button   type="primary" status="success" >查看</a-button></router-link></template>-->
<!--      </a-sub-menu>-->

<!--      <a-sub-menu>-->
<!--        <template #icon><icon-apps></icon-apps></template>-->
<!--        <template #title>id:2456&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为何东北地区人口流失过多&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2017-6-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<router-link :to="{path:'/complished_questionnaire',query:{id:2456,name:'为何东北地区人口流失过多',date:'2017-6-1'}}"><a-button   type="primary" status="success" >查看</a-button></router-link></template>-->
<!--      </a-sub-menu>-->

<!--      <a-sub-menu>-->
<!--        <template #icon><icon-apps></icon-apps></template>-->
<!--        <template #title>id:3354&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对东北大学浑南食堂看法&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2019-8-13&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<router-link :to="{path:'/complished_questionnaire',query:{id:3354,name:'对东北大学浑南食堂看法',date:'2019-8-13'}}"><a-button   type="primary" status="success" >查看</a-button></router-link></template>-->
<!--      </a-sub-menu>-->

<!--      <a-sub-menu>-->
<!--        <template #icon><icon-apps></icon-apps></template>-->
<!--        <template #title>id:6793&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如何看待东北大学的未来&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2020-9-30&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<router-link :to="{path:'/complished_questionnaire',query:{id:6793,name:'如何看待东北大学的未来',date:'2020-9-30'}}"><a-button   type="primary" status="success" >查看</a-button></router-link></template>-->

<!--      </a-sub-menu>-->

<!--    </a-menu>-->
  </div>
</template>

<script >
import {reactive} from "vue";

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
}
</script>

<style scoped>

#form{
  position: absolute;
  top: 90%;
  left: 10%;
}
#first_one{
  position: absolute;
  top: 5%;
  left: 7%;
}
</style>