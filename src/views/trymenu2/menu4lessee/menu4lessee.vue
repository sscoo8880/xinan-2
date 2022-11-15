<template>
  <a-page-header class="title" title="返回" @back="$router.back()" :style="{padding:'20px',height:'60px'}" />
  <a-form >
    <a-typography-text id="title-m">租户界面</a-typography-text>
    <a-avatar :style="{ backgroundColor: '#3370ff',marginRight:'0px'}" id="upic">
      <IconUser />
    </a-avatar>
    <a-typography-text id="uname">欢迎租户</a-typography-text>
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
    return {
      onCollapse(val, type) {
        const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩';
        Message.info({
          content,
          duration: 2000,
        });
      }
    };
  },
  data(){
    return{
      key:'-1'
    }
  },
  methods:{
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
  width: 100%;
  height: 100%;
}

#background-r {
  background: url("../../../assets/login_background.jpg") no-repeat center;
  top: 70px;
  left: 0;
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
