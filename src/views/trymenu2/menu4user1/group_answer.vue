<template>
  <div style="margin-bottom: 15px">
    <a-space direction="horizontal" size="large" style="width: 100%">
      <p>答者名:</p>
      <a-mention v-model="form2.username"  placeholder="请输入答者名..." />
      <a-button @click="serchAnswer" type="outline" >查询</a-button>
      <a-button type="outline" style="margin-right: 100px" @click="handleNew">新增答者</a-button>
      <a-modal v-model:visible="visibleNew" title="答者信息" @cancel="handleCancelNew" @ok="handleOkNew" ok-text="创建" draggable>
        <a-form :model="formNew">
          <a-form-item field="username" label="答者名">
            <a-input v-model="formNew.username" @blur="checkUsernameOrPhone" />
          </a-form-item>
          <a-form-item field="phone" label="手机号">
            <a-input v-model="formNew.phone" @blur="checkUsernameOrPhone"/>
          </a-form-item>
          <a-form-item field="password" label="密码">
            <a-input type="password" v-model="formNew.password" />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-space>
  </div>

  <div>
    <a-table :columns="columns" :data="x.col" :row-selection="rowSelection" v-model:selectedKeys="selectedKeys" :pagination="pagination" >
      <template #optional="{ record }">
        <a-button type="primary" style="margin-right:10px;background-color: #ffc940" @click="handleClick(record)">修改</a-button>
        <a-modal v-model:visible="visible" title="答者信息" @cancel="handleCancel" @ok="handleBeforeOk" ok-text="修改">
          <a-form :model="form">
            <a-form-item field="uid" label="ID" >
              {{record.uid}}
            </a-form-item>
            <a-form-item field="username" label="答者名">
              <a-input v-model="form.username" />
            </a-form-item>
          </a-form>
        </a-modal>
        <a-popconfirm content="确定删除该答者?" type="warning" @ok="deleteUser(record.uid)">
          <a-button type="primary" style="margin-right:20px;background-color: #409EFF">删除</a-button>
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
    api.getAnswer(this.keyword).then(res => {
      if (res.code === 200){
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
      authority:3,
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
      api.registerByUser(formNew).then(res => {
        if (res.code === 200) {
          handleSubmit();
          Message.success(res.msg)
        } else {
          Message.error(res.msg)
        }
      })
    }
    const columns =[
      {
        title: 'UID',
        dataIndex: 'uid',
      }, {
        title: '用户名',
        dataIndex: 'username',
      }, {
        title: '手机号',
        dataIndex: 'phone',
      },  {
        title: '密保',
        dataIndex: 'passwordQuestion',
      }, {
        title: '密保答案',
        dataIndex: 'passwordAnswer',
      },
      {
        title: '操作',
        width: 200 ,
        slotName: 'optional'
      },
    ];
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
      api.updateAnswer(form).then(res =>{
        console.log(res)
        if (res.code === 200){
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
      deleteMes.uid = uid
      api.deleteAnswer(deleteMes).then(res => {
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
      keyword.phone = ''
      api.getAnswer(keyword).then(res => {
        if (res.code === 200){
          console.log(res.data.list)
          x.col=res.data.list;
        }else {
          x.col = null;
        }
      })
    }
    const x =  reactive({
      col: [
        {
          uid:464,
          username:4564,
          phone:565+464654,
          passwordQuestion:4564654,
          passwordAnswer:15665465
        }
      ]
    })
    const serchAnswer = () => {
      // keyword.username = form2.username
      // keyword.phone = ''
      api.getAnswer(keyword).then(res => {
        if (res.code === 200){
          x.col=res.data.list;
        }else {
          x.col = null;
        }
      })
    }
    return{
      form2,
      keyword,
      serchAnswer,
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


