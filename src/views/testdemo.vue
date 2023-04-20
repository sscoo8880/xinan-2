<template>
  <a-form :model="form" :style="{width:'600px',marginLeft:'200px',marginTop:'50px'}" @submit="handleSubmit">
<!--    标题输入-->
    <a-form-item field="标题" label="标题" validate-trigger="input" required>
      <a-input v-model="form.title" placeholder="请输入待测新闻的标题..." />
<!--      <template #extra>-->
<!--        <div>20字内</div>-->
<!--      </template>-->
    </a-form-item>
<!--    正文输入-->
    <a-form-item field="正文内容" label="正文" validate-trigger="input" required>
      <a-textarea v-model="form.message" placeholder="请输入待测新闻的正文..." :max-length="{length:500,errorOnly:true}" allow-clear show-word-limit />
    </a-form-item>

    <!--      确定框-->
    <!--    <a-form-item field="isRead">-->
<!--      <a-checkbox v-model="form.isRead">-->
<!--        我确定-->
<!--      </a-checkbox>-->
<!--    </a-form-item>-->

<!--    提交按钮-->
    <a-form-item>
      <a-button html-type="submit" :style="{width: '500px'}">开始测试</a-button>
    </a-form-item>
  </a-form>
  {{ form }}

  <a-space
      size="large"
      v-show="show1"
      style="font-size: xxx-large"
  >
    <a-statistic title="NC正常" :value="27.58" :precision="2" show-group-separator >
      <template #suffix>%</template>
    </a-statistic>

  </a-space>

  <a-space
      size="large"
      v-show="show2"
      style="font-size: xxx-large"
  >
    <a-statistic title="NC正常" :value="27.58" :precision="2" show-group-separator >
      <template #suffix>%</template>
    </a-statistic>
    <a-statistic title="AD痴呆" :value="72.42" :precision="2" :value-style="{ color: '#0fbf60' }">
      <template #suffix>%</template>
    </a-statistic>

  </a-space>

</template>

<script>
import { reactive } from 'vue';
import router from "@/router";
import api from "@/api";

export default {
  data(){
    return{
      show1:false,
      show2:false,
    }
  },
  setup() {
    const form = reactive({
      title: '对的标题',
      message: '对的正文',
    })

    const handleSubmit = () => {
      if(form.title==='对的标题'&&form.message==='对的正文'){
        this.show1=true;
        this.show2=false;
      }
      else{
        this.show1=false;
        this.show2=true;
      }
    }
    return {
      form,
      handleSubmit,
    }
  },
}
</script>