<template>
  <div><h1> </h1></div>
  <div class="Login" id="figure">
    <!--    <img alt="Vue logo" src="../../assets/dashboard.png">-->
  </div>
  <br>
  <div id="form2">
    <a-space direction="horizontal" size="large" style="width: 80%">
      <a-input-search :style="{width:'320px'}" placeholder="输入租户名称，进行模糊搜索" search-button/>
      <a-button type="outline" :style="{width:'200px',left:'320px'}">新增题库</a-button>
      <a-button type="outline" :style="{width:'200px',left:'320px'}">导入题库</a-button>
    </a-space>
  </div>

  <a-table :columns="columns" :data="data" :rowKey="data.key" :row-selection="rowSelection" direction="horizontal" style="margin-top: 10px">
    <template #optional="{ record }">
      <router-link :to="{
        path:'/user_qTemplate_detail',
        query:{
          qTemplate_id:record.qTemplate_id,
          qTemplate_name:record.qTemplate_name,
          qTemplate_type:record.qTemplate_type,
          qTemplate_questionnaireNum:record.qTemplate_questionnaireNum,
          qTemplate_description:record.qTemplate_description,
        }
      }">
        <a-button type="primary" status="success" >查看</a-button>
      </router-link>

      <a-button type="primary" status="danger" @click="$modal.info({ title:'删除', content:'群组名称：'+record.qTemplate_name })">删除</a-button>

    </template>
  </a-table>

</template>

<script>
import {reactive, ref} from 'vue';

export default {

  name: "user_manage_questionnaireTemplate",

  data(){
    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true
    });
    return{
      value : '',
      text : '',
      rowSelection,
      columns : [
        {
          title: '题库ID',
          dataIndex: 'qTemplate_id',
          width:100
        },
        {
          title: '题库名称',
          dataIndex: 'qTemplate_name',
          width:100
        },
        {
          title: '类型',
          dataIndex: 'qTemplate_type',
          width:100
        },
        {
          title: '题目数量',
          dataIndex: 'qTemplate_questionnaireNum',
          width:100
        },
        {
          title: '描述',
          dataIndex: 'qTemplate_description',
          width:180
        },
        {
          title: '操作',
          dataIndex: 'option',
          width:180,
          slotName: 'optional'
        },
      ],
      data : ([{
        qTemplate_id: '1',
        qTemplate_name: '毛概历年题库',
        qTemplate_type: '毛概',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'毛概是一门很有重量的课程，为什么这么说呢，为了凑字数'
      }, {
        qTemplate_id: '1',
        qTemplate_name: '毛概历年题库',
        qTemplate_type: '毛概',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'毛概是一门很有重量的课程，为什么这么说呢，为了凑字数'
      },{
        qTemplate_id: '1',
        qTemplate_name: '毛概历年题库',
        qTemplate_type: '毛概',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'毛概是一门很有重量的课程，为什么这么说呢，为了凑字数'
      },{
        qTemplate_id: '1',
        qTemplate_name: '毛概历年题库',
        qTemplate_type: '毛概',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'毛概是一门很有重量的课程，为什么这么说呢，为了凑字数'
      },{
        qTemplate_id: '1',
        qTemplate_name: '毛概历年题库',
        qTemplate_type: '毛概',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'毛概是一门很有重量的课程，为什么这么说呢，为了凑字数'
      }]),
    }
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


