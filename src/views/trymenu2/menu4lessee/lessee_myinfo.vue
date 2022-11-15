<template>
  <a-descriptions style="margin-top: 60px" :size="7" :column="2" title="租户-我的信息">
    <a-descriptions-item label="用户名">小帅</a-descriptions-item>
    <a-descriptions-item label="手机号">188-1234-1234</a-descriptions-item>
    <a-descriptions-item label="所在地">北京东二区</a-descriptions-item>
    <a-descriptions-item label="所在地负责人">小美</a-descriptions-item>
    <a-descriptions-item label="本月已用短信">20<label>条</label> </a-descriptions-item>
    <a-descriptions-item label="剩余短信">100<label>条</label>
<!--      <a-button>充值</a-button>-->
    </a-descriptions-item>
    <a-descriptions-item label="本月消费金额">934<label>元</label> </a-descriptions-item>
    <a-descriptions-item label="会员等级">11<label>元</label>
<!--      <a-button>充值</a-button>-->
    </a-descriptions-item>
  </a-descriptions>
  <div>
    <img src="@\api\pic.jpg"  width="100" id="position">
  </div>
<!--  <a-descriptions style="margin-top: 20px" :data="data" :size="size" title="租户-我的信息" :column="1"/>-->
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const size = ref('large');

    const data = [{
      label: '',
      value: 'Socrates',
    }, {
      label: '手机号',
      value: '188-1234-1234',
    }, {
      label: '所在地',
      value: '北京东区'
    }, {
      label: '本月已用短信（条）',
      value: '20',
    }, {
      label: '本月短信上限（条）',
      value: '100'
    },{
      label: '本月消费金额'
    }];

    return {
      data,
      size
    }
  },
}
</script>
<style scoped>
#position{
  position: absolute;
  top: 50%;
  left: 75%;
}
</style>