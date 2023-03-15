<template>
  <a-page-header class="title" title="返回" @back="$router.back()" :style="{padding:'20px',height:'10px'}" >
  </a-page-header>
  <h1>新闻详情</h1>
  <div id="background-r">
    <a-carousel
        :autoPlay="true"
        animation-name="card"
        show-arrow="never"
        indicator-position="outer"
        :style="{
          top:'22px',
          left:'246px',
      width: '70%',
      height: '240px',
    }"
    >
      <a-carousel-item v-for="image in images" :style="{ width: '60%' }">
        <img
            :src="image"
            :style="{
          width: '100%',
        }"
        />
      </a-carousel-item>
    </a-carousel>


  </div>
  <div id="form2">
    <a-descriptions column="1" direction="horizontal" >
      <a-descriptions-item label="新闻id:">{{$route.query.qTemplate_id}}</a-descriptions-item>
      <a-descriptions-item label="新闻名称：">{{$route.query.qTemplate_name}}</a-descriptions-item>
      <a-descriptions-item label="新闻类型：">{{$route.query.qTemplate_type}}</a-descriptions-item>
      <a-descriptions-item label="新闻数量：">{{$route.query.qTemplate_questionnaireNum}}</a-descriptions-item>
      <a-descriptions-item label="新闻描述：">{{$route.query.qTemplate_description}}</a-descriptions-item>
      <a-descriptions-item label="新闻详情：">新闻详情新闻详情详情新闻详情新闻详情新闻详情新闻详情详情新闻详情新闻详情新闻详情新闻详情详情新闻详情新闻详情新闻详情新闻详情详情新闻详情新闻详情新闻详情新闻详情详情新闻详情新闻详情新闻详情新闻详情详情新闻详情新闻详情新闻详情新闻详情详情新闻详情新闻详情新闻详情新闻详情详情新闻详情新闻详情新闻详情新闻详情详情新闻详情新闻详情新闻详情新闻详情详情新闻详情新闻详情新闻详情新闻详情详情新闻详情新闻详情新闻详情新闻详情详情新闻详情新闻详情新闻详情新闻详情详情新闻详情新闻详情</a-descriptions-item>

    </a-descriptions>
  </div>
</template>

<script>
import {reactive, ref} from 'vue';
const size = ref('large');
export default {


  data(){
    const images = [
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
      'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp',
    ];
    const rowSelection = reactive({
      type: 'checkbox',
      // fixed:false,
      showCheckedAll: true
    });
    // 管理-弹出框
    const visible = ref(false);
    const visible2 = ref(false);
    const record = reactive({
      name: '',
      level: '',
    });
    const newQuestion=reactive({
      question:'',
      type:'',
      answer:'',
      explanation:'',
    });
    const handleClick2 = () => {
      visible2.value = true;
    };
    const handleClick = () => {
      visible.value = true;
    };
    const handleBeforeOk = (done) => {
      console.log(record)
      window.setTimeout(() => {
        done()
        // prevent close
        // done(false)
      }, 3000)
    };
    const handleBeforeOk2 = (done) => {
      console.log(newQuestion)
      window.setTimeout(() => {
        done()
        // prevent close
        // done(false)
      }, 3000)
    };
    const handleCancel = () => {
      visible.value = false;
    };
    const handleCancel2 = () => {
      visible2.value = false;
    };
    return{
      images,
      visible,
      visible2,
      record,
      newQuestion,
      rowSelection,
      handleClick,
      handleClick2,
      handleBeforeOk,
      handleBeforeOk2,
      handleCancel,
      handleCancel2,
      value : '',
      text : '',
      columns : [
        {
          title: '新闻',
          dataIndex: 'question',
          width:200
        },
        {
          title: '类型',
          dataIndex: 'type',
          width:100
        },
        {
          title: '选项',
          dataIndex: 'select_item',
          width:100
        },
        {
          title: '答案',
          dataIndex: 'answer',
          width:150
        },
        {
          title: '解析',
          dataIndex: 'explanation',
          width:250
        },
        {
          title: '操作',
          dataIndex: 'option',
          width:100,
          slotName: 'optional'
        },
      ],
      data : ([{
        question: '这是一道新闻这是一道新闻这是一道新闻这是一道新闻这是一道新闻',
        type: '单选题',
        select_item:'A好 B好 C好 D好',
        answer:'A',
        explanation: ' 因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以',
      }, {
        question: '这是一道新闻这是一道新闻这是一道新闻这是一道新闻这是一道新闻',
        type: '多选',
        select_item:'A好 B好 C好 D好',
        answer:'AB',
        explanation: ' 因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以',
      }, {
        question: '这是一道新闻这是一道新闻这是一道新闻这是一道新闻这是一道新闻',
        type: '填空',
        select_item:'A好 B好 C好 D好',
        answer:'这是答案按',
        explanation: ' 因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以因为所以',
      }]),
    }
  },
  setup(){
    // 勾选框
    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true
    });
  },
}
</script>

<style scoped>

#background-r{
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

#title2{
  position:absolute;
  top: 300px;
  left: 744px;
  font-size: 20px;
}
#form{
  position: absolute;
  top: 3%;
  left: 5%;

  /*-ms-transform: translate(-50%, -50%);*/
  /*transform: translate(-50%, -50%);*/
}

#form2{
  position: absolute;
  margin-top: 21%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#form3{
  position: absolute;
  top: 62%;
  left: 50%;
  width: 98%;
  /*-ms-transform: translate(-50%, -50%);*/
  /*transform: translate(-50%, -50%);*/
}
</style>

