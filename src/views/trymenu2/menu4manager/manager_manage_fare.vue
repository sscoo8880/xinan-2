<template>
  <div v-if="flag===0">
    <a-form-item>
    <a-button @click="changeflag" type="outline">租户分析</a-button>
    </a-form-item>
    <a-table :columns="columns" :data="x.col" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination">
      <template #optional="{ record }">
        <a-button type="primary" style="margin-right:10px;background-color: #ffc940" @click="handleClick(record)">管理</a-button>
        <a-modal v-model:visible="visible" title="租户信息" @cancel="handleCancel" @ok="handleBeforeOk" ok-text="修改">
          <a-form :model="form">
            <a-form-item field="uid" label="UID">
              {{form.uid}}
            </a-form-item>
            <a-form-item field="username" label="租户名">
              <a-input v-model="form.username" />
            </a-form-item>
            <a-form-item field="phone" label="手机号">
              <a-input v-model="form.phone" />
            </a-form-item>
          </a-form>
        </a-modal>
        <a-popconfirm content="确定删除该租户?" type="warning" @ok="deleteUser(record.uid)">
          <a-button type="primary" style="background-color: #409EFF">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
  <div v-if="flag===1">
    <echarts-page @flag_echarts_lessee="getflag"/>
  </div>
</template>

<script>
import {reactive, ref} from 'vue';
import api from "@/api";
import {Message} from "@arco-design/web-vue";
import echartsPage from "@/views/tryecharts/echartsPage";

export default {
  name: "manager_manage_fare",
  components:{
    echartsPage
  },
  mounted() {
    api.getLessees(this.form2).then(res => {
      // console.log(res)
      if (res.code === 200){
        // console.log(res.data.list)
        this.x.col=res.data.list;
      }else {
        this.x.col = null;
      }
    })
  },
  setup(){
    const pagination = {pageSize: 5}
    const selectedKeys = ref(['1', '2']);
    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true,
    });
    const form2 = reactive({
      username: '',
      phone: '',
    })
    const keyword = reactive({
      username: '',
      phone: '',
    })
    const deleteMes = reactive({
      uid:''
    })
    //创建用户信息
    const visibleNew = ref(false);
    const formNew = reactive({
      username: '',
      phone:'',
      password:'',
      authority:1,
    });
    const handleCancelNew = () => {
      visibleNew.value = false;
    }
    //点击创建后初始化界面
    const handleNew = () => {
      visibleNew.value = true;
    };
    //检查租户名唯一
    const checkUsernameOrPhone = () => {
      api.checkUsernameOrPhone(formNew).then(res => {
        if (res.code !== 200) {
          Message.error(res.msg)
        }
      })
    }
    //确认创建
    const handleOkNew = () => {
      //console.log(form)
      api.registerByAdmin(formNew).then(res => {
        //console.log(res)
        if (res.code === 200) {
          // console.log(res.data.list)
          // x.col=res.data.list;
          handleSubmit();
          Message.success(res.msg)
        } else {
          Message.error(res.msg)
        }
      })
    }
    const columns =[
      {
        title: '租户ID',
        dataIndex: 'lessee_id',
        width:100
      },
      {
        title: '租户名称',
        dataIndex: 'lessee_name',
        width:100
      },
      {
        title: '剩余数量（条）',
        dataIndex: 'message_left',
        width:100
      },
      {
        title: '本月上限（条）',
        dataIndex: 'message_most',
        width:100
      },
      {
        title: '本月消费（¥）',
        dataIndex: 'monthly_cost',
        width:100
      },
      {
        title: '会员等级',
        dataIndex: 'lessee_level',
        width:100
      },
      {
        title: '操作',
        dataIndex: 'option',
        width:100,
        slotName: 'optional'
      },
    ];
    const data=[{
        lessee_id: '1',
        lessee_name: '小帅',
        message_left:33,
        message_most:'100',
        lessee_level:'白银',
        monthly_cost:'934',
      }, {
        lessee_id: '1',
        lessee_name: '小帅',
        message_left:33,
        message_most:'100',
        lessee_level:'白银',
        monthly_cost:'934',
      },{
        lessee_id: '1',
        lessee_name: '小帅',
        message_left:33,
        message_most:'100',
        lessee_level:'白银',
        monthly_cost:'934',
      },{
        lessee_id: '1',
        lessee_name: '小帅',
        message_left:33,
        message_most:'100',
        lessee_level:'白银',
        monthly_cost:'934',
      },{
        lessee_id: '1',
        lessee_name: '小帅',
        message_left:33,
        message_most:'100',
        lessee_level:'白银',
        monthly_cost:'934',
      }];


    //修改租户信息
    const visible = ref(false);
    const form = reactive({
      username: '',
      phone:'',
      uid:''
    });
    //点击管理后初始化界面
    const handleClick = (recode) => {
      form.username=recode.username
      form.uid=recode.uid
      form.phone=recode.phone
      visible.value = true;
    };
    //确认修改
    const handleBeforeOk = () => {
      console.log(form)
      api.updateLessees(form).then(res =>{
        console.log(res)
        if (res.code === 200){
          // console.log(res.data.list)
          // x.col=res.data.list;
          handleSubmit();
          Message.success(res.msg)
        }else {
          Message.error(res.msg)
        }
      })

    };
    const handleCancel = () => {
      visible.value = false;
    }
    //删除租户
    const deleteUser = (uid) => {
      console.log(uid)
      deleteMes.uid = uid
      api.deleteLessees(deleteMes).then(res => {
        if (res.code === 200){
          handleSubmit();
          Message.success(res.msg)
        }else {
          Message.error('删除失败！')
        }
      })
    }

    const handleSubmit = () => {
      keyword.username = form2.username
      keyword.phone = form2.phone
      api.getLessees(keyword).then(res => {
        // console.log(res)
        if (res.code === 200){
          console.log(res.data.list)
          x.col=res.data.list;
        }else {
          x.col = null;
        }
      })
    }
    const x =  reactive({
      col: []

    })

    return{
      form2,
      handleSubmit,
      columns,
      x,
      rowSelection,
      selectedKeys,
      pagination,
      deleteUser,
      visible,
      form,
      handleClick,
      handleBeforeOk,
      handleCancel,
      handleNew,
      visibleNew,
      handleCancelNew,
      handleOkNew,
      formNew,
      checkUsernameOrPhone,
    };
  },
  data(){
    return{
      flag: 0
    }
  },
  methods:{
    changeflag(){
      this.flag=1
    },
    getflag(data){
      this.flag=data
    }
  }
}
</script>

<style>
</style>


