<template>
  <a-page-header class="title" title="返回" @back="$router.back()" :style="{padding:'20px',height:'60px'}" />
  <a-form>
    <a-typography-text id="title-m">管理员页面</a-typography-text>
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
    <a-typography-text id="uname" style="font-weight: bold">欢迎用户</a-typography-text>
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
        :default-open-keys="['1']"
        :default-selected-keys="['1_0']"
        show-collapse-button
        breakpoint="xl"
        @collapse="onCollapse">

      <a-sub-menu key="1"  v-on:click="goto_1_0(getpath('div-m')),goto_1_1(getpath('div_m2')),goto_2_0(getpath('div_m3')),goto_2_1(getpath('div_m4'))">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>数据集</template>
        <!--        1_0是管理题库，1_1是设计问卷，1_2是管理问卷-->
        <a-menu-item key="1_0" v-on:click="change1_0(),goto_1_0(getpath('div-m')),goto_1_1(getpath('div_m2')),goto_2_0(getpath('div_m3')),goto_2_1(getpath('div_m4'))">管理</a-menu-item>
        <a-menu-item key="1_2" v-on:click="change1_2(),goto_1_0(getpath('div-m')),goto_1_1(getpath('div_m2')),goto_2_0(getpath('div_m3')),goto_2_1(getpath('div_m4'))">训练模型</a-menu-item>
        <a-menu-item key="1_1" v-on:click="change1_1(),goto_1_0(getpath('div-m')),goto_1_1(getpath('div_m2')),goto_2_0(getpath('div_m3')),goto_2_1(getpath('div_m4'))">测试新闻</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="2" v-on:click="goto_1_0(getpath('div-m')),goto_1_1(getpath('div_m2')),goto_2_0(getpath('div_m3')),goto_2_1(getpath('div_m4'))">
        <template #icon><icon-bug></icon-bug></template>
        <template #title>结果</template>
        <a-menu-item key="2_0" v-on:click="change2_0(),goto_1_0(getpath('div-m')),goto_1_1(getpath('div_m2')),goto_2_0(getpath('div_m3')),goto_2_1(getpath('div_m4'))">本地</a-menu-item>
        <a-menu-item key="2_1" v-on:click="change2_1(),goto_1_0(getpath('div-m')),goto_1_1(getpath('div_m2')),goto_2_0(getpath('div_m3')),goto_2_1(getpath('div_m4'))">云端</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>

  <!--  对应管理的vue-->
  <div id="div-m" >
    <user_manage_qTemplate></user_manage_qTemplate>
  </div>

  <!--  对应训练的vue-->
  <div id="div_m" style="display:none">
    <train></train>
  </div>

  <!--  对应测试的vue-->
  <div id="div_m2" style="display:none">
    <test></test>
  </div>



  <!--  对应云端的vue-->
  <div id="div_m3" style="display: none">
    <view1_0></view1_0>
  </div>

  <!--  本地-->
  <div id="div_m4" style="display: none">
    <view1_1></view1_1>
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
import update from "@/views/trymenu2/menu/update";
import test from "@/views/trymenu2/menu/test";
import train from "@/views/trymenu2/menu/train";
import user_manage_qTemplate from "@/views/trymenu2/menu/manage_news_dataset";
import view1_0 from "@/views/trymenu2/menu/view1_0";
import view1_1 from "@/views/trymenu2/menu/view1_1";
import api from "@/api";
import router from "@/router";

export default {
  components: {
    view1_0,
    view1_1,
    // 引入子页面
    update,
    test,
    train,
    user_manage_qTemplate,
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
    // 菜单函数
    getpath(id) {
      return document.getElementById(id);
    },
    goto_1_0(x)//决定是否跳转user_manage_questionnairebank页面，题库管理界面
    {
      if(this.key!=='1_0')
      {
        x.style.display="none"
      }
      else{
        x.style.display="block"
      }

    },
    goto_1_1(x){//决定是否跳转user_create_questionnaire页面，创建问卷界面
      if(this.key!=='1_1')
      {
        x.style.display="none"
      }
      else{
        x.style.display="block"
      }
    },
    goto_2_0(x)//决定是否跳转user_manage_group页面，用户和群组界面
    {
      if(this.key!=='2_1')
      {
        x.style.display="none"
      }
      else{
        x.style.display="block"
      }
    },
    goto_2_1(x)//决定是否跳转group_answer页面，所有答者界面
    {
      if(this.key!=='2_0')
      {
        x.style.display="none"
      }
      else{
        x.style.display="block"
      }
    }
    ,
    change1_0()//当前状态改变为1_0
    {
      this.key='1_0'
    },
    change1_1()//当前状态改变为1_1
    {
      this.key='1_1'
    },
    change1_2()//当前状态改变为1_2
    {
      this.key='1_2'
    },
    change2_0()//当前状态改变为2_0
    {
      this.key='2_0'
    },
    change2_1()//当前状态改变为2_1
    {
      this.key='2_1'
    }
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
  top: 8%;
  left: 0;
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
#div_m2{
  position: absolute;
  top: 10%;
  left: 20%;
  width: 1200px;
}
#div_m3{
  position: absolute;
  top: 10%;
  left: 16%;
  width: 83%;
}
#div_m4{
  position: absolute;
  top: 10%;
  left: 16%;
  width: 83%;
}
</style>
