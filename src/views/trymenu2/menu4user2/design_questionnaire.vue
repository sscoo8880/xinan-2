<template>
  <h1 :style="{marginLeft: '-11%'}">新的新闻</h1>
  <a-form ref="formRef" :size="form.size" :model="form" :style="{width:'725px',marginLeft:'10%',marginTop:'0'}" @submit="handleSubmit">
    <a-form-item field="name" label="新闻标题"
                 :rules="[{required:true,message:'新闻标题是必须的'},{minLength:5,message:'新闻标题不得少于5个字'}]"
                 :validate-trigger="['change','input']"
    >
      <a-input v-model="form.name" placeholder="请输入新闻标题..." />
    </a-form-item>
    <a-form-item field="age" label="新闻内容"
                 :rules="[{required:true,message:'新闻内容是必须的'},{minLength:15, max:200,message:'新闻内容不少于15字'}]"
    >
      <a-input-number v-model="form.age" placeholder="请输入新闻内容..." />
    </a-form-item>
    <a-form-item field="section" label="新闻来源" :rules="[{required:true,message:'新闻来源是必须的'}]">
      <a-select v-model="form.section" placeholder="请选择新闻来源">
        <a-option value="百度贴吧">百度贴吧</a-option>
        <a-option value="知乎">知乎</a-option>
        <a-option value="哔哩哔哩">哔哩哔哩</a-option>
        <a-option value="今日头条">今日头条</a-option>
        <a-option value="其他">其他</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="options" label="新闻类型"
                 :rules="[{type:'array',minLength:1,message:'新闻类型至少选一种'}]"
    >
      <a-checkbox-group v-model="form.options">
        <a-checkbox value="政治">政治</a-checkbox>
        <a-checkbox value="经济">经济</a-checkbox>
        <a-checkbox value="文教">文教</a-checkbox>
        <a-checkbox value="法律">法律</a-checkbox>
        <a-checkbox value="军事">军事</a-checkbox>
        <a-checkbox value="科技">科技</a-checkbox>
        <a-checkbox value="体育">体育</a-checkbox>
        <a-checkbox value="社会">社会</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item field="province" label="报道地" :rules="[{required:false,message:' '}]">
      <a-cascader v-model="form.province" :options="options" placeholder="Please select ..." allow-clear />
    </a-form-item>
    <a-form-item field="date" label="报道日期">
      <a-date-picker v-model="form.date" placeholder="请选择报道日期" style="width: 725px"/>
    </a-form-item>
    <a-form-item field="time" label="报道时间">
      <a-time-picker v-model="form.time" placeholder="请选择报道时间"style="width: 725px"/>
    </a-form-item>
<!--    <a-form-item field="radio" label="Radio" :rules="[{match:/one/,message:'must select one'}]">-->
<!--      <a-radio-group v-model="form.radio">-->
<!--        <a-radio value="radio one">Radio One</a-radio>-->
<!--        <a-radio value="radio two">Radio Two</a-radio>-->
<!--      </a-radio-group>-->
<!--    </a-form-item>-->
    <a-form-item field="score" label="热度">
      <a-rate v-model="form.score" allow-clear />
    </a-form-item>
<!--    <a-form-item field="switch" label="Switch" :rules="[{type:'boolean', true:true,message:'must be true'}]">-->
<!--      <a-switch v-model="form.switch" />-->
<!--    </a-form-item>-->
    <a-form-item field="multiSelect" label="数据集">
      <a-select v-model="form.multiSelect" placeholder="选择要放入的数据集" multiple>
        <a-option value="数据集1">数据集1</a-option>
        <a-option value="数据集2">数据集2</a-option>
        <a-option value="数据集3">数据集3</a-option>
      </a-select>
    </a-form-item>

    <a-form-item>
      <a-space>
        <a-button html-type="submit" :style="{left:'50px',width:'150px'}">提交</a-button>
        <a-button @click="$refs.formRef.resetFields()" :style="{left:'200px',width:'150px'}">撤回</a-button>
      </a-space>
    </a-form-item>
  </a-form>
<!--  {{ form }}-->
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const handleSubmit = ({values, errors}) => {
      console.log('values:', values, '\nerrors:', errors)
    }

    const form = reactive({
      size: 'large',
      name: '',
      age: undefined,
      section: '',
      province: 'haidian',
      options: [],
      date: '',
      time: '',
      radio: 'radio one',
      slider: 5,
      score: 5,
      switch: false,
      treeSelect: ''
    });
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'chaoyang',
            label: 'ChaoYang',
            children: [
              {
                value: 'datunli',
                label: 'Datunli',
              },
            ],
          },
          {
            value: 'haidian',
            label: 'Haidian',
          },
          {
            value: 'dongcheng',
            label: 'Dongcheng',
          },
          {
            value: 'xicheng',
            label: 'XiCheng',
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'shanghaishi',
            label: 'Shanghai',
            children: [
              {
                value: 'huangpu',
                label: 'Huangpu',
              },
            ],
          },
        ],
      },
    ];
    const treeData = [
      {
        key: 'node1',
        title: 'Node1',
        children: [
          {
            key: 'node2',
            title: 'Node2',
          },
        ],
      },
      {
        key: 'node3',
        title: 'Node3',
        children: [
          {
            key: 'node4',
            title: 'Node4',
          },
          {
            key: 'node5',
            title: 'Node5',
          },
        ],
      },
    ]

    return {
      form,
      options,
      treeData,
      handleSubmit
    }
  },
}
</script>

<style scoped lang="scss">
@import '../../../style/_Edit';
#icons{
  margin-top: 20%;
}

.top_container{
  margin-left: 17%;
  box-sizing: border-box;
  width: 800px;
  padding: 0px;
  border: 30px solid rgb(var(--gray-2));
}

.bottom_container{
  background-color: #f2f3f5;
  margin-top: 20px;
  margin-left: 17%;
  box-sizing: border-box;
  width: 800px;
  padding: 20px;
  border: 3px solid rgb(var(--gray-2));
}
</style>
