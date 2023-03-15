<template>
  <div><h1> </h1></div>
  <div class="Login" id="figure">
    <!--    <img alt="Vue logo" src="../../assets/dashboard.png">-->
  </div>
  <br>
  <div id="form2">
    <a-space direction="horizontal" size="large" style="width: 80%">
      <a-input-search :style="{width:'320px'}" placeholder="输入新闻标题，进行模糊搜索" search-button/>
      <a-button @click="handleClick" type="outline" :style="{width:'320px',left:'420px'}">新增新闻</a-button>
      <a-modal  v-model:visible="visible" title="新增新闻" @cancel="handleCancel_qTemplate" @before-ok="handleBeforeOk">
        <a-form :model="form_qTemplate">
          <a-form-item field="name" label="新闻标题">
            <a-input v-model="form_qTemplate.gname" />
          </a-form-item>
          <a-form-item field="type" label="新闻来源">
            <a-select v-model="form_qTemplate.qTemplate_type">
              <a-option value="百度贴吧">百度贴吧</a-option>
              <a-option value="知乎">知乎</a-option>
              <a-option value="哔哩哔哩">哔哩哔哩</a-option>
              <a-option value="今日头条">今日头条</a-option>
              <a-option value="其他">其他</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="explanation" label="新闻内容">
            <a-textarea v-model="form_qTemplate.qTemplate_description"></a-textarea>
          </a-form-item>
          <!--          <a-form-item field="description" label="新闻热度" value="form_qTemplate.qTemplate_questionnaireNum">-->
<!--          <a-form-item>-->
<!--            <router-link :to="{-->
<!--              path:'/user_qTemplate_detail',-->
<!--              query:{-->
<!--                qTemplate_id:form_qTemplate.qTemplate_id,-->
<!--                qTemplate_name:form_qTemplate.qTemplate_name,-->
<!--                qTemplate_type:form_qTemplate.qTemplate_type,-->
<!--                qTemplate_questionnaireNum:0,-->
<!--                qTemplate_description:form_qTemplate.qTemplate_description,-->
<!--              }-->
<!--            }">-->
<!--              <a-button  type="primary" style="width: 380px">设置新闻</a-button>-->
<!--            </router-link>-->
<!--          </a-form-item>-->
        </a-form>
      </a-modal>
<!--      <a-button type="outline" :style="{width:'200px',left:'320px'}">导入新闻</a-button>-->
    </a-space>
  </div>

  <a-table :columns="columns" :data="data" :rowKey="data.key" :row-selection="rowSelection" direction="horizontal" style="margin-top: 10px">
    <template #optional="{ record }">
      <router-link :to="{
        path:'/user_qTemplate_detail_user2',
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
import {Message, Modal} from "@arco-design/web-vue";
import api from "@/api";

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
          title: '新闻ID',
          dataIndex: 'qTemplate_id',
          width:100
        },
        {
          title: '新闻标题',
          dataIndex: 'qTemplate_name',
          width:100
        },
        {
          title: '来源',
          dataIndex: 'qTemplate_type',
          width:100
        },
        {
          title: '新闻热度',
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
        qTemplate_name: '新闻1',
        qTemplate_type: '来源1',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'论文1：(url)xxx'
      }, {
        qTemplate_id: '2',
        qTemplate_name: '新闻2',
        qTemplate_type: '来源2',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'论文2：(url)xxx'
      },{
        qTemplate_id: '3',
        qTemplate_name: '新闻3',
        qTemplate_type: '来源3',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'论文3：(url)xxx'
      },{
        qTemplate_id: '4',
        qTemplate_name: '新闻4',
        qTemplate_type: '来源4',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'论文4：(url)xxx'
      },{
        qTemplate_id: '5',
        qTemplate_name: '新闻5',
        qTemplate_type: '来源5',
        qTemplate_questionnaireNum:'50',
        qTemplate_description:'论文5：(url)xxx'
      }]),
    }
  },
  methods:{
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


