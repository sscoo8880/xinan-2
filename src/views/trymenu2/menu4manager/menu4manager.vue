<template>
  <a-page-header class="title" title="返回" @back="$router.back()" :style="{padding:'20px',height:'60px'}" />
  <a-form >
    <a-typography-text id="title-m">角色：管理员-问卷宝</a-typography-text>
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
    <a-typography-text id="uname">欢迎管理员</a-typography-text>
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

      <a-menu-item key="0_0" v-on:click="change0(),if_goto_manager_manage_lessee(getpath('div-m')),if_goto_manager_manage_fare(getpath('div-mm'))">租户</a-menu-item>
      <a-menu-item key="1_0" v-on:click="change1_1(),if_goto_manager_manage_lessee(getpath('div-m')),if_goto_manager_manage_fare(getpath('div-mm'))">租金</a-menu-item>

    </a-menu>
  </div>

  <div id="div-m">
    <manager_manage_lessee></manager_manage_lessee>
  </div>

  <div id="div-mm" style="display:none">
    <manager_manage_fare></manager_manage_fare>
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
import Manager_manage_lessee from "@/views/trymenu2/menu4manager/manager_manage_lessee";
import Manager_manage_fare from "@/views/trymenu2/menu4manager/manager_manage_fare";
import api from "@/api";
import router from "@/router";
export default {
  components: {
    // 引入子页面
    Manager_manage_fare,
    Manager_manage_lessee,
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
    if_goto_manager_manage_lessee(x)//决定是否跳转manager_manage_lessee页面
    {

      if(this.key!=='0')
      {
        x.style.display="none"
      }
      else{
        x.style.display="block"
      }

    },
    if_goto_manager_manage_fare(x)//决定是否跳转manager_manage_fare
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
    change1_1(){//当前状态改变为1.1
      this.key='1.1'
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
