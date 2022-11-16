<template>
  <a-page-header class="title" title="返回" @back="$router.back()" :style="{padding:'20px',height:'40px'}" />
  <a-form >
    <a-typography-text id="title-m">租户界面</a-typography-text>
    <a-avatar :style="{ backgroundColor: '#3370ff',marginRight:'0px'}" id="upic">

      <a-dropdown trigger="hover">
        <a-button shape="circle" size="40px" :style="{backgroundColor: '#3370ff',marginRight:'0px'}">
          <IconUser/>
        </a-button>
        <template #content>
          <a-doption @click="handleClick">
            <template #icon>
              <IconBulb/>
            </template>
            <template #default>修改密保</template>
          </a-doption>
          <a-doption @click="logout">
            <template #icon>
              <IconBug/>
            </template>
            <template #default>注销</template>
          </a-doption>
        </template>
      </a-dropdown>

    </a-avatar>
    <a-typography-text id="uname">欢迎租户</a-typography-text>
    <a-modal v-model:visible="visible" title="修改密保" @cancel="handleCancel" @ok="handleOk" ok-text="修改">
      <a-form :model="form">
        <a-form-item field="passwordQuestion" label="密保问题">
          <a-input v-model="form.passwordQuestion"/>
        </a-form-item>
        <a-form-item field="passwordQuestion" label="答案">
          <a-input v-model="form.passwordAnswer"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-form>

  <div id="background-r"></div>
  <div class="menu-demo">
    <a-menu
        :style="{ width: '15%', height: '100%',top:'-30px' }"
        :default-open-keys="['0']"
        :default-selected-keys="['0_0']"
        show-collapse-button
        breakpoint="xl"
        @collapse="onCollapse">
      <a-menu-item key="0_0" v-on:click="change0_0(),if_goto_lessee_myinfo(getpath('div-m')),if_goto_lessee_manage_user(getpath('div-mm'))">个人信息</a-menu-item>
      <a-menu-item key="0_1" v-on:click="change0_1(),if_goto_lessee_myinfo(getpath('div-m')),if_goto_lessee_manage_user(getpath('div-mm'))">用户</a-menu-item>
    </a-menu>
  </div>

  <div id="div-m">
    <lessee_myinfo></lessee_myinfo>
  </div>

  <div id="div-mm" style="display:none">
    <lessee_manage_user></lessee_manage_user>
  </div>

</template>



<script>
import { Message } from '@arco-design/web-vue';
import {
  // 引入子页面
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
  IconUser,
} from '@arco-design/web-vue/es/icon';

import Menu4lessee from "@/views/trymenu2/menu4lessee/menu4lessee";
import Lessee_myinfo from "@/views/trymenu2/menu4lessee/lessee_myinfo";
import Lessee_manage_questionnaire from "@/views/trymenu2/menu4lessee/lessee_manage_questionnaire";
import Lessee_manage_user from "@/views/trymenu2/menu4lessee/lessee_manage_user";
import {reactive, ref} from "vue";
import api from "@/api";
import router from "@/router";
export default {
  components: {
    Lessee_manage_questionnaire,
    Lessee_myinfo,
    Lessee_manage_user,
    Menu4lessee,
    IconMenuFold,
    IconMenuUnfold,
    IconApps,
    IconBug,
    IconBulb,
    IconUser,
  },
  setup() {
    const visible = ref(false);
    const form = reactive({
      passwordQuestion: '',
      passwordAnswer: ''
    })
    const params = reactive({
      passwordQuestion: '',
      passwordAnswer: ''
    });
    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      // console.log(form)
      params.passwordAnswer=form.passwordAnswer
      params.passwordQuestion=form.passwordQuestion
      api.updateQuestion(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          // console.log(res.data.list)
          // x.col=res.data.list;
          Message.success(res.msg)
        } else {
          Message.error(res.msg)
        }
      })
    };
    const handleCancel = () => {
      visible.value = false;
    }
    return {
      onCollapse(val, type) {
        const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩';
        Message.info({
          content,
          duration: 2000,
        });
      },
      visible,
      form,
      handleClick,
      handleOk,
      handleCancel
    };
  },
  data(){
    return{
      key:'-1'
    }
  },
  methods:{
    logout() {
      api.userLogout().then(res => {
        if (res.code === 20000) {
          Message.success(res.msg)
          router.push("/")
        } else {
          Message.error(res.msg)
        }
      })
    },
    getpath(id) {
      return document.getElementById(id);
    },
    if_goto_lessee_myinfo(x)//决定是否跳转lessee_myinfo页面
    {
      if(this.key!=='0_0')
      {
        x.style.display="none"
      }
      else{
        x.style.display="block"
      }

    },
    if_goto_lessee_manage_user(x){//决定是否跳转lessee_manage_user页面
      if(this.key!=='0_1')
      {
        x.style.display="none"
      }
      else{

        x.style.display="block"
      }
    },

    change0_0()//当前状态改变为0_0
    {
      this.key='0_0'
    },
    change0_1()//当前状态改变为0_1
    {
      this.key='0_1'
    },
  }
};
</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  margin-top: 20px;
  width: 100%;
  height: 100%;
  background-color: var(--color-neutral-2);
}

#background-r {
  background: url("../../../assets/login_background.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

#title-m{
  position: absolute;
  top: 20px;
  left: 50%;
  height: 20px;
  font-size: 30px;
}
#upic{
  position: fixed;
  width: 40px;
  height: 40px;
  right: 100px;
  top: 20px;
}
#uname{
  position: fixed;
  right: 20px;
  top: 30px;
}
#div-m{
  position: absolute;
  top: 10%;
  left: 20%;
  width: 1200px;
}
#div-mm{
  position: absolute;
  top: 10%;
  left: 20%;
  width: 1200px;
}
#div_mmm{
  position: absolute;
  top: 10%;
  left: 20%;
  width: 1200px;
}
#div_mmmm{
  position: absolute;
  top: 10%;
  left: 20%;
  width: 1200px;
}

</style>
