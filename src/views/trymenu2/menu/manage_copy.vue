<!--菜单-数据集-管理-->
<template>
  <div><h1> </h1></div>
  <div class="Login" id="figure">
    <!--    <img alt="Vue logo" src="../../assets/dashboard.png">-->
  </div>
  <br>
  <div id="form2">
    <a-space direction="horizontal" size="large" style="width: 80%">
      <a-input-search :style="{width:'450px',marginLeft:'300px'}" placeholder="输入数据集名称，进行模糊搜索" search-button/>
    </a-space>
  </div>

  <a-table :columns="columns" :data="data" :rowKey="data.key" :row-selection="rowSelection" direction="horizontal" style="margin-top: 10px">
    <template #optional="{ record }">
      <router-link :to="{
        path:'/dataset_info',
        query:{
          qTemplate_id:record.qTemplate_id,
          qTemplate_name:record.qTemplate_name,
          qTemplate_type:record.qTemplate_type,
          qTemplate_questionnaireNum:record.qTemplate_questionnaireNum,
          qTemplate_description:record.qTemplate_description,
        }
      }">
        <a-button type="primary" status="success" @click="changeflag" >查看</a-button>
      </router-link>

      <a-button type="primary" status="danger" @click="$modal.info({ title:'删除', content:'群组名称：'+record.qTemplate_name })">删除</a-button>

    </template>
  </a-table>

</template>

<script>
import {reactive, ref} from 'vue';
import {Message, Modal} from "@arco-design/web-vue";
import api from "@/api";
import dataset_info from "@/views/trymenu2/menu/dataset_info";
export default {

  components:{
    dataset_info,
  },
  name: "user_manage_questionnaireTemplate",

  data(){
    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true
    });
    return{
      flag:0,
      value : '',
      text : '',
      visible:false,
      form_qTemplate:{
        qTemplate_name:'',
        qTemplate_type: '',
        qTemplate_questionnaireNum:'',
        qTemplate_description:''
        // qTemplate_questions:[],
      },
      rowSelection,
      columns : [
        {
          title: '数据集ID',
          dataIndex: 'qTemplate_id',
          width:100
        },
        {
          title: '数据集名称',
          dataIndex: 'qTemplate_name',
          width:100
        },
        {
          title: '来源',
          dataIndex: 'qTemplate_type',
          width:100
        },
        {
          title: '数据条数',
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
        qTemplate_name: '数据集1',
        qTemplate_type: '来源1',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'论文1：(url)xxx'
      }, {
        qTemplate_id: '2',
        qTemplate_name: '数据集2',
        qTemplate_type: '来源2',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'论文2：(url)xxx'
      },{
        qTemplate_id: '3',
        qTemplate_name: '数据集3',
        qTemplate_type: '来源3',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'论文3：(url)xxx'
      },{
        qTemplate_id: '4',
        qTemplate_name: '数据集4',
        qTemplate_type: '来源4',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'论文4：(url)xxx'
      },{
        qTemplate_id: '5',
        qTemplate_name: '数据集5',
        qTemplate_type: '来源5',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'论文5：(url)xxx'
      }]),
    }
  },
  methods:{
    changeflag(){
      this.flag=1
    },
    getflag(data){
      this.flag=data
    },

    handleClick(){
      this.visible=true;
    },
    handleCancel_qTemplate(){
      this.visible= false;
    },
    handleBeforeOk(done){
      if(this.form_group.gname===''){
        Modal.warning({
          title: '警告',
          content: '群组名不能为空'
        });
        window.setTimeout(() => {
          done(false)
        }, 300)
      }
      else {
        api.addGroup(this.form_group).then(res=>{
          if(res.code===200){
            window.setTimeout(() => {
              done()
            }, 300)
            this.updateGroup();
            Message.success('增加群组成功')
          }
          else {
            window.setTimeout(() => {
              done(false)
            }, 300)
            Message.error('增加群组失败')
          }
        })
      }
    },

  }
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


