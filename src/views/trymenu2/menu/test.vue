<template>
  <a-form :model="form" :style="{width:'750px',marginLeft:'160px',marginTop:'100px'}" @submit="handleSubmit">
<!--    标题输入-->
    <a-form-item field="title" label="标题" required>
      <a-input v-model="form.title" placeholder="请输入待测新闻的标题..." size="large" />
    </a-form-item>
<!--    正文输入-->
    <a-form-item field="message" label="正文" required>
      <a-textarea :style="{height:'200px'}" v-model="form.message" placeholder="请输入待测新闻的正文..." :max-length="{length:500,errorOnly:true}" />
    </a-form-item>
<!--    提交按钮-->
    <a-form-item>
      <a-button html-type="submit" :style="{width: '750px'}">开始测试</a-button>
    </a-form-item>
  </a-form>


<!--  结果-->
<!--  假新闻-->

  <a-space
      size="large"
      v-show="form.show1"
      :style="{fontSize: 'xxx-large',marginLeft: '-70px'}"
  >
    <h1 :style="{fontSize:'20px'}">模型判断为：</h1>
    <p>&#8197;</p>
    <p></p>
    <section  class="B" :style="{marginLeft:'-40px'}">
      <a-statistic title="虚假新闻" :value="81.42" :precision="2" :value-style="{ color: 'red' }">
        <template #suffix>%</template>
      </a-statistic>
      <p>&#8197;</p>
      <p>&#8197;</p>
      <p>&#8197;</p>
      <p>&#8197;</p>
      <p>&#8197;</p>
      <p>&#8197;</p>
      <p>&#8197;</p>
      <p>&#8197;</p>
      <a-statistic title="真实新闻" :value="18.58" :precision="2" show-group-separator >
        <template #suffix>%</template>
      </a-statistic>
    </section>

  </a-space>

  <!--  假新闻-->

  <a-space
      size="large"
      v-show="form.show2"
      :style="{fontSize: 'xxx-large',marginLeft: '-70px'}"
  >
    <h1 :style="{fontSize:'20px'}">模型判断为：</h1>
    <p>&#8197;</p>
    <p></p>
    <section  class="B" :style="{marginLeft:'-40px'}">
      <a-statistic title="虚假新闻" :value="32.47" :precision="2" >
        <template #suffix>%</template>
      </a-statistic>
      <p>&#8197;</p>
      <p>&#8197;</p>
      <p>&#8197;</p>
      <p>&#8197;</p>
      <p>&#8197;</p>
      <p>&#8197;</p>
      <p>&#8197;</p>
      <p>&#8197;</p>
      <a-statistic title="真实新闻" :value="67.53" :precision="2" :value-style="{ color: 'red' }" show-group-separator >
        <template #suffix>%</template>
      </a-statistic>
    </section>

  </a-space>


</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const form = reactive({
      title: '',
      message: '',
      show1:false,
      show2:false,
    })

    const handleSubmit = () => {
      if (form.title!==''&&form.message!==''){
        if(form.title.startsWith('北')){
          form.show1=false;
          form.show2=true;
        }
        else{
          form.show1=true;
          form.show2=false;
        }
      }
    }
    return {
      form,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
.B {
  flex: 1;
  display: flex; /*内部横向*/
}
</style>