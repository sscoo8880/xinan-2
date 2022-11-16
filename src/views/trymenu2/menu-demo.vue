<template>
  <a-page-header class="title" title="返回" @back="$router.back()" style="padding: 10px" />
  <background/>
  <a-form>
    <a-typography-text id="title-m">问卷宝</a-typography-text>
    <a-avatar :style="{ backgroundColor: '#3370ff',marginRight:'0px'}" id="upic">
      <IconUser />
    </a-avatar>
    <a-typography-text id="uname">欢迎uname</a-typography-text>
  </a-form>


  <div id="background-r"></div>
  <div class="menu-demo">
    <a-menu
        :style="{ width: '15%', height: '100%' }"
        :default-open-keys="['0']"
        :default-selected-keys="['0_0']"
        show-collapse-button
        breakpoint="xl"
        @collapse="onCollapse">

      <a-sub-menu key="0"  v-on:click="disappare(getpath('div-m')),disappare1_1(getpath('div-mm')),disappare0_3(getpath('div_mmm')),disappare0_1(getpath('div_mmmm'))">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>用户管理</template>
        <a-menu-item key="0_0" v-on:click="change0(),disappare(getpath('div-m')),disappare1_1(getpath('div-mm')),disappare0_3(getpath('div_mmm')),disappare0_1(getpath('div_mmmm'))">用户</a-menu-item>
        <a-menu-item key="0_1" v-on:click="change0_1(),disappare(getpath('div-m')),disappare1_1(getpath('div-mm')),disappare0_3(getpath('div_mmm')),disappare0_1(getpath('div_mmmm'))">租户</a-menu-item>
        <a-menu-item key="0_3" v-on:click="change0_3(),disappare(getpath('div-m')),disappare1_1(getpath('div-mm')),disappare0_3(getpath('div_mmm')),disappare0_1(getpath('div_mmmm'))">群组</a-menu-item>
      </a-sub-menu>


      <a-sub-menu key="1"  >
        <template #icon><icon-bug></icon-bug></template>
        <template #title>个人信息管理</template>
        <a-menu-item key="1_0" v-on:click="change1_1(),disappare(getpath('div-m')),disappare1_1(getpath('div-mm')),disappare0_3(getpath('div_mmm')),disappare0_1(getpath('div_mmmm'))">个人信息</a-menu-item>
        <a-menu-item key="1_1" v-on:click="change1_2(),disappare(getpath('div-m')),disappare1_1(getpath('div-mm')),disappare0_3(getpath('div_mmm')),disappare0_1(getpath('div_mmmm'))">查询费用</a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="2" v-on:click="change2(),disappare(getpath('div-m')),disappare1_1(getpath('div-mm')),disappare0_3(getpath('div_mmm')),disappare0_1(getpath('div_mmmm'))" >
        <template #icon><icon-bulb></icon-bulb></template>
        <template #title>问卷管理</template>
        <a-menu-item key="2_0">查询</a-menu-item>
        <a-menu-item key="2_1">发布</a-menu-item>
        <a-sub-menu key="2_2" title="题库">
          <a-menu-item key="2_2_0">查看</a-menu-item>
          <a-menu-item key="2_2_1">个人问卷</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>

    </a-menu>
  </div>

  <div id="div-m" >
    <Usermanager></Usermanager>

  </div>

  <div id="div-mm" style="display:none">
    <myinfo></myinfo>

  </div>
  <div id="div_mmm" style="display: none">
    <menu4group></menu4group>
  </div>
  <div id="div_mmmm" style="display: none">
    <hirer></hirer>
  </div>

</template>
<script>
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
  IconUser,
} from '@arco-design/web-vue/es/icon';

import Myinfo from "@/views/trymenu2/menu4answer/answer_myinfo";
import Hirer from "@/views/trymenu2/menu4user/user_create_questionnaire";
export default {
  components: {
    Hirer,
    Myinfo,
    Usermanager,
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
    disappare(x)
    {

      if(this.key!=='0')
      {
        x.style.display="none"
      }
      else{
        x.style.display="block"
      }

    },
    disappare0_1(x){
      if(this.key!=='0.1')
      {
        x.style.display="none"
      }
      else{


        x.style.display="block"
      }
    },
    disappare0_3(x)
    {
      if(this.key!=='0.3')
      {
        x.style.display="none"
      }
      else{

        x.style.display="block"
      }
    },
    disappare1_1(x)
    {
      if(this.key!=='1.1')
      {

        x.style.display="none"
      }
      else{


        x.style.display="block"
      }

    }
    ,
    change0()
    {
      this.key='0'
    },
    change0_1()
    {
      this.key='0.1'
    },
    change0_2()
    {
      this.key='0.2'
    },
    change0_3()
    {
      this.key='0.3'
    },
    change1()
    {
      this.key='1'
    },

    change1_1(){
      this.key='1.1'
    },
    change1_2(){
      this.key='1.2'
    },
    change2()
    {
      this.key='2'
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
#title-m{
  position: relative;
  top: -38px;
  left: 50px;
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
  top: 40%;
  left: 20%;
  width: 1200px;
  background-color: yellow;
}
#div_mmmm{
  position: absolute;
  top: 40%;
  left: 20%;
  width: 1200px;
  background-color: yellow;
}

</style>
