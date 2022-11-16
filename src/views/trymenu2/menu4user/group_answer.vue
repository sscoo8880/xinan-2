<template>
  <div style="margin-bottom: 15px">
    <a-space direction="horizontal" size="large" style="width: 100%">
      <p>问卷名:</p>
      <a-mention v-model="question_name"  placeholder="请输入答者名..." />
      <a-button @click="serchQuestion" type="outline" >查询</a-button>
      <a-modal v-model:visible="flag_search" @ok="handleOk" @cancel="handleCancel">
        <template #title>
          提醒
        </template>
        <div>没有查询到相关问卷</div>
      </a-modal>
    </a-space>
  </div>

  <div>
    <a-table :columns="columns" :data="x.col" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination" >
      <template #optional="{ record }">
        <a-button type="primary" style="margin-right:10px;background-color: #ffc940" @click="handleClick(record)">管理</a-button>
        <a-modal v-model:visible="visible" title="答者信息" @cancel="handleCancel" @ok="handleBeforeOk" ok-text="修改">
          <a-form :model="form">
            <a-form-item field="uid" label="ID">
              <!--              {{form.uid}}-->
              10086
            </a-form-item>
            <a-form-item field="username" label="答者名">
              <a-input v-model="form2.username" />
            </a-form-item>
          </a-form>
        </a-modal>
        <a-popconfirm content="确定删除该答者?" type="warning" @ok="deleteUser(record.uid)">
          <a-button type="primary" style="background-color: #409EFF">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>


</template>

<script>
import {reactive, ref} from 'vue';
import api from "@/api";
import {Message} from "@arco-design/web-vue";

export default {
  name: "group_user",
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
      username: '小帅',
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
        title: '答者ID',
        dataIndex: 'lessee_id',
        width:50
      },
      {
        title: '答者名称',
        dataIndex: 'lessee_name',
        width:50
      },



      {
        title: '操作',
        dataIndex: 'option',
        width:50,
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
        // console.log(res)
        if (res.code === 200){
          // console.log(res.data.list)
          // x.col=res.data.list;
          handleSubmit();
          Message.success(res.msg)
        }else {
          Message.error('删除失败！')
        }
      })
    }

    const handleSubmit = () => {
      // console.log(window.sessionStorage.getItem("token"))
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
      col: [{
        lessee_id: '10086',
        lessee_name: '小帅',
        message_left:33,
        message_most:'100',
        lessee_level:'白银',
        monthly_cost:'934',
      }, {
        lessee_id: '10087',
        lessee_name: '小张',
        message_left:33,
        message_most:'100',
        lessee_level:'白银',
        monthly_cost:'934',
      },{
        lessee_id: '10088',
        lessee_name: '小王',
        message_left:33,
        message_most:'100',
        lessee_level:'白银',
        monthly_cost:'934',
      },{
        lessee_id: '10089',
        lessee_name: '小李',
        message_left:33,
        message_most:'100',
        lessee_level:'白银',
        monthly_cost:'934',
      },{
        lessee_id: '10090',
        lessee_name: '小丽',
        message_left:33,
        message_most:'100',
        lessee_level:'白银',
        monthly_cost:'934',
      }]

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
      checkUsernameOrPhone
      // show
    };
  },
}
</script>

<style scoped>


</style>


