<template>
  <a-page-header class="title" title="返回" @back="$router.back()" :style="{padding:'20px',height:'25px'}" />
  <background/>
  <a-form>
    <a-typography-text id="title-m">角色：答者-问卷宝</a-typography-text>
    <a-avatar :style="{ backgroundColor: '#3370ff',marginRight:'0px'}" id="upic"      @click="handleClick">
      <a-modal v-model:visible="visible" title="退出登录" @cancel="handleCancel" @before-ok="handleBeforeOk">
        <h2>确定退出登录吗？</h2>
      </a-modal>
      <IconUser />
    </a-avatar>
    <a-typography-text id="uname" >欢迎答者</a-typography-text>
  </a-form>


  <div class="menu-demo">
    <a-menu
        :style="{ width: '15%', height: '100%',top:'5px' }"
        :default-open-keys="['0']"
        :default-selected-keys="['0_0']"
        show-collapse-button
        breakpoint="xl"
        @collapse="onCollapse">

      <a-menu-item key="0_0" v-on:click="change0(),if_goto_answer_myinfo(getpath('div-m')),if_goto_answer_manage_question(getpath('div-mm')),if_goto_answer_answer_question(getpath('div_mmm')),if_goto_answer_manage_questionnaire(getpath('div_mmmm'))">个人信息</a-menu-item>
      <a-menu-item key="0_1" v-on:click="change0_1(),if_goto_answer_myinfo(getpath('div-m')),if_goto_answer_manage_question(getpath('div-mm')),if_goto_answer_answer_question(getpath('div_mmm')),if_goto_answer_manage_questionnaire(getpath('div_mmmm'))">未处理问卷</a-menu-item>
      <a-menu-item key="0_3" v-on:click="change0_3(),if_goto_answer_myinfo(getpath('div-m')),if_goto_answer_manage_question(getpath('div-mm')),if_goto_answer_answer_question(getpath('div_mmm')),if_goto_answer_manage_questionnaire(getpath('div_mmmm'))">已完成问卷</a-menu-item>

    </a-menu>
  </div>

  <div id="div-m" >
    <answer_myinfo></answer_myinfo>
  </div>

  <div id="div-mm" style="display:none">
    <answer_manage_questionnaire></answer_manage_questionnaire>
  </div>

  <div id="div_mmm" style="display: none">
    <answer_answer_questionnaire></answer_answer_questionnaire>
  </div>

  <div id="div_mmmm" style="display: none">
    <answer_manage_questionnaire></answer_manage_questionnaire>
  </div>

</template>



<script>
import {reactive, ref} from 'vue';
import { Message } from '@arco-design/web-vue';
import {
  IconMenuFold,
  IconMenuUnfold,
  IconApps,
  IconBug,
  IconBulb,
  IconUser,
} from '@arco-design/web-vue/es/icon';

// 引入子页面
import menu4answer from "@/views/trymenu2/menu4answer/menu4answer";
import Answer_manage_questionnaire from "@/views/trymenu2/menu4answer/answer_manage_questionnaire";
import Answer_myinfo from "@/views/trymenu2/menu4answer/answer_myinfo";
import Answer_answer_questionnaire from "@/views/trymenu2/menu4answer/answer_answer_questionnaire";
import background from "@/components/background/background";
export default {
  components: {
    // 引入子页面
    background,
    Answer_answer_questionnaire,
    Answer_myinfo,
    Answer_manage_questionnaire,
    menu4answer,
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
  data() {
    const rowSelection = reactive({
      type: 'checkbox',
      // fixed:false,
      showCheckedAll: true
    });
    // 管理-弹出框
    const visible = ref(false);
    const record = reactive({
      name: '张三',
      sex: '男',
      power:'用户',
      time:'2019-10-26',
      phone:'165-5671-4545',
      local:'辽宁省沈阳市',
      hometown:'辽宁省沈阳市',
      home: '东北大学浑南校区第二学生宿舍',
    });
    const handleClick = () => {
      visible.value = true;
    };
    const handleBeforeOk = (done) => {



      this.$router.push({path:'/'})
      // prevent close
      // done(false)


    };
    const handleCancel = () => {
      visible.value = false;
    };

    return {
      visible,
      record,
      rowSelection,
      handleClick,
      handleBeforeOk,
      handleCancel,
      isReloadData: true,
      key:'-1'
    }
  },

  methods:{
    // 菜单函数
    getpath(id) {
      return document.getElementById(id);
    },
    if_goto_answer_myinfo(x)//决定是否跳转Answer_myinfo页面
    {

      if(this.key!=='0')
      {
        x.style.display="none"
      }
      else{
        x.style.display="block"
      }

    },
    if_goto_answer_manage_questionnaire(x){//决定是否跳转answer_manage_questionnaire页面
      if(this.key!=='0.1')
      {
        x.style.display="none"
      }
      else{


        x.style.display="block"
      }
    },
    if_goto_answer_answer_question(x)//决定是否跳转answer_answer_questionnaire页面
    {
      if(this.key!=='0.3')
      {
        x.style.display="none"
      }
      else{

        x.style.display="block"
      }
    },
    if_goto_answer_manage_question(x)//决定是否跳转answer_manage_questionnaire页面
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
    change0()//当前状态改变为0
    {
      this.key='0'
    },
    change0_1()//当前状态改变为0.1
    {
      this.key='0.1'
    },
    change0_3()//当前状态改变为0.3
    {
      this.key='0.3'
    }

  }
};
</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: var(--color-neutral-2);
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
  left: 16%;
  width: 83%;
}
#div_mmm{
  position: absolute;
  top: 10%;
  left: 16%;
  width: 83%;
}

#div_mmmm{
  position: absolute;
  top: 10%;
  left: 16%;
  width: 83%;
}

</style>
