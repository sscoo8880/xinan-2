<template>
  <h3>答者-我的信息</h3>

  <div>
    <img src="@\api\pic.jpg" width="100" id="position">
  </div>
  <div >
    <a-button id="position3"  type="primary" @click="handleClick">修改信息</a-button>
    <a-modal v-model:visible="visible" title="用户信息详情" @cancel="handleCancel" @before-ok="handleBeforeOk">
              <a-form :model="record">
                <a-form-item field="name" label="姓名">
                  <a-input class="p1"  v-model="record.name" />
                </a-form-item>
                <a-form-item field="sex" label="性别">
                  <a-input v-model="record.sex" />
                </a-form-item>
                <a-form-item field="power" label="权限">
                  <a-input v-model="record.power" />
                </a-form-item>
                <a-form-item field="time" label="注册时间">
                  <a-input v-model="record.time" />
                </a-form-item>
                <a-form-item field="phone" label="移动电话">
                  <a-input v-model="record.phone" />
                </a-form-item>
                <a-form-item field="local" label="所在地">
                  <a-input v-model="record.local" />
                </a-form-item>
                <a-form-item field="hometown" label="家乡">
                  <a-input v-model="record.hometown" />
                </a-form-item>
                <a-form-item field="home" label="住址">
                  <a-input v-model="record.home" />
                </a-form-item>

              </a-form>
    </a-modal>
    <div v-if="isReloadData">
      <a-descriptions style="margin-top: 60px" :data="data2" :size="7" :column="2"/>
    </div>

  </div>
</template>

<script>
import {reactive, ref} from 'vue';
import {getValueByPath} from "@arco-design/web-vue/es/form/utils";
export default {
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
      console.log(record)

        done()
        // prevent close
        // done(false)
      this.data2[0].value=this.record.name;
      this.data2[1].value=this.record.sex;
      this.data2[2].value=this.record.power;
      this.data2[3].value=this.record.time;
      this.data2[4].value=this.record.phone;
      this.data2[5].value=this.record.local;
      this.data2[6].value=this.record.hometown;
      this.data2[7].value=this.record.home;
      record.sex=this.record.sex;
      record.name=this.record.name;
      record.power=this.record.power;
      record.time=this.record.time;
      record.phone=this.record.phone;
      record.home=this.record.home;
      record.hometown=this.record.hometown;
      record.local=this.record.local;
      this.reload();


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
      isReloadData: true
    }
  },
  setup() {
    const size = ref('large');

    const data2 = [{
      label: '姓名     ',
      value: '张三',
    },{
      label: '性别     ',
      value: '男',
    }, {
      label: '权限',
      value: '用户',
    }, {
      label: '注册时间     ',
      value: '2019-10-26',
    },{
      label: '移动电话',
      value: '165-5671-4545',
    }, {
      label: '所在地',
      value: '辽宁省沈阳市',
    }, {
      label: '家乡',
      value: '辽宁省沈阳市',
    }, {
      label: '住址',
      value: '东北大学浑南校区第二学生宿舍'
    }];


    return {
      data2,
      size
    }
  },
  methods:{
    reload () {
      this.isReloadData = false;
      this.$nextTick(() => {
        this.isReloadData = true;
      })
    }
  }
}
</script>
<style scoped>
#position{
  position: absolute;
  top: 50%;
  left: 75%;
}
#position2{
  position: absolute;
  top: 200%;
  left: 40%;
}
#position3{
  position: absolute;
  top: 5%;
  left: 0%;
  width: 100px;
  height: 30px;
}
#position4{
  position: relative;
  top: -20%;
}
</style>
