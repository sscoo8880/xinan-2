<template>
  <a-page-header class="title" title="返回" @back="$router.back()" :style="{padding:'20px',height:'10px'}" >
  </a-page-header>
  <h1>数据库详情</h1>
  <div id="background-r">

    <div id="form">
      <a-descriptions column="1" direction="horizontal" >
        <a-descriptions-item label="数据库id:">{{$route.query.qTemplate_id}}</a-descriptions-item>
        <a-descriptions-item label="数据库名称：">{{$route.query.qTemplate_name}}</a-descriptions-item>
        <a-descriptions-item label="数据类型：">{{$route.query.qTemplate_type}}</a-descriptions-item>
        <a-descriptions-item label="数据数量：">{{3}}</a-descriptions-item>
        <a-descriptions-item label="数据描述：">{{$route.query.qTemplate_description}}</a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
  <div id="title2">数据列表</div>
  <div id="form2">
    <a-space id="form4" column="1" direction="horizontal" size="large" style="width: 90%" top="500px">
      <a-input-search :style="{width:'320px'}" placeholder="输入新闻名称，进行模糊搜索" search-button/>
      <a-button type="outline" :style="{width:'130px',left:'50px'}" @click="handleClick2">新增新闻</a-button>
      <a-modal v-model:visible="visible2" title="数据详情" @cancel="handleCancel2" @before-ok="handleBeforeOk2">
        <a-form :model="newnews_title">
          <a-form-item field="news_title" label="标题">
            <a-input v-model="newnews_title.news_title" />
          </a-form-item>
          <a-form-item field="select_item" label="内容">
            <a-textarea v-model="newnews_title.explanation" />
          </a-form-item>
          <a-form-item field="type" label="领域">
            <a-select v-model="newnews_title.type">
              <a-option value="娱乐">娱乐</a-option>
              <a-option value="军事">军事</a-option>
              <a-option value="社会">社会</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="radio" label="类型" >
            <a-radio-group v-model="newnews_title.select_item">
              <a-radio value="真新闻">真新闻</a-radio>
              <a-radio value="假新闻">假新闻</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-modal>
    </a-space>
  </div>

  <a-table id="form3" :columns="columns" :data="data" :rowKey="data.key" :row-selection="rowSelection">
    <template #optional="{ record }">
      <a-button type="primary" status="success"  @click="handleClick">管理</a-button>
      <a-modal v-model:visible="visible" title="用户信息详情" @cancel="handleCancel" @before-ok="handleBeforeOk">

        <a-form :model="record">
          <a-form-item field="news_title" label="标题">
            <a-input v-model="record.news_title" />
          </a-form-item>
          <a-form-item field="select_item" label="内容">
            <a-textarea v-model="record.explanation" />
          </a-form-item>
          <a-form-item field="type" label="领域">
            <a-select v-model="record.type">
              <a-option value="娱乐">娱乐</a-option>
              <a-option value="军事">军事</a-option>
              <a-option value="社会">社会</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="radio" label="类型" >
            <a-radio-group v-model="record.select_item">
              <a-radio value="真新闻">真新闻</a-radio>
              <a-radio value="假新闻">假新闻</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-modal>
      <a-button type="primary" status="danger" @click="$modal.info({ title:'删除', content:'群组名称：'+record.name })">删除</a-button>
    </template>
  </a-table>
</template>

<script>
import {reactive, ref} from 'vue';
const size = ref('large');
export default {


  data(){
    const rowSelection = reactive({
      type: 'checkbox',
      // fixed:false,
      showCheckedAll: true
    });
    // 管理-弹出框
    const visible = ref(false);
    const visible2 = ref(false);
    const record = reactive({
      news_title:'',
      type:'',
      select_item:'虚假新闻',
      explanation:'',
    });
    const newnews_title=reactive({
      news_title:'',
      type:'',
      select_item:'',
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
      console.log(newnews_title)
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
      visible,
      visible2,
      record,
      newnews_title,
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
          title: '标题',
          dataIndex: 'news_title',
          width:100
        },
        {
          title: '内容',
          dataIndex: 'explanation',
          width:200,
        },
        {
          title: '领域',
          dataIndex: 'type',
          width:100
        },
        {
          title: '类型',
          dataIndex: 'select_item',
          width:100
        },
        {
          title: '操作',
          dataIndex: 'option',
          width:100,
          slotName: 'optional'
        },
      ],
      data : ([{
        news_title: '新闻标题',
        type: '娱乐',
        select_item:'虚假新闻',
        explanation: ' 新闻内容200字新闻内容200字新闻内容200字新闻内容200字新闻内容200字新闻内容200字新闻内容200字新闻内容200字',
      }, {
        news_title: '新闻标题',
        type: '军事',
        select_item:'真实新闻',
        explanation: ' 新闻内容200字新闻内容200字新闻内容200字新闻内容200字新闻内容200字新闻内容200字新闻内容200字新闻内容200字',
      }, {
        news_title: '新闻标题',
        type: '社会',
        select_item:'虚假新闻',
        explanation: ' 新闻内容200字新闻内容200字新闻内容200字新闻内容200字新闻内容200字新闻内容200字新闻内容200字新闻内容200字',
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
  top: 40%;
  left: 18%;
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

